<template>
    <div class="all">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>赛事筛选</p>
            </div>
            <SelectView :selectList="selectList" :size="'small'" class="selectBox" />
        </div>
        <TabLine :navList="navList" @status="getStatus" />
        <TableEvent :className="'home'" :screenList="screenList" />
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'         // 下拉框
    import TabLine from '@/components/common/tab/tabLine.vue'              // 切换页
    import TableEvent from '@/components/home/events/all/tableEvent.vue'   // 赛事列表

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
                        placeholder: '场次'
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
                screenList: [],
            })
            const getMatchScreen = ((val) => {
                let params = {
                    match_status: val
                }
                matchScreen(params).then(res => {
                    if(res.code === 200) {
                        selectData.screenList = res.data
                    }
                })
            })
            const getStatus = (val) => {
                if(val === 0) {
                    getMatchScreen('completed')
                }
                if(val === 1) {
                    getMatchScreen('ongoing')
                }
                if(val === 2) {
                    getMatchScreen('upcoming')
                }
            }
            onMounted(() => {
                getMatchScreen('completed')
            })
            return {
                ...toRefs(selectData),
                getStatus
            }
        },
        components: {
            SelectView,
            TabLine,
            TableEvent
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
