<template>
    <div class="video-live">
        <div v-if="list.length > 0">
            <div class="flex flex_start flex_wrap flex_wrap_reverse">
                <div :class="['item flex flex_start',{active: index === currentIndex}]" 
                    v-for="(item,index) in list" 
                    :key="item.stream_id"
                    @click="tabStream(item.embed_url,index)">
                    <p>{{item.title}}</p>
                </div>
            </div>
            <div class="video">
                <iframe :src="embedUrl" frameborder="0"></iframe>
            </div>
        </div>
        <div class="none" v-else>
            暂无视频直播内容呢！
        </div>
    </div>
</template>

<script>

    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const streamData = reactive({
                list: [],
                embedUrl: '',
                currentIndex: 0
            })
            const stream = inject('streamList')
            watch(stream, () => {
                streamData.list = stream.streamList
                if(stream.streamList.length>0) {
                    streamData.embedUrl = stream.streamList[0].embed_url
                }
            })

            const tabStream = (url,index) => {
                streamData.embedUrl = url
                streamData.currentIndex = index
            }
            return {
                ...toRefs(streamData),
                stream,
                tabStream
            }
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
    }
</style>
