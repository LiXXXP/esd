<template>
    <div :class="['role flex flex_between', {flex_row_reverse: isReverse}]">
        <div :class="['play flex flex_only_center',{flex_row_reverse: isReverse}]">
            <p>Ban</p>
            <img src="" v-for="item in 5" :key="item">
        </div>
        <div class="res flex flex_only_end">
            <div class="flex flex_only_center" 
                v-for="item in resList" 
                :key="item.url">
                <img :src="item.url">
                <p>{{item.num}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        props: {
            isReverse: {
                type: Boolean,
                default: false
            }
        },
        setup(props,ctx) {
            const resData = reactive({
                resList: [
                    {
                        url: require('../../../../../../assets/imgs/game/map/map01.png'),
                        num: 2,
                        width: 10
                    },
                    {
                        url: require('../../../../../../assets/imgs/game/map/map02.png'),
                        num: 0,
                        width: 17
                    },
                    {
                        url: require('../../../../../../assets/imgs/game/map/map03.png'),
                        num: 1,
                        width: 17
                    }
                ]
            })
            return {
                ...toRefs(resData)
            }
        },
        components: {

        }
    })
</script>

<style lang="less" scoped>
    .role {
        width: 540px;
        padding: 0 25px;
        box-sizing: border-box;
        .play {
            p {
                color: #999;
                font-size: 18px;
                padding: 0 10px;
            }
            img {
                width: 38px;
                height: 38px;
                margin: 0 2.5px;
                border: 1px solid #B29873;
            }
        }
        .res {
            img {
                height: 19px;
            }
            p {
                padding: 0 12px 0 6px;
            }
        }
    }
</style>