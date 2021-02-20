<template>
    <div class="match">
        <ListView />
    </div>
</template>

<script>
    import ListView from '@/components/match/list/list.vue'    // 赛事列表
    export default {
        name: 'match',
        setup(props,ctx) {

        },
        components: {
            ListView
        }
    }
</script>

<style lang="less" scoped>

</style>
