import { defineStore } from "pinia";
import { ref } from "vue";

export const userCartStore = defineStore('cart', () => {
    // 从 sessionStorage 读取购物车数据
    const cartList = ref(JSON.parse(sessionStorage.getItem('cart-list')) || [])


    const addCart = (goods) => {
        console.log('添加', goods)
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过

        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
            // 找到了
            item.count++
        } else {
            // 没找到
            cartList.value.push(goods)
        }
        // ⭐ 每次修改后，持久化存储
        sessionStorage.setItem('cart-list', JSON.stringify(cartList.value))
    }

    const delCart = async (skuId) => {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }

    return {
        cartList,
        addCart,
        delCart
    }
})