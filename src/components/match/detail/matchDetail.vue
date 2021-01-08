<template>
    <div class="match-detail page-content">
        <div class="block flex flex_start flex_only_center">
            <div class="img">
                <img src="">
            </div>
            <div class="text">
                <p class="title">深渊联赛线上赛第三赛季</p>
                <div class="flex flex_between">
                    <div>
                        <p>2020/09/09 ～ 2020/09/30</p>
                        <p>举办地：北京</p>
                        <p>举办方：One Game Agency</p>
                    </div>
                    <div>
                        <p class="title">48</p>
                        <p>参赛队伍</p>
                    </div>
                    <div>
                        <p class="title">$9.999.999</p>
                        <p>总奖金</p>
                    </div>
                    <div>
                        <p class="title">BO5</p>
                        <p>赛制</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
        components: {

        }
    }
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
