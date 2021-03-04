<template>
    <div class="events">
        <RecentEvent />
        <AllEvent />
        <!-- <DataEvent /> -->
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            
        },
        components: {
            RecentEvent: defineAsyncComponent(() => import('@/components/home/events/recent/recentEvent')), // 近期赛事
            AllEvent: defineAsyncComponent(() => import('@/components/home/events/all/allEvent')),          // 赛事筛选
            DataEvent: defineAsyncComponent(() => import('@/components/home/events/datas/dataEvent'))       // 数据分析
        }
    })
</script>

<style lang="less" scoped>

</style>
