import { createApp } from 'vue'
//import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/common.scss'
const app = createApp(App)
//import { useIntersectionObserver } from '@vueuse/core'
//import { shallowRef, useTemplateRef } from 'vue'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


app.use(pinia)


//app.use(createPinia())

// 持久化插件
//pinia.use.
app.use(router)

app.mount('#app')

// 全局指令
// app.directive('img-lazy', {
//     mounted(el, binding) {
//         const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
//             console.log(isIntersecting)
//             if (isIntersecting) { // 进入视口区域 
//                 el.src = binding.value
//                 stop()
//             }
//         },)
//     }
// })

// 引入插件，懒加载，并注册
import { lazyPlugin } from './directives '

app.use(lazyPlugin)

//
import { componentPlugin } from '@/components'

app.use(componentPlugin)