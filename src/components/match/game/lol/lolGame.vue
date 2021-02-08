<template>
    <div class="lol-game">
        <PlayGame />
        <PlayInfo />
        <PlayScore />
        <PlayAnaly />
        <PlayBattle />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/module/playGame.vue'    // 对局
    import PlayInfo from '@/components/match/game/lol/playInfo.vue'       // 比赛信息
    import PlayScore from '@/components/match/game/module/playScore.vue'  // 当前比分
    import PlayAnaly from '@/components/match/game/module/playAnaly.vue'  // 对战分析
    import PlayBattle from '@/components/match/game/lol/playBattle.vue'   // 对战分析

    export default {
        setup(props,ctx) {

            return {

            }
        },
        components: {
            PlayGame,
            PlayInfo,
            PlayScore,
            PlayAnaly,
            PlayBattle
        }
    }
</script>

<style lang="less" scoped>

</style>
