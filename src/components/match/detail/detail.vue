<template>
    <div class="detail">
        <div class="page-content">
            <Breadcrumb />
            <MatchDetail />
            <TitleLine :titleName="titleName.teamName" v-if="teams.length>0"/>
            <PlayerEvent :isText="false" />
            <!-- <TitleLine :titleName="titleName.matchName" /> -->
            <!-- <div class="tab flex flex_center">
                <p class="active">预选赛</p>
                <p>淘汰赛</p>
            </div> -->
            <!-- <AllEvent :className="'mean'" /> -->
            <!-- <OutDetail /> -->
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { tournamentDetail } from "@/scripts/request"

    export default defineComponent({
        name: 'matchDetail',
        setup(props,ctx) {

            const route = useRoute()

            const detailData= reactive({
                titleName :{
                    teamName: '参赛队伍',
                    matchName: '焦点赛事'
                },
                tournamentDetail: {},
                teams: []
            })

            const getTournamentDetail = (tournamentId) => {
                let params = {
                    tournament_id: parseInt(tournamentId),
                }
                tournamentDetail(params).then(res => {
                    if(res.code === 200) {
                        detailData.tournamentDetail = res.data
                        detailData.teams = res.data.teams
                    }
                })
            }

            onMounted(() => {
                getTournamentDetail(route.query.tournamentId)
            })

            onBeforeRouteUpdate((to) => {
                getTournamentDetail(to.query.tournamentId)
            })

            provide('detail',detailData)

            return {
                ...toRefs(detailData),
                getTournamentDetail
            }
        },
        components: {
            Breadcrumb: defineAsyncComponent(() => import('@/components/common/breadcrumb/breadcrumb')),   // 面包屑导航
            MatchDetail: defineAsyncComponent(() => import('@/components/match/detail/matchDetail')),      // 比赛详情
            TitleLine: defineAsyncComponent(() => import('@/components/common/title/titleLine')),          // 页面标题
            PlayerEvent: defineAsyncComponent(() => import('@/components/home/events/datas/playerEvent')), // 选手数据
            AllEvent: defineAsyncComponent(() => import('@/components/home/events/all/tableEvent')),       // 近期赛事
            OutDetail: defineAsyncComponent(() => import('@/components/match/detail/outDetail'))           // 淘汰赛
        }
    })
</script>

<style lang="less" scoped>
    .detail {
        .tab {
            font-size: 18px;
            font-weight: 600;
            line-height: 28px;
            p {
                cursor: pointer;
                padding: 0 105px 15px;
                &.active {
                    color: #B29873;
                }
            }
        }
    }
</style>
