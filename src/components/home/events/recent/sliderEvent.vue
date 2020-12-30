<template>
    <div class="slider flex flex_between flex_only_center">
        <div class="arrow flex flex_center">
            <p class="left"></p>
        </div>
        <div class="content flex flex_start">
            <div class="block" v-for="item in 4" :key="item">
                <div class="title flex flex_between">
                    <p>已结束</p>
                    <p>10-15 17:00</p>
                </div>
                <div class="info">
                    <div class="flex flex_between flex_only_center">
                        <div class="team">
                            <img src="">
                            <p class="beyond-ellipsis">WE</p>
                        </div>
                        <div class="vs">
                            <p class="score">3 : 2</p>
                            <p class="status">敬请期待</p>
                        </div>
                        <div class="team">
                            <img src="">
                            <p class="beyond-ellipsis">TES</p>
                        </div>
                    </div>
                    <p>2020发展联赛夏季赛季后赛</p>
                    <p>四强 BO5</p>
                </div>
            </div>
        </div>
        <div class="arrow flex flex_center">
            <p class="right"></p>
        </div>
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'    // 下拉框

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            
            return {
                
            }
        },
        components: {
            SelectView
        }
    })
</script>

<style lang="less" scoped>
    .slider {
        padding: 20px 0;
        .arrow {
            width: 37px;
            height: 75px;
            cursor: pointer;
            border-radius: 2px;
            background-color: #989898;
            .left {
                width: 10px;
                height: 10px;
                border-top: 2px solid #F1F1F1;
                border-left: 2px solid #F1F1F1;
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
            }
            .right {
                width: 10px;
                height: 10px;
                border-top: 2px solid #F1F1F1;
                border-left: 2px solid #F1F1F1;
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
            }
        }
        .content {
            width: 1060px;
            overflow: hidden;
            .block {
                width: 247px;
                height: 180px;
                margin-right: 24px;
                border-radius: 2px;
                background: linear-gradient(180deg, #353535 1%, #585858 100%);
                &:nth-child(4n) {
                    margin-right: 0;
                }
                .title {
                    width: 100%;
                    height: 30px;
                    color: #fff;
                    padding: 0 10px;
                    font-weight: 500;
                    line-height: 30px;
                    box-sizing: border-box;
                    background-color: #999;
                    border-radius: 2px 2px 0px 0px;
                }
                .info {
                    padding: 20px;
                    box-sizing: border-box;
                    .flex {
                        margin-bottom: 15px;
                        .team {
                            img {
                                width: 35px;
                                height: 35px;
                            }
                            p {
                                width: 35px;
                                color: #fff;
                                font-weight: 600;
                                margin-top: 10px;
                                text-align: center;
                            }
                        }
                        .vs {
                            .score {
                                color: #fff;
                                font-size: 30px;
                                font-weight: 600;
                            }
                            .status {
                                width: 85px;
                                height: 21px;
                                margin-top: 10px;
                                color: #B29873;
                                line-height: 21px;
                                text-align: center;
                                border-radius: 2px;
                                border: 1px solid #B29873;
                            }
                        }
                    }
                    p {
                        font-size: 12px;
                        color: #E9E9E9;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
