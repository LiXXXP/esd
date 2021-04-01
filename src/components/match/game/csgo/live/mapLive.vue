<template>
    <div>
        <div v-if="framesData">
            <div class="flex flex_end">
                <div class="tab flex flex_center">
                    <p :class="{active: tabIndex === 0}"
                        @click="tabIndex = 0"
                    >Normal</p>
                    <p :class="{active: tabIndex === 1}"
                        @click="tabIndex = 1"
                    >Advanced</p>
                </div>
            </div>
            <div class="map-live">
                <img :src="framesData.map.image.thumbnail" class="bg">
                <div class="cont">
                    <div class="score flex flex_only_center flex_between">
                        <div>Ronud-{{framesData.current_round}} {{framesData.map.name}} (map{{framesData.battle_order}})</div>
                        <div class="num">
                            <span :class="framesData.side[0].side">{{framesData.side[0].score}}</span>
                            <span> : </span>
                            <span :class="framesData.side[1].side">{{framesData.side[1].score}}</span>
                        </div>
                        <div class="time">{{durationTime(framesData.duration)}}</div>
                    </div>
                    <PlayersView 
                        :isNormal="tabIndex"
                        :side="framesData.side[0].side"
                        :players="framesData.side[0].players" 
                        :teams="framesData.side[0].team"
                    />
                    <KillView 
                        :rounds="framesData.side"
                        :startCT="framesData.starting_ct.team_id"
                        :startT="framesData.starting_t.team_id"
                    />
                    <PlayersView 
                        :isNormal="tabIndex"
                        :side="framesData.side[1].side"
                        :players="framesData.side[1].players" 
                        :teams="framesData.side[1].team"
                    />
                </div>
                <LogsView :events="eventsData" />
            </div>
        </div>
        <div v-else class="none">暂无直播数据</div>
    </div>
</template>

<script>

    import PlayersView from '@/components/match/game/csgo/live/map/players' // 选手
    import KillView from '@/components/match/game/csgo/live/map/kill'       // 击杀
    import LogsView from '@/components/match/game/csgo/live/map/logs'       // 日志

    import { formatSeconds } from '@/scripts/utils'

    export default {
        data () {
            return {
                websock: null, // WebSocket
                tabIndex: 0,  // 切换tab状态
                framesData: null,
                eventsData: [],
                tabIndex: 0
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
            tabNormal() {
                this.tabIndex = 0
            },
            tabAdvanced() {
                this.tabIndex = 1
            },
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
                    this.framesData = redata
                } else {
                    this.eventsData.push(redata)
                }
            },
            // 关闭
            websocketclose(e){
                console.log('断开连接',e)
            }
        },
        computed: {
            durationTime(sec) {
                return function(sec) {
                    return formatSeconds(sec)
                }
            }
        },
        components: {
            PlayersView,
            KillView,
            LogsView
        }
    }
</script>

<style lang="less" scoped>
    .tab {
        width: 160px;
        height: 25px;
        color: #333;
        cursor: pointer;
        line-height: 25px;
        margin-top: -45px;
        border: 1px solid#333;
        p {
            width: 80px;
            text-align: center;
            &.active {
                color: #fff;
                background-color: #333;
            }
        }
    }
    .map-live {
        width: 1200px;
        color: #fff;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        background-color: #333;
        .bg {
            width: 100%;
            height: 100%;
            opacity: 0.5;
            filter: alpha(opacity=50);
        }
        .cont {
            position: absolute;
            top: 20px;
            left: 20px;
            .score {
                div {
                    width: 200px;
                    font-size: 16px;
                    &.num {
                        font-size: 36px;
                        font-weight: 600;
                        text-align: center;
                        .ct {
                            color: #008CD5;
                        }
                        .terrorists {
                            color: #F6B600;
                        }
                    }
                    &.time {
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
