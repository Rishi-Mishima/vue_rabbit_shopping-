//管理用户数据相关
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    //1. 管理用户数据state
    const userInfo = ref({})
    //2. 获取接口数据的Action函数
    const getUserInfo = async (account, password) => {
        const res = await loginAPI(account, password)
        userInfo.value = res.result
    }
    //3. 以对象的格式，把state和action return

    return {
        userInfo,
        getUserInfo
    }
})