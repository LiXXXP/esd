<template>
    <div class="logs">
        <div class="title">比赛日志：</div>
        <div class="cont">
            <div class="list flex flex_only_end" v-for="item in 10" :key="item">
                <span>12:46</span>
                <img src="">
                <span class="red">Liquid.Marecle</span>
                <span>摧毁了</span>
                <img src="">
                <span class="blue">蓝方防御塔</span>
                <span>（首塔）</span>
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
    .logs {
        width: 680px;
        height: 142px;
        margin: 0 auto;
        .title {
            color: #D3D3D3;
            font-weight: 600;
            padding-top: 10px;
        }
        .cont {
            height: 100px;
            margin: 5px 0;
            overflow-y: auto;
            box-sizing: border-box;
            &::-webkit-scrollbar {
                width: 3px;
                background-color: rgba(140, 140, 140, .3);
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 2px;
                background-color: rgba(140, 140, 140, .3);
            }
            .list {
                margin-bottom: 5px;
                span {
                    color: #D3D3D3;
                    &.red {
                        color: #C1200D;
                        padding-right: 5px;
                    }
                    &.blue {
                        color: #457CF4;
                        padding-right: 5px;
                    }
                }
                img {
                    width: 20px;
                    height: 20px;
                    margin: 0 5px;
                }
            }
        }
    }
</style>