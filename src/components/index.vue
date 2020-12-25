<template>
    <div class="index">
        <header-view></header-view>
        <home-view></home-view>
    </div>
</template>

<script>
    import HeaderView from '@/components/header/index.vue' // 导航栏
    import HomeView from '@/components/index/index.vue'  // 首页内容
    export default {
        name: 'index',
        components: {
            HeaderView,
            HomeView
        }
    }
</script>

<style lang="less" scoped>

</style>
