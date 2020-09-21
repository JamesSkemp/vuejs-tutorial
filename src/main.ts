import { createApp } from 'vue';
import App from './App.vue';
// Only import the layout-related controls.
//import { LayoutPlugin } from 'bootstrap-vue';
// TODO above is not currently supported with Vue 3
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import World from './models/World';

// Reference the plugin(s) we imported above, here.
//Vue.use(LayoutPlugin);
// TODO above is not currently supported with Vue 3

(window as any).$world = new World();
(window as any).$testWorld = new World();

createApp(App).mount('#app');
