<template>
    <div class="team-detail">
        <div class="page-content">
            <div class="flex flex_center">
                <div class="img">
                    <img :src="detail.team_logo">
                </div>
                <div class="text">
                    <p class="name">{{detail.team_short_name}}</p>
                    <p class="full">{{detail.team_full_name}}</p>
                    <p>{{detail.team_introduction}}</p>
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
            const team = inject('detail')
            watch(team, () => {
                detail.value = team.teamsDetail
            })
            return {
                detail,
                team
            }
        }
    })
</script>

<style lang="less" scoped>
    .team-detail {
        width: 100%;
        height: 300px;
        padding: 40px 0;
        border-radius: 2px;
        box-sizing: border-box;
        background: linear-gradient(300deg, #000 0%, #333 100%);
        .img {
            width: 200px;
            height: 200px;
            margin-right: 90px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .text {
            width: 600px;
            color: #fff;
            .name {
                font-size: 36px;
                font-weight: 600;
            }
            .full {
                font-size: 16px;
                font-weight: 600;
                padding-bottom: 30px;
            }
        }
    }
</style>
