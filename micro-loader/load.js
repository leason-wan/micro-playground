// import { createSandbox } from '../sandbox/sandbox.js';

// const baseUrl = 'http://192.168.10.10:8001';
// const entry = [
//   `${baseUrl}/js/chunk-vendors.js`,
//   `${baseUrl}/js/app.js`
// ]
// const sandbox = createSandbox();

export async function lifeCycleFromEntry(entry, name) {
  
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = 'http://127.0.0.1:8001/';

  // sandbox.run(script);
  // console.log(sandbox.global);
  const scripts = await Promise.all(entry.map(script => fetch(script)
    .then(res => res.text()))
  )
  scripts.forEach(script => {
    eval(script);
  //   sandbox.run(script);
  })
  return window[`${name}-app`];
}