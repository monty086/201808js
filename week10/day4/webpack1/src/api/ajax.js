
import axios from 'axios';

// 添加一个通用的请求网址
axios.defaults.baseURL = 'http://localhost:3000';

// axios拦截器
axios.interceptors.response.use(res=>{
    return res.data
});

// 获取热门图书
export function hotbooks (){
    return axios.get('/hotbooks')
}
