import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  // phoenixDebugStatusGet,
  createAppsConfig, RemoteAppsConfig
} from './configs';

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'mini'
});

export function devtools(userKey, config) {
  // const isPhoenixDebug = phoenixDebugStatusGet();
  // if (isPhoenixDebug) {
  if (!config) {
    console.error('[qk-admin] remote config required');
    return;
  }
  RemoteAppsConfig.set(config);
  const localAppsConfig = createAppsConfig(userKey);
  let appsConfig = localAppsConfig.get();
  if (!appsConfig) {
    localAppsConfig.set(config);
    appsConfig = config;
  }
  const instence = new Vue({
    render: h => h(App, { props: { localAppsConfig } }),
  }).$mount()
  document.body.appendChild(instence.$el);
  return appsConfig;
  // } else {
  //   console.log('[qk-admin] devtool is closed');
  //   return config;
  // }
}

if (process.env.NODE_ENV === 'development') {
  devtools('userKey', []);
}