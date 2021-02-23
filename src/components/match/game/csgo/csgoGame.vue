<template>
    <div class="csgo-game">
        <PlayGame />
        <play-score>
            <template v-slot:csgo_ct>
                <div class="bar"></div>
            </template>
            <template v-slot:csgo_t>
                <div class="bar"></div>
            </template>
        </play-score>
        <PlayMap />
        <PlayAnaly @getBattleId="getBattleId" />
        <PlayKill />
    </div>
</template>

<script>
    import PlayGame from '@/components/match/game/module/playGame.vue'    // 对局
    import PlayScore from '@/components/match/game/module/playScore.vue'  // 当前比分
    import PlayAnaly from '@/components/match/game/module/playAnaly.vue'  // 对战分析
    import PlayMap from '@/components/match/game/csgo/playMap.vue'        // 地图信息
    import PlayKill from '@/components/match/game/csgo/playKill.vue'      // 对局详情

    import { defineComponent, reactive, toRefs, ref, provide, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const battleId = ref(0)
            const battle = reactive({
                list: []
            })
            const gameData = inject('detail')
            watch(gameData, () => {
                if(gameData.gameDetail.battle_info.length > 0) {
                    // battle.list = gameData.gameDetail.battle_info
                    battleId.value = gameData.gameDetail.battle_info[0].battle_id
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
                getBattleId
            }
        },
        components: {
            PlayGame,
            PlayScore,
            PlayMap,
            PlayAnaly,
            PlayKill
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
        }
    }
</style>
