<template>
    <div class="player">
        <div class="list flex flex_around">
            <div class="item" v-for="item in 5" :key="item">
                <div class="circle flex flex_center">
                    <img src="">
                </div>
                <p class="name">补刀狂人</p>
                <p>Meiko</p>
                <p class="attach">场均补刀：666</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {
            
        }
    }
</script>

<style lang="less" scoped>
    .player {
        .list {
            .item {
                width: 150px;
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
