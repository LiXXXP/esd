<template>
    <div class="player-detail">
        <div class="flex flex_start flex_wrap">
            <div class="player" 
                v-for="item in players" 
                :key="item.player_id"
                :title="item.player_name">
                <span v-if="item.player_role">{{item.player_role}}</span>
                <div class="img flex flex_only_end flex_center">
                    <img :src="item.player_logo">
                </div>
                <p class="beyond-ellipsis">{{item.player_name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const players = ref({})
            const team = inject('detail')
            watch(team, () => {
                players.value = team.teamsDetail.players
            })
            return {
                players,
                team
            }
        }
    })
</script>

<style lang="less" scoped>
    .player-detail {
        .player {
            width: 190px;
            height: 220px;
            cursor: pointer;
            border-radius: 2px;
            margin-right: 60px;
            margin-top: 43px;
            background-image: linear-gradient(#676c6e, #8c8e8f);
            position: relative;
            &:nth-child(5n) {
                margin-right: 0;
            }
            &:nth-child(-n+5) {
                margin-top: 0;
            }
            &:hover {
                p {
                    color: #B29873;
                }
            }
            span {
                height: 18px;
                padding: 0 3px;
                display: block;
                line-height: 18px;
                text-align: center;
                border-radius: 10px;
                border: 1px solid #333;
                position: absolute;
                top: 10px;
                right: 10px;
            }
            .img {
                width: 100%;
                height: 100%;
                img {
                    width: 170px;
                    height: 180px;
                }
            }
            p {
                width: 190px;
                height: 35px;
                color: #fff;
                padding: 0 5px;
                font-size: 24px;
                line-height: 35px;
                text-align: center;
                box-sizing: border-box;
                border-radius: 0px 0px 2px 2px;
                background-color: rgba(0,0,0, .6);
                position: absolute;
                bottom: 0;
                left: 0;
            }
        }
    }
</style>
