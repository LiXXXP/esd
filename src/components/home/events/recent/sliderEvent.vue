<template>
    <div class="slider flex flex_between flex_only_center">
        <div class="arrow flex flex_center" @click="cut('prev')">
            <p class="left"></p>
        </div>
        <div class="content clearfix">
            <div class="block f-left" v-for="item in shortList" :key="item.match_id">
                <div class="title flex flex_between">
                    <p>{{item.status}}</p>
                    <p>{{item.scheduled_begin_at.substring(5,16)}}</p>
                </div>
                <div class="info">
                    <div class="flex flex_between flex_only_center">
                        <div class="team">
                            <img :src="item.master_team_logo">
                            <p class="beyond-ellipsis" :title="item.master_team_name">{{item.master_team_name}}</p>
                        </div>
                        <div class="vs">
                            <p class="score">{{item.master_team_score}} : {{item.guest_team_score}}</p>
                            <p class="status">{{item.match_feedback}}</p>
                        </div>
                        <div class="team">
                            <img :src="item.guest_team_logo">
                            <p class="beyond-ellipsis" :title="item.guest_team_name">{{item.guest_team_name}}</p>
                        </div>
                    </div>
                    <p>{{item.tournament_name}}</p>
                    <p>{{item.match_config}}</p>
                </div>
            </div>
        </div>
        <div class="arrow flex flex_center" @click="cut('next')">
            <p class="right"></p>
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            shortList: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {
            const cut = (val) => {
                ctx.emit('cutData',val)
            }
            return {
                cut
            }
        },
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
                    padding: 10px 20px;
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
