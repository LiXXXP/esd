<template>
    <div class="csgo-game">
        <PlayGame />
        <PlayScore />
        <PlayAnaly />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/module/playGame.vue'    // 对局
    import PlayScore from '@/components/match/game/module/playScore.vue'  // 当前比分
    import PlayAnaly from '@/components/match/game/module/playAnaly.vue'  // 对战分析

    export default {
        setup(props,ctx) {

            return {

            }
        },
        components: {
            PlayGame,
            PlayScore,
            PlayAnaly
        }
    }
</script>

<style lang="less" scoped>

</style>
