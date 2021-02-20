<template>
    <div class="play-score">
        <TitleView :titleName="scoreName" />
        <div class="score flex flex_between flex_only_center">
            <div class="team flex flex_only_center">
                <img :src="masterTeam.team_image">
                <p>{{masterTeam.team_name}}</p>
            </div>
            <div class="vs">{{masterTeam.team_score}} : {{guestTeam.team_score}}</div>
            <div class="team flex flex_only_center">
                <p>{{guestTeam.team_name}}</p>
                <img :src="guestTeam.team_image">
            </div>
        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

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
            return {
                ...toRefs(titleName),
                masterTeam,
                guestTeam,
                gameData
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
                img {
                    width: 44px;
                    height: 44px;
                }
                p {
                    padding: 0 20px;
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .vs {
                font-size: 30px;
                font-weight: 600;
            }
        }
    }
</style>
