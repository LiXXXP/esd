<template>
    <div class="title">
        <div class="block flex flex_center">
            <span class="small left"></span>
            <span class="little left"></span>
            <span class="square"></span>
            <div class="title">{{titleName}}</div>
            <span class="square"></span>
            <span class="little right"></span>
            <span class="small right"></span>
        </div>
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

        },
    }
</script>

<style lang="less" scoped>
    .title {
        .block {
            margin: 35px 0;
            position: relative;
            &::before {
                content: '';
                display: block;
                width: 520px;
                height: 2px;
                margin-right: -1px;
                background-color: #B29873;
            }
            &::after {
                content: '';
                display: block;
                width: 520px;
                height: 2px;
                margin-left: -1px;
                background-color: #B29873;
            }
            .title {
                font-size: 24px;
                font-weight: 600;
                color: #B29873;
                padding: 0 10px;
                background: linear-gradient(0deg, #6D5D46 0%, #B29873 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .square {
                width: 8px;
                height: 8px;
                display: block;
                background-color: #B29873;
                transform: rotateZ(45deg)skew(20deg,20deg);
                box-shadow: 0px 3px 3px 0px rgba(255, 245, 227, 0.3);
            }
            .small {
                width: 8px;
                height: 8px;
                display: block;
                background-color: #B29873;
                transform: rotateZ(135deg)skew(20deg,20deg);
                box-shadow: 0px 3px 3px 0px rgba(255, 245, 227, 0.3);
                position: absolute;
                &.left {
                    left: 8px;
                }
                &.right {
                    right: 8px;
                }
            }
            .little {
                width: 4px;
                height: 4px;
                display: block;
                background-color: #B29873;
                transform: rotateZ(45deg)skew(20deg,20deg);
                box-shadow: 0px 3px 3px 0px rgba(255, 245, 227, 0.3);
                position: absolute;
                &.left {
                    left: 40px;
                }
                &.right {
                    right: 40px;
                }
            }
        }
    }
</style>
