import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { MicroConfig } from '../qiankun-admin';
import appsConfig from '../apps-config';

Vue.config.productionTip = false
Vue.use(MicroConfig);

const microConfig = new MicroConfig(appsConfig);

new Vue({
  router,
  microConfig,
  render: h => h(App)
}).$mount('#app')

// import { registerMicroApps, runAfterFirstMounted, start } from 'qiankun';

// /**
//  * Step1 初始化应用（可选）
//  */

// function loader(loading) {
//   instance.$children[0].loading = loading;
// }

// /**
//  * Step2 注册子应用
//  */

// registerMicroApps(
//   [
//     {
//       name: 'goods',
//       entry: '//localhost:8001',
//       container: '#micro-app',
//       loader,
//       activeRule: '/goods',
//     },
//     {
//       name: 'about',
//       entry: '//localhost:8002',
//       container: '#micro-app',
//       loader,
//       activeRule: '/about',
//     },
//   ],
//   {
//     beforeLoad: [
//       app => {
//         console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
//       },
//     ],
//     beforeMount: [
//       app => {
//         console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
//       },
//     ],
//     afterUnmount: [
//       app => {
//         console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
//       },
//     ],
//   },
// );

// /**
//  * Step4 启动应用
//  */
// start({prefetch: false});

// runAfterFirstMounted(() => {
//   console.log('[MainApp] first app mounted');
// });
