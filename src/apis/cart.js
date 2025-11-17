// cart apis
import request from '@/utils/http'

// 购物车接口…… 加入购物车
export const insertCartAPI = ({ skuId, count }) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

//获取-购物车列表
export const findNewCartListAPI = () => {
    return request({
        url: "/member/cart"
    })
}