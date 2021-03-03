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
        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { useRoute, } from "vue-router"
    import { lolGoldDiff } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const diffData = reactive({
                name: '经济差/经验差',
                battleId: 0,
            })
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                diffData.battleId = battleid
                getLolGoldDiff(diffData.battleId)
            })

            const echarts = inject('echarts')
            console.log(echarts)

            const getLolGoldDiff = (battleId) => {
                let params = {
                    battle_id: battleId
                }
                lolGoldDiff(params).then( res => {
                    if(res.code === 200) {
                        
                    }
                })
            }

            return {
                ...toRefs(diffData),
                getLolGoldDiff
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-diff {
        .chart {
            width: 890px;
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
        }
    }
</style>