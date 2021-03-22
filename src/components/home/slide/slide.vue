<template>
    <div class="slide">
        <el-carousel :interval="3000" arrow="always" v-if="list.length>0">
            <el-carousel-item v-for="item in list" :key="item.id">
                <a :href="item.jump_address" target="_blank">
                    <img :src="item.image" :title="item.image_name">
                </a>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>

    import { defineComponent, onMounted, reactive, toRefs } from 'vue'
    import { homeCarousel } from "@/scripts/request"

    export default defineComponent({
        setup(props,ctx) {
            const carouselList = reactive({
                list: []
            })
            
            const getCarousel = () => {
                homeCarousel().then(res => {
                    if(res.code === 200) {
                        carouselList.list = res.data
                    }
                })
            }

            onMounted(() => {
                getCarousel()
            })
            
            return {
                ...toRefs(carouselList),
                getCarousel
            }
        },
    })
</script>

<style lang="less" scoped>
    .slide {
        img {
            width: 100%;
            height: 100%;
            display: block;
            margin: 0 auto;
        }
    }
</style>
