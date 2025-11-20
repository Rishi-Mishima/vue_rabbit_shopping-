import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";

import { insertCartAPI, findNewCartListAPI, deleteCartListAPI } from '@/apis/cart'




export const userCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 从 sessionStorage 读取购物车数据
    //const cartList = ref(JSON.parse(sessionStorage.getItem('cartList')) || [])
    const cartList = ref([])

    // 获取最新购物车列表 action - 抽出重复代码
    const updateNewList = async () => {
        const res = await findNewCartListAPI()
        // 本地购物车列表 被 新接口购物车列表覆盖
        // 根据你项目实际结构选一个：
        // 假设是 axios 标准返回：
        const serverList = res.data?.result || res.result || []

        // 确保是数组再赋值
        cartList.value = Array.isArray(serverList) ? serverList : []
    }

    const addCart = async (goods) => {
        console.log('添加', goods)
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过

        const { skuId, count } = goods
        if (isLogin.value) {
            // add into cart - after login 

            await insertCartAPI({ skuId, count })

            updateNewList()
        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                // 找到了
                item.count++
            } else {
                // 没找到
                cartList.value.push(goods)
            }
        }

        // ⭐ 每次修改后，持久化存储
        sessionStorage.setItem('cart-list', JSON.stringify(cartList.value))
    }

    const delCart = async (skuId) => {
        if (isLogin.value) {

            // 接口
            await deleteCartListAPI([skuId])
            // 获取的接口购物车列表
            updateNewList()
        } else {
            // 思路：
            // 1. 找到要删除项的下标值 - splice
            // 2. 使用数组的过滤方法 - filter
            const idx = cartList.value.findIndex((item) => skuId === item.skuId)
            cartList.value.splice(idx, 1)
        }

    }

    // clear cart after logging out 
    const clearCart = () => {
        cartList.value = []
    }

    // 购物车计算  数量。 总价 - 所有项count * price 

    // 单选功能
    const singleCheck = (skuId, select) => {
        //通过SkuID找到要修改的一项，然后把Selected修改为我们自己穿过来的
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.select = select
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))


    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.select))

    // 全选功能
    const allChecked = (select) => {
        cartList.value.forEach((item) => item.select = select)
    }

    // 已选择的数量，已选择的商品合计
    const selectedCount = computed(() => cartList.value.filter(item => item.select).reduce((a, c) => a + c.count, 0))
    const selectedPrice = computed(() => cartList.value.filter(item => item.select).reduce((a, c) => a + c.count * c.price, 0))


    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        singleCheck,
        isAll,
        allChecked,
        selectedCount,
        selectedPrice,
        clearCart
    }
})