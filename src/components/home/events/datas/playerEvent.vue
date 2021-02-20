<template>
    <div class="player">
        <div class="list flex flex_only_center flex_wrap">
            <div class="item" v-for="item in teams" :key="item.team_id">
                <div class="circle flex flex_center" @click="gotoLink(item.team_id)">
                    <img :src="item.team_logo" :title="item.team_name">
                </div>
                <div v-if="isText">
                    <p class="name">补刀狂人</p>
                    <p>Meiko</p>
                    <p class="attach">场均补刀：666</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from "vue-router"
    import { defineComponent, ref, inject, watch } from 'vue'

    export default defineComponent({
        props: {
            isText: {
                type: Boolean,
                default: false
            }
        },
        setup(props,ctx) {
            const teams = ref([])
            const tournament = inject('detail')
            watch(tournament, () => {
                teams.value = tournament.tournamentDetail.teams
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
                teams,
                tournament,
                gotoLink
            }
        }
    })
</script>

<style lang="less" scoped>
    .player {
        .list {
            .item {
                width: 150px;
                cursor: pointer;
                margin-right: 60px;
                margin-bottom: 30px;
                &:nth-child(6n) {
                    margin-right: 0;
                }
                .circle {
                    width: 126px;
                    height: 126px;
                    margin: 0 auto;
                    background: url('../../../../assets/imgs/home/bd-circle.png') no-repeat 0 0;
                    background-size: 100%;
                }
                .square {
                    width: 150px;
                    height: 150px;
                    margin: 0 auto;
                    background: url('../../../../assets/imgs/home/bd-square.png') no-repeat 0 0;
                    background-size: 100%;
                }
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                }
                p {
                    font-size: 18px;
                    padding-top: 5px;
                    text-align: center;
                    &.name {
                        font-weight: 600;
                    }
                    &.attach {
                        font-size: 16px;
                    }
                }
            }
        }
    }
</style>
