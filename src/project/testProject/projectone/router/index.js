import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                index: 0,
                keepalive: true,
                title: 'home'
            },
            component: () => import('../component/main/home.vue').catch(err => { console.error('视图加载错误：' + err); })
        }
    ]
});