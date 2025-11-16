// axios封装

import axios from 'axios'
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/user';
import router from '@/router';


const httpInstance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么


    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const userStore = useUserStore();
    if (error.status === 401) {
        userStore.logout();
        router.push('/login')
    }
    return Promise.reject(error);
});

// 请求拦截器：每次请求都带上 token - 并没有用Pinia 
httpInstance.interceptors.request.use(
    (config) => {
        // const userStore = useUserStore();
        // const token = userStore.userInfo.token 
        const token = sessionStorage.getItem('rabbit-token')
        if (token) {
            // 根据后端约定，有的写 Bearer，有的直接写 token
            config.headers.Authorization = `Bearer ${token}`
            // 或者：
            // config.headers.token = token
        }
        return config
    },
    (error) => Promise.reject(error),
)

export default httpInstance 