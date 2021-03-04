<template>
    <div class="play-battle">
        <TitleView :titleName="battleName" />
        <div class="select flex flex_only_center">
            <p>查询时间范围</p>
            <SelectView :selectList="selectList" :size="'small'" />
        </div>
        <div class="rate flex flex_between flex_only_center">
            <div v-for="(item,index) in rateList" 
                :key="item.title"
                :class="{active: index === currentIndex}"
                @click="currentIndex = index">
                {{item.title}}
            </div>
        </div>
        <div class="vs">
            <div class="title flex flex_center">
                <div class="flex flex_only_center">
                    <p class="blue"></p>
                    <p>蓝色方</p>
                </div>
                <div class="flex flex_only_center">
                    <p class="red"></p>
                    <p>红色方</p>
                </div>
                <div class="flex flex_only_center">
                    <p class="all"></p>
                    <p>全部阵容</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, ref } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            let currentIndex = ref(0)
            const titleName = reactive({
                battleName: '阵容分析',
                selectList: [
                    {
                        placeholder: '15日'
                    }
                ],
                rateList: [
                    {
                        title: '选取'
                    },
                    {
                        title: '胜率'
                    },
                    {
                        title: '一血率'
                    },
                    {
                        title: '五杀率'
                    },
                    {
                        title: '十杀率'
                    },
                    {
                        title: '一血塔率'
                    },
                    {
                        title: '首小龙率'
                    },
                    {
                        title: '首峡谷先锋率'
                    },
                    {
                        title: '峡谷先锋控制率'
                    },
                    {
                        title: '元素巨龙控制率'
                    }
                ]
            })
            return {
                currentIndex,
                ...toRefs(titleName)
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')),   // 页面标题
            SelectView: defineAsyncComponent(() => import('@/components/common/select/select')) // 下拉框
        }
    })
</script>

<style lang="less" scoped>
    .play-battle {
        .select {
            p {
                color: #666;
                font-weight: 600;
                padding-right: 7px;
            }
        }
        .rate {
            margin: 30px 0 20px;
            div {
                width: 115px;
                height: 25px;
                color: #B29873;
                cursor: pointer;
                line-height: 25px;
                text-align: center;
                border-radius: 2px;
                border: 1px solid #B29873;
                &.active {
                    color: #fff;
                    background-color: #B29873;
                }
            }
        }
        .vs {
            .title {
                color: #666;
                font-size: 16px;
                .flex {
                    margin-right: 34px;
                    &:last-child {
                        margin-right: 0;
                    }
                    .blue {
                        width: 32px;
                        height: 10px;
                        margin-right: 3px;
                        background-color: #457CF4;
                    }
                    .red {
                        width: 32px;
                        height: 10px;
                        margin-right: 3px;
                        background-color: #FF4645;
                    }
                    .all {
                        width: 32px;
                        height: 10px;
                        margin-right: 3px;
                        background-color: #B29873;
                    }
                }
            }
        }
    }
</style>
