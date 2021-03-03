<template>
    <div class="play-teams">
        <TitleView :titleName="teamsName" v-if="battleInfo != null" />
        <div class="detail" v-if="battleInfo != null">
            <div class="team flex flex_between" v-if="teamInfo.length>0">
                <div class="flex flex_only_center" @click="gotoLink(teamInfo[0].team_id)">
                    <img :src="teamInfo[0].team_image">
                    <p class="beyond-ellipsis" :title="teamInfo[0].team_name">
                        {{teamInfo[0].team_name}}
                    </p>
                </div>
                <div>
                    <i class="iconfont icon-shijian"></i>
                    <span>{{durationTime(battleInfo.duration)}}</span>
                </div>
                <div class="flex flex_only_center" @click="gotoLink(teamInfo[1].team_id)">
                    <p class="beyond-ellipsis" :title="teamInfo[1].team_name">
                        {{teamInfo[1].team_name}}
                    </p>
                    <img :src="teamInfo[1].team_image">
                </div>
            </div>
            <div class="hero" v-if="factions.length>0">
                <div class="flex flex_between flex_only_center" v-if="factions[0].ban.length>0">
                    <div class="small flex flex_only_center">
                        <img v-for="item in factions[0].ban" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                    <p>BAN</p>
                    <div class="small flex flex_end">
                        <img v-for="item in factions[1].ban" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                </div>
                <div class="flex flex_between flex_only_center" v-if="factions[0].pick.length>0">
                    <div class="big flex flex_only_center">
                        <img v-for="item in factions[0].pick" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                    <p>PICK</p>
                    <div class="big flex flex_end">
                        <img v-for="item in factions[1].pick" 
                            :key="item.champion_name"
                            :src="item.champion_image" 
                            :title="item.champion_name"
                        >
                    </div>
                </div>
            </div>
            <div class="data">
                <div class="bar" v-for="item in list" :key="item.type">
                    <div class="flex flex_between flex_only_center">
                        <div class="blue flex flex_end flex_only_center">
                            <div class="flex flex_start" v-if="item.imgs">
                                <div class="imgs" v-for="key in item.imgs" :key="key.type">
                                    <img v-if="key.faction === 'blue'" :src="key.url" :title="`${key.info}(${durationTime(key.ingame)})`">
                                </div>
                            </div>
                            <div class="flex flex_only_center">
                                <span>{{thousands(item.blue)}}</span>
                                <Progress 
                                    class="progress" 
                                    :progressData="progressData" 
                                    :rateData="parseInt(item.blue/(item.blue+item.red)*100 || 0)" 
                                />
                            </div>
                        </div>
                        <p>{{item.text}}</p>
                        <div class="red flex flex_start flex_only_center">
                            <div class="flex flex_only_center">
                                <Progress 
                                    class="progress" 
                                    :progressData="progressData" 
                                    :rateData="parseInt(item.red/(item.blue+item.red)*100 || 0)"
                                />
                                <span>{{thousands(item.red)}}</span>
                            </div>
                            <div class="flex flex_start" v-if="item.imgs">
                                <div class="imgs" v-for="key in item.imgs" :key="key.type">
                                    <img v-if="key.faction === 'red'" :src="key.url" :title="`${key.info}(${durationTime(key.ingame)})`">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="none" v-else>暂无对局内容</div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题
    import Progress from '@/components/common/progress/progress.vue'        // 进度条

    import { useRoute, useRouter } from "vue-router"
    import { battleDetail } from "@/scripts/request"
    import { formatSeconds, formatNumber } from '@/scripts/utils'
    import { defineComponent, reactive, toRefs, inject, watch, computed, onUnmounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const teamsData = reactive({
                teamsName: '队伍对局详情',
                list: [
                    {
                        text: '击杀',
                        type: 'kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '十杀',
                                type: 'first_to_10_kills',
                                url: require('../../../../assets/imgs/game/lol/kills01.png')
                            },
                            {
                                ingame: 0,
                                faction: '',
                                info: '五杀',
                                type: 'first_to_5_kills',
                                url: require('../../../../assets/imgs/game/lol/kills02.png')
                            },
                            {
                                ingame: 0,
                                faction: '',
                                info: '一血',
                                type: 'first_blood',
                                url: require('../../../../assets/imgs/game/lol/kills03.png')
                            }
                        ]
                    },
                    {
                        text: '经济',
                        type: 'gold',
                        blue: 0,
                        red: 0,
                        imgs: []
                    },
                    {
                        text: '防御塔',
                        type: 'turret_kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '首塔',
                                type: 'first_turret',
                                url: require('../../../../assets/imgs/game/lol/kills04.png')
                            }
                        ]
                    },
                    {
                        text: '水晶',
                        type: 'inhibitor_kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '首水晶',
                                type: 'first_inhibitor',
                                url: require('../../../../assets/imgs/game/lol/kills05.png')
                            }
                        ]
                    },
                    {
                        text: '峡谷先锋',
                        type: 'rift_herald_kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '首峡谷先锋',
                                type: 'first_rift_herald',
                                url: require('../../../../assets/imgs/game/lol/kills06.png')
                            }
                        ]
                    },
                    {
                        text: '元素巨龙',
                        type: 'dragon_kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '首元素巨龙',
                                type: 'first_dragon',
                                url: require('../../../../assets/imgs/game/lol/kills07.png')
                            }
                        ]
                    },
                    {
                        text: '纳什男爵',
                        type: 'baron_nashor_kills',
                        blue: 0,
                        red: 0,
                        imgs: [
                            {
                                ingame: 0,
                                faction: '',
                                info: '首纳什男爵',
                                type: 'first_baron_nashor',
                                url: require('../../../../assets/imgs/game/lol/kills08.png')
                            }
                        ]
                    }
                ],
                progressData: {
                    showText: false,
                    width: 13
                },
                battleId: 0,
                battleInfo: null,
                teamInfo: [],
                factions: [],
                timer: null
            })
            const getbattleDetail = (battleId) => {
                let params = {
                    game_id: parseInt(route.query.gameId),
                    battle_id: battleId,
                }
                battleDetail(params).then(res => {
                    if(res.code === 200) {
                        if(res.data.length !== 0) {
                            teamsData.battleInfo = res.data
                            teamsData.teamInfo = res.data.team_info
                            teamsData.factions = res.data.battle_detail.factions

                            if(res.data.battle_detail.factions[0].faction !== 'blue') {
                                teamsData.factions.reverse()
                            }

                            if(res.data.battle_detail.factions[0].team_id !== res.data.team_info[0].team_id) {
                                teamsData.teamInfo.reverse()
                            }

                            battleDatas()

                            if(res.data.status !== 'ongoing' ) {
                                clearInterval(teamsData.timer)
                            }
                            
                        } else {
                            clearInterval(teamsData.timer)
                            teamsData.battleInfo = null
                        }
                    } else {
                        clearInterval(teamsData.timer)
                        teamsData.battleInfo = null
                    }
                })
            }
            const battleDatas = () => {
                teamsData.list.forEach( e => {
                    let field = e.type
                    e.blue = teamsData.factions[0][field] || 0
                    e.red = teamsData.factions[1][field] || 0
                    for(let key of e.imgs) {
                        let type = key.type
                        if(teamsData.battleInfo.battle_detail.first_events[type] !== null) {
                            key.ingame = parseInt(teamsData.battleInfo.battle_detail.first_events[type].ingame_timestamp) || 0
                            key.faction = teamsData.battleInfo.battle_detail.first_events[type].faction || ''
                        }
                    }
                })
            }
            const battleid = inject('battleid')
            watch(battleid, () => {
                teamsData.battleId = battleid
                getbattleDetail(teamsData.battleId)
                teamsData.timer = setInterval( () => {
                    getbattleDetail(teamsData.battleId)
                }, 5000)
            })

            onUnmounted(() => {
                clearInterval(teamsData.timer)
            })
            
            const durationTime = computed(() => {
                return function(sec) {
                    return formatSeconds(sec)
                }
            })
            const thousands = computed(() => {
                return function(num) {
                    return formatNumber(num)
                }
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
                ...toRefs(teamsData),
                getbattleDetail,
                battleDatas,
                durationTime,
                thousands,
                gotoLink
            }
        },
        components: {
            TitleView,
            Progress
        }
    })
