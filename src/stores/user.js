//管理用户数据相关
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { ref } from "vue";
import { userCartStore } from "./cartStore";



export const useUserStore = defineStore(
    'user',
    () => {
        const userInfo = ref(JSON.parse(sessionStorage.getItem('rabbit-user')) || {})
        const token = ref(sessionStorage.getItem('rabbit-token') || '') // 启动时从本地读一次

        const getUserInfo = async (account, password) => {
            //console.log('getUserInfo 被调用了', account, password)
            const res = await loginAPI({ account, password })
            // 这里建议先打印看看数据
            console.log('loginAPI 返回：', res)
            userInfo.value = res.data.result   // 或 res.result，看你拦截器
            token.value = res.data.result.token

            // ✅ 手动持久化到 sessionStorage
            sessionStorage.setItem('rabbit-token', token.value)
            // 如果你想把整个 userInfo 也存起来：
            sessionStorage.setItem('rabbit-user', JSON.stringify(userInfo.value))
        }


        // 3. 退出登录
        const logout = () => {
            userInfo.value = {}
            token.value = ''
            sessionStorage.removeItem('rabbit-token')
            sessionStorage.removeItem('rabbit-user')
            const cartStore = userCartStore()
            // clear cart 
            cartStore.clearCart()

        }
        return {
            userInfo,
            token,
            getUserInfo,
            logout,
        }

    },
    /* {
        persist: {
            key: 'rabbit-user',        // 🔑 存到 sessionStorage 的 key
            storage: window.sessionStorage, // ⭐ 强制用 sessionStorage
            // 只存 userInfo（可选，不写就是整个 store）
            paths: ['userInfo'],
        },
    }, */
)