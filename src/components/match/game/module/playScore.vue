<template>
    <div class="play-score">
        <TitleView :titleName="scoreName" />
        <div class="score flex flex_between flex_only_center">
            
            <div class="team flex flex_only_center" 
                :title="masterTeam.team_name"
                @click="gotoLink(masterTeam.team_id)">
                <img :src="masterTeam.team_image">
                <p class="beyond-ellipsis">{{masterTeam.team_name}}</p>
            </div>

            <div class="flex flex_center">
                <slot name="csgo_ct"></slot>

                <div class="vs">
                    {{masterTeam.team_score}} : {{guestTeam.team_score}}
                </div>

                <slot name="csgo_t"></slot>
            </div>

            <div class="team flex flex_only_center" 
                :title="guestTeam.team_name"
                @click="gotoLink(guestTeam.team_id)">
                <p class="beyond-ellipsis">{{guestTeam.team_name}}</p>
                <img :src="guestTeam.team_image">
            </div>

        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

    import { useRouter } from "vue-router"
    import { defineComponent, reactive, toRefs, ref, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const titleName = reactive({
                scoreName: '当前比分',
            })
            const masterTeam = ref({})
            const guestTeam = ref({})
            const gameData = inject('detail')
            watch(gameData, () => {
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
                ...toRefs(titleName),
                masterTeam,
                guestTeam,
                gameData,
                gotoLink
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-score {
        .score {
            width: 1200px;
            height: 60px;
            padding: 0 50px;
            border-radius: 2px;
            box-sizing: border-box;
            background: linear-gradient(90deg, #DAE0F2 0%, #EAE5E5 100%);
            .team {
                cursor: pointer;
                img {
                    width: 44px;
                    height: 44px;
                }
                p {
                    width: 120px;
                    padding: 0 20px;
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .vs {
                margin: 0 18px;
                font-size: 30px;
                font-weight: 600;
            }
        }
    }
</style>
