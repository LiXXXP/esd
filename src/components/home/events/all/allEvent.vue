<template>
    <div class="all">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>赛事筛选</p>
            </div>
            <SelectView :selectList="selectList" :size="'small'" class="selectBox" />
        </div>
        <TabLine :navList="navList" />
        <TableEvent />
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'         // 下拉框
    import TabLine from '@/components/common/tab/tabLine.vue'              // 切换页
    import TableEvent from '@/components/home/events/all/tableEvent.vue'   // 赛事列表

    import { defineComponent, reactive, toRefs } from 'vue'

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
                ]
            })
            return {
                ...toRefs(selectData)
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
