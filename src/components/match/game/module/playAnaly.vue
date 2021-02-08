<template>
    <div class="play-analy">
        <TitleView :titleName="analyName" />
        <div class="analy flex flex_only_center flex_wrap">
            <div :class="['nav flex flex_center',{active: currentIndex === index}]" 
                v-for="(item,index) in 5" 
                :key="item"
                @click="currentIndex = index">
                <img src="">
                <p>第{{item}}局</p>
                <i class="win"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

    import { defineComponent, ref, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const titleName = reactive({
                analyName: '对战分析',
            })
            let currentIndex = ref(0)
            return {
                currentIndex,
                ...toRefs(titleName)
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-analy {
        .analy {
            .nav {
                width: 235px;
                height: 60px;
                cursor: pointer;
                margin-right: 6px;
                margin-bottom: 6px;
                border-radius: 2px;
                background-color: #CACCCF;
                &:last-child {
                    margin-right: 0;
                }
                &.active {
                    color: #fff;
                    background-color: #B29873;
                }
                img {
                    width: 43px;
                    height: 43px;
                }
                p {
                    padding: 0 20px;
                    font-size: 16px;
                    font-weight: 500;
                }
                i {
                    width: 53px;
                    height: 29px;
                    display: block;
                    background: url('../../../../assets/imgs/game/win.png') no-repeat 0 0;
                    background-size: 100%;
                }
            }
        }
    }
</style>
