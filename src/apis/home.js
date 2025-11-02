import httpInstance from '@/utils/http';
//import { httpInstance } from 'vue';


//封装Banner接口

export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}

/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
    return httpInstance({
        url: '/home/new'
    })
}

export const findHotAPI = () => {
    return httpInstance({
        url: '/home/hot'
    })
}