<template>
    <div>
        <div class="map-live">
            
        </div>
    </div>
    
</template>

<script>

    import { formatSeconds } from '@/scripts/utils'

    export default {
        data () {
            return {
                websock: null, // WebSocket
                tabIndex: 0,  // 切换tab状态
                framesData: null,
                eventsData: [],
            }
        },
        created() {
            this.initWebSocket('frames')
            this.initWebSocket('events')
        },
        destroyed () {
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
    }
</style>
