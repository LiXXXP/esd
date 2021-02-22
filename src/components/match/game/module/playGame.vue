<template>
    <div class="play-game">
        <div class="flex flex_between">
            <div class="flex flex_only_center">
                <div class="team" 
                    :title="masterTeam.team_name"
                    @click="gotoLink(masterTeam.team_id)">
                    <img :src="masterTeam.team_image">
                    <p class="beyond-ellipsis">{{masterTeam.team_name}}</p>
                </div>
                <div class="score blue">{{masterTeam.team_score}}</div>
            </div>
            <div class="info">
                <p>{{playData.scheduled_begin_at}}</p>
                <p>{{playData.tournament_name}}</p>
                <p>{{playData.match_type_number}}</p>
                <p>{{playData.status}}</p>
            </div>
            <div class="flex flex_only_center">
                <div class="score red">{{guestTeam.team_score}}</div>
                <div class="team" 
                    :title="guestTeam.team_name"
                    @click="gotoLink(guestTeam.team_id)">
                    <img :src="guestTeam.team_image">
                    <p class="beyond-ellipsis">{{guestTeam.team_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router"
    import { defineComponent, ref, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const playData = ref({})
            const masterTeam = ref({})
            const guestTeam = ref({})
            const gameData = inject('detail')
            watch(gameData, () => {
                playData.value = gameData.gameDetail
                masterTeam.value = gameData.gameDetail.teams_info.master_team_info
                guestTeam.value = gameData.gameDetail.teams_info.guest_team_info
            })
            const router = useRouter()
            const gotoLink = (id) => {
                router.push({
                    path: '/mean/detail',
                    query: {
                        teamId: id
                    }
                })
            }
            return {
                playData,
                masterTeam,
                guestTeam,
                gameData,
                gotoLink
            }
        }
    })
</script>

<style lang="less" scoped>
    @blue: #467CF3;
    @red: #C0200D;
    .play-game {
        width: 100%;
        height: 180px;
        color: #fff;
        padding: 24px 88px;
        border-radius: 2px;
        box-sizing: border-box;
        background: linear-gradient(270deg, #333333 1%, #333333 100%);
        .team {
            cursor: pointer;
            img {
                width: 96px;
                height: 96px;
            }
            p {
                width: 96px;
                font-size: 18px;
                padding-top: 10px;
                text-align: center;
            }
        }
        .score {
            width: 50px;
            height: 70px;
            margin: 0 80px;
            font-size: 48px;
            font-weight: 600;
            line-height: 70px;
            border-radius: 2px;
            text-align: center;
            &.blue {
                background-color: @blue;
            }
            &.red {
                background-color: @red;
            }
        }
        .info {
            font-size: 18px;
            text-align: center;
            p {
                line-height: 1.5;
            }
        }
    }
</style>
