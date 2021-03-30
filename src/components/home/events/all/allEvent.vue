<template>
    <div class="all">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>赛事筛选</p>
            </div>
            <SelectView 
                :size="'small'" 
                class="selectBox" 
                @getSelectIndex="getSelectIndex"
                @getSelectIds="getSelectIds"
                @getSelectAll="getSelectAll"
            />
        </div>
        <TabLine :navList="navList" @status="getStatus" />
        <TableEvent :className="'home'" :screenList="screenList" />
        <Pagination :pageData="page" @currentPage="currentPage" v-if="screenList.length>0" />
        <div v-else class="none">暂无数据</div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, reactive, toRefs, provide, onMounted } from 'vue'
    import { matchScreen, gameList, tournamentList, teamList } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const selectData = reactive({
                selectList: [
                    {
                        placeholder: '游戏',
                        selectValue: '',
                        list: []
                    },
                    {
                        placeholder: '赛事',
                        selectValue: '',
                        list: []
                    },
                    {
                        placeholder: '战队',
                        selectValue: '',
                        list: []
                    }
                ],
                navList: [
                    {
                        tab: '进行中',
                        status: 'ongoing'
                    },
                    {
                        tab: '未开始',
                        status: 'upcoming'
                    },
                    {
                        tab: '已结束',
                        status: 'completed'
                    }
                ],
                page: {
                    limit: 5,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
                screenList: [],
                val: 'ongoing'
            })

            // 筛选 游戏 赛事 战队
            let selectGameId = ref()
            let selectTournamentId = ref()
            let selectTeamId = ref()

            // 游戏列表
            const getGameList = (() => {
                gameList().then(res => {
                    if(res.code === 200) {
                        selectData.selectList[0].list = res.data
                    }
                })
            })

            // 赛事列表
            const getTournamentList = (() => {
                let params = {
                    game_id: selectGameId.value,
                    limit: 15
                }
                tournamentList(params).then(res => {
                    if(res.code === 200) {
                        selectData.selectList[1].list = res.data.tournament_list
                    }
                })
            })

            // 战队列表
            const getTeamList = (() => {
                let params = {
                    game_id: selectGameId.value,
                    tournament_id: selectTournamentId.value,
                    limit: 15
                }
                teamList(params).then(res => {
                    if(res.code === 200) {
                        selectData.selectList[2].list = res.data.team_list
                    }
                })
            })

            const getSelectIndex = (val) => {
                if(val === 0) {
                    getGameList()
                }
                if(val === 1) {
                    getTournamentList()
                }
                if(val === 2) {
                    getTeamList()
                }
            }

            const getSelectIds = (gameId,tournamentId,teamId,index,val) => {
                if(index === 0) {
                    selectGameId.value = gameId
                    selectTournamentId.value = undefined
                    selectTeamId.value = undefined
                    selectData.selectList[1].selectValue = selectData.selectList[1].placeholder
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 1) {
                    selectTournamentId.value = tournamentId
                    selectTeamId.value = undefined
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 2) {
                    selectTeamId.value = teamId
                }
                getMatchScreen()
            }

            const getSelectAll = (index) => {
                if(index === 0) {
                    selectGameId.value = undefined
                    selectTournamentId.value = undefined
                    selectTeamId.value = undefined
                    selectData.selectList[1].selectValue = selectData.selectList[1].placeholder
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 1) {
                    selectTournamentId.value = undefined
                    selectData.selectList[2].selectValue = selectData.selectList[2].placeholder
                }
                if(index === 2) {
                    selectTeamId.value = undefined
                }
                getMatchScreen()
            }

            // 比赛列表
            const getMatchScreen = (() => {
                let params = {
                    match_status: selectData.val,
                    game_id: selectGameId.value,
                    tournament_id: selectTournamentId.value,
                    team_id: selectTeamId.value,
                    page: selectData.page.current,
                    limit: selectData.page.limit
                }
                matchScreen(params).then(res => {
                    if(res.code === 200) {
                        selectData.screenList = res.data.list
                        selectData.page.count = res.data.count
                    }
                })
            })

            // 分页
            const currentPage = (val) => {
                selectData.page.current = val
                getMatchScreen()
            }

            // 状态切换
            const getStatus = (val) => {
                selectData.val = selectData.navList[val].status
                getMatchScreen()
            }

            // 生命周期
            onMounted(() => {
                getMatchScreen()
            })

            provide('selectData', selectData)

            return {
                ...toRefs(selectData),
                getStatus,
                currentPage,
                getGameList,
                getTournamentList,
                getTeamList,
                selectGameId,
                selectTournamentId,
                getSelectIndex,
                getSelectIds,
                getSelectAll
            }
        },
        components: {
            SelectView: defineAsyncComponent(() => import('@/components/common/select/select')),         // 下拉框
            TabLine: defineAsyncComponent(() => import('@/components/common/tab/tabLine')),              // 切换页
            TableEvent: defineAsyncComponent(() => import('@/components/home/events/all/tableEvent')),   // 赛事列表
            Pagination: defineAsyncComponent(() => import('@/components/common/pagination/pagination')), // 分页
        }
    })
</script>

<style lang="less" scoped>
    .all {
        .title {
            color: #666;
            font-size: 16px;
            font-weight: 600;
            .rhombus {
                margin-right: 5px;
            }
        }
        .selectBox {
            margin-left: 20px;
        }
        .none {
            padding-top: 20px;
        }
    }
</style>