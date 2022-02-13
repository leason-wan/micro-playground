import { registerMicroApps, start } from 'qiankun';
// import { devtools } from '@webuy/phoenix-devtools';
import { createRouter } from './router';

const CONTAINER = 'micro_vue_default';

function install(Vue) {

  Vue.component('micro-view', {
    name: CONTAINER,
    data() {
      return {
        loading: false,
      }
    },
    render(h) {
      console.log('render');
      const loading = this.loading ? h('div', 'loading') : '';
      return h('div', [loading, h('div', {
        attrs: {
          id: CONTAINER
        }
      })]);
    }
  });

  let containerInstence = null; 
  Vue.mixin({
    beforeCreate() {
      if (this.$options.name === CONTAINER) {
        containerInstence = this;
      }
    },
    mounted() {
      const { microConfig } = this.$options;
      if (microConfig) {
        const loader = loading => {
          if (containerInstence) {
            containerInstence.loading = loading;
          }
        }
        const { appsConfig } = microConfig;
        const microApps = appsConfig.map(config => ({
          ...config,
          container: `#${CONTAINER}`,
          loader,
        }));
        registerMicroApps(microApps);
        start({
          sandbox: { experimentalStyleIsolation: true },
          prefetch: false
        });
      }
    },
  })
}

export function MicroConfig(appsConfig) {
  if (!(this instanceof MicroConfig)) {
    throw new Error(`MicroConfig must call with new`);
  }
  return {
    appsConfig
  }
}

MicroConfig.install = install;

export const router = createRouter();