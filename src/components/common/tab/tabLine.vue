<template>
    <div class="tab-line">
        <div class="line flex flex_start flex_only_center">
            <div :class="['tab',{active: currentIndex === index}]" 
                v-for="(item,index) in navList" 
                :key="item.tab"
                @click="tab(index)"
            >{{item.tab}}</div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        props: {
            navList: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {
            let currentIndex = ref(0)
            const tab = (index) => {
                currentIndex.value = index
                ctx.emit('status',index)
            }
            return {
                currentIndex,
                tab
            }
        }
    })
</script>

<style lang="less" scoped>
    .tab-line {
        margin: 30px 0;
        .line {
            border-bottom: 1px solid #DADADA;
            .tab {
                color: #666;
                cursor: pointer;
                font-size: 18px;
                font-weight: 500;
                margin-right: 70px;
                padding-bottom: 7px;
                border-bottom: 3px solid transparent;
                &:last-child {
                    padding-right: 0;
                }
                &.active {
                    color: #B29873;
                    font-weight: 600;
                    border-bottom: 3px solid #B29873;
                }
            }
        }
    }
</style>
