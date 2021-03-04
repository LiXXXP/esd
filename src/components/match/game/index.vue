<template>
    <div class="game page-content">
        <Breadcrumb />
        <!-- gameId：1 为 csgo， 2 为 lol，3 为 dota -->
        <CSGOGame v-if="gameId === 1"></CSGOGame>
        <LOLGame v-if="gameId === 2"></LOLGame>
        <DotaGame v-if="gameId === 3"></DotaGame>
    </div>
</template>

<script>

    import CSGOGame from '@/components/match/game/csgo/csgoGame' // csgo 比赛详情 1
    import LOLGame from '@/components/match/game/lol/lolGame'    // lol  比赛详情 2
    import DotaGame from '@/components/match/game/dota/dotaGame' // dota 比赛详情 3
    
    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted, onUnmounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { matchDetail } from "@/scripts/request"
    import * as echarts from 'echarts'

    export default defineComponent({
        name: 'game',
        setup(props,ctx) {

            const route = useRoute()

            const gameData = reactive({
                gameDetail: {},
                gameId: parseInt(route.query.gameId)
            })

            const timerData = reactive({
                timer: null,
                battleInfo: []
            })

            const getMatchDetail = (matchId) => {
                let params = {
                    match_id: parseInt(matchId),
                }
                matchDetail(params).then(res => {
                    if(res.code === 200) {
                        gameData.gameDetail = res.data
                    }
                })
            }
            
            onMounted(() => {
                getMatchDetail(route.query.matchId)
                timerData.timer = setInterval( () => {
                    let params = {
                        game_id: parseInt(route.query.gameId),
                        match_id: parseInt(route.query.matchId),
                    }
                    matchDetail(params).then(res => {
                        if(res.code === 200) {
                            timerData.battleInfo = res.data.battle_info
                            if(res.data.status !== '比赛进行中' || res.data.length === 0) {
                                clearInterval(timerData.timer)
                            }
                        } else {
                            clearInterval(timerData.timer)
                        }
                    })
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(timerData.timer)
            })

            onBeforeRouteUpdate((to) => {
                gameData.gameId = parseInt(to.query.gameId)
                getMatchDetail(to.query.matchId)
                timerData.timer = setInterval( () => {
                    let params = {
                        match_id: parseInt(to.query.matchId),
                    }
                    matchDetail(params).then(res => {
                        if(res.code === 200) {
                            timerData.battleInfo = res.data.battle_info
                            if(res.data.status !== '比赛进行中' || res.data.length === 0) {
                                clearInterval(timerData.timer)
                            }
                        } else {
                            clearInterval(timerData.timer)
                        }
                    })
                }, 5000)
            })

            provide('detail',gameData)
            provide('battle',timerData)
            provide('echarts',echarts)

            return {
                ...toRefs(gameData,timerData),
                getMatchDetail
            }
        },
        components: {
            Breadcrumb: defineAsyncComponent(() => import('@/components/common/breadcrumb/breadcrumb')), // 面包屑导航
            CSGOGame,
            LOLGame,
            DotaGame
        }
    })
</script>

<style lang="less" scoped>

</style>
