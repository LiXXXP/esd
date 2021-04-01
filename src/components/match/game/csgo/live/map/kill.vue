<template>
    <div class="kill">
        <table cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td v-for="(item,i) in rounds[0].rounds_history" :key="item">
                        <div class="bar">
                            <p v-for="(key,index) in rounds[0].players" 
                                :key="key.player_id"
                                :class="[{
                                    ct: rounds[0].team.team_id === startCT && i<15 || rounds[0].team.team_id === startT && i>=15,
                                    terrorists: rounds[0].team.team_id === startT && i<15 || rounds[0].team.team_id === startCT && i>=15,
                                    die: item.survived_players<=index
                                }]"
                            ></p>
                        </div>
                    </td>
                    <td v-for="item in (30-rounds[0].rounds_history.length)" :key="item"></td>
                </tr>
                <tr>
                    <td v-for="item in rounds[0].rounds_history" :key="item">
                        <div class="icon">
                            <img src="../../../../../../assets/imgs/game/csgo/ct01.png" 
                            v-if="item.round_end_type === 'cts_win'">
                            <img src="../../../../../../assets/imgs/game/csgo/ct02.png" 
                            v-if="item.round_end_type === 'bomb_defused'">
                            <img src="../../../../../../assets/imgs/game/csgo/ct03.png" 
                            v-if="item.round_end_type === 'target_saved'">
                            <img src="../../../../../../assets/imgs/game/csgo/t01.png" 
                            v-if="item.round_end_type === 'target_bombed'">
                            <img src="../../../../../../assets/imgs/game/csgo/t02.png" 
                            v-if="item.round_end_type === 'terrorists_win'">
                        </div>
                    </td>
                    <td v-for="item in (30-rounds[0].rounds_history.length)" :key="item"></td>
                </tr>
                <tr>
                    <td v-for="item in rounds[1].rounds_history" :key="item">
                        <div class="icon">
                            <img src="../../../../../../assets/imgs/game/csgo/ct01.png" 
                            v-if="item.round_end_type === 'cts_win'">
                            <img src="../../../../../../assets/imgs/game/csgo/ct02.png" 
                            v-if="item.round_end_type === 'bomb_defused'">
                            <img src="../../../../../../assets/imgs/game/csgo/ct03.png" 
                            v-if="item.round_end_type === 'target_saved'">
                            <img src="../../../../../../assets/imgs/game/csgo/t01.png" 
                            v-if="item.round_end_type === 'target_bombed'">
                            <img src="../../../../../../assets/imgs/game/csgo/t02.png" 
                            v-if="item.round_end_type === 'terrorists_win'">
                        </div>
                    </td>
                    <td v-for="item in (30-rounds[1].rounds_history.length)" :key="item"></td>
                </tr>
                <tr>
                    <td v-for="(item,i) in rounds[1].rounds_history" :key="item">
                        <div class="bar">
                            <p v-for="(key,index) in rounds[1].players" 
                                :key="key.player_id"
                                :class="[{
                                    ct: rounds[1].team.team_id === startCT && i<15 || rounds[1].team.team_id === startT && i>=15,
                                    terrorists: rounds[1].team.team_id === startT && i<15 || rounds[1].team.team_id === startCT && i>=15,
                                    die: item.survived_players<=index
                                }]"
                            ></p>
                        </div>
                    </td>
                    <td v-for="item in (30-rounds[1].rounds_history.length)" :key="item"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        props: {
            rounds: {
                type: Array,
                default: () => []
            },
            startCT: {
                type: Number,
                default: 0
            },
            startT: {
                type: Number,
                default: 0
            }
        },
        setup(props,ctx) {

            return {
                
            }
        }
    })
</script>

<style lang="less" scoped>
    @ct: #008CD5;
    @t: #F6B600;
    @die: #303030;
    .kill {
        table {
            width: 100%;
            height: 150px;
            border-collapse: collapse;
            tr {
                border-bottom: 1px solid #CECECE;
                &:last-child {
                    border: 0;
                }
                td {
                    width: 32px;
                    &:nth-child(15){
                        border-right: 1px solid #CECECE;
                    }
                }
            }
        }
        .bar {
            margin-left: 6px;
            p {
                width: 16px;
                height: 2px;
                margin-bottom: 2px;
                background-color: #999;
                &.ct {
                    background-color: @ct;
                }
                &.terrorists {
                    background-color: @t;
                }
                &.die {
                    background-color: @die;
                }
            }
        }
        .icon {
            img {
                width: 20px;
                height: 20px;
                margin-left: 5px;
            }
        }
    }
</style>