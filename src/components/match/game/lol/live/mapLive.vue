<template>
    <div>
        <div class="map-live" v-if="framesData">
            <div class="line"></div>
            <div class="head flex flex_between flex_only_center">
                <div class="score blue">{{framesData.match_scores[0].score}}</div>
                <div class="team blue flex flex_center">
                    <img :src="framesData.match_scores[0].image">
                    <p>{{framesData.match_scores[0].name}}</p>
                </div>
                <div class="vs">
                    <span class="blue">
                        <span>{{thousands(framesData.factions[0].gold)}}</span>
                        <span>{{framesData.factions[0].kills}}</span>
                    </span>
                    <span>VS</span>
                    <span class="red">
                        <span>{{framesData.factions[1].kills}}</span>
                        <span>{{thousands(framesData.factions[1].gold)}}</span>
                    </span>
                </div>
                <div class="team red flex flex_center">
                    <p>{{framesData.match_scores[1].name}}</p>
                    <img :src="framesData.match_scores[1].image">
                </div>
                <div class="score red">{{framesData.match_scores[1].score}}</div>
            </div>
            <div class="round flex flex_between flex_only_end">
                <RoleView 
                    :isReverse="false"
                    :faction="framesData.factions[0]"
                    :banArray="banData.blue"
                />
                <div class="time">
                    <p class="num">第{{framesData.battle_order}}局</p>
                    <p>{{durationTime(framesData.duration)}}</p>
                </div>
                <RoleView 
                    :isReverse="true" 
                    :faction="framesData.factions[1]"
                    :banArray="banData.red"
                />
            </div>
            <div class="flex flex_between">
                <PlayersView :players="framesData.factions[0].players" />
                <CanvasView :map="framesData.map" :coordinate="framesData.factions" />
                <PlayersView :players="framesData.factions[1].players" />
            </div>
            <LogsView :events="eventsData" />
        </div>
        <div v-else class="none">暂无直播数据</div>
    </div>
</template>

<script>

    import RoleView from '@/components/match/game/lol/live/map/role'       // 角色
    import PlayersView from '@/components/match/game/lol/live/map/players' // 选手
    import CanvasView from '@/components/match/game/lol/live/map/canvas'   // 地图
    import LogsView from '@/components/match/game/lol/live/map/logs'       // 日志

    import { formatSeconds, formatNumber } from '@/scripts/utils'

    export default {
        data () {
            return {
                websock: null, // WebSocket
                framesData: null,
                eventsData: [],
                banData: {
                    blue: [],
                    red: []
                }
            }
        },
        created() {
            this.initWebSocket('frames')
            this.initWebSocket('events')
        },
        unmounted () {
            // 销毁监听
            this.websock.close()
            this.websock = null
        },
        methods: {
            // 初始化weosocket
            initWebSocket(url){
                const wsuri = `ws://live.elementsdata.cn/v1/pbpdata/${this.$route.query.matchId}/${url}?token=HCI0p9JsDmUZEc5ueFitw5emDfKQdanvsxf2C9RjzRM5K1gwPdQ`
                this.websock = new WebSocket(wsuri)
                this.websock.onmessage = this.websocketonmessage
                this.websock.onerror = this.websocketonerror
                this.websock.onclose = this.websocketclose
            },
            // 连接建立失败重连
            websocketonerror(){
                this.initWebSocket('frames')
                this.initWebSocket('events')
            },
            // 数据接收
            websocketonmessage(e){
                const redata = JSON.parse(e.data)
                if(e.currentTarget.url.indexOf('frames') > 0) {
                    if(redata.factions[0].faction !== 'blue') {
                        redata.factions.reverse()
                    }
                    if(redata.factions[0].team.team_id !== redata.match_scores[0].team_id) {
                        redata.match_scores.reverse()
                    }
                    this.framesData = redata
                } else {
                    this.eventsData.push(redata)
                    if(redata.event_type === 'champion_banned') {
                        if(redata.faction === 'blue') {
                            this.banData.blue.push(redata.champion)
                        }   else {
                            this.banData.red.push(redata.champion)
                        }
                    }
                }
            },
            // 关闭
            websocketclose(e){
                console.log('断开连接',e)
            },
        },
        computed: {
            durationTime(sec) {
                return function(sec) {
                    return formatSeconds(sec)
                }
            },
            thousands() {
                return function(num) {
                    return formatNumber(num)
                }
            }
        },
        components: {
            RoleView,
            PlayersView,
            CanvasView,
            LogsView,
        }
    }
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
