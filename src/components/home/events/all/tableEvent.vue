<template>
    <div class="table-event">
        <div :class="className">
            <table>
                <thead>
                    <th>状态</th>
                    <th>赛事名称</th>
                    <th>比赛时间</th>
                    <th>对阵情况</th>
                    <th>相关</th>
                </thead>
                <tbody>
                    <tr v-for="item in screenList" :key="item.match_id">
                        <td :class="[{
                            green: item.match_status !== '已结束' && item.match_status !== '未开始'
                        }]">{{item.match_status}}</td>
                        <td style="width:300px;">{{item.tournament_name}}</td>
                        <td>
                            <p>{{item.scheduled_begin_at.substring(0,10)}}</p>
                            <p>{{item.scheduled_begin_at.substring(11,19)}}</p>
                        </td>
                        <td>
                            <div class="flex flex_center">

                                <div class="team flex flex_center" 
                                    @click="gotoMean(item.match_situation.master_team_id)">
                                    <img :src="item.match_situation.master_team_logo">
                                    <p>{{item.match_situation.master_team_name}}</p>
                                </div>

                                <div class="vs">
                                    {{item.match_situation.master_team_score}} : {{item.match_situation.guest_team_score}}
                                </div>

                                <div class="team flex flex_center" 
                                    @click="gotoMean(item.match_situation.guest_team_id)">
                                    <p>{{item.match_situation.guest_team_name}}</p>
                                    <img :src="item.match_situation.guest_team_logo">
                                </div>

                            </div>
                        </td>
                        <td>
                            <p :class="['detail',{disable: item.match_status === '未开始'}]" 
                                @click="gotoLink(item.game_id,item.match_id,item.match_status)"
                            >详情</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    
    import { useRouter } from "vue-router"
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            className: {
                type: String,
                default: ''
            },
            screenList: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {
            const router = useRouter()
            const gotoLink = (gameId,matchId,status) => {
                if(status !== '未开始') {
                    router.push({
                        path: '/match/game',
                        query: {
                            gameId: gameId,
                            matchId: matchId
                        }
                    })
                }
            }
            const gotoMean = (teamId) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: teamId
                    }
                })
            }
            return {
                gotoLink,
                gotoMean
            }
        }
    })
</script>

<style lang="less" scoped>
    @green: #01FE9B;
    .table-event {
        .green {
            color: @green;
        }
        table {
            width: 100%;
            text-align: center;
            thead {
                height: 50px;
                color: #333;
                font-size: 16px;
                font-weight: 500;
                line-height: 50px;
            }
            tbody {
                tr {
                    height: 95px;
                    border-radius: 0px 0px 2px 2px;
                    &:last-child {
                        border-bottom: 0;
                    }
                }
            }
        }
        .home {
            thead {
                background-color: #989898;
            }
            tbody {
                tr {
                    color: #fff;
                    background-color: #585858;
                    border-bottom: 1px solid #eceef1;
                }
            }
        }
        .mean {
            thead {
                background-color: #CACCCF;
            }
            tbody {
                tr {
                    color: #333;
                    background-color: #E3E5E8;
                    border-bottom: 1px solid #CACCCF;
                }
            }
        }
        .team {
            cursor: pointer;
            img {
                width: 35px;
                height: 35px;
                margin: 0 10px;
            }
            p {
                width: 100px;
            }
        }
        .vs {
            margin: 0 25px;
            font-size: 24px;
            font-weight: 600;
        }
        .detail {
            width: 80px;
            height: 25px;
            color: #fff;
            margin: 0 auto;
            cursor: pointer;
            line-height: 25px;
            border-radius: 2px;
            text-align: center;
            background: #B29873;
            &.disable {
                cursor: not-allowed;
                background-color: #ccc;
            }
        }
    }
</style>
