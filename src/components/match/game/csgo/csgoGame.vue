<template>
    <div class="csgo-game">
        <PlayGame />
        <PlayInfo />
        <play-score>
            <template v-slot:csgo_ct v-if="list.length>0">
                <div :class="['bar',{win: masterTeamId === item.winner_team_id}]"
                    v-for="item in list" :key="item.battle_id"
                ></div>
            </template>
            <template v-slot:csgo_t v-if="list.length>0">
                <div :class="['bar',{win: guestTeamId === item.winner_team_id}]"
                    v-for="item in list" :key="item.battle_id"
                ></div>
            </template>
        </play-score>
        <PlayMap />
        <PlayAnaly @getBattleId="getBattleId" />
        <PlayKill />
        <PlayerData />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const battleId = ref(0)
            const battle = reactive({
                list: []
            })
            const masterTeamId = ref(0)
            const guestTeamId = ref(0)
            const gameData = inject('detail')
            watch(gameData, () => {
                if(gameData.battleInfo.length > 0) {
                    battle.list = gameData.battleInfo
                    battleId.value = gameData.battleInfo[0].battle_id
                    masterTeamId.value = gameData.gameDetail.teams_info.master_team_info.team_id
                    guestTeamId.value = gameData.gameDetail.teams_info.guest_team_info.team_id
                }
            })
            const getBattleId = (val) => {
                battleId.value = val
            }
            provide('battleid',battleId)
            return {
                battleId,
                ...toRefs(battle),
                gameData,
                getBattleId,
                masterTeamId,
                guestTeamId
            }
        },
        components: {
            PlayGame: defineAsyncComponent(() => import('@/components/match/game/module/playGame')),   // 对局
            PlayInfo: defineAsyncComponent(() => import('@/components/match/game/module/playInfo')),   // 比赛信息
            PlayScore: defineAsyncComponent(() => import('@/components/match/game/module/playScore')), // 当前比分
            PlayAnaly: defineAsyncComponent(() => import('@/components/match/game/module/playAnaly')), // 对战分析
            PlayMap: defineAsyncComponent(() => import('@/components/match/game/csgo/playMap')),       // 地图信息
            PlayKill: defineAsyncComponent(() => import('@/components/match/game/csgo/playKill')),     // 对局详情
            PlayerData: defineAsyncComponent(() => import('@/components/match/game/csgo/playerData'))  // 选手数据
        }
    })
</script>

<style lang="less" scoped>
    .csgo-game {
        .bar {
            width: 3px;
            height: 22px;
            margin: 0 2.5px;
            border-radius: 1px;
            background-color: #999;
            &.win {
                background-color: #333;
            }
        }
    }
</style>
