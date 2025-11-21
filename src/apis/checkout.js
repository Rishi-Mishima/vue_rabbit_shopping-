import request from '@/utils/http'

export const getCheckInfoAPI = () => {
    return request({
        url: "/member/order/pre",
    })
}

// 订单提交支付

export const CreateOrderAPI = (data) => {
    return request({
        url: '/member/order',
        method: 'POST',
        data
    })
}