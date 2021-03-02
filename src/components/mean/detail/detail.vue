<template>
    <div class="detail">
        <Breadcrumb />
        <TeamDetail />
        <div class="page-content">
            <TitleLine :titleName="titleName.playerName" v-if="players.length>0"/>
            <PlayerDetail />
            <!-- <TitleLine :titleName="titleName.teamName" />
            <TeamEvent :className="'mean'" />
            <TitleLine :titleName="titleName.matchName" />
            <AllEvent :className="'mean'" /> -->
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb/breadcrumb.vue'    // 面包屑导航
    import TeamDetail from '@/components/mean/detail/teamDetail.vue'          // 战队详情
    import TitleLine from '@/components/common/title/titleLine.vue'               // 页面标题
    import PlayerDetail from '@/components/mean/detail/playerDetail.vue'      // 现役成员
    import TeamEvent from '@/components/home/events/datas/tableEvent.vue'     // 战队数据
    import AllEvent from '@/components/home/events/all/tableEvent.vue'        // 近期赛事

    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { teamDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted, watch } from 'vue'

    export default defineComponent({
        name:'meanDetail',
        setup(props,ctx) {
            const route = useRoute()
            const detailData= reactive({
                titleName :{
                    playerName: '现役成员',
                    teamName: '战队数据',
                    matchName: '近期赛事'
                },
                teamsDetail: {},
                players: []
            })
            const getTeamDetail = (teamId) => {
                let params = {
                    team_id: parseInt(teamId),
                }
                teamDetail(params).then(res => {
                    if(res.code === 200) {
                        detailData.teamsDetail = res.data
                        detailData.players = res.data.players
                    }
                })
            }
            provide('detail',detailData)
            onMounted(() => {
                getTeamDetail(route.query.teamId)
            })

            onBeforeRouteUpdate((to) => {
                getTeamDetail(to.query.teamId)
            })

            return {
                ...toRefs(detailData),
                getTeamDetail
            }
        },
        components: {
            Breadcrumb,
            TeamDetail,
            TitleLine,
            PlayerDetail,
            TeamEvent,
            AllEvent
        }
    })
</script>

<style lang="less" scoped>
    .detail {

    }
</style>
