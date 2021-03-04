<template>
    <div class="mean">
        <ListView />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'

    export default defineComponent({
        name: 'mean',
        setup(props,ctx) {

        },
        components: {
            ListView: defineAsyncComponent(() => import('@/components/mean/list/list')) // 详情
        }
    })
</script>

<style lang="less" scoped>

</style>
