<template>
    <div class="slide">
        <el-carousel :interval="3000" arrow="always">
            <el-carousel-item v-for="item in list" :key="item.url">
                <img :src="item.url">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs } from 'vue'
    export default defineComponent({
        setup(props,ctx) {
            const carouselList = reactive({
                list: [
                    {
                        url: require('../../../assets/imgs/home/banner01.png'),
                    },
                    {
                        url: require('../../../assets/imgs/home/banner02.png'),
                    }
                ]
            })
            return {
                ...toRefs(carouselList)
            }
        },
    })
</script>

<style lang="less" scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
