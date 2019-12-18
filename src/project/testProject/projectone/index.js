import Vue from 'vue';
import App from './app';
import router from './router/index';
import store from './store/index';
import '../../../assets/css/components-main.less'
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