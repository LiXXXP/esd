<template>
    <div class="map-live">
        <div class="line"></div>
        <div class="head flex flex_between flex_only_center">
            <div class="score blue">0</div>
            <div class="team blue flex flex_center">
                <img src="">
                <p>LGD</p>
            </div>
            <div class="vs">
                <span class="blue">30.1k<span>3</span></span>
                <span>VS</span>
                <span class="red"><span>5</span>33.7k</span>
            </div>
            <div class="team red flex flex_center">
                <p>SN</p>
                <img src="">
            </div>
            <div class="score red">2</div>
        </div>
        <div class="round flex flex_between flex_only_end">
            <RoleView :isReverse="false" />
            <div class="time">
                <p class="num">第三局</p>
                <p>18:10</p>
            </div>
            <RoleView :isReverse="true" />
        </div>
        <div class="flex flex_between">
            <PlayersView />
            <CanvasView />
            <PlayersView />
        </div>
        <LogsView />
    </div>
</template>

<script>
    import RoleView from '@/components/match/game/lol/live/map/role.vue'        // 角色
    import PlayersView from '@/components/match/game/lol/live/map/players.vue'  // 选手
    import CanvasView from '@/components/match/game/lol/live/map/canvas.vue'    // 地图
    import LogsView from '@/components/match/game/lol/live/map/logs.vue'        // 日志

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            
            return {
                
            }
        },
        components: {
            RoleView,
            PlayersView,
            CanvasView,
            LogsView
        }
    })
</script>

<style lang="less" scoped>
    .map-live {
        width: 1200px;
        height: 760px;
        color: #fff;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #333;
        .line {
            width: 100%;
            height: 3px;
            border: 1px solid #563C10;
            box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.55);
            background: linear-gradient(86deg, #6A5531 0%, #93846A 50%, #6A5531 100%);
        }
        .head {
            position: relative;
            background-color: rgba(42, 23, 148, .2);
            .score {
                width: 40px;
                height: 55px;
                z-index: 999;
                color: #fff;
                font-size: 36px;
                font-weight: 600;
                line-height: 55px;
                border-radius: 1px;
                text-align: center;
                background: linear-gradient(56deg, #6A5531 0%, #93846A 50%, #6A5531 100%);
                position: absolute;
                top: -5px;
                &.blue {
                    left: 0;
                }
                &.red {
                    right: 0;
                }
            }
            .team {
                color: #fff;
                width: 355px;
                height: 50px;
                font-size: 24px;
                font-weight: 600;
                &.blue {
                    background: linear-gradient(89.37deg, #36D1DC 0%, #5B86E5 100%);
                    transform:skew(150deg);
                    -webkit-transform: skew(150deg);
                    -moz-transform: skew(150deg);
                    -o-transform: skew(150deg);
                    img,p {
                        transform:skew(-150deg);
                        -webkit-transform: skew(-150deg);
                        -moz-transform: skew(-150deg);
                        -o-transform: skew(-150deg);
                    }
                }
                &.red {
                    background: linear-gradient(270deg, #CF4B3D 0%, #C01E0B 100%);
                    transform:skew(30deg);
                    -webkit-transform: skew(30deg);
                    -moz-transform: skew(30deg);
                    -o-transform: skew(30deg);
                    img,p {
                        transform:skew(-30deg);
                        -webkit-transform: skew(-30deg);
                        -moz-transform: skew(-30deg);
                        -o-transform: skew(-30deg);
                    }
                }
                img {
                    width: 38px;
                    height: 38px;
                    margin: 0 27px;
                    border-radius: 100%;
                }
            }
            .vs {
                color: #fff;
                font-size: 18px;
                font-weight: 500;
                .blue {
                    font-size: 24px;
                    color: #4950F5;
                    background: linear-gradient(0deg, #5A88E5 0%, #36D1DC 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    span {
                        padding: 0 20px 0 45px;
                    }
                }
                .red {
                    font-size: 24px;
                    color: #EA054A;
                    background: linear-gradient(184deg, #CF4B3D 0%, #C01E0B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    span {
                        padding: 0 45px 0 20px;
                    }
                }
            }
        }
        .round {
            font-size: 18px;
            margin-bottom: 15px;
            .num {
                color: #999;
                padding: 10px 0;
            }
        }
    }
</style>
