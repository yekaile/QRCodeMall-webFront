import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import {router} from './router'
Vue.config.devtools = true
Vue.use(ElementUI);
Vue.use(VueRouter);

axios.defaults.withCredentials = true;

new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app')
