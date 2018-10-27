
import Vue from 'vue';
// vue 分为2个部分，一个 runtime 
// 必须要用一个函数 render：funciton

// 另一个是 compiler vue实例上的 解析 template
import App from './App.vue';

// router
import VueRouter from 'vue-router';
Vue.use(VueRouter);// 将 router-link 和 router-view 变成全局组件
import Home from './page/home.vue';
let routes = [
    {path:'/home',component:Home}
];
let router = new VueRouter({
    routes,
})

new Vue({
    el:'#app',
    render: h=>h(App),
    router
})






