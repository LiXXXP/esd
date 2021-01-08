<template>
    <div class="game page-content">
        <Breadcrumb />
        <LOLGame></LOLGame>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import LOLGame from '@/components/match/game/lol/lolGame.vue'             // lol 比赛详情

    export default {
        name: 'game',
        setup(props,ctx) {

            return {

            }
        },
        components: {
            Breadcrumb,
            LOLGame
        }
    }
</script>

<style lang="less" scoped>

</style>
