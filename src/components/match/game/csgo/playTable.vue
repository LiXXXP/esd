<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas || score" />

        <table v-if="total">
            <thead>
                <th>总击杀数（加时赛击杀数）</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{`${total.kill_total_count}(${total.overtime_kill_count})`}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="datas">
            <thead>
                <th>最大首杀战队</th>
                <th>最多助攻选手</th>
                <th>最多伤害玩家</th>
                <th>最多首杀选手</th>
                <th>存在单人单回合出现击杀三人的回合序号</th>
                <th>刀杀回合序号</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.max_first_kills_team}}</td>
                    <td>{{datas.max_assists_player_name}}</td>
                    <td>{{datas.max_adr_player_name}}</td>
                    <td>{{datas.max_first_kill_player_name}}</td>
                    <td>{{datas.three_kill_round}}</td>
                    <td>{{datas.knife_kill_round || 0}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="datas">
            <thead>
                <th>第四回合爆头击杀数</th>
                <th>第六回合爆头击杀数</th>
                <th>第八回合爆头击杀数</th>
                <th>第十回合爆头击杀数</th>
                <th>第十二回合爆头击杀数</th>
                <th>第十四回合爆头击杀数</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.fourth_round_headshot_kill || 0}}</td>
                    <td>{{datas.sixth_round_headshot_kill || 0}}</td>
                    <td>{{datas.eighth_round_headshot_kill || 0}}</td>
                    <td>{{datas.tenth_round_headshot_kill || 0}}</td>
                    <td>{{datas.twelfth_round_headshot_kill || 0}}</td>
                    <td>{{datas.fourteenth_round_headshot_kill || 0}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="datas">
            <thead>
                <th>第十八回合爆头击杀数</th>
                <th>第二十回合爆头击杀数</th>
                <th>第二十二回合爆头击杀数</th>
                <th>第二十四回合爆头击杀数</th>
                <th>第二十六回合爆头击杀数</th>
                <th>第二十八回合爆头击杀数</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.eighteenth_round_headshot_kill || 0}}</td>
                    <td>{{datas.twentieth_round_headshot_kill || 0}}</td>
                    <td>{{datas.twenty_second_round_headshot_kill || 0}}</td>
                    <td>{{datas.twenty_fourth_round_headshot_kill || 0}}</td>
                    <td>{{datas.twenty_sixth_round_headshot_kill || 0}}</td>
                    <td>{{datas.twenty_eighth_round_headshot_kill || 0}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="score">
            <thead>
                <th width="10%;"></th>
                <th>上半场得分</th>
                <th>下半场得分</th>
                <th>加时赛得分</th>
                <th>总得分</th>
                <th>C4爆炸获得胜利总数</th>
                <th>炸弹拆除总数</th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="team flex flex_only_center">
                            <img :src="score.master_team.team_image">
                            <p>{{score.master_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{score.master_team.first_half_score || 0}}</td>
                    <td>{{score.master_team.second_half_score || 0}}</td>
                    <td>{{score.master_team.ot_score || 0}}</td>
                    <td>{{score.master_team.score || 0}}</td>
                    <td>{{score.master_team.master_team_target_bombed_count || 0}}</td>
                    <td>{{score.master_team.master_team_bomb_defused_count || 0}}</td>
                </tr>
                <tr>
                    <td>
                        <div class="team flex flex_only_center">
                            <img :src="score.guest_team.team_image">
                            <p>{{score.guest_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{score.guest_team.first_half_score || 0}}</td>
                    <td>{{score.guest_team.second_half_score || 0}}</td>
                    <td>{{score.guest_team.ot_score || 0}}</td>
                    <td>{{score.guest_team.score || 0}}</td>
                    <td>{{score.guest_team.guest_team_target_bombed_count || 0}}</td>
                    <td>{{score.guest_team.guest_team_bomb_defused_count || 0}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { csgoAddData, csgoScore, csgoTotal } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted, onMounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
                score: null,
                total: null,
                status: '',
                timer: null
            })

            const getcsgoAddData = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                csgoAddData(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            tableData.datas = res.data
                        } else {
                            tableData.datas = null
                            clearInterval(tableData.timer)
                        }
                    } else {
                        tableData.datas = null
                        clearInterval(tableData.timer)
                    }
                })
            }

            const getCsgoScore = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                csgoScore(params).then(res => {
                    if(res.code === 200) {
                        tableData.status = res.data.status
                        if(res.data.length !== 0) {
                            tableData.score = res.data
                        } else {
                            tableData.score = null
                            clearInterval(tableData.timer)
                        }
                    } else {
                        tableData.score = null
                        clearInterval(tableData.timer)
                    }
                })
            }

            // 总计
            const getCsgoTotal = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                csgoTotal(params).then(res => {
                    if(res.code === 200) {
                        tableData.total = res.data
                    } else {
                        tableData.total = null
                        clearInterval(tableData.timer)
                    }
                })
            }
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid.value
                getcsgoAddData(tableData.battleId)
                getCsgoScore(tableData.battleId)
                getCsgoTotal(tableData.battleId)
            })

            onMounted(() => {
                tableData.timer = setInterval( () => {
                    if(tableData.status === 'onging') {
                        getcsgoAddData(tableData.battleId)
                        getCsgoScore(tableData.battleId)
                        getCsgoTotal(tableData.battleId)
                    }
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(tableData.timer)
            })

            return {
                ...toRefs(tableData)
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-data {
        table {
            width: 100%;
            font-size: 16px;
            margin-bottom: 20px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            th {
                color: #333;
                height: 50px;
                font-weight: 400;
            }
            td {
                color: #666;
                height: 50px;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        .team {
            img {
                width: 35px;
                height: 35px;
                margin: 0 10px;
            }
        }
    }
    
</style>
