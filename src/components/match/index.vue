<template>
    <div class="match">
        <ListView />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent } from 'vue'
    
    export default defineComponent({
        name: 'match',
        setup(props,ctx) {

        },
        components: {
            ListView: defineAsyncComponent(() => import('@/components/match/list/list')) // 赛事列表
        }
    })
</script>

<style lang="less" scoped>

</style>
