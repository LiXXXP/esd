<template>
    <div class="match">
        <DetailView />
    </div>
</template>

<script>
    import DetailView from '@/components/match/detail/detail.vue'    // 详情
    export default {
        name: 'match',
        setup(props,ctx) {

        },
        components: {
            DetailView
        }
    }
</script>

<style lang="less" scoped>

</style>
