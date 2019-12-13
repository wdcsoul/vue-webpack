import Vue from 'vue';
import vuex from 'vuex';
import actions from './action';
import mutations from './mutation';
import getters from './getter';
import state from './state';
Vue.use(vuex);
export default new vuex.Store({
    actions,

});