<template>
    <div class="slide">
        <el-carousel :interval="3000" arrow="always">
            <el-carousel-item 
                v-for="item in 4" 
                :key="item">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
    }
</script>

<style lang="less" scoped>
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
