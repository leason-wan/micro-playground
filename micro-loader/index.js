import { registerMicroApps, start } from './core.js';


registerMicroApps([{
  name: 'goods',
  entry: [
    'http://127.0.0.1:8001/js/chunk-vendors.js',
    'http://127.0.0.1:8001/js/app.js'
  ],
  container: '#app',
  activeRule: /\S/,
}])

setTimeout(() => start(), 2000);