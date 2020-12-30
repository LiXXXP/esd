<template>
    <div class="events">
        <RecentEvent />
        <AllEvent />
    </div>
</template>

<script>
    import RecentEvent from '@/components/home/events/recent/recentEvent.vue'    // 近期赛事
    import AllEvent from '@/components/home/events/all/allEvent.vue'             // 赛事筛选

    export default {
        setup(props,ctx) {
            
        },
        components: {
            RecentEvent,
            AllEvent
        }
    }
</script>

<style lang="less" scoped>

</style>
