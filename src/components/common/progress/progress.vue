<template>
    <div class="progress">
        <el-progress
            type="line"
            :show-text="progressData.showText"
            :stroke-width="progressData.width"
            :percentage="rateData"
        ></el-progress>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        props: {
            progressData: {
                type: Object,
                default: () => {}
            },
            rateData: {
                type: Number,
                default: 0
            }
        },
        setup(props,ctx) {
            
            return {
                
            }
        }
    })
</script>

<style lang="less">
    .progress {
        
    }
</style>
