<template>
    <div class="index">
        <HeaderView />
        <HomeView />
        <FooterView />
    </div>
</template>

<script>
    import HeaderView from '@/components/header/index.vue' // 导航栏
    import HomeView from '@/components/home/index.vue'    // 首页内容
    import FooterView from '@/components/footer/index.vue' // 底部
    export default {
        name: 'index',
        components: {
            HeaderView,
            HomeView,
            FooterView
        }
    }
</script>

<style lang="less" scoped>

</style>
