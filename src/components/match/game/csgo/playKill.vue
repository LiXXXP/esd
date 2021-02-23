<template>
    <div class="play-kill">
        <TitleView :titleName="mapName" />
        <div class="map flex flex_center">

            <div class="arms flex flex_center">
                <div v-for="item in armsList" :key="item.type">
                    <img :src="item.url">
                </div>
            </div>

            <div class="sign flex flex_column flex_around">
                <div class="flex flex_only_center">
                    <span>10</span>
                    <span class="side">ct</span>
                </div>
                <div class="flex flex_only_center">
                    <span>4</span>
                    <span class="side">t</span>
                </div>
            </div>

            <div class="score flex flex_center">
                <p>12</p>
                <img src="">
                <p>9</p>
            </div>

            <div class="sign flex flex_column flex_around">
                <div class="flex flex_only_center">
                    <span class="side">ct</span>
                    <span>10</span>
                </div>
                <div class="flex flex_only_center">
                    <span class="side">t</span>
                    <span>4</span>
                </div>
            </div>

            <div class="arms flex flex_center">
                <div v-for="item in armsList" :key="item.type">
                    <img :src="item.url">
                </div>
            </div>

        </div>

        <div class="kill">

        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

    import { useRoute } from "vue-router"
    import { battleDetail } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, ref, inject, watch } from 'vue'

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
                scoreData: {}
            })
            const getbattleDetail = (battleId) => {
                let params = {
                    game_id: parseInt(route.query.gameId),
                    battle_id: battleId,
                }
                battleDetail(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            killData.scoreData = res.data
                        }
                    }
                })
            }
            const battleid = inject('battleid')
            watch(battleid, () => {
                killData.battleId = battleid
                getbattleDetail(killData.battleId)
            })

            // const masterTeam = ref({})
            // const guestTeam = ref({})
            // const gameData = inject('detail')
            // watch(gameData, () => {
            //     masterTeam.value = gameData.gameDetail.teams_info.master_team_info
            //     guestTeam.value = gameData.gameDetail.teams_info.guest_team_info
            // })
            return {
                ...toRefs(killData),
                battleid,
                getbattleDetail
                // masterTeam,
                // guestTeam,
                // gameData,
                
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-kill {
        .map {
            width: 1200px;
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
                        background-color: #7C7C7C;
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
                    width: 32px;
                    height: 32px;
                    color: #333;
                    font-size: 18px;
                    line-height: 32px;
                    text-align: center;
                    &.side {
                        color: #fff;
                        font-size: 16px;
                        border-radius: 100%;
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
    }
</style>
