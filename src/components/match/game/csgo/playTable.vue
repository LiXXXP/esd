<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas != null" />
        <table v-if="datas != null">
            <thead>
                <th>最大首杀战队</th>
                <th>最多助攻选手</th>
                <th>最多伤害玩家</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.max_first_kills_team}}</td>
                    <td>{{datas.max_assists_player_name}}</td>
                    <td>{{datas.max_adr_player_name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { csgoAddData } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
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
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid
                getcsgoAddData(tableData.battleId)
                tableData.timer = setInterval( () => {
                    getcsgoAddData(tableData.battleId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(tableData.timer)
            })

            return {
                ...toRefs(tableData),
                getcsgoAddData
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
    }
    
</style>
