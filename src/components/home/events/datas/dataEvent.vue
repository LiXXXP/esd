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

    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, ref } from 'vue'

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
            provide('detail',ref({}))
            return {
                ...toRefs(selectData)
            }
        },
        components: {
            SelectView: defineAsyncComponent(() => import('@/components/common/select/select')),           // 下拉框
            TabLine: defineAsyncComponent(() => import('@/components/common/tab/tabLine')),                // 切换页
            PlayerEvent: defineAsyncComponent(() => import('@/components/home/events/datas/playerEvent')), // 选手数据
            TableEvent: defineAsyncComponent(() => import('@/components/home/events/datas/tableEvent'))    // 数据统计
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
