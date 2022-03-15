import {corePlugin} from "./plugins/index.js";

function exeCode(code, sandbox) {
  window.SANDBOX_GLOBAL_CONTEXT = sandbox.global;
  const _code = `;(function(window, self){
    with(window) {
      ${code}
    }
  }).call(window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT);`;;

  try {
    (0, eval)(_code);
    sandbox.running = true;
  } catch (error) {
    console.error(`[sandbox runtime error]: ${error}`);
  }
}

function createSandbox(plugins = []) {
  const sandbox = {
    isRun: false
  };
  const rawWindow = window;
  // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
  const iframe = document.createElement('iframe', {url: 'about:blank'})
  iframe.setAttribute('style', 'display: none;');
  // iframe.setAttribute('sandbox', 'allow-modals');
  document.body.appendChild(iframe)
  // 沙箱运行时的全局对象
  // const fakeWindow = iframe.contentWindow
  const fakeWindow = Object.create(null);
  // fakeWindow.foo = 'foo';
  plugins = [corePlugin, ...plugins];

  sandbox.run = function run(code) {
    // 处理变量状态
    sandbox.global = new Proxy(fakeWindow, {
      get(target, property) {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        if (property === 'top' || property === 'parent' || property === 'window' || property === 'self') {
          return sandbox.global;
        }
        // 如果值为函数，则需要绑定window对象，如：console、alert等
        // const rawValue = Reflect.get(rawWindow, property);
        // console.log(property, 'get--------', rawValue);
        // if (property === 'console' || property === 'alert') {
          // console.log(property, 'get from global');
          // console.log(rawValue);
          // return rawValue.bind(rawWindow);
        //   return rawValue;
        // }
        // 沙盒有值取沙盒
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property)
        }
        // 全局状态兜底取值
        return Reflect.get(rawWindow, property);
      },
      set(target, property, value) {
        target[property] = value;
        return true;
      },
      has(target, p) {
        return p in target || p in rawWindow;
      },
    });

    plugins.forEach((plugin) => {
      const {beforeStart} = plugin;
      beforeStart(sandbox.global);
    })
    exeCode(code, sandbox);
  }

  sandbox.destory = function destory() {
    plugins.forEach((plugin) => {
      const {beforeDestroy} = plugin;
      beforeDestroy(sandbox.global);
    })
    sandbox.isRun = false;
    sandbox.global = {};
  }

  return sandbox;
}

export { createSandbox };
