<template>
    <div class="recent">
        <SelectView :selectList="selectList" :size="'max'" class="selectBox" />
        <SliderEvent />
    </div>
</template>

<script>
    import SelectView from '@/components/common/select/select.vue'              // 下拉框
    import SliderEvent from '@/components/home/events/recent/sliderEvent.vue'   // 赛事

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const selectData = reactive({
                selectList: [
                    {
                        placeholder: '近期赛事（近一个月赛程）'
                    }
                ]
            })
            return {
                ...toRefs(selectData)
            }
        },
        components: {
            SelectView,
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
