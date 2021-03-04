<template>
    <div class="home">
        <SlideView />
        <div class="page-content">
            <EventsView />
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'
    export default defineComponent({
        name: 'home',
        setup(props,ctx) {

        },
        components: {
            SlideView: defineAsyncComponent(() => import('@/components/home/slide/slide')),   // 轮播图
            EventsView: defineAsyncComponent(() => import('@/components/home/events/events')) // 赛事
        }
    })
</script>

<style lang="less" scoped>

</style>
