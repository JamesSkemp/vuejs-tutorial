import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import World from './models/World';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$world = new World();
Vue.prototype.$testWorld = new World();

new Vue({
	render: h => h(App)
}).$mount('#app')
