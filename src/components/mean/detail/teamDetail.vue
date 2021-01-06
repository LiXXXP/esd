<template>
    <div class="team-detail">
        <div class="page-content">
            <div class="flex flex_center">
                <div class="img">
                    <img src="">
                </div>
                <div class="text">
                    <p class="name">RNG</p>
                    <p class="full">RoyalNeverGiveUp</p>
                    <p>
                        RNG（RoyalNeverGiveUp）电子竞技俱乐部成立于2015年5月，现LPL联盟成员之一。
                        俱乐部LOGO标志以黑金为主色调，一个“R”字母简洁明了，“ROYALNEVERGIVEUP”展现在“R”的下方，
                        翻译为中文“皇族永不言弃”，展示了他们永不放弃、战至最后一刻的决心。
                        2018年RNG在一年中先后夺得了LPL春季赛冠军、MSI季中邀请赛冠军、德玛西亚杯夏季赛冠军及2018年LPL夏季赛冠军，
                        一年拿下无数冠军的同时，也成为了LPL历史上第二支春夏双冠的队伍，创造了新的历史。
                    </p>
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
    .team-detail {
        width: 100%;
        height: 300px;
        padding: 40px 0;
        box-sizing: border-box;
        border-radius: 2px;
        background: linear-gradient(270deg, #262626 0%, #000000 100%);
        .img {
            width: 288px;
            height: 174px;
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
