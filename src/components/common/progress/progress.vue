<template>
    <div class="progress">
        <el-progress
            type="line"
            :show-text="progressData.showText"
            :stroke-width="progressData.width"
            :percentage="rateData"
            :color="progressColor"
        ></el-progress>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    export default defineComponent({
        props: {
            progressData: {
                type: Object,
                default: () => {}
            },
            rateData: {
                type: Number,
                default: 0
            },
            progressColor: {
                type: String,
                default: ''
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
