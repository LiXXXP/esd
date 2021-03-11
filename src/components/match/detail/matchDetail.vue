<template>
    <div class="match-detail page-content">
        <div class="block flex flex_start flex_only_center">
            <div class="img">
                <img :src="detail.tournament_logo">
            </div>
            <div class="text">
                <p class="title beyond-ellipsis"
                    style="width:800px;"
                    :title="detail.tournament_name"
                >{{detail.tournament_name}}</p>
                <div class="flex flex_between">
                    <div>
                        <p>{{detail.tournament_time}}</p>
                        <p>举办地：{{detail.location}}</p>
                        <p>举办方：{{detail.organizer}}</p>
                    </div>
                    <div>
                        <p class="title">{{detail.number_of_teams || teamLength}}</p>
                        <p>参赛队伍</p>
                    </div>
                    <div>
                        <p class="title">{{detail.prize_bonus || '暂无数据'}}</p>
                        <p>总奖金</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const detail = ref({})
            const teamLength = ref(0)
            const tournament = inject('detail')
            watch(tournament, () => {
                detail.value = tournament.tournamentDetail
                teamLength.value = tournament.teams.length
            })
            return {
                detail,
                tournament,
                teamLength
            }
        }
    })
</script>

<style lang="less" scoped>
    .match-detail {
        .block {
            width: 100%;
            height: 180px;
            color: #fff;
            padding: 15px 50px;
            border-radius: 2px;
            box-sizing: border-box;
            background: linear-gradient(90deg, #080044 0%, #000B44 100%);
            .img {
                width: 260px;
                height: 150px;
                margin-right: 30px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .text {
                width: 810px;
                .title {
                    font-size: 24px;
                    font-weight: 600;
                    padding-bottom: 30px;
                }
                .flex {
                    p {
                        text-align: center;
                        padding-bottom: 10px;
                    }
                    .title {
                        padding-bottom: 30px;
                    }
                }
            }
        }
    }
</style>
