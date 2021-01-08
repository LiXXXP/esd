<template>
    <div class="lol-game">
        <PlayGame />
        <PlayInfo />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/lol/playGame.vue'     // 对局
    import PlayInfo from '@/components/match/game/lol/playInfo.vue'     // 比赛信息
    export default {
        setup(props,ctx) {

            return {

            }
        },
        components: {
            PlayGame,
            PlayInfo
        }
    }
</script>

<style lang="less" scoped>

</style>
