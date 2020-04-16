import Vue from 'vue'
import App from './App.vue'
import World from './models/World';

Vue.config.productionTip = false
Vue.prototype.$world = new World();

new Vue({
  render: h => h(App)
}).$mount('#app')
