<template>
    <div class="out-detail flex flex_between flex_only_center">
        <div class="left">
            <div class="title flex flex_only_center">
                <p class="square"></p>
                <p>胜者组第一轮(BO5)</p>
            </div>
            <div class="pk" v-for="item in 3" :key="item">
                <p class="time">
                    <span class="type">已结束</span>
                    <span>2020-8-19 18:00</span>
                </p>
                <div class="event">
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 3>0,low: 0}]">3</div>
                    </div>
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 0,low: 1>0}]">1</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="pk" v-for="item in 2" :key="item">
                <p class="time">
                    <span class="type">已结束</span>
                    <span>2020-8-19 18:00</span>
                </p>
                <div class="event">
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 3>0,low: 0}]">3</div>
                    </div>
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 0,low: 1>0}]">1</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="pk">
                <p class="time">
                    <span class="type">已结束</span>
                    <span>2020-8-19 18:00</span>
                </p>
                <div class="event">
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 3>0,low: 0}]">3</div>
                    </div>
                    <div class="team flex flex_between">
                        <div class="flex flex_start flex_only_center">
                            <img src="">
                            <p>FPX</p>
                        </div>
                        <div :class="['score',{high: 0,low: 1>0}]">1</div>
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
        }
    }
</script>

<style lang="less" scoped>
    .out-detail {
        .pk {
            margin-bottom: 80px;
            &:last-child {
                margin-bottom: 0;
            }
            .time {
                font-size: 12px;
                font-weight: 500;
                margin-bottom: 3px;
                .type {
                    color: #fff;
                    padding: 0 3px;
                    margin-right: 13px;
                    border-radius: 2px;
                    background-color: #989898;
                }
            }
            .event {
                .team {
                    width: 240px;
                    height: 45px;
                    margin-bottom: 3px;
                    border-radius: 2px;
                    background-color: #F9F9F9;
                    img {
                        width: 35px;
                        height: 35px;
                        margin: 0 10px;
                    }
                    p {
                        color: #666;
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .score {
                        width: 25px;
                        color: #fff;
                        font-size: 24px;
                        font-weight: 600;
                        line-height: 45px;
                        text-align: center;
                        border-radius: 0 2px 2px 0;
                        &.high {
                            background-color: #B29873;
                        }
                        &.low {
                            background-color: #B2B2B2;
                        }
                    }
                }
                
            }
        }
        .left {
            .title {
                color: #B29873;
                font-weight: 600;
                margin-bottom: 20px;
                .square {
                    width: 8px;
                    height: 8px;
                    margin-right: 5px;
                    background-color: #B29873;
                    transform: rotateZ(45deg) skew(20deg, 20deg);
                    box-shadow: 0px 3px 3px 0px rgba(255, 245, 227, 0.3);
                }
            }
        }
    }
</style>
