<template>
    <div class="play-rank">
        <TitleView :titleName="name" />
        <div class="rank">
            <SelectView 
                :size="'small'" 
                class="selectBox" 
                @getSelectIds="getSelectIds"
            />
            <div class="player flex flex_between" v-for="item in rankingList" :key="item.player_id">
                <div class="img" :title="item.player_nick_name">
                    <img :src="item.champion_image">
                    <span>{{item.level}}</span>
                </div>
                <div class="num flex flex_column flex_between">
                    <div :class="['flex flex_between',{
                        blue: item.faction === 'blue',
                        red: item.faction === 'red'
                    }]">
                        <p>{{item.champion_name}}</p>
                        <p>{{parseInt(item.count) || 0}}</p>
                    </div>
                    <Progress 
                        :progressData="progressData"
                        :progressColor="item.faction === 'blue'?'#457CF4':'#FF4645'"
                        :rateData="parseInt(item.count)>5000?parseInt(item.count)/200:parseInt(item.count)<20?parseInt(item.count)*5:parseInt(item.count)/20 || 0"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, inject, watch, provide } from 'vue'
    import { lolDataRank } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const diffData = reactive({
                name: '数据排行',
                battleId: 0,
                selectList: [
                    {
                        placeholder: '当前经济',
                        selectValue: '',
                        list: [
                            {
                                val: 1,
                                name_cn: '当前经济'
                            },
                            {
                                val: 2,
                                name_cn: '补刀'
                            },
                            {
                                val: 3,
                                name_cn: '分均补刀'
                            },
                            {
                                val: 4,
                                name_cn: '分均金钱'
                            },
                            {
                                val: 5,
                                name_cn: '分均经验'
                            },
                            {
                                val: 6,
                                name_cn: '分均伤害'
                            },
                            {
                                val: 7,
                                name_cn: '分均承伤'
                            },
                            {
                                val: 8,
                                name_cn: '插眼/排眼'
                            }
                        ]
                    }
                ],
                progressData: {
                    showText: false,
                    width: 7
                },
                rankingList: [],
                rankingInfo: 1
            })
            
            const battleid = inject('battleid')
            watch(battleid, () => {
                diffData.battleId = battleid
                getLolDataRank(diffData.battleId)
            })

            const getLolDataRank = (battleId) => {
                let params = {
                    battle_id: battleId,
                    ranking_info: diffData.rankingInfo
                }
                lolDataRank(params).then( res => {
                    if(res.code === 200) {
                        diffData.rankingList = res.data
                    }
                })
            }

            const getSelectIds = (gameId,tournamentId,teamId,val) => {
                diffData.rankingInfo = val
                getLolDataRank(diffData.battleId)
            }

            provide('selectData', diffData)

            return {
                ...toRefs(diffData),
                getLolDataRank,
                getSelectIds,
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')),    // 页面标题
            SelectView: defineAsyncComponent(() => import('@/components/common/select/select')), // 下拉框
            Progress: defineAsyncComponent(() => import('@/components/common/progress/progress')) // 进度条
        }
    })
</script>

<style lang="less" scoped>
    .play-rank {
        width: 298px;
        .rank {
            width: 100%;
            height: 400px;
            padding: 8px 15px;
            border-radius: 2px;
            box-sizing: border-box;
            background-color: #E3E5E8;
            .player {
                margin-top: 8px;
                .img {
                    width: 27px;
                    height: 27px;
                    cursor: pointer;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    span {
                        color: #fff;
                        padding: 0 2px;
                        font-size: 12px;
                        transform: scale(0.7);
                        background-color: rgba(0,0,0,.7);
                        position: absolute;
                        right: -3px;
                        bottom: -3px;
                    }
                }
                .num {
                    width: 230px;
                    height: 27px;
                    .blue {
                        color: #457CF4;
                    }
                    .red {
                        color: #FF4645;
                    }
                }
            }
        }
    }
</style>