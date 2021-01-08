<template>
    <div class="mean">
        <DetailView />
    </div>
</template>

<script>
    import DetailView from '@/components/mean/detail/detail.vue'    // 详情
    export default {
        name: 'mean',
        setup(props,ctx) {

        },
        components: {
            DetailView
        }
    }
</script>

<style lang="less" scoped>

</style>
