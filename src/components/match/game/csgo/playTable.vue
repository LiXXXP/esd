<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas || score" />

        <table v-if="datas">
            <thead>
                <th>最大首杀战队</th>
                <th>最多助攻选手</th>
                <th>最多伤害玩家</th>
                <th>从第八到第九回合是否存在单人单回合出现击杀三人</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.max_first_kills_team}}</td>
                    <td>{{datas.max_assists_player_name}}</td>
                    <td>{{datas.max_adr_player_name}}</td>
                    <td>{{datas.is_eigth_or_nine_threekill? '是' : '否'}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="score">
            <thead>
                <th></th>
                <th>上半场得分</th>
                <th>下半场得分</th>
                <th>加时赛得分</th>
                <th>总得分</th>
            </thead>
            <tbody>
                <tr>
                    <td width="10%;">
                        <div class="team flex flex_only_center">
                            <img :src="score.master_team.team_image">
                            <p>{{score.master_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{score.master_team.first_half_score || 0}}</td>
                    <td>{{score.master_team.second_half_score || 0}}</td>
                    <td>{{score.master_team.ot_score || 0}}</td>
                    <td>{{score.master_team.score || 0}}</td>
                </tr>
                <tr>
                    <td width="10%;">
                        <div class="team flex flex_only_center">
                            <img :src="score.guest_team.team_image">
                            <p>{{score.guest_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{score.guest_team.first_half_score || 0}}</td>
                    <td>{{score.guest_team.second_half_score || 0}}</td>
                    <td>{{score.guest_team.ot_score || 0}}</td>
                    <td>{{score.guest_team.score || 0}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { csgoAddData, csgoScore } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
                score: null,
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
                            if(res.data.status !== 'ongoing' ) {
                                clearInterval(tableData.timer)
                            }
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
                        if(res.data.length !== 0) {
                            tableData.score = res.data
                            if(res.data.status !== 'ongoing' ) {
                                clearInterval(tableData.timer)
                            }
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
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid
                getcsgoAddData(tableData.battleId)
                getCsgoScore(tableData.battleId)
                tableData.timer = setInterval( () => {
                    getcsgoAddData(tableData.battleId)
                    getCsgoScore(tableData.battleId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(tableData.timer)
            })

            return {
                ...toRefs(tableData),
                getcsgoAddData,
                getCsgoScore
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
                font-weight: 400;
                line-height: 50px;
            }
            td {
                color: #666;
                line-height: 50px;
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
