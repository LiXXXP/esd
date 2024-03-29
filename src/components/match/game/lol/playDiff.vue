<template>
    <div class="play-diff">
        <TitleView :titleName="name" />
        <div class="chart">
            <div class="title flex flex_between">
                <div class="left flex flex_only_center">
                    <p class="blue">蓝色方</p>
                    <p class="red">红色方</p>
                </div>
                <div class="right flex flex_only_center">
                    <p>
                        <span class="gold"></span>
                        <span>经济差</span>
                    </p>
                    <p>
                        <span class="experience"></span>
                        <span>经验差</span>
                    </p>
                </div>
            </div>
            <div ref="echartRef" class="cont"></div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, ref, reactive, toRefs, inject, watch, onMounted } from 'vue'
    import { lolGoldDiff } from "@/scripts/request"
    import { formatSeconds } from '@/scripts/utils'

    export default defineComponent({
        setup(props,ctx) {
            const diffData = reactive({
                name: '经济差/经验差',
                battleId: 0,
            })
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                if(battleid.value > 0) {
                    diffData.battleId = battleid
                    getLolGoldDiff(diffData.battleId)
                }
            })

            const getLolGoldDiff = (battleId) => {
                let params = {
                    battle_id: battleId
                }
                lolGoldDiff(params).then( res => {
                    if(res.code === 200) {
                        let goldArr = [], experienceArr = [], dateArr = []
                        for(let item of res.data.gold_diff_timeline) {
                            goldArr.push(item.gold_diff)
                            dateArr.push(formatSeconds(item.ingame_timestamp))
                        }
                        for(let item of res.data.experience_diff_timeline) {
                            experienceArr.push(item.experience_diff)
                        }
                        let myChart = echarts.init(echartRef.value)
                        // 绘制图表
                        myChart.setOption({
                            tooltip: {},
                            xAxis: {
                                data: dateArr,
                            },
                            yAxis: {
                                axisLine: {
                                    show: true
                                }
                            },
                            series: [
                                {
                                    name: "经济差",
                                    type: "line",
                                    data: goldArr
                                },
                                {
                                    name: "经验差",
                                    type: "line",
                                    data: experienceArr
                                }
                            ],
                            color: [ '#B29873', '#521DBD' ],
                        })
                    }
                })
            }

            const echartRef = ref(null)
            const echarts = inject('echarts')

            onMounted(() => {
                //自适应大小
                window.onresize = function () {
                    myChart.resize()
                }
            })

            return {
                ...toRefs(diffData),
                getLolGoldDiff,
                echartRef
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')) // 页面标题
        }
    })
</script>

<style lang="less" scoped>
    .play-diff {
        width: 890px;
        .chart {
            width: 100%;
            height: 400px;
            padding: 30px 60px;
            border-radius: 2px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            .title {
                .left {
                    p {
                        width: 70px;
                        height: 22px;
                        color: #fff;
                        line-height: 22px;
                        text-align: center;
                        border-radius: 11px;
                        &.blue {
                            margin-right: 5px;
                            background-color: #457CF4;
                        }
                        &.red {
                            background-color: #FF4645;
                        }
                    }
                }
                .right {
                    color: #666;
                    .gold {
                        width: 50px;
                        height: 2px;
                        margin-right: 8px;
                        display: inline-block;
                        vertical-align: middle;
                        background-color: #B29873;
                    }
                    .experience {
                        width: 50px;
                        height: 2px;
                        margin-left: 20px;
                        margin-right: 8px;
                        display: inline-block;
                        vertical-align: middle;
                        background-color: #521DBD;
                    }
                }
            }
            .cont {
                height: 350px;
                margin-top: 20px;
            }
        }
    }
</style>