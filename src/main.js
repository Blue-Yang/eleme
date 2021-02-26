import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/index.css'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

console.log(vm);
console.log(Vue.options);


