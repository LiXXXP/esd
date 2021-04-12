<template>
    <div class="player">
        <div v-if="battleId&&teamList.length>0">
            <TitleView :titleName="name" />
            <table v-for="item in teamList" :key="item.team_id">
                <thead :class="[item.faction]">
                    <th class="team">
                        <div class="flex flex_center" :title="item.team_name" @click="gotoLink(item.team_id)">
                            <img :src="item.team_image">
                            <p class="beyond-ellipsis">{{item.team_name}}</p>
                        </div>
                    </th>
                    <th>
                        <p>K/D/A</p> 
                        <p>KDA</p> 
                    </th>
                    <th>补刀</th>
                    <th>经济</th>
                    <th>伤害占比</th>
                    <th>承伤占比</th>
                    <th>参团率</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="key in item.players" :key="key.seed">
                        <td>{{key.champion_name}}</td>
                        <td>
                            <p>{{key.kills}} / {{key.deaths}} / {{key.assists}}</p>
                            <p :class="[item.faction]">{{key.kda}}</p>
                        </td>
                        <td>{{key.cs}}</td>
                        <td>{{key.gold_earned}}</td>
                        <td>{{parseInt(key.damage_percent_to_champions*100)}}%</td>
                        <td>{{parseInt(key.damage_taken_percent*100)}}%</td>
                        <td>{{parseInt(key.participation*100)}}%</td>
                        <td>
                            <div class="skill flex flex_center">
                                <div class="flex flex_only_center">
                                    <div v-for="summoner in key.summoner_spell" :key="summoner.summoner_spell_id" class="imgs">
                                        <img :src="summoner.summoner_spell_image" :title="summoner.summoner_spell_name">
                                    </div>
                                </div>
                                <div class="item flex flex_only_center">
                                    <div v-for="img in key.item" :key="img.item_id" class="imgs">
                                        <img :src="img.item_image" :title="img.item_name" v-if="!img.is_trinket">
                                    </div>
                                </div>
                                <div v-for="img in key.item" :key="img.item_id" class="trinket">
                                    <img :src="img.item_image" :title="img.item_name" v-if="img.is_trinket">
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, inject, watch, onMounted, onUnmounted } from 'vue'
    import { useRouter } from "vue-router"
    import { lolPlayerBattle } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const playerData = reactive({
                name: '选手对局详情',
                battleId: 0,
                teamList: [],
                timer: null,
                status: ''
            })
            
            const getplayerData = (battleId) => {
                let params = {
                    battle_id: battleId,
                }
                lolPlayerBattle(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            playerData.teamList = res.data.factions
                        } else {
                            playerData.teamList = []
                        }
                        playerData.status = res.data.status
                    } else {
                        clearInterval(playerData.timer)
                    }
                })
            }

            const battleid = inject('battleid')
            watch(battleid, () => {
                if(battleid.value > 0) { 
                    playerData.battleId = battleid
                    getplayerData(playerData.battleId)
                }
            })

            onMounted(() => {
                playerData.timer = setInterval( () => {
                    if(battleid.value > 0 && playerData.status === 'ongoing') {
                        getplayerData(playerData.battleId)
                    }
                }, 600000)
            })

            onUnmounted(() => {
                clearInterval(playerData.timer)
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
                height: 50px;
                color: #fff;
                font-weight: 400;
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
                height: 60px;
                color: #666;
                font-size: 14px;
                text-align: center;
                border-top: 1px solid #D5D7DB;
            }
        }
        thead {
            &.blue {
                background-color: #457CF4;
            }
            &.red {
                background-color: #FF4645;
            }
        }
        td {
            .blue {
                color: #457CF4;
            }
            .red {
                color: #FF4645;
            }
        }
        .team {
            cursor: pointer;
            p {
                width: 60px;
            }
        }
        .skill {
            height: 35px;
            .imgs {
                width: 35px;
                height: 35px;
                cursor: pointer;
                margin-left: 3px;
                img {
                    width: 35px;
                    height: 35px;
                }
            }
            .item {
                width: 230px;
                margin: 0 15px;
            }
            .trinket {
                img {
                    width: 35px;
                    height: 35px;
                    cursor: pointer;
                }
            }
        }
    }
</style>
