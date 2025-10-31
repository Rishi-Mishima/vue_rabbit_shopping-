import httpInstance from '@/utils/http';


//封装Banner接口

export function getBannerAPI() {
    return httpInstance({
        url: '/home/banner'
    })
}