// axios封装

import axios from 'axios'
import { ElMessage } from 'element-plus';

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
httpInstance.interceptors.response.use(
    res => {
        return res.data   // 成功时把 data 返回给组件
    },
    err => {
        // 报错信息可能在 err.response.data.message
        ElMessage({
            type: 'warning',
            message: err.response?.data?.message || '请求失败'
        })
        return Promise.reject(err)
    }
)


export default httpInstance 