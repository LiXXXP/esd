<template>
    <div class="game page-content">
        <Breadcrumb :breadLink="breadLink" />
        <LOLGame></LOLGame>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import LOLGame from '@/components/match/game/lol/lolGame.vue'             // lol 比赛详情

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
                gameDetail: {}
            })
            const getMatchDetail = () => {
                let params = {
                    match_id: route.query.matchId,
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
            LOLGame
        }
    })
</script>

<style lang="less" scoped>

</style>
