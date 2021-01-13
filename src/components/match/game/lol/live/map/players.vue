<template>
    <div class="players flex flex_column flex_between">
        <div class="item" v-for="item in 5" :key="item">
            <div class="line"></div>
            <div class="cont flex flex_between flex_only_end">
                <div class="player">
                    <p>SNBln</p>
                    <div class="img">
                        <p>12</p>
                        <img src="">
                        <i></i>
                    </div>
                </div>
                <div class="art">
                    <img src="">
                    <img src="">
                </div>
                <div class="out">
                    <p>1/0/4</p>
                    <div class="flex flex_only_center">
                        <div class="flex flex_wrap">
                            <img src="" v-for="item in 6" :key="item">
                        </div>
                        <div>
                            <img src="">
                        </div>
                    </div>
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
    },
    components: {

    }
}
</script>

<style lang="less" scoped>
    .players {
        width: 240px;
        height: 480px;
        .item {
            width: 240px;
            height: 90px;
            color: #efefef;
            font-size: 12px;
            box-sizing: border-box;
            background: linear-gradient(211deg, rgba(111, 102, 80, .2) 0%, rgba(129, 103, 71, .2) 100%);
            .line {
                width: 240px;
                height: 2px;
                border-radius: 1px;
                margin-bottom: 10px;
                background: linear-gradient(268deg, #6A5531 0%, #93846A 50%, #6A5531 100%);
                box-shadow: 0px 3px 6px 0px rgba(28, 15, 101, 0.46);
            }
            .cont {
                padding: 10px;
                padding-top: 0;
                .player {
                    .img {
                        width: 77px;
                        height: 50px;
                        margin-top: 4px;
                        position: relative;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        p {
                            padding: 0 2px;
                            background-color: #000;
                            position: absolute;
                            left: 0;
                            bottom: 0;
                        }
                        i {
                            width: 8px;
                            height: 8px;
                            display: block;
                            background: linear-gradient(0deg, #02A528 0%, #00FF3C 100%);
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            transform: translate(-50%, 50%) rotateZ(45deg);
                        }
                    }
                }
                .art {
                    img {
                        width: 20px;
                        height: 20px;
                        display: block;
                        margin-top: 5px;
                        border-radius: 100%;
                    }
                }
                .out {
                    .flex_wrap {
                        width: 68px;
                        margin-right: 6px;
                    }
                    img {
                        width: 20px;
                        height: 20px;
                        margin-top: 5px;
                        margin-right: 4px;
                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }
    }
</style>