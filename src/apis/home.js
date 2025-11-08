import httpInstance from '@/utils/http';
//import { httpInstance } from 'vue';


//封装Banner接口

export function getBannerAPI(params = {}) {
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
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

export const getGoodsAPI = () => {
    return httpInstance({
        url: 'home/goods'
    })
}