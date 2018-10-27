
import Vue from 'vue';
// vue 分为2个部分，一个 runtime 
// 必须要用一个函数 render：funciton //将虚拟dom解析成真实dom

// 另一个是 compiler vue实例上的 解析 template
import App from './App.vue';

// router
import router from './router'

new Vue({
    el:'#app',
    render: h=>h(App),
    router
})






