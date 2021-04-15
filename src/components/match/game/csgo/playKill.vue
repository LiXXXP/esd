<template>
    <div class="play-kill">
        <div v-if="battleId">
            <TitleView :titleName="mapName" />
            <div class="map flex flex_center" v-if="teamsData.length>0">

                <div class="arms flex flex_center">
                    <div v-for="item in armsList" 
                        :key="item.type" 
                        :class="{back: detailData[item.type].team_id !== teamsData[0].team_id}">
                        <img :src="item.url" v-if="detailData[item.type].team_id === teamsData[0].team_id">
                    </div>
                </div>

                <div class="sign flex flex_column flex_around">
                    <div class="flex flex_only_center">
                        <span>{{teamsData[0].first_half_score}}</span>
                        <span class="side ct">CT</span>
                    </div>
                    <div class="flex flex_only_center">
                        <span>{{teamsData[0].second_half_score}}</span>
                        <span class="side t">T</span>
                    </div>
                    <div class="flex flex_only_center" v-if="teamsData[0].ot_score || teamsData[1].ot_score">
                        <span>{{teamsData[0].ot_score}}</span>
                        <span class="side ot">OT</span>
                    </div>
                </div>

                <div class="score flex flex_center">
                    <p>{{teamsData[0].score}}</p>
                    <img :src="mapInfo.map_thumbnail" :title="mapInfo.map_name">
                    <p>{{teamsData[1].score}}</p>
                </div>

                <div class="sign flex flex_column flex_around">
                    <div class="flex flex_only_center">
                        <span class="side t">T</span>
                        <span>{{teamsData[1].first_half_score}}</span>
                    </div>
                    <div class="flex flex_only_center">
                        <span class="side ct">CT</span>
                        <span>{{teamsData[1].second_half_score}}</span>
                    </div>
                    <div class="flex flex_only_center" v-if="teamsData[0].ot_score || teamsData[1].ot_score">
                        <span class="side ot">OT</span>
                        <span>{{teamsData[1].ot_score}}</span>
                    </div>
                </div>

                <div class="arms flex flex_center">
                    <div v-for="item in armsList"
                        :key="item.type" 
                        :class="{back: detailData[item.type].team_id !== teamsData[1].team_id}">
                        <img :src="item.url" v-if="detailData[item.type].team_id === teamsData[1].team_id">
                    </div>
                </div>

            </div>

            <div class="kill" v-if="roundDetail.length>0">
                <table cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td></td>
                            <td v-for="item in roundDetail" :key="item.round_ordinal">
                                <p class="order">{{item.round_ordinal}}</p>
                            </td>
                            <td v-for="item in (30-roundDetail.length)" :key="item"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td v-for="item in roundDetail" :key="item.round_ordinal">
                                <div class="bar" v-if="item.side.length>0">
                                    <p v-for="key in item.side[0].players" 
                                        :key="key.player_id"
                                        :class="[{
                                            ct: item.side[0].side === 'ct' && !key.is_died,
                                            t: item.side[0].side === 'terrorist' && !key.is_died,
                                            die: key.is_first_death
                                    }]">
                                        <i v-if="key.is_first_death && key.is_headshot"></i>
                                    </p>
                                </div>
                            </td>
                            <td v-for="item in (30-roundDetail.length)" :key="item"></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="team flex flex_only_center" 
                                    v-if="teamsData.length>0"
                                    @click="gotoLink(teamsData[0].team_id)">
                                    <img :src="teamsData[0].team_image">
                                    <p class="beyond-ellipsis" :title="teamsData[0].team_name">
                                        {{teamsData[0].team_name}}
                                    </p>
                                    <i class="win" v-if="teamsData[0].is_winner"></i>
                                </div>
                            </td>
                            <td v-for="item in roundDetail" :key="item.round_ordinal">
                                <div class="icon" v-if="item.side.length>0">
                                    <img src="../../../../assets/imgs/game/csgo/ct01.png" 
                                    v-if="item.win_type === 'cts_win' && item.winner === item.side[0].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/ct02.png" 
                                    v-if="item.win_type === 'bomb_defused' && item.winner === item.side[0].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/ct03.png" 
                                    v-if="item.win_type === 'target_saved' && item.winner === item.side[0].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/t01.png" 
                                    v-if="item.win_type === 'target_bombed' && item.winner === item.side[0].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/t02.png" 
                                    v-if="item.win_type === 'terrorists_win' && item.winner === item.side[0].team_id">
                                </div>
                            </td>
                            <td v-for="item in (30-roundDetail.length)" :key="item"></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="team flex flex_only_center" 
                                    v-if="teamsData.length>0"
                                    @click="gotoLink(teamsData[1].team_id)">
                                    <img :src="teamsData[1].team_image">
                                    <p class="beyond-ellipsis" :title="teamsData[1].team_name">
                                        {{teamsData[1].team_name}}
                                    </p>
                                    <i class="win" v-if="teamsData[1].is_winner"></i>
                                </div>
                            </td>
                            <td v-for="item in roundDetail" :key="item">
                                <div class="icon" v-if="item.side.length>0">
                                    <img src="../../../../assets/imgs/game/csgo/ct01.png" 
                                    v-if="item.win_type === 'cts_win' && item.winner === item.side[1].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/ct02.png" 
                                    v-if="item.win_type === 'bomb_defused' && item.winner === item.side[1].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/ct03.png" 
                                    v-if="item.win_type === 'target_saved' && item.winner === item.side[1].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/t01.png" 
                                    v-if="item.win_type === 'target_bombed' && item.winner === item.side[1].team_id">
                                    <img src="../../../../assets/imgs/game/csgo/t02.png" 
                                    v-if="item.win_type === 'terrorists_win' && item.winner === item.side[1].team_id">
                                </div>
                            </td>
                            <td v-for="item in (30-roundDetail.length)" :key="item"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td v-for="item in roundDetail" :key="item.round_ordinal">
                                <div class="bar" v-if="item.side.length>0">
                                    <p v-for="key in item.side[1].players" 
                                        :key="key.player_id"
                                        :class="[{
                                            ct: item.side[0].side === 'terrorist' && !key.is_died,
                                            t: item.side[0].side === 'ct' && !key.is_died,
                                            die: key.is_first_death
                                    }]">
                                        <i v-if="key.is_first_death && key.is_headshot"></i>
                                    </p>
                                </div>
                            </td>
                            <td v-for="item in (30-roundDetail.length)" :key="item"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="info flex flex_end">
                <div class="flex flex_center">
                    <img src="../../../../assets/imgs/game/csgo/ct01.png">
                    <p class="text">CT全歼 T获胜</p>
                </div>
                <div class="flex flex_center">
                    <img src="../../../../assets/imgs/game/csgo/ct02.png">
                    <p class="text">CT拆除炸弹获胜</p>
                </div>
                <div class="flex flex_center">
                    <img src="../../../../assets/imgs/game/csgo/ct03.png">
                    <p class="text">CT目标保存完好获胜</p>
                </div>
                <div class="flex flex_center">
                    <img src="../../../../assets/imgs/game/csgo/t01.png">
                    <p class="text">炸弹爆炸T获胜</p>
                </div>
                <div class="flex flex_center">
                    <img src="../../../../assets/imgs/game/csgo/t02.png">
                    <p class="text">T全歼 CT获胜</p>
                </div>
            </div>

            <div class="info flex flex_end">
                <div class="flex flex_center">
                    <div>
                        <p class="bar blue"></p>
                        <p class="bar yellow"></p>
                    </div>
                    <p class="text">存活</p>
                </div>
                <div class="flex flex_center">
                    <p class="bar"></p>
                    <p class="text">阵亡</p>
                </div>
                <div class="flex flex_center">
                    <p class="bar black"></p>
                    <p class="text black">首个阵亡</p>
                </div>
                <div class="flex flex_center">
                    <p class="bar red"></p>
                    <p class="text red">被爆头</p>
                </div>
                <div class="hide">隐藏阵亡详情</div>
            </div>
        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

    import { useRoute, useRouter } from "vue-router"
    import { battleDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const killData = reactive({
                mapName: '对局详情',
                armsList: [
                    {
                        url: require('../../../../assets/imgs/game/csgo/q2.png'),
                        type: 'win_round_16'
                    },
                    {
                        url: require('../../../../assets/imgs/game/csgo/q.png'),
                        type: 'first_to_5_rounds_wins'
                    },
                    {
                        url: require('../../../../assets/imgs/game/csgo/q1.png'),
                        type: 'win_round_1'
                    }
                ],
                battleId: 0,
                detailData: {},
                mapInfo: {},
                teamsData: [],
                roundDetail: [],
                timer: null
            })
            const getbattleDetail = (battleId) => {
                let params = {
                    game_id: parseInt(route.query.gameId),
                    battle_id: battleId,
                }
                battleDetail(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            killData.detailData = res.data.battle_detail
                            killData.mapInfo = res.data.map_info
                            killData.teamsData = res.data.battle_detail.teams
                            killData.roundDetail = res.data.battle_detail.round_detail.slice(0,30)

                            if(res.data.battle_detail.teams[0].starting_side !== 'ct') {
                                killData.teamsData.reverse()
                            }

                            for(let item of killData.teamsData) {
                                for(let key of res.data.team_info) {
                                    if(item.team_id === key.team_id) {
                                        item.team_image = key.team_image
                                        item.team_name = key.team_name
                                        item.is_winner = key.is_winner
                                    }
                                }
                            }

                            for(let item of killData.roundDetail.slice(0,15)) {
                                if(item.side[0].side !== 'ct') {
                                    item.side.reverse()
                                }
                            }

                            for(let item of killData.roundDetail.slice(15,30)) {
                                if(item.side[0].side !== 'terrorist') {
                                    item.side.reverse()
                                }
                            }

                            if(res.data.status !== 'ongoing' ) {
                                clearInterval(killData.timer)
                            }
                            
                        } else {
                            clearInterval(killData.timer)
                        }
                    } else {
                        clearInterval(killData.timer)
                    }
                })
            }

            const battleid = inject('battleid')
            watch(battleid, () => {
                killData.battleId = battleid
                getbattleDetail(killData.battleId)
                killData.timer = setInterval( () => {
                    getbattleDetail(killData.battleId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(killData.timer)
            })

            const router = useRouter()
            const gotoLink = (id) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: id
                    }
                })
            }

            return {
                ...toRefs(killData),
                battleid,
                getbattleDetail,
                gotoLink
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    @ct: #008CD5;
    @t: #F6B600;
    @ot: #434343;
    @die: #303030;
    .play-kill {
        .map {
            width: 100%;
            height: 160px;
            padding: 15px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            .arms {
                margin: 0 110px; 
                position: relative;
                &::after {
                    content: '';
                    height: 1px;
                    width: 280px;
                    display: block;
                    background-color: #CACCCF;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                div {
                    width: 20px;
                    height: 20px;
                    margin: 0 8px;
                    z-index: 999;
                    &.back {
                        background-color: #CACCCF;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .sign {
                height: 130px;
                span {
                    width: 30px;
                    height: 30px;
                    color: #333;
                    font-size: 18px;
                    line-height: 30px;
                    text-align: center;
                    &.side {
                        color: #fff;
                        font-size: 16px;
                        border-radius: 100%;
                        &.ct {
                            background-color: @ct;
                        }
                        &.t {
                            background-color: @t;
                        }
                        &.ot {
                            background-color: @ot;
                        }
                    }
                }
                
            }
            .score {
                margin: 0 30px;
                p {
                    font-size: 30px;
                    font-weight: 600;
                }
                img {
                    width: 240px;
                    height: 130px;
                    margin: 0 30px;
                    border-radius: 1px;
                }
            }
        }
        .kill {
            padding: 15px;
            margin-top: 7px;
            background-color: #E3E5E8;
            table {
                width: 100%;
                height: 170px;
                border-collapse: collapse;
                tr {
                    border-bottom: 1px solid #CECECE;
                    &:last-child {
                        border: 0;
                    }
                    td {
                        width: 32px;
                        &:first-child {
                            width: 16%;
                        }
                        &:first-child,
                        &:nth-child(16){
                            border-right: 1px solid #CECECE;
                        }
                    }
                }
            }
            .bar {
                margin-left: 5px;
                margin-top: 5px;
                p {
                    width: 16px;
                    height: 2px;
                    margin-bottom: 2px;
                    background-color: #999;
                    position: relative;
                    &.ct {
                        background-color: @ct;
                    }
                    &.t {
                        background-color: @t;
                    }
                    &.die {
                        background-color: @die;
                    }
                    i {
                        width: 4px;
                        height: 2px;
                        display: block;
                        background-color: #FF1E34;
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                }
            }
            .team {
                cursor: pointer;
                img {
                    width: 35px;
                    height: 35px;
                    margin-right: 10px;
                }
                p {
                    width: 90px;
                    color: #333;
                    font-size: 18px;
                }
                i {
                    width: 32px;
                    height: 18px;
                    background: url('../../../../assets/imgs/game/csgo/win.png') no-repeat 0 0;
                    background-size: 100%;
                }
            }
            .icon {
                img {
                    width: 20px;
                    height: 20px;
                    margin-left: 5px;
                }
            }
        }
        .info {
            margin-top: 6px;
            .flex {
                margin-right: 20px;
                .bar {
                    width: 16px;
                    height: 3px;
                    margin-right: 4px;
                    background-color: #878787;
                    &.blue {
                        margin-bottom: 5px;
                        background-color: #008CD4;
                    }
                    &.yellow {
                        background-color: #F7B700;
                    }
                    &.black {
                        background-color: #303030;
                    }
                    &.red {
                        background-color: #DC0000;
                    }
                }
                .text {
                    color: #878787;
                    font-size: 12px;
                    font-weight: 600;
                    &.blue {
                        color: #008CD4;
                    }
                    &.yellow {
                        color: #F7B700;
                    }
                    &.black {
                        color: #303030;
                    }
                    &.red {
                        color: #DC0000;
                    }
                }
            }
            .hide {
                color: #999;
                padding: 5px 15px;
                border-radius: 13px;
                background-color: #D2D2D2;
            }
            img {
                width: 20px;
                height: 20px;
                margin-right: 4px;
            }
        }
        .order {
            width: 16px;
            color: #777;
            margin-left: 5px;
            text-align: center;
        }
    }
</style>
