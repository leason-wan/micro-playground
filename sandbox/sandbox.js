import {corePlugin} from "./plugins/index.js";

function genCode(code, proxyWindow) {
  window.SANDBOX_GLOBAL_CONTEXT = proxyWindow;
  return `;(function(window, self){
    with(window) {
      ${code}
    }
  }).call(window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT);`;
}

function createSandbox(plugins = []) {
  const sandbox = {
    running: false
  };
  const rawWindow = window;
  let fakeWindow = Object.create(null);
  plugins = [corePlugin, ...plugins];

  sandbox.run = function run(code) {
    // proxy vars
    sandbox.global = new Proxy(fakeWindow, {
      get(target, property) {
        // avoid who using window.window or window.self to escape the sandbox environment to touch the really window
        if (property === 'top' || property === 'parent' || property === 'window' || property === 'self') {
          return sandbox.global;
        }
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property)
        }
        // 兜底到window对象上取值
        const rawValue = Reflect.get(rawWindow, property);
        // 如果兜底的值为函数，则需要绑定window对象，如：console、alert等
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString()
          // 排除构造函数
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(rawWindow)
          }
        }
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
    const _code = genCode(code, sandbox.global);
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
      beforeDestroy(sandbox.global);
    })
    sandbox.running = false;
    sandbox.global = {};
  }

  return sandbox;
}

export { createSandbox };
