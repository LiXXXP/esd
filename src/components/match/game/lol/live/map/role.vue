<template>
    <div :class="['role flex flex_between', {flex_row_reverse: isReverse}]">
        <div :class="['play flex flex_only_center',{flex_row_reverse: isReverse}]">
            <p>Ban</p>
            <img 
                v-for="item in banArray" 
                :key="item.champion_id"
                :src="item.image.image"
                :title="item.name">
        </div>
        <div class="res flex flex_only_end">
            <div class="flex flex_only_center" 
                v-for="item in resList" 
                :key="item.type">
                <img :src="item.url" :style="{'width':`${item.width}px`}">
                <p>{{item.num}}</p>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, onMounted, reactive, toRefs } from 'vue'

    export default defineComponent({
        props: {
            isReverse: {
                type: Boolean,
                default: false
            },
            faction: {
                type: Object,
                default: () => {}
            },
            banArray: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {

            const resData = reactive({
                resList: [
                    {
                        type: 'turret_kills',
                        url: require('../../../../../../assets/imgs/game/map/map01.png'),
                        num: 0,
                        width: 10
                    },
                    {
                        type: 'baron_nashor_kills',
                        url: require('../../../../../../assets/imgs/game/map/map02.png'),
                        num: 0,
                        width: 17
                    },
                    {
                        type: 'dragon_kills',
                        url: require('../../../../../../assets/imgs/game/map/map03.png'),
                        num: 0,
                        width: 17
                    }
                ]
            })

            const getKills = () => {
                for(let item of resData.resList) {
                    item.num = props.faction[item.type] || 0
                }
            }

            onMounted(() => {
                getKills()
            })

            return {
                ...toRefs(resData)
            }
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