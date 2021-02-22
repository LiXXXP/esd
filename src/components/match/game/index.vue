<template>
    <div class="game page-content">
        <Breadcrumb :breadLink="breadLink" />
        <!-- gameId：1 为 csgo， 2 为 lol -->
        <CSGOGame v-if="gameId === 1"></CSGOGame>
        <LOLGame v-if="gameId === 2"></LOLGame>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import LOLGame from '@/components/match/game/lol/lolGame.vue'             // lol 比赛详情
    import CSGOGame from '@/components/match/game/csgo/csgoGame.vue'          // csgo 比赛详情

    import { useRoute } from "vue-router"
    import { matchDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue'

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
            const getMatchDetail = () => {
                let params = {
                    match_id: parseInt(route.query.matchId),
                }
                matchDetail(params).then(res => {
                    if(res.code === 200) {
                        gameData.gameDetail = res.data
                    }
                })
            }
            provide('detail',gameData)
            onMounted(() => {
                getMatchDetail()
            })
            return {
                ...toRefs(gameData),
                getMatchDetail
            }
        },
        components: {
            Breadcrumb,
            LOLGame,
            CSGOGame
        }
    })
</script>

<style lang="less" scoped>

</style>
