<template>
    <div class="events">
        <RecentEvent />
        <AllEvent />
        <DataEvent />
    </div>
</template>

<script>
    import RecentEvent from '@/components/home/events/recent/recentEvent.vue'    // 近期赛事
    import AllEvent from '@/components/home/events/all/allEvent.vue'             // 赛事筛选
    import DataEvent from '@/components/home/events/datas/dataEvent.vue'         // 数据分析

    export default {
        setup(props,ctx) {
            
        },
        components: {
            RecentEvent,
            AllEvent,
            DataEvent
        }
    }
</script>

<style lang="less" scoped>

</style>
