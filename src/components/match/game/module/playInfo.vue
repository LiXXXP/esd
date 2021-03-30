<template>
    <div class="play-info">
        <TitleView :titleName="infoName" />
        <div class="tab flex flex_center">
            <p v-for="(item,index) in liveList" 
                :key="item.title"
                :class="{active: currentIndex === index}"
                @click="currentIndex = index"
            >{{item.title}}</p>
        </div>
        <VideoLive v-show="!currentIndex" />
        <CSGOMapLive v-if="currentIndex && gameId === 1" />
        <LoLMapLive v-if="currentIndex && gameId === 2" />
    </div>
</template>

<script>

    import VideoLive from '@/components/match/game/module/videoLive'    // 视频直播
    import CSGOMapLive from '@/components/match/game/csgo/live/mapLive' // csgo 图文直播
    import LoLMapLive from '@/components/match/game/lol/live/mapLive'   // lol 图文直播

    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute } from "vue-router"
    import { liveStreaming } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const route = useRoute()
            const infoData = reactive({
                infoName: '比赛信息',
                streamList: [],
                liveList: [
                    {
                        title: '视频直播'
                    },
                    {
                        title: '图文直播'
                    }
                ],
                currentIndex: 0,
                gameId: parseInt(route.query.gameId)
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
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')), // 页面标题
            VideoLive,
            CSGOMapLive,
            LoLMapLive
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
            margin-bottom: 20px;
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
