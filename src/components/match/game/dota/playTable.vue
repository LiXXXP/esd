<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas != null" />
        <table v-if="datas != null">
            <thead>
                <th>杀敌总数</th>
                <th>防御塔摧毁总数</th>
                <th>击杀肉山总数</th>
                <th>获得一血战队名称</th>
                <th>获得一血时间</th>
                <th>率先获得五个击杀战队名称</th>
                <th>率先获得十个击杀战队名称</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.kill_count}}</td>
                    <td>{{datas.tower_kill_count}}</td>
                    <td>{{datas.roshan_kill_count}}</td>
                    <td>{{datas.first_blood_team_name}}</td>
                    <td>{{datas.first_blood_time}}</td>
                    <td>{{datas.first_to_5_kill_team_name}}</td>
                    <td>{{datas.first_to_10_kill_team_name}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="datas != null">
            <thead>
                <th>率先获得五个击杀战队名称</th>
                <th>率先获得十个击杀战队名称</th>
                <th>首防御塔战队名称</th>
                <th>首兵营战队名称</th>
                <th>首肉山战队名称</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.first_to_5_kill_team_name}}</td>
                    <td>{{datas.first_to_10_kill_team_name}}</td>
                    <td>{{datas.first_tower_team_name}}</td>
                    <td>{{datas.first_barrack_team_name}}</td>
                    <td>{{datas.first_roshan_team_name}}</td>
                </tr>
            </tbody>
        </table>

        <table v-if="datas != null">
            <thead>
                <th>获得最多赏金神符战队名称</th>
                <th>最高个人击杀数</th>
                <th>最高个人补刀数战队名称</th>
                <th>最后存活英雄数</th>
                <th>是否有英雄达到30级</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.bounty_runes_pickedup_max_team_name}}</td>
                    <td>{{datas.max_kill_count}}</td>
                    <td>{{datas.max_last_hits_team_name}}</td>
                    <td>{{datas.last_hero_alive_count}}</td>
                    <td>{{datas.is_thirty_hero_level}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted, computed, onMounted } from 'vue'
    import { useRoute } from "vue-router"
    import { dotaAdditional } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {

            const route = useRoute()

            const tableData = reactive({
                name: '数据统计',
                status: '',
                battleId: 0,
                datas: null,
                timer: null
            })

            const getdotaAddData = (battleId) => {
                let params = {
                    battle_id: battleId,
                    game_id: parseInt(route.query.gameId)
                }
                dotaAdditional(params).then(res => {
                    if(res.code === 200) {
                        tableData.status = res.data.status
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
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid
                getdotaAddData(tableData.battleId)
            })

            onMounted(() => {
                tableData.timer = setInterval( () => {
                    if(tableData.status === 'onging') { 
                        getdotaAddData(tableData.battleId)
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
