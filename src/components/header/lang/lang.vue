<template>
    <div class="lang">
        <div class="cn">中</div>
        <div class="en">EN</div>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
    }
</script>

<style lang="less" scoped>
    .lang {
        font-size: 12px;
        margin-left: 30px;
        div {
            width: 20px;
            cursor: pointer;
            text-align: center;
            &.cn {
                height: 15px;
                color: #191919;
                line-height: 15px;
                border-radius: 2px;
                background-color: #CFCFCF;
            }
            &.en {
                margin-top: 2px;
                color: #6E6E6E;
            }
        }
    }
</style>