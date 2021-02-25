<template>
    <div class="page-result flex flex_column flex_center">
        <div>
            <table v-for="item in searchList" :key="item.team_id || item.match_id || item.player_id">
                <thead>
                    <th v-for="item in theadList" :key="item.head">{{item.head}}</th>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span v-if="type === 'match'">{{item.match_status}}</span>
                            <img v-if="type === 'team'" :src="item.image" class="team-logo">
                            <img v-if="type === 'player'" :src="item.player_image" class="player-logo">
                        </td>
                        <td style="width: 200px;">
                            <span v-if="type === 'match'">{{item.tournament_name}}</span>
                            <span v-if="type === 'team'">{{item.team_name}}</span>
                            <span v-if="type === 'player'">{{item.nick_name}}</span>
                        </td>
                        <td>
                            <span v-if="type === 'match'">{{item.scheduled_begin_at}}</span>
                            <div v-if="type === 'team'" class="flex flex_center">
                                <img :src="item.game_image" class="team-logo">
                            </div>
                            <span v-if="type === 'player'">{{item.player_name}}</span>
                        </td>
                        <td>
                            <div class="flex flex_center" v-if="type === 'match'">
                                <div class="team flex flex_center"
                                    @click="gotoMean(item.teams_info.master_team_info.team_id)">
                                    <img :src="item.teams_info.master_team_info.team_image">
                                    <span>{{item.teams_info.master_team_info.team_name}}</span>
                                </div>
                                <div class="vs">
                                    {{item.teams_info.master_team_info.team_score}} : {{item.teams_info.guest_team_info.team_score}}
                                </div>
                                <div class="team flex flex_center"
                                    @click="gotoMean(item.teams_info.guest_team_info.team_id)">
                                    <span>{{item.teams_info.guest_team_info.team_name}}</span>
                                    <img :src="item.teams_info.guest_team_info.team_image">
                                </div>
                            </div>
                            <div v-if="type === 'team'" class="flex flex_center">
                                <img :src="item.team_country" class="country-logo">
                            </div>
                            <div v-if="type === 'player'" class="flex flex_center">
                                <img :src="item.game_image" class="team-logo">
                            </div>
                        </td>
                        <td>
                            <p :class="['detail',{disable: (type === 'match' && parseInt(item.game_id) === 3) || item.match_status === '比赛未开始'}]"
                                v-if="type === 'match' || type === 'team'"
                                @click="gotoLink(item.game_id,item.match_id,item.team_id,item.match_status)"
                            >详情</p>
                            <div v-if="type === 'player'" class="flex flex_center">
                                <img class="team-logo" 
                                    :src="key.image" 
                                    v-for="key in item.team" 
                                    :key="key.team_id"
                                    @click="gotoLink(0,0,key.team_id,'')">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router"
    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const router = useRouter()
            const search = reactive({
                type: '',
                theadList: [],
                searchList: []
            })
            const selectData = inject('selectData')
            watch(selectData, () => {
                search.type = selectData.selectVal
                switch (selectData.selectVal) {
                    case 'match':
                        search.theadList = [
                            {
                                head: '状态'
                            },
                            {
                                head: '赛事名称'
                            },
                            {
                                head: '比赛时间'
                            },
                            {
                                head: '对阵情况'
                            },
                            {
                                head: '相关'
                            }
                        ]
                    break
                    case 'team':
                        search.theadList = [
                            {
                                head: '战队图标'
                            },
                            {
                                head: '战队名称'
                            },
                            {
                                head: '游戏项目'
                            },
                            {
                                head: '所属城市'
                            },
                            {
                                head: '相关'
                            }
                        ]
                    break
                    case 'player':
                        search.theadList = [
                            {
                                head: '选手头像'
                            },
                            {
                                head: '选手昵称'
                            },
                            {
                                head: '选手姓名'
                            },
                            {
                                head: '游戏项目'
                            },
                            {
                                head: '所属战队'
                            }
                        ]
                    break
                    default:
                    break
                }
                search.searchList = selectData.searchList
            })

            const gotoLink = (gameId,matchId,teamId,status) => {
                if(matchId) {
                    if(parseInt(gameId) !== 3 && status !== '比赛未开始') {
                        router.push({
                            path: '/match/game',
                            query: {
                                gameId: gameId,
                                matchId: matchId
                            }
                        })
                        ctx.emit('isShow', false)
                    }
                } else {
                    router.push({
                        path: '/mean/detail',
                        query: {
                            teamId: teamId
                        }
                    })
                    ctx.emit('isShow', false)
                }
            }

            const gotoMean = (teamId) => {
                ctx.emit('isShow', false)
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: teamId
                    }
                })
            }

            return {
                ...toRefs(search),
                selectData,
                gotoLink,
                gotoMean
            }
        },
    })
</script>

<style lang="less" scoped>
    .page-result {
        table {
            min-width: 1000px;
            margin: 50px;
            text-align: center;
            border-radius: 2px;
            &:nth-child(3n) {
                margin-bottom: 30px;
            }
            thead {
                color: #333;
                font-size: 16px;
                font-weight: 500;
                line-height: 50px;
                background-color: #989898;
                border-radius: 2px 2px 0px 0px;
            }
            tbody {
                tr {
                    height: 120px;
                    color: #fff;
                    font-size: 14px;
                    background-color: #585858;
                    border-radius: 0px 0px 2px 2px;
                }
            }
        }
        .team-logo,
        .player-logo {
            width: 50px;
            height: 50px;
            cursor: pointer;
        }
        .player-logo {
            border-radius: 100%;
        }
        .country-logo {
            width: 60px;
            height: 50px;
        }
        .team {
            cursor: pointer;
            img {
                width: 35px;
                height: 35px;
                margin: 0 5px;
            }
            span {
                width: 80px;
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