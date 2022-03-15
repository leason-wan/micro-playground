import { lifeCycleFromEntry } from './load.js';

let apps = [];
const statusEnum = {
  NOT_LOADED: "NOT_LOADED",
  // NOT_BOOTSTRAPPED: "NOT_BOOTSTRAPPED",
  NOT_MOUNTED: "NOT_MOUNTED",
  MOUNTED: "MOUNTED",
}
let isStart = false;
// app = {
//   api
//   name: string,
//   entry: { scripts: ['//localhost:7100/main.js'] },
//   container: string,
//   activeRule: string,
//   props : any,
//   loader: Function,

//   inner
//   status: string,
//   isActive: Function
// }

export function registerMicroApps(appsConfig) {
  if (!appsConfig || appsConfig.length < 1) return;
  const _apps = appsConfig.map(sanitizeApp);
  apps = [...apps, ..._apps];
  urlSync();
}

function sanitizeApp(app) {
  const { activeRule, props, name, container } = app;

  function isActive() {
    const route = window.location.href
      .replace(origin, "")
      .replace(location.search, "")
      .split("?")[0];
    return activeRule.test(route);
  }

  const mountElement = document.querySelector(container).parent;

  function mergrPorps() {
    return {
      ...props,
      name,
      container: mountElement
    }
  }

  return { ...app, isActive, status: statusEnum.NOT_LOADED, props: mergrPorps() }
}

function urlSync() {
  runLoad();
  if (!isStart) return;
  runBootstrap();
  // runMount();
}

function runBootstrap() {
  apps.filter(app => {
    const { status, isActive } = app;
    const _isActive = isActive();
    return status === statusEnum.NOT_BOOTSTRAPPED && _isActive;
  }).forEach(app => {
    const { bootstrap, props } = app;
    bootstrap(props).then(() => app.status = statusEnum.NOT_MOUNTED).then(() => runMount());
  })
}

async function runMount() {
  apps.filter(app => {
    const { status, isActive } = app;
    const _isActive = isActive();
    return status === statusEnum.NOT_MOUNTED && _isActive;
  }).forEach(app => {
    const { mount, props } = app;
    mount(props);
  })
}

async function runLoad() {
  apps.forEach(async app => {
    const { status, isActive, entry, name } = app;
    const _isActive = isActive();
    if (status === statusEnum.NOT_LOADED && _isActive) {
      const { bootstrap, mount, unmount } = await lifeCycleFromEntry(entry, name);
      // await lifeCycleFromEntry(entry, name);
      app.bootstrap = bootstrap;
      app.mount = mount;
      app.unmount = unmount;
      app.status = statusEnum.NOT_BOOTSTRAPPED;
    }
  })
}

export function start() {
  isStart = true;
  urlSync();
}
