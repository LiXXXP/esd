<template>
    <div class="player">
        <div v-if="battleId&&teamList.length>0">
            <TitleView :titleName="name" />
            <table v-for="item in teamList" :key="item.team_id">
                <thead>
                    <th class="team">
                        <div class="flex flex_center" :title="item.team_name" @click="gotoLink(item.team_id)">
                            <img :src="item.team_image">
                            <p class="beyond-ellipsis">{{item.team_name}}</p>
                        </div>
                    </th>
                    <th>击杀(爆头击杀)</th>
                    <th>助攻(闪光弹助攻)</th>
                    <th>死亡</th>
                    <th>KAST</th>
                    <th>K-D Diff</th>
                    <th>平均每局伤害</th>
                    <th>FK Diff</th>
                    <th>Rating2.0</th>
                </thead>
                <tbody>
                    <tr v-for="key in item.players" :key="key.player_id">
                        <td>{{key.nick_name}}</td>
                        <td>{{key.kills}}({{key.headshot_kills}})</td>
                        <td>{{key.assists}}({{key.flash_assists}})</td>
                        <td>{{key.deaths}}</td>
                        <td>{{(key.kast*100).toFixed(2)}}%</td>
                        <td>{{key.kills}}-{{key.deaths}}</td>
                        <td>{{key.adr}}</td>
                        <td>{{key.first_kills_diff}}</td>
                        <td>{{key.rating}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import { csgoPlayerInfo } from "@/scripts/request"
    import { defineComponent, defineAsyncComponent, reactive, toRefs, inject, watch } from 'vue'
    import { useRouter } from "vue-router"

    export default defineComponent({
        setup(props,ctx) {
            const playerData = reactive({
                name: '选手数据',
                battleId: 0,
                teamList: []
            })
            
            const getplayerData = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                csgoPlayerInfo(params).then(res => {
                    if(res.code === 200) {
                        playerData.teamList = res.data
                    }
                })
            }

            const battleid = inject('battleid')
            watch(battleid, () => {
                playerData.battleId = battleid
                getplayerData(playerData.battleId)
                
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
                ...toRefs(playerData),
                battleid,
                getplayerData,
                gotoLink
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')) // 页面标题
        }
    })
</script>

<style lang="less" scoped>
    .player {
        table {
            width: 100%;
            font-size: 16px;
            margin-bottom: 10px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            th {
                color: #333;
                font-weight: 400;
                line-height: 50px;
                &:nth-child(1) {
                    text-align: left;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 10px;
                    }
                }
            }
            td {
                color: #666;
                line-height: 50px;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        .team {
            cursor: pointer;
            p {
                width: 60px;
            }
        }
    }
</style>
