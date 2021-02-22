<template>
    <div class="detail">
        <div class="page-content">
            <Breadcrumb :breadLink="breadLink" />
            <MatchDetail />
            <TitleLine :titleName="titleName.teamName" v-if="teams.length>0"/>
            <PlayerEvent :isText="false" />
            <!-- <TitleLine :titleName="titleName.matchName" />
            <div class="tab flex flex_center">
                <p class="active">预选赛</p>
                <p>淘汰赛</p>
            </div>
            <AllEvent :className="'mean'" />
            <OutDetail /> -->
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import MatchDetail from '@/components/match/detail/matchDetail.vue'       // 比赛详情
    import TitleLine from '@/components/common/title/titleLine.vue'           // 页面标题
    import PlayerEvent from '@/components/home/events/datas/playerEvent.vue'  // 选手数据
    import AllEvent from '@/components/home/events/all/tableEvent.vue'        // 近期赛事
    import OutDetail from '@/components/match/detail/outDetail.vue'           // 淘汰赛

    import { tournamentDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute } from "vue-router"

    export default defineComponent({
        name: 'matchDetail',
        setup(props,ctx) {
            const route = useRoute()
            const detailData= reactive({
                titleName :{
                    teamName: '参赛队伍',
                    matchName: '焦点赛事'
                },
                breadLink: [
                    {
                        title: '首页',
                        link: '/home'
                    },
                    {
                        title: '电竞比赛',
                        link: '/match'
                    },
                    {
                        title: '赛事详情',
                        link: `/match/detail?tournamentId=${route.query.tournamentId}`
                    }
                ],
                tournamentDetail: {},
                teams: []
            })
            const getTournamentDetail = () => {
                let params = {
                    tournament_id: route.query.tournamentId,
                }
                tournamentDetail(params).then(res => {
                    if(res.code === 200) {
                        detailData.tournamentDetail = res.data
                        detailData.teams = res.data.teams
                    }
                })
            }
            provide('detail',detailData)
            onMounted(() => {
                getTournamentDetail()
            })
            return {
                ...toRefs(detailData),
                getTournamentDetail
            }
        },
        components: {
            Breadcrumb,
            MatchDetail,
            TitleLine,
            PlayerEvent,
            AllEvent,
            OutDetail
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
