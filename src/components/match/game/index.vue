<template>
    <div class="game page-content">
        <Breadcrumb :breadLink="breadLink" />
        <!-- gameId：1 为 csgo， 2 为 lol，3 为 dota -->
        <CSGOGame v-if="gameId === 1"></CSGOGame>
        <LOLGame v-if="gameId === 2"></LOLGame>
        <DotaGame v-if="gameId === 3"></DotaGame>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import CSGOGame from '@/components/match/game/csgo/csgoGame.vue'          // csgo 比赛详情
    import LOLGame from '@/components/match/game/lol/lolGame.vue'             // lol 比赛详情
    import DotaGame from '@/components/match/game/dota/dotaGame.vue'          // dota 比赛详情
    

    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { matchDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted, onUnmounted } from 'vue'

    export default defineComponent({
        name: 'game',
        setup(props,ctx) {
            const route = useRoute()
            const gameData = reactive({
                breadLink: [
                    {
                        title: '首页',
                        link: '/home'
                    },
                    {
                        title: '比赛详情',
                        link: `/match/game?gameId=${route.query.gameId}&matchId=${route.query.matchId}`
                    }
                ],
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
            provide('detail',gameData)
            
            onMounted(() => {
                getMatchDetail(route.query.matchId)
                timerData.timer = setInterval( () => {
                    let params = {
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
            provide('battle',timerData)

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

            return {
                ...toRefs(gameData,timerData),
                getMatchDetail
            }
        },
        components: {
            Breadcrumb,
            LOLGame,
            CSGOGame,
            DotaGame
        }
    })
</script>

<style lang="less" scoped>

</style>
