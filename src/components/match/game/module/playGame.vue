<template>
    <div class="play-game">
        <div class="flex flex_between">
            <div class="flex flex_only_center">
                <div class="team">
                    <img src="">
                    <p>LGD</p>
                </div>
                <div class="score blue">0</div>
            </div>
            <div class="info">
                <p>2020-12-05 18:00</p>
                <p>LPL秋季赛</p>
                <p>BO5</p>
                <p>比赛进行中</p>
            </div>
            <div class="flex flex_only_center">
                <div class="score red">2</div>
                <div class="team">
                    <img src="">
                    <p>SN</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

            return {

            }
        }
    }
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
            img {
                width: 96px;
                height: 96px;
            }
            p {
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
                line-height: 1.8;
            }
        }
    }
</style>
