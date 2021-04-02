<template>
    <div class="players">
        <table align="left">
            <thead :class="side">
                <th>
                    <div class="flex flex_start flex_only_center">
                        <img :src="teams.image" class="team-icon">
                        <span :title="teams.name">{{teams.name}}</span>
                    </div>
                </th>
                <th>
                    <p v-if="isNormal" :title="'首杀差'">Op.duels</p>
                </th>
                <th>
                    <i class="icon-buy" v-if="!isNormal" :title="'主武器'"></i>
                    <p v-else :title="'多杀'">2+kills</p>
                </th>
                <th>
                    <i class="icon-add" v-if="!isNormal" :title="'血量'"></i>
                    <p v-else :title="'KAST'">KAST</p>
                </th>
                <th>
                    <i class="icon-head" v-if="!isNormal" :title="'防弹衣头盔'"></i>
                    <p v-else :title="'1VN残局获胜'">1vsX</p>
                </th>
                <th :title="'金钱'">$</th>
                <th :title="'击杀'">K</th>
                <th :title="'助攻'">A</th>
                <th :title="'死亡'">D</th>
                <th :title="'ADR'">ADR</th>
            </thead>
            <tbody>
                <tr v-for="item in players"
                    :key="item.player.player_id"
                    :class="[side,{dark:parseInt(item.hp)<=0}]"
                >
                    <td>{{item.player.nick_name}}</td>
                    <td>
                        <i class="td-win" v-if="item.has_defusekit && !isNormal"></i>
                        <!-- 首杀差 -->
                        <p v-if="isNormal">
                            {{item.first_kills || 0}}:{{item.first_deaths || 0}}
                        </p>
                    </td>
                    <td>
                        <div v-if="item.weapon.length > 0">
                            <div class="td-buy" v-for="key in item.weapon" :key="key.image">
                                <img class="big"
                                    :src="key.image"
                                    :title="key.name"
                                    v-if="key.kind === 'primary' && !isNormal" >
                                <img class="small"
                                    :src="key.image"
                                    :title="key.name"
                                    v-else-if="item.weapon.length === 1 && key.kind === 'secondary' && !isNormal">
                            </div>
                        </div>
                        <p v-if="isNormal">{{item.multi_kills || 0}}</p>
                    </td>
                    <td>
                        <div class="td-bar" v-if="!isNormal">
                            <Progress 
                                :progressData="progressData" 
                                :progressColor="parseInt(item.hp)>59?'#00AB49':parseInt(item.hp)>39?'#e8751a':'#D94629'"
                                :rateData="parseInt(item.hp) || 0" 
                            />
                            <p>{{item.hp}}</p>
                        </div>
                        <p v-if="isNormal">{{parseInt(item.kast*100) || 0 }}%</p>
                    </td>
                    <td>
                        <!-- 防弹衣 头盔 --> <!-- 全甲 -->
                        <i class="td-head" v-if="(item.has_kevlar && item.has_helmet) && !isNormal"></i>
                        <!-- 半甲 -->
                        <i class="td-head-b" v-if="(item.has_kevlar && !item.has_helmet) && !isNormal"></i>
                        <p v-if="isNormal">{{item.one_on_x_clutches || 0}}</p>
                    </td>
                    <td>${{item.money || 0}}</td>
                    <td>{{item.kills || 0}}</td>
                    <td>{{item.assists || 0}}</td>
                    <td>{{item.deaths || 0}}</td>
                    <td>{{item.adr || 0}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { defineComponent, defineAsyncComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        props: {
            isNormal: {
                type: Number,
                default: 0
            },
            side: {
                type: String,
                default: ''
            },
            players: {
                type: Array,
                default: () => []
            },
            teams: {
                type: Object,
                default: () => {}
            }
        },
        setup(props,ctx) {
            const data = reactive({
                progressData: {
                    showText: false,
                    width: 16
                }
            })
            return {
                ...toRefs(data)
            }
        },
        components: {
            Progress: defineAsyncComponent(() => import('@/components/common/progress/progress')) // 进度条
        }
    })
</script>

<style lang="less" scoped>
    .players {
        .ct {
            background-color: #008CD5;
        }
        .terrorists {
            background-color: #F6B600;
        }
        table {
            width: 1160px;
            color: #fff;
            margin: 10px 0;
            text-align: center;
            border-spacing: 0px 4px;
            border-collapse:separate;
            thead {
                cursor: pointer;
                line-height: 45px;
                th {
                    &:first-child {
                        width: 200px;
                    }
                    .team-icon {
                        width: 25px;
                        height: 25px;
                        margin: 0 10px;
                    }
                    .icon-buy {
                        width: 20px;
                        height: 18px;
                        display: block;
                        margin: 0 auto;
                        background: url('../../../../../../assets/imgs/game/csgo/buy.png') no-repeat 0 0;
                        background-size: 100%;
                    }
                    .icon-add {
                        width: 20px;
                        height: 20px;
                        display: block;
                        margin: 0 auto;
                        background: url('../../../../../../assets/imgs/game/csgo/health.png') no-repeat 0 0;
                        background-size: 100%;
                    }
                    .icon-head {
                        width: 18px;
                        height: 20px;
                        display: block;
                        margin: 0 auto;
                        background: url('../../../../../../assets/imgs/game/csgo/kevlar_helmet.png') no-repeat 0 0;
                        background-size: 100%;
                    }
                }
            }
            tbody {
                tr {
                    height: 40px;
                    &.ct,
                    &.terrorists {
                        opacity: 0.7;
                    }
                    &.dark {
                        background-color: rgba(147, 163, 171, .6);
                    }
                    td {
                        width: 100px;
                        &:first-child {
                            text-align: left;
                            padding-left: 10px;
                        }
                        .td-bar {
                            position: relative;
                            p {
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                transform: translate(-50%, -50%);
                            }
                        }
                        .td-buy {
                            width: 60px;
                            height: 20px;
                            margin: 0 auto;
                            cursor: pointer;
                            .big {
                                width: 100%;
                                height: 100%;
                            }
                            .small {
                                width: 46px;
                                height: 100%;
                            }
                        }
                        .td-win {
                            width: 20px;
                            height: 20px;
                            display: block;
                            margin: auto auto;
                            background: url('../../../../../../assets/imgs/game/csgo/csgo_ct.png') no-repeat 0 0;
                            background-size: 100%;
                        }
                        .td-head {
                            width: 18px;
                            height: 20px;
                            display: block;
                            margin: auto auto;
                            background: url('../../../../../../assets/imgs/game/csgo/kevlar_helmet.png') no-repeat 0 0;
                            background-size: 100%;
                        }
                        .td-head-b {
                            width: 18px;
                            height: 20px;
                            display: block;
                            margin: auto auto;
                            background: url('../../../../../../assets/imgs/game/csgo/kevlar_helmet_b.png') no-repeat 0 0;
                            background-size: 100%;
                        }
                    }
                }
            }
        }
    }
</style>