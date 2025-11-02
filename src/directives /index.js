// 懒加载插件

import { useIntersectionObserver } from '@vueuse/core'
//import { shallowRef, useTemplateRef } from 'vue'

export const lazyPlugin = {
    install(app) {
        // logic 
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

    }
}