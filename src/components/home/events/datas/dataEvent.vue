<template>
    <div class="data">
        <div class="flex flex_start flex_only_center">
            <div class="title flex flex_only_center">
                <p class="rhombus"></p>
                <p>数据分析</p>
            </div>
            <SelectView :selectList="selectList" :size="'small'" class="selectBox" />
        </div>
        <TabLine :navList="navList" />
        <PlayerEvent :isText="true" />
        <TableEvent :className="'home'" />
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'              // 下拉框
    import TabLine from '@/components/common/tab/tabLine.vue'                   // 切换页
    import PlayerEvent from '@/components/home/events/datas/playerEvent.vue'    // 选手数据
    import TableEvent from '@/components/home/events/datas/tableEvent.vue'      // 数据统计

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
                    }
                ],
                navList: [
                    {
                        tab: '战队数据'
                    },
                    {
                        tab: '选手数据'
                    },
                    {
                        tab: '英雄数据'
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
            PlayerEvent,
            TableEvent
        }
    })
</script>

<style lang="less" scoped>
    .data {
        margin-top: 60px;
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
