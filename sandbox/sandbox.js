import { corePlugin } from "./plugins/index.js";

function exeCode(code, sandbox) {
  window.SANDBOX_GLOBAL_CONTEXT = sandbox.global;
  const _code = `;(function(window, self){
    with(window) {
      ${code}
    }
  }).call(window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT, window.SANDBOX_GLOBAL_CONTEXT);`;;

  try {
    (0, eval)(_code);
    sandbox.isRun = true;
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
  const iframe = document.createElement('iframe', {
    src: 'about:blank',
    sandbox: "allow-scripts allow-same-origin allow-popups allow-presentation allow-top-navigation",
    style: 'display: none;',
  })
  iframe.setAttribute('style', 'display: none;');
  document.body.appendChild(iframe)
  // 沙箱运行时的全局对象
  const fakeWindow = iframe.contentWindow
  plugins = [corePlugin, ...plugins];

  sandbox.run = function run(code) {
    // 处理变量状态
    sandbox.global = new Proxy(fakeWindow, {
      get(target, property) {
        // 避免沙盒逃逸 window.window or window.self
        if (property === 'top' || property === 'parent' || property === 'window' || property === 'self') {
          return sandbox.global;
        }
        const rawValue = Reflect.get(rawWindow, property);
        // 全局函数属性，需要绑定全局对象，如：alert等
        if (property === 'alert') {
          return rawValue.bind(rawWindow);
        }
        // 沙盒有值取沙盒
        if (Reflect.has(target, property)) {
          return Reflect.get(target, property)
        }
        // 全局状态兜底取值
        return rawValue;
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
      const { beforeStart } = plugin;
      beforeStart(sandbox.global);
    })
    exeCode(code, sandbox);
  }

  sandbox.destory = function destory() {
    plugins.forEach((plugin) => {
      const { beforeDestroy } = plugin;
      beforeDestroy(sandbox.global);
    })
    sandbox.isRun = false;
    sandbox.global = {};
  }

  return sandbox;
}

export { createSandbox };
