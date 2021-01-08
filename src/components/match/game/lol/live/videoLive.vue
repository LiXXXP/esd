<template>
    <div class="video-live">
        <div>
            <div class="flex flex_start flex_wrap flex_wrap_reverse">
                <div class="item flex flex_start" v-for="item in 3" :key="item">
                    <p>视频标题</p>
                </div>
            </div>
            <div class="video">
                <iframe src="" frameborder="0"></iframe>
            </div>
        </div>
        <!-- <div class="none">
            暂无视频直播内容呢！
        </div> -->
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            
            return {
                
            }
        },
        components: {
            
        }
    })
</script>

<style lang="less" scoped>
    .video-live {
        .item {
            cursor: pointer;
            padding: 10px 20px;
            border-radius: 2px 2px 0 0;
            background-color: #F2F2F2;
            border: 1px solid #CFCFCF;
            border-left: 0;
            &:first-child {
                border-left: 1px solid #CFCFCF;
            }
            &.active {
                background-color: #fff;
                border-bottom: 1px solid #fff;
            }
            p {
                color: #2F3A5A;
                font-size: 12px;
            }
        }
        .video {
            padding: 5px;
            width: 1200px;
            height: 560px;
            margin-top: -1px;
            box-sizing: border-box;
            background-color: #fff;
            border: 1px solid #CFCFCF;
            iframe {
                width: 1190px;
                height: 550px;
                display: block;
            }
        }
        .none {
            color: #666;
            line-height: 6;
            font-size: 18px;
            text-align: center;
        } 
    }
</style>
