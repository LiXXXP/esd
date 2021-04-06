<template>
    <div class="logs">
        <div class="title">比赛日志：</div>
        <div class="cont" ref="scrollRef">
            <div class="list flex flex_only_end" v-for="item in events" :key="item.battle_timestamp">

                <div class="item flex flex_start flex_only_center"
                    v-if="item.event_type === 'round_start'">
                    <p>回合开始 （第{{item.round_ordinal}}回合）</p>
                </div>

                <div class="item flex flex_only_center"
                     v-if="item.killer && item.victim">
                    <p :class="item.killer.side">{{item.killer.nick_name}}</p>
                    <p>击杀了</p>
                    <p :class="item.victim.side">{{item.victim.nick_name}}</p>
                    <img :src="item.weapon.image">
                </div>

                <div class="item flex flex_only_center"
                    v-if="item.event_type === 'bomb_planted'">
                    <p :class="item.side">{{item.nick_name}}</p>
                    <p>放置了炸弹</p>
                    <div class="flex flex_start">
                        ( <p class="ct">{{item.survived_players_ct}}</p>
                        on <p class="terrorist">{{item.survived_players_t}}</p> )
                    </div>
                </div>

                <div class="item" v-if="item.event_type === 'player_joined'">
                    <p>{{item.nick_name}} 进入游戏</p>
                </div>

                <div class="item" v-if="item.event_type === 'player_suicide'">
                    <p class="info">{{item.nick_name}} 自杀</p>
                </div>

                <div class="item flex flex_only_center"
                    v-if="item.event_type === 'round_end'">
                    <p>回合结束</p>
                    <div class="flex flex_start">
                        ( <p class="ct">{{item.ct_score}}</p>
                        on <p class="terrorist">{{item.t_score}}</p> )
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, nextTick, watch } from 'vue'

    export default defineComponent({
        props: {
            events: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {

            const scrollRef = ref(0)

            watch(props.events,() => {
                nextTick(() => {
                    scrollRef.value.scrollTop = scrollRef.value.scrollHeight
                })
            })

            return {
                scrollRef
            }
        }
    })
</script>

<style lang="less" scoped>
    .logs {
        width: 680px;
        height: 142px;
        margin: 0 auto;
        .title {
            color: #D3D3D3;
            font-weight: 600;
            padding-top: 10px;
        }
        .cont {
            height: 100px;
            margin: 5px 0;
            overflow-y: auto;
            box-sizing: border-box;
            &::-webkit-scrollbar {
                width: 3px;
                background-color: rgba(140, 140, 140, .3);
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 2px;
                background-color: rgba(140, 140, 140, .3);
            }
            .list {
                .item {
                    margin-bottom: 5px;
                    p {
                        padding: 0 3px;
                        &.ct {
                            color: #008BD3;
                        }
                        &.terrorist {
                            color: #F6B600;
                        }
                        &.info {
                            color: #D94629;
                        }
                    }
                    img {
                        width: auto;
                        height: 18px;
                        margin-left: 10px;
                    }
                }
            }
        }
    }
</style>