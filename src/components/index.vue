<template>
    <div class="index">
        <HeaderView />
        <!-- 路由页面 -->
        <router-view></router-view>
        <FooterView />
    </div>
</template>

<script>
    import HeaderView from '@/components/header/index.vue' // 导航栏
    import FooterView from '@/components/footer/index.vue' // 底部
    export default {
        name: 'index',
        components: {
            HeaderView,
            FooterView
        }
    }
</script>

<style lang="less" scoped>

</style>
