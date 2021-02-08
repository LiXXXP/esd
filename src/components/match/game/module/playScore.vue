<template>
    <div class="play-score">
        <TitleView :titleName="scoreName" />
        <div class="score flex flex_between flex_only_center">
            <div class="team flex flex_only_center">
                <img src="">
                <p>LGD</p>
            </div>
            <div class="vs">3 : 5</div>
            <div class="team flex flex_only_center">
                <p>SN</p>
                <img src="">
            </div>
        </div>
    </div>
</template>

<script>
    import TitleView from '@/components/common/title/title.vue'    // 页面标题

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            const titleName = reactive({
                scoreName: '当前比分',
            })
            return {
                ...toRefs(titleName)
            }
        },
        components: {
            TitleView
        }
    })
</script>

<style lang="less" scoped>
    .play-score {
        .score {
            width: 1200px;
            height: 60px;
            padding: 0 50px;
            border-radius: 2px;
            box-sizing: border-box;
            background: linear-gradient(90deg, #DAE0F2 0%, #EAE5E5 100%);
            .team {
                img {
                    width: 44px;
                    height: 44px;
                }
                p {
                    padding: 0 20px;
                    font-size: 24px;
                    font-weight: 600;
                }
            }
            .vs {
                font-size: 30px;
                font-weight: 600;
            }
        }
    }
</style>
