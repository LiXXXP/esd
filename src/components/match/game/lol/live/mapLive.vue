<template>
    <div class="map-live">
        <div class="line"></div>
        <div class="flex flex_between">
            
        </div>
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
    .map-live {
        width: 1200px;
        height: 760px;
        overflow: hidden;
        box-sizing: border-box;
        background-color: #333;
        .line {
            width: 100%;
            height: 3px;
            border: 1px solid #563C10;
            box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.55);
            background: linear-gradient(86deg, #6A5531 0%, #93846A 50%, #6A5531 100%);
        }
    }
</style>