</script>

<style lang="less" scoped>
    .play-teams {
        .detail {
            .team {
                cursor: pointer;
                img {
                    width: 48px;
                    height: 48px;
                }
                p {
                    width: 120px;
                    color: #666;
                    font-size: 18px;
                    padding: 0 10px;
                }
                span,i {
                    color: #666;
                    font-size: 24px;
                }
                i {
                    margin-right: 9px;
                }
            }
            .hero {
                margin-bottom: 30px;
                p {
                    color: #666;
                    font-size: 18px;
                }
                .small,
                .big {
                    width: 540px;
                    cursor: pointer;
                }
                .small {
                    margin: 15px 0;
                    img {
                        width: 55px;
                        height: 55px;
                        margin-right: 5px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
                .big {
                    img {
                        width: 80px;
                        height: 80px;
                        margin-right: 10px;
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            }
            .data {
                .bar {
                    margin-bottom: 20px;
                    .progress {
                        width: 400px;
                    }
                    span {
                        font-size: 18px;
                    }
                    p {
                        color: #666;
                        font-size: 18px;
                    }
                    .blue {
                        width: 535px;
                        span {
                            padding: 0 10px;
                            color: #457CF4;
                        }
                        .progress {
                            transform:rotate(180deg);
                        }
                    }
                    .red {
                        width: 535px;
                        span {
                            padding: 0 10px;
                            color: #FF4645;
                        }
                    }
                    .imgs {
                        width: 20px;
                        height: 20px;
                        margin: 0 5px;
                        img {
                            width: 100%;
                            height: 100%;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .none {
            font-size: 16px;
            padding-top: 20px;
            text-align: center;
        }
    }
</style>

<style lang="less">
    .play-teams {
        .el-progress-bar__outer {
            background-color: #DADADA;
        }
        .el-progress-bar__outer,
        .el-progress-bar__inner {
            border-radius: 0 100px 100px 0;
        }
        .blue {
            .el-progress-bar__inner {
                background: linear-gradient(270deg, #457CF4 0%, #4597F4 100%);
            }
        }
        .red {
            .el-progress-bar__inner {
                background: linear-gradient(90deg, #FF4645 0%, #FF4571 100%);
            }
        }
    }
</style>
