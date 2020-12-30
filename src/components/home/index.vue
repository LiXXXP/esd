<template>
    <div class="home">
        <SlideView />
        <div class="page-content">
            <EventsView />
        </div>
    </div>
</template>

<script>
    import SlideView from '@/components/home/slide/slide.vue'    // 导航栏
    import EventsView from '@/components/home/events/events.vue' // 赛事
    export default {
        setup(props,ctx) {

        },
        components: {
            SlideView,
            EventsView
        }
    }
</script>

<style lang="less" scoped>

</style>
