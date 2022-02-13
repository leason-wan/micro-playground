import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: true });

const loader = loading => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#micro-app',
      loader,
      activeRule: '/home',
    },
    {
      name: 'react15',
      entry: '//localhost:7102',
      container: '#micro-app',
      loader,
      activeRule: '/goods',
    },
    {
      name: 'vue',
      entry: '//localhost:7101',
      container: '#micro-app',
      loader,
      activeRule: '/about',
    },
  ],
  {
    beforeLoad: [
      app => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
      },
    ],
    beforeMount: [
      app => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
      },
    ],
    afterUnmount: [
      app => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
      },
    ],
  },
);

// const { onGlobalStateChange, setGlobalState } = initGlobalState({
//   user: 'qiankun',
// });

// onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

// setGlobalState({
//   ignore: 'master',
//   user: {
//     name: 'master',
//   },
// });

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/react16');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
