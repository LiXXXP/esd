<template>
    <div class="mean">
        <ListView />
    </div>
</template>

<script>
    import ListView from '@/components/mean/list/list.vue'    // 详情
    export default {
        name: 'mean',
        setup(props,ctx) {

        },
        components: {
            ListView
        }
    }
</script>

<style lang="less" scoped>

</style>
