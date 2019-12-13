import Vue from 'vue';
import App from './app';
import router from './router/index';
import store from './store/index';
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
});
// javascript 热更新
// if (module.hot) {
//     module.hot.accept();
// }