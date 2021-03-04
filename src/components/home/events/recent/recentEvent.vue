<template>
    <div class="recent">
        <SliderEvent :shortList="shortList" @cutData="cutEvent" />
    </div>
</template>

<script>
    
    import { defineComponent, defineAsyncComponent, reactive, toRefs, onMounted } from 'vue'
    import { shortMatch } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const shortData = reactive({
                num: 4,
                list:[],
                shortList: []
            })
            const getShortMatch = (() => {
                shortMatch().then(res => {
                    if(res.code === 200) {
                        shortData.list = res.data
                        shortData.shortList = res.data.slice(0,4)
                    }
                })
            })
            const cutEvent = (val) => {
                if(val === 'prev') {
                    if(shortData.num > 4) {
                        shortData.num = shortData.num - 4
                        shortData.shortList = shortData.list.slice(shortData.num - 4,shortData.num)
                    }
                }
                if(val === 'next') {
                    if(shortData.list.length-shortData.num >= 4) {
                        shortData.shortList = shortData.list.slice(shortData.num,shortData.num + 4)
                        shortData.num = shortData.num + 4
                    }
                }
            }
            onMounted(() => {
                getShortMatch()
            })
            return {
                ...toRefs(shortData),
                getShortMatch,
                cutEvent
            }
        },
        components: {
            SliderEvent: defineAsyncComponent(() => import('@/components/home/events/recent/sliderEvent')) // 赛事
        }
    })
</script>

<style lang="less" scoped>
    .recent {
        padding: 40px 0;
        .selectBox {
            margin-left: 70px;
            margin-bottom: 8px;
        }
    }
</style>
