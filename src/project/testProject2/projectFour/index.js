import Vue from 'vue';
import App from './project4.vue';
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});

// javascript 热更新
// if (module.hot) {
//     module.hot.accept();
// }