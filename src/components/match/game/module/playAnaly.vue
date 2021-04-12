<template>
    <div class="play-analy">
        <TitleView :titleName="analyName" v-if="battleList.length>0" />
        <div class="analy flex flex_only_center flex_wrap" v-if="battleList.length>0">
            <div :class="['nav flex flex_center',{active: currentIndex === -1}]"
                @click="getBattleId(-1,0)">
                <p>对战分析</p>
            </div>
            <div :class="['nav flex flex_center',{active: currentIndex === index}]" 
                v-for="(item,index) in battleList" 
                :key="item.battle_id"
                @click="getBattleId(index,item.battle_id)">
                <img :src="item.winner_team_image" v-if="item.winner_team_image">
                <p>第{{item.order}}局</p>
                <i class="win" v-if="item.winner_team_id"></i>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({
        emits: ['getBattleId'],
        setup(props,{ emit }) {

            const battleDate = reactive({
                analyName: '对战分析',
                currentIndex: -1,
                battleList: []
            })

            const gameData = inject('detail')
            watch(gameData, () => {
                battleDate.battleList = gameData.gameDetail.battle_info
            })

            const battleData = inject('battle')
            watch(battleData, () => {
                battleDate.battleList = battleData.battleInfo
            })

            const getBattleId = (index,battleId) => {
                battleDate.currentIndex = index
                emit('getBattleId',battleId)
            }

            return {
                ...toRefs(battleDate),
                getBattleId
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')) // 页面标题
        }
    })
</script>

<style lang="less" scoped>
    .play-analy {
        .analy {
            .nav {
                width: 235px;
                height: 60px;
                cursor: pointer;
                margin-right: 6px;
                margin-bottom: 6px;
                border-radius: 2px;
                background-color: #CACCCF;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: #fff;
                    background-color: #B29873;
                }
                img {
                    width: 43px;
                    height: 43px;
                }
                p {
                    padding: 0 20px;
                    font-size: 16px;
                    font-weight: 500;
                }
                i {
                    width: 53px;
                    height: 29px;
                    display: block;
                    background: url('../../../../assets/imgs/game/win.png') no-repeat 0 0;
                    background-size: 100%;
                }
            }
        }
    }
</style>
