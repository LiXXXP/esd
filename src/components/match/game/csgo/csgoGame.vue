<template>
    <div class="csgo-game">
        <PlayGame />
        <PlayInfo v-if="statusRef === '比赛进行中'" />
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
        <PlayTable />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/module/playGame.vue'    // 对局
    import PlayInfo from '@/components/match/game/module/playInfo.vue'    // 比赛信息
    import PlayScore from '@/components/match/game/module/playScore.vue'  // 当前比分
    import PlayAnaly from '@/components/match/game/module/playAnaly.vue'  // 对战分析
    import PlayMap from '@/components/match/game/csgo/playMap.vue'        // 地图信息
    import PlayKill from '@/components/match/game/csgo/playKill.vue'      // 对局详情
    import PlayerData from '@/components/match/game/csgo/playerData.vue'  // 选手数据
    import PlayTable from '@/components/match/game/csgo/playTable.vue'    // 数据统计

    import { defineComponent, reactive, toRefs, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const battleId = ref(0)
            const statusRef = ref('')
            const battle = reactive({
                list: []
            })
            const masterTeamId = ref(0)
            const guestTeamId = ref(0)
            const gameData = inject('detail')
            watch(gameData, () => {
                statusRef.value = gameData.gameDetail.status
                if(gameData.gameDetail.battle_info.length > 0) {
                    battle.list = gameData.gameDetail.battle_info
                    battleId.value = gameData.gameDetail.battle_info[0].battle_id
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
                statusRef,
                ...toRefs(battle),
                gameData,
                getBattleId,
                masterTeamId,
                guestTeamId
            }
        },
        components: {
            PlayGame,
            PlayInfo,
            PlayScore,
            PlayMap,
            PlayAnaly,
            PlayKill,
            PlayerData,
            PlayTable
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
