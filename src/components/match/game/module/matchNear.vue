<template>
    <div class="near">
        <TitleView :titleName="titleName" v-if="list.lenght>0" />
        <div class="clearfix" v-if="list.lenght>0">
            <div :class="['block',{'f-left': index === 0,'f-right': index === 1}]" 
                v-for="(item,index) in list" :key="item.team_id">
                <div class="team flex flex_only_center">
                    <img :src="item.team_image">
                    <p>{{item.team_name}}</p>
                </div>
                <div class="board">
                    <el-collapse>
                        <el-collapse-item v-for="key in item.match_list" :key="key.match_id">
                            <template #title>
                                <div class="title">
                                    <p class="beyond-ellipsis">{{key.tournament_name}}</p>
                                    <p class="time">{{key.match_begin_time}}</p>
                                </div>
                                <div class="rank">{{key.match_type_number}}</div>
                                <div class="enemy flex flex_only_center">
                                    <img :src="key.enemy_team_image">
                                    <p class="beyond-ellipsis">{{key.enemy_team_name}}</p>
                                </div>
                                <div>{{key.score}}</div>
                            </template>
                            <div v-for="battle in key.battle_list" :key="battle.battle_id">
                                <div class="cont flex flex_around">
                                    <p>{{battle.battle_order}}</p>
                                    <p v-if="battle.duration">{{battle.duration}}</p>
                                    <p v-if="battle.battle_score">{{battle.battle_score}}</p>
                                    <p v-if="battle.map_short_name">{{battle.map_short_name}}</p>
                                    <p>{{battle.battle_score}}</p>
                                    <p :class="['state',{win:battle.battle_is_winner}]">
                                        {{battle.battle_is_winner?'胜':'负'}}
                                    </p>
                                </div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRoute } from "vue-router"
    import { matchNearInfo } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {

            const route = useRoute()

            const nearData = reactive({
                titleName: '近期比赛情况',
                list: []
            })

            const getMatchNearInfo = () => {
                let params = {
                    game_id: parseInt(route.query.gameId),
                    match_id: parseInt(route.query.matchId)
                }
                matchNearInfo(params).then(res => {
                    if(res.code === 200) {
                        nearData.list = res.data
                    }
                })
            }

            onMounted(() => {
                getMatchNearInfo()
            })
            return {
                ...toRefs(nearData)
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')) // 页面标题
        }
    })
</script>

<style lang="less" scoped>
    .near {
        .block {
            width: 580px;
            .team {
                margin-bottom: 15px;
                img {
                    width: 50px;
                    height: 50px;
                    margin-right: 10px;
                }
                p {
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .board {
                .title {
                    width: 200px;
                    line-height: 20px;
                    padding-left: 10px;
                    .time {
                        color: #666;
                    }
                }
                .rank {
                    padding-left: 20px;
                }
                .enemy {
                    width: 200px;
                    padding-left: 20px;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 10px;
                    }
                }
                .cont {
                    p {
                        width: 100px;
                        &.state {
                            color: #FA4659;
                            &.win {
                                color: #30B870;
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<style lang="less">
    .near {
        .board {
            .el-collapse-item__header,
            .el-collapse-item__wrap {
                background-color: #E3E5E8;
                border-bottom: 3px solid #EBEEF5;
            }
            .el-collapse-item__content {
                padding-bottom: 0;
            }
        }
    }
</style>
