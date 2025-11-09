// abstract the banner 
import { ref, onMounted } from 'vue';
import { getCategoryAPI } from '@/apis/category';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    // 如果下面TO传了参数，那就是ID，如果不传，则是默认参数
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)

        categoryData.value = res.data.result
    }

    onMounted(() => getCategory())

    // 路由参数变化，可以吧分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log('the route has been changed');

        console.log(to);// can get the route params 

        getCategory(to.params.id)

    })

    return {
        categoryData
    }

}