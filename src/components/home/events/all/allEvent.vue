<template>
    <div class="all">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>赛事筛选</p>
            </div>
            <!-- <SelectView :selectList="selectList" :size="'small'" class="selectBox" /> -->
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

    import { matchScreen } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, onMounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const selectData = reactive({
                selectList: [
                    {
                        placeholder: '游戏',
                    },
                    {
                        placeholder: '赛事'
                    },
                    {
                        placeholder: '战队'
                    }
                ],
                navList: [
                    {
                        tab: '已结束'
                    },
                    {
                        tab: '进行中'
                    },
                    {
                        tab: '未开始'
                    }
                ],
                page: {
                    limit: 5,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
                screenList: [],
                val: 'completed'
            })
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
            const getStatus = (val) => {
                if(val === 0) {
                    selectData.val = 'completed'
                }
                if(val === 1) {
                    selectData.val = 'ongoing'
                }
                if(val === 2) {
                    selectData.val = 'upcoming'
                }
                getMatchScreen(selectData.val)
            }
            const currentPage = (val) => {
                selectData.page.current = val
                getMatchScreen(selectData.val)
            }
            onMounted(() => {
                getMatchScreen(selectData.val)
            })
            return {
                ...toRefs(selectData),
                getStatus,
                currentPage
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
