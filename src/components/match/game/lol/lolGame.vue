<template>
    <div class="lol-game">
        <PlayGame />
        <PlayInfo />
        <PlayScore />
        <PlayAnaly @getBattleId="getBattleId" />
        <PlayTeams />
        <div class="flex flex_between">
            <PlayDiff />
            <PlayRank />
        </div>
        <PlayerData />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const battleId = ref(0)
            const gameData = inject('detail')
            watch(gameData, () => {
                if(gameData.gameDetail.battle_info.length > 0) {
                    battleId.value = gameData.gameDetail.battle_info[0].battle_id
                }
            })
            const getBattleId = (val) => {
                battleId.value = val
            }
            provide('battleid',battleId)
            return {
                battleId,
                gameData,
                getBattleId
            }
        },
        components: {
            PlayGame: defineAsyncComponent(() => import('@/components/match/game/module/playGame')),   // 对局
            PlayInfo: defineAsyncComponent(() => import('@/components/match/game/module/playInfo')),   // 比赛信息
            PlayScore: defineAsyncComponent(() => import('@/components/match/game/module/playScore')), // 当前比分
            PlayAnaly: defineAsyncComponent(() => import('@/components/match/game/module/playAnaly')), // 对战分析
            PlayTeams: defineAsyncComponent(() => import('@/components/match/game/lol/playTeams')),    // 队伍对局详情
            PlayDiff: defineAsyncComponent(() => import('@/components/match/game/lol/playDiff')),      // 经济差/经验差
            PlayRank: defineAsyncComponent(() => import('@/components/match/game/lol/playRank')),      // 数据排行
            PlayerData: defineAsyncComponent(() => import('@/components/match/game/lol/playerData'))  // 选手对局详情
        }
    })
</script>

<style lang="less" scoped>

</style>
