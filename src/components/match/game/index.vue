<template>
    <div class="game page-content">
        <Breadcrumb />
        <!-- gameId：1 为 csgo， 2 为 lol，3 为 dota -->
        <CSGOGame v-if="gameId === 1"></CSGOGame>
        <LOLGame v-else-if="gameId === 2"></LOLGame>
        <DotaGame v-else-if="gameId === 3"></DotaGame>
        <div v-else style="text-align:center;">暂无游戏内容</div>
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
                battleInfo: [],
                gameId: parseInt(route.query.gameId),
                timer: null
            })

            const getMatchDetail = (matchId) => {
                let params = {
                    match_id: parseInt(matchId),
                }
                matchDetail(params).then(res => {
                    if(res.code === 200) {
                        gameData.gameDetail = res.data
                        gameData.battleInfo = res.data.battle_info
                        if(res.data.status !== '比赛进行中' || res.data.length === 0) {
                            clearInterval(gameData.timer)
                        }
                    } else {
                        clearInterval(gameData.timer)
                    }
                })
            }
            
            onMounted(() => {
                getMatchDetail(route.query.matchId)
                gameData.timer = setInterval( () => {
                    getMatchDetail(route.query.matchId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(gameData.timer)
            })

            onBeforeRouteUpdate((to) => {
                gameData.gameId = parseInt(to.query.gameId)
                getMatchDetail(to.query.matchId)
                gameData.timer = setInterval( () => {
                    getMatchDetail(to.query.matchId)
                }, 5000)
            })

            provide('detail',gameData)
            provide('echarts',echarts)

            return {
                ...toRefs(gameData),
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
