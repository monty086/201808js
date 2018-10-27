
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);// 将 router-link 和 router-view 变成全局组件


import Home from '../page/home.vue';
import List from '../page/list.vue';



let routes = [
    { path: '/home', component: Home },
    { path: '/list', component: List }
];
let router = new VueRouter({
    routes,
})

export default router

