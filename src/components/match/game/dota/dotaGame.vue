<template>
    <div class="lol-game">
        <PlayGame />
        <!-- <PlayInfo /> -->
        <PlayScore />
        <PlayAnaly @getBattleId="getBattleId" />
        <!-- <PlayBattle /> -->
        <PlayTeams />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/module/playGame.vue'    // 对局
    import PlayInfo from '@/components/match/game/module/playInfo.vue'    // 比赛信息
    import PlayScore from '@/components/match/game/module/playScore.vue'  // 当前比分
    import PlayAnaly from '@/components/match/game/module/playAnaly.vue'  // 对战分析
    import PlayBattle from '@/components/match/game/lol/playBattle.vue'   // 阵容分析
    import PlayTeams from '@/components/match/game/lol/playTeams.vue'     // 队伍对局详情

    import { defineComponent, ref, provide, inject, watch } from 'vue'

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
            PlayGame,
            PlayInfo,
            PlayScore,
            PlayAnaly,
            PlayBattle,
            PlayTeams
        }
    })
</script>

<style lang="less" scoped>

</style>
