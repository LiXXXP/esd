<template>
    <div class="play-map">
        <TitleView :titleName="mapName" />
        <div class="info">

            <div class="map-tab flex flex_end">
                <div v-for="(item,index) in mapNav"
                    :key="item.name"
                    :class="{active: index === currentIndex}"
                    @click="currentIndex = index"
                >{{item.name}}</div>
            </div>

            <div class="map-bp flex flex_only_center" v-if="currentIndex===0">

                <div class="team">
                    <div class="master flex flex_only_center">
                        <img :src="masterTeam.team_image">
                        <p class="beyond-ellipsis" :title="masterTeam.team_name">
                            {{masterTeam.team_name}}
                        </p>
                    </div>
                    <div class="guest flex flex_only_center">
                        <img :src="guestTeam.team_image">
                        <p class="beyond-ellipsis" :title="guestTeam.team_name">
                            {{guestTeam.team_name}}
                        </p>
                    </div>
                </div>

                <div class="map flex flex_only_center">
                    <div class="map-item" v-for="item in mapInfo" :key="item.map_id">
                        <div class="block">
                            <img :src="item.map_square_image">
                            <p>{{item.map_name}}</p>
                        </div>
                        <p class="text">{{item.map_short_name}}</p>
                    </div>
                </div>

            </div>

            <div v-else class="map-fight flex flex_only_center">
                <img v-for="item in mapInfo"
                    :key="item.map_id"
                    :src="item.map_thumbnail">
            </div>

        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, ref, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const mapData = reactive({
                mapName: '地图信息',
                currentIndex: 0,   // 当前index
                mapNav: [          // 地图切换导航
                    {
                        name: '地图BP'
                    },
                    {
                        name: '对战地图'
                    }
                ],
                mapInfo: []
            })
            const masterTeam = ref({})
            const guestTeam = ref({})
            const gameData = inject('detail')
            watch(gameData, () => {
                masterTeam.value = gameData.gameDetail.teams_info.master_team_info
                guestTeam.value = gameData.gameDetail.teams_info.guest_team_info
                mapData.mapInfo = gameData.gameDetail.map_info
            })
            return {
                ...toRefs(mapData),
                masterTeam,
                guestTeam,
                gameData
            }
        },
        components: {
            TitleView: defineAsyncComponent(() => import('@/components/common/title/title')) // 页面标题
        }
    })
</script>

<style lang="less" scoped>
    .play-map {
        .info {
            margin-top: -25px;
            .map-tab {
                div {
                    width: 80px;
                    height: 25px;
                    color: #999;
                    cursor: pointer;
                    margin-left: 10px;
                    line-height: 25px;
                    text-align: center;
                    border-radius: 13px;
                    background-color: #D2D2D2;
                    &.active {
                        color: #fff;
                        background-color: #B29873;
                    }
                }
            }
            .map-bp {
                .team {
                    margin-right: 30px;
                    img {
                        width: 35px;
                        height: 35px;
                        margin-right: 10px;
                    }
                    p {
                        width: 60px;
                        color:#333;
                    }
                    .guest {
                        margin-top: 100px;
                    }
                }
                .map {
                    .map-item {
                        margin-right: 7px;
                        position: relative;
                        &:last-child {
                            margin-right: 0;
                        }
                        .block {
                            width: 130px;
                            height: 75px;
                            position: relative;
                            &:after,
                            &:before {
                                width: 0;
                                height: 0;
                                content: ' ';
                                margin: 3px 0;
                                display: block;
                                border: solid transparent;
                                position: absolute;
                            }
                            &:after {
                                left: 50%;
                                border-width: 5px;
                                transform: translate(-50%, 0);
                            }
                            &:before {
                                left: 50%;
                                border-width: 7px;
                                transform: translate(-50%, 0);
                            }
                            img {
                                width: 100%;
                                height: 100%;
                            }
                            p {
                                width: 100%;
                                color: #fff;
                                padding: 3px 0;
                                font-size: 12px;
                                text-align: center;
                                background-color: rgba(39,45,61,0.88);
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                        }
                        .text {
                            padding: 10px 0;
                            position: absolute;
                            left: 50%;
                            transform: translate(-50%, 0);
                        }
                        &:nth-child(odd) {
                            .block {
                                border: 1px solid #666;
                                &:after,
                                &:before {
                                    bottom: 100%;
                                }
                                &:after {
                                    border-bottom-color: #666;
                                }
                                &:before {
                                    border-bottom-color:#666;
                                }
                            }
                            .text {
                                bottom: 100%;
                                color: #666;
                            }
                        }
                        &:nth-child(even) {
                            .block {
                                border: 1px solid #B29873;
                                &:after,
                                &:before {
                                    top: 100%;
                                }
                                &:after {
                                    border-top-color: #B29873;
                                }
                                &:before {
                                    border-top-color: #B29873;
                                }
                            }
                            .text {
                                color: #B29873;
                            }
                        }
                    }
                }
            }
            .map-fight {
                height: 170px;
                img {
                    width: 156px;
                    height: 100px;
                    margin-left: 30px;
                }
            }
        }
    }
</style>
