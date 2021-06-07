<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas != null" />
        <table v-if="datas != null">
            <thead>
                <th>三杀</th>
                <th>四杀</th>
                <th>五杀</th>
                <th>第一条元素龙名称</th>
                <th>第二条元素龙名称</th>
                <th>首峡谷先锋游戏内时间戳</th>
                <th>击杀小龙总数</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.is_triple_kill?'是':datas.is_triple_kill == null ?'':'无'}}</td>
                    <td>{{datas.is_quadra_kill?'是':datas.is_quadra_kill == null ?'':'无'}}</td>
                    <td>{{datas.is_penta_kill?'是':datas.is_penta_kill == null ?'':'无'}}</td>
                    <td>{{datas.first_dragon_kill}}</td>
                    <td>{{datas.second_dragon_kill}}</td>
                    <td>{{durationTime(datas.first_rift_herald)}}</td>
                    <td>{{datas.dragon_kill_count}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="teams != null">
            <thead>
                <th width="20%;"></th>
                <th>最高个人击杀数</th>
                <th>杀敌总数</th>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div class="team flex flex_only_center">
                            <img :src="teams.master_team.team_image">
                            <p>{{teams.master_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{teams.master_team.max_player_kill || 0}}</td>
                    <td>{{teams.master_team.kill_count || 0}}</td>
                </tr>
                <tr>
                    <td>
                        <div class="team flex flex_only_center">
                            <img :src="teams.guest_team.team_image">
                            <p>{{teams.guest_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{teams.guest_team.max_player_kill || 0}}</td>
                    <td>{{teams.guest_team.kill_count || 0}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="addData != null">
            <thead>
                <th>击杀总数</th>
                <th>摧毁水晶总数</th>
                <th>击杀大龙总数</th>
                <th>摧毁防御塔总数</th>
                <th>获得龙魂时间</th>
                <th>首塔时间</th>
                <th>首塔位置</th>
                <th>首水晶位置</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{addData.kill_count}}</td>
                    <td>{{addData.inhibitor_kill_count}}</td>
                    <td>{{addData.baron_nashor_kill_count}}</td>
                    <td>{{addData.turret_kill_count}}</td>
                    <td>{{addData.dragon_soul_time}}</td>
                    <td>{{addData.first_turret_time}}</td>
                    <td>{{addData.first_turret_position}}</td>
                    <td>{{addData.first_inhibitor_position}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="addData != null">
            <thead>
                <th>获得一血战队名称</th>
                <th>率先获得五杀战队名称</th>
                <th>率先获得十杀战队名称</th>
                <th>首塔战队名称</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{addData.first_blood_tame_name}}</td>
                    <td>{{addData.first_to_5_kills_team_name}}</td>
                    <td>{{addData.first_to_10_kills_team_name}}</td>
                    <td>{{addData.first_turret_team_name}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="addData != null">
            <thead>
                <th>首峡谷先锋战队名称</th>
                <th>首小龙战队名称</th>
                <th>击杀第二条小龙战队名称</th>
                <th>首大龙战队名称</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{addData.first_rift_herald_team_name}}</td>
                    <td>{{addData.first_dragon_team_name}}</td>
                    <td>{{addData.second_dragon_team_name}}</td>
                    <td>{{addData.first_baron_nashor_team_name}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted, computed, onMounted } from 'vue'
    import { useRoute } from "vue-router"
    import { lolAddData, lolTeam, lolAdditional } from "@/scripts/request"
    import { formatSeconds } from '@/scripts/utils'

    export default defineComponent({
        setup(props,ctx) {

            const route = useRoute()

            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
                teams: null,
                addData: null,
                status: '',
                timer: null
            })

            const getlolAddData = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                lolAddData(params).then(res => {
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

            const getlolTeams = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                lolTeam(params).then(res => {
                    if(res.code === 200) {
                        tableData.status = res.data.status
                        if(res.data.length !== 0) {
                            tableData.teams = res.data
                        } else {
                            tableData.teams = null
                            clearInterval(tableData.timer)
                        }
                    } else {
                        tableData.teams = null
                        clearInterval(tableData.timer)
                    }
                })
            }

            const getlolAdditional = (battleId) => {
                let params = {
                    battle_id: battleId,
                    game_id: parseInt(route.query.gameId)
                }
                lolAdditional(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            tableData.addData = res.data
                        } else {
                            tableData.addData = null
                            clearInterval(tableData.timer)
                        }
                    } else {
                        tableData.addData = null
                        clearInterval(tableData.timer)
                    }
                })
            }

            const durationTime = computed(() => {
                return function(sec) {
                    return formatSeconds(sec)
                }
            })
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid
                getlolAddData(tableData.battleId)
                getlolTeams(tableData.battleId)
                getlolAdditional(tableData.battleId)
            })

            onMounted(() => {
                tableData.timer = setInterval( () => {
                    if(tableData.status === 'onging') { 
                        getlolAddData(tableData.battleId)
                        getlolTeams(tableData.battleId)
                        getlolAdditional(tableData.battleId)
                    }
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(tableData.timer)
            })

            return {
                ...toRefs(tableData),
                getlolAddData,
                getlolTeams,
                durationTime
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
