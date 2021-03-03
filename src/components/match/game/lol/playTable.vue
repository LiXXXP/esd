<template>
    <div class="play-data">
        <TitleView :titleName="name" v-if="datas != null" />
        <table v-if="datas != null">
            <thead>
                <th>三杀</th>
                <th>四杀</th>
                <th>五杀</th>
            </thead>
            <tbody>
                <tr>
                    <td>{{datas.is_triple_kill?'是':'无'}}</td>
                    <td>{{datas.is_quadra_kill?'是':'无'}}</td>
                    <td>{{datas.is_penta_kill?'是':'无'}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题

    import { lolAddData } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, inject, watch, onUnmounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const tableData = reactive({
                name: '数据统计',
                battleId: 0,
                datas: null,
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
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                tableData.battleId = battleid
                getlolAddData(tableData.battleId)
                tableData.timer = setInterval( () => {
                    getlolAddData(tableData.battleId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(tableData.timer)
            })

            return {
                ...toRefs(tableData),
                getlolAddData
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
