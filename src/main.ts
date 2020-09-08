import Vue from 'vue';
import App from './App.vue';
// Only import the layout-related controls.
import { LayoutPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import World from './models/World';

// Reference the plugin(s) we imported above, here.
Vue.use(LayoutPlugin);

Vue.config.productionTip = false;
Vue.prototype.$world = new World();
Vue.prototype.$testWorld = new World();

new Vue({
	render: h => h(App)
}).$mount('#app')
