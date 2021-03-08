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
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.is_triple_kill?'是':datas.is_triple_kill == null ?'':'无'}}</td>
                    <td>{{datas.is_quadra_kill?'是':datas.is_quadra_kill == null ?'':'无'}}</td>
                    <td>{{datas.is_penta_kill?'是':datas.is_penta_kill == null ?'':'无'}}</td>
                    <td>{{datas.first_dragon_kill}}</td>
                    <td>{{datas.second_dragon_kill}}</td>
                    <td>{{durationTime(datas.first_rift_herald)}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="teams != null">
            <thead>
                <th width="20%;"></th>
                <th>最高个人击杀数</th>
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
                </tr>
                <tr>
                    <td>
                        <div class="team flex flex_only_center">
                            <img :src="teams.guest_team.team_image">
                            <p>{{teams.guest_team.team_name}}</p>
                        </div>
                    </td>
                    <td>{{teams.guest_team.max_player_kill || 0}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted, computed } from 'vue'
    import { lolAddData, lolTeam } from "@/scripts/request"
    import { formatSeconds } from '@/scripts/utils'

    export default defineComponent({
        setup(props,ctx) {
            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
                teams: null,
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

            const getlolTeams = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                lolTeam(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            tableData.teams = res.data
                            if(res.data.status !== 'ongoing' ) {
                                clearInterval(tableData.timer)
                            }
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
                tableData.timer = setInterval( () => {
                    getlolAddData(tableData.battleId)
                    getlolTeams(tableData.battleId)
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
