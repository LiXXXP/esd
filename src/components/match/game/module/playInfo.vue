<template>
    <div class="play-info">
        <TitleView :titleName="infoName" />
        <div class="tab flex flex_center">
            <p class="active">视频直播</p>
            <!-- <p>图文直播</p> -->
        </div>
        <VideoLive />
        <!-- <MapLive /> -->
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'             // 页面标题
    import VideoLive from '@/components/match/game/module/videoLive.vue'    // 视频直播
    import MapLive from '@/components/match/game/lol/live/mapLive.vue'      // 图文直播

    import { useRoute } from "vue-router"
    import { liveStreaming } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, provide, onMounted } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const infoData = reactive({
                infoName: '比赛信息',
                streamList: []
            })

            const getLiving = (matchId) => {
                let params = {
                    match_id: parseInt(matchId),
                }
                liveStreaming(params).then(res => {
                    if(res.code === 200) {
                        infoData.streamList = res.data.stream_list
                    }
                })
            }

            onMounted(() => {
                getLiving(route.query.matchId)
            })

            provide('streamList',infoData)

            return {
                ...toRefs(infoData),
            }
        },
        components: {
            TitleView,
            VideoLive,
            MapLive
        }
    })
</script>

<style lang="less" scoped>
    .play-info {
        .info {
            p {
                color: #666;
                font-weight: 500;
                padding-bottom: 9px;
            }
        }
        .tab {
            margin-bottom: 10px;
            p {
                width: 120px;
                height: 30px;
                cursor: pointer;
                font-size: 16px;
                color: #B29873;
                font-weight: 500;
                line-height: 30px;
                text-align: center;
                border: 1px solid #B29873;
                &.active {
                    color: #fff;
                    background-color: #B29873;
                }
            }
        }
    }
</style>
