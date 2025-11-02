

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/common.scss'

import { useIntersectionObserver } from '@vueuse/core'
//import { shallowRef, useTemplateRef } from 'vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 全局指令
app.directive('img-lazy', {
    mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
            console.log(isIntersecting)
            if (isIntersecting) { // 进入视口区域 
                el.src = binding.value
                stop()
            }
        },)
    }
})
