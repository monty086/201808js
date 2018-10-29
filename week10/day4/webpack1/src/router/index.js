
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);// 将 router-link 和 router-view 变成全局组件


import Home from '../page/home.vue';
import List from '../page/list.vue';
import Collect from '../page/collect.vue';
import Add from '../page/add.vue'

let routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/list', component: List ,name:'mList'},
    { path: '/collect', component: Collect },
    { path: '/add', component: Add },
    { path: '*', redirect: '/home'},
];
let router = new VueRouter({
    routes,
})

export default router

