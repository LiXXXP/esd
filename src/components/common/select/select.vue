<template>
    <div class="select">
        <div v-if="size === 'max'" class="flex flex_start">
            <div class="custom custom-max" 
                v-for="(item,index) in selectList"
                :key="item.placeholder">
                <div class="select" @click="openOption(index)">
                    <input type="text" :placeholder="item.placeholder" v-model="item.selectValue" disabled="disabled">
                </div>
                <ul class="option" v-if="index === currentIndex">
                    <li v-for="key in item.list" 
                        :key="key.game_id" 
                        @click="selectOption(key.name_cn,index)"
                    >{{key.name_cn}}</li>
                </ul>
            </div>
        </div>
        <div v-if="size === 'small'" class="flex flex_start">
            <div class="custom custom-small" 
                v-for="(item,index) in selectList"
                :key="item.placeholder">
                <div class="select" @click="openOption(index)">
                    <input type="text" :placeholder="item.placeholder" v-model="item.selectValue" disabled="disabled">
                </div>
                <ul class="option" v-if="index === currentIndex">
                    <li v-for="key in item.list" 
                        :key="key.game_id" 
                        @click="selectOption(key.name_cn,index)"
                    >{{key.name_cn}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, inject, watch } from 'vue'
    export default defineComponent({
        props: {
            size: {         // 筛选框大小
                type: String,
                default: ''
            }
        },
        setup(props,ctx) {
            let currentIndex = ref(-1)
            let selectList = ref([])
            const list = inject('selectData')
            watch(list, () => {
                selectList.value = list.selectList
            })

            const openOption = ((index) => {
                if(currentIndex.value === index) {
                    currentIndex.value = -1
                } else {
                    currentIndex.value = index
                }
                ctx.emit('getSelectIndex', currentIndex.value)
            })
            const selectOption = ((val,index) => {
                selectList.value[index].selectValue = val
                currentIndex.value = -1
            })
            return {
                currentIndex,
                selectList,
                openOption,
                selectOption
            }
        }
    })
</script>

<style lang="less" scoped>
    .select {
        .custom {
            margin-right: 4px;
            position: relative;
            .select {
                padding: 0 10px;
                cursor: pointer;
                border-radius: 1px;
                box-sizing: border-box;
                background-color: #DADADA;
                position: relative;
                &::after {
                    z-index: 2;
                    content: "";
                    width: 0px;
                    height: 0px;
                    margin-top:-4px;
                    border: 8px solid #929497;
                    border-width: 8px 5px 8px;
                    border-color: #666 transparent transparent transparent;
                    pointer-events:none;
                    position: absolute;
                    top: 50%;
                    right: 8px;
                }
                input {
                    width: 90%;
                    height: 100%;
                    color: #666;
                    cursor: pointer;
                    font-weight: 600;
                }
            }
            .option {
                padding: 10px;
                border-radius: 1px;
                box-sizing: border-box;
                background-color: #DADADA;
                border-top: 1px solid #fff;
                position: absolute;
                left: 0;
                li {
                    color: #666;
                    cursor: pointer;
                    padding-bottom: 10px;
                    &:hover {
                        color: #B29873;
                    }
                }
            }
            &.custom-max {
                .select {
                    width: 220px;
                    height: 35px;
                }
                .option {
                    width: 220px;
                    top: 35px;
                }
            }
            &.custom-small {
                .select {
                    width: 150px;
                    height: 30px;
                }
                .option {
                    width: 150px;
                    top: 30px;
                }
            }
        }
    }
</style>
