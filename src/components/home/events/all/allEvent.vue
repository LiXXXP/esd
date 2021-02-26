<template>
    <div class="all">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>赛事筛选</p>
            </div>
            <!-- <SelectView 
                :size="'small'" 
                class="selectBox" 
                @getSelectIndex="getSelectIndex"
            /> -->
        </div>
        <TabLine :navList="navList" @status="getStatus" />
        <TableEvent :className="'home'" :screenList="screenList" />
        <Pagination :pageData="page" @currentPage="currentPage" />
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'         // 下拉框
    import TabLine from '@/components/common/tab/tabLine.vue'              // 切换页
    import TableEvent from '@/components/home/events/all/tableEvent.vue'   // 赛事列表
    import Pagination from '@/components/common/pagination/pagination.vue' // 分页

    import { matchScreen, gameList, tournamentList, teamList } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue'

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
                        tab: '进行中'
                    },
                    {
                        tab: '未开始'
                    },
                    {
                        tab: '已结束'
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

            // 游戏列表
            const getGameList = (() => {
                gameList().then(res => {
                    if(res.code === 200) {
                        selectData.selectList[0].list = res.data
                    }
                })
            })

            // 比赛列表
            const getMatchScreen = ((val) => {
                let params = {
                    match_status: val,
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
            // 状态切换
            const getStatus = (val) => {
                if(val === 0) {
                    selectData.val = 'ongoing'
                }
                if(val === 1) {
                    selectData.val = 'upcoming'
                }
                if(val === 2) {
                    selectData.val = 'completed'
                }
                getMatchScreen(selectData.val)
            }
            // 分页
            const currentPage = (val) => {
                selectData.page.current = val
                getMatchScreen(selectData.val)
            }
            // 生命周期
            onMounted(() => {
                getMatchScreen(selectData.val)
            })

            // 筛选 游戏 赛事 战队
            const getSelectIndex = (val) => {
                if(val === 0) {
                    getGameList()
                }
            }

            provide('selectData', selectData)

            return {
                ...toRefs(selectData),
                getStatus,
                currentPage,
                getGameList,
                getSelectIndex
            }
        },
        components: {
            SelectView,
            TabLine,
            TableEvent,
            Pagination
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
    }
</style>
