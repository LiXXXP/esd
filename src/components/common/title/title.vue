<template>
    <div class="title flex flex_only_center">
        <span class="square"></span>
        <span class="name">{{titleName}}</span>
    </div>
</template>

<script>
    export default {
        props: {
            titleName: {
                type: String,
                default: ''
            }
        },
        setup(props,ctx) {
            return {

            }
        },
    }
</script>

<style lang="less" scoped>
    .title {
        padding: 35px 0 15px 0;
        .square {
            width: 10px;
            height: 10px;
            background-color: #B29873;
            transform: rotateZ(45deg)skew(20deg,20deg);
            box-shadow: 0px 3px 3px 0px rgba(255, 245, 227, 0.3);
        }
        .name {
            font-size: 18px;
            font-weight: 600;
            color: #B29873;
            padding-left: 5px;
            background: linear-gradient(0deg, #6D5D46 0%, #B29873 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
</style>
