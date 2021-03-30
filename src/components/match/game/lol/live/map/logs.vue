<template>
    <div class="logs">
        <div class="title">比赛日志：</div>
        <div class="cont">
            <div class="list flex flex_only_end" v-for="item in events" :key="item.position">

                <span>{{durationTime(item.ingame_timestamp)}}</span>

                <img :src="item.killer.champion.image.image">

                <span :class="item.killer.faction">
                    {{item.killer.champion.name}}
                </span>

                <span v-if="item.event_type === 'building_kill'">
                    摧毁了
                </span>

                <span v-else>击杀了</span>

                <img :src="item.victim.ingame_obj_type.champion.image.image" v-if="item.event_type === 'player_kill'">

                <span :class="item.victim.ingame_obj_type.faction" v-if="item.event_type === 'building_kill'">
                    {{item.victim.ingame_obj_type.faction === 'blue'?'蓝':'红'}}方防御塔
                </span>

                <span v-if="item.first_event_type === 'first_dragon'">
                    元素巨龙 (首元素巨龙)
                </span>

                <span v-if="item.first_event_type === 'first_baron_nashor'">
                    纳什男爵 (首纳什男爵)
                </span>

                <span v-if="item.first_event_type === 'first_rift_herald'">
                    峡谷先锋 (首峡谷先锋)
                </span>

                <span v-if="item.first_event_type === 'first_inhibitor'">
                    水晶 (首水晶)
                </span>

                <span v-if="item.first_event_type === 'first_turret'">
                    (首塔)
                </span>

                <span v-if="item.first_event_type === 'first_blood'">
                    (首先获得一血)
                </span>

                <span v-if="item.first_event_type === 'first_to_5_kills'">
                    (首先获得五杀)
                </span>

                <span v-if="item.first_event_type === 'first_to_10_kills'">
                    (首先获得十杀)
                </span>

            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, computed } from 'vue'
    import { formatSeconds } from '@/scripts/utils'

    export default defineComponent({
        props: {
            events: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {

            const durationTime = computed(() => {
                return function(sec) {
                    return formatSeconds(sec)
                }
            })

            return {
                durationTime
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
                margin-bottom: 5px;
                span {
                    color: #D3D3D3;
                    &.red {
                        color: #C1200D;
                        padding-right: 5px;
                    }
                    &.blue {
                        color: #457CF4;
                        padding-right: 5px;
                    }
                }
                img {
                    width: 20px;
                    height: 20px;
                    margin: 0 5px;
                }
            }
        }
    }
</style>