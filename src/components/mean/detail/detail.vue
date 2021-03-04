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

    
    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"
    import { teamDetail } from "@/scripts/request"

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
            
            onMounted(() => {
                getTeamDetail(route.query.teamId)
            })

            onBeforeRouteUpdate((to) => {
                getTeamDetail(to.query.teamId)
            })

            provide('detail',detailData)

            return {
                ...toRefs(detailData),
                getTeamDetail
            }
        },
        components: {
            Breadcrumb: defineAsyncComponent(() => import('@/components/common/breadcrumb/breadcrumb')), // 面包屑导航
            TeamDetail: defineAsyncComponent(() => import('@/components/mean/detail/teamDetail')),       // 战队详情
            TitleLine: defineAsyncComponent(() => import('@/components/common/title/titleLine')),        // 页面标题
            PlayerDetail: defineAsyncComponent(() => import('@/components/mean/detail/playerDetail')),   // 现役成员
            TeamEvent: defineAsyncComponent(() => import('@/components/home/events/datas/tableEvent')),  // 战队数据
            AllEvent: defineAsyncComponent(() => import('@/components/home/events/all/tableEvent'))      // 近期赛事
        }
    })
</script>

<style lang="less" scoped>
    .detail {

    }
</style>
