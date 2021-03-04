<template>
    <div class="index">
        <HeaderView />
        <!-- 路由页面 -->
        <router-view></router-view>
        <FooterView />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'

    export default defineComponent({
        name: 'index',
        components: {
            HeaderView: defineAsyncComponent(() => import('@/components/header/index')), // 导航栏
            FooterView: defineAsyncComponent(() => import('@/components/footer/index')), // 底部
        }
    })
</script>

<style lang="less" scoped>

</style>
