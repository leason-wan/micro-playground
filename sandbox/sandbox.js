import {corePlugin} from "./plugins/index.js";

function genCode(code, proxyWindow) {
  window.SANDBOX_GLOBAL = proxyWindow;
  return `;(function(window){
    ${code}
  })(window.SANDBOX_GLOBAL);`;
}

function createSandbox(plugins = []) {
  const sandbox = {
    running: false
  };
  const rawWindow = window;
  let fakeWindow = {};
  plugins = [corePlugin, ...plugins];

  sandbox.run = function run(code) {
    const sandboxHandler = {
      get(target, property) {
        // 优先从代理对象上取值
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property)
        }
        // 否则兜底到window对象上取值
        const rawValue = Reflect.get(rawWindow, property)
        // 如果兜底的值为函数，则需要绑定window对象，如：console、alert等
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString()
          // 排除构造函数
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(rawWindow)
          }
        }
        // 其它情况直接返回
        return rawValue
      },
      set(target, property, value) {
        target[property] = value;
        return true;
      },
      has(target, p) {
        return p in target || p in rawWindow;
      },
    };
    // proxy vars
    fakeWindow = new Proxy(fakeWindow, sandboxHandler);

    plugins.forEach((plugin) => {
      const {beforeStart} = plugin;
      beforeStart(fakeWindow);
    })
    const _code = genCode(code, fakeWindow);
    try {
      (0, eval)(_code);
      sandbox.running = true;
    } catch (error) {
      console.error(`[sandbox runtime error]: ${error}`);
    }
  }

  sandbox.destory = function destory() {
    plugins.forEach((plugin) => {
      const {beforeDestroy} = plugin;
      beforeDestroy(fakeWindow);
    })
    sandbox.running = false;
    fakeWindow = {};
  }

  return sandbox;
}

export { createSandbox };
