<template>
    <div class="recent">
        <SliderEvent :shortList="shortList" @cutData="cutEvent" />
    </div>
</template>

<script>
    import SliderEvent from '@/components/home/events/recent/sliderEvent.vue'   // 赛事
    import { shortMatch } from "@/scripts/request"
    import { defineComponent, reactive, toRefs, onMounted } from 'vue'

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
            SliderEvent
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
