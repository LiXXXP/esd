<template>
    <div class="select">
        <div class="flex flex_start">
            <div :class="['custom', `custom-${size}`]" 
                v-for="(item,index) in selectList"
                :key="item.placeholder">
                <div class="select" @click="openOption(index)">
                    <input type="text" 
                        :placeholder="item.placeholder" 
                        v-model="item.selectValue"
                        :title="item.selectValue"
                        disabled="disabled">
                </div>
                <ul class="option" v-if="index === currentIndex">
                    <li @click="selectOptionAll(item.placeholder,index)" v-if="item.placeholder !== '当前经济'">全部</li>
                    <li class="beyond-ellipsis"
                        v-for="key in item.list" 
                        :key="key.game_id === key.game_id ? key.tournament_id || key.team_id : key.game_id" 
                        :title="key.name_cn || key.tournament_name || key.team_name"
                        @click="selectOption(key.name_cn,key.tournament_name,key.team_name,key.game_id,key.tournament_id,key.team_id,index,key.val)"
                    >{{key.name_cn || key.tournament_name || key.team_name}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'
    export default defineComponent({
        props: {
            size: {         // 筛选框大小
                type: String,
                default: ''
            }
        },
        emits: ['getSelectIndex', 'getSelectIds', 'getSelectAll'],
        setup(props,{ emit }) {
            const select = reactive({
                currentIndex: -1,
                selectList: []
            })
            const list = inject('selectData')
            watch(list, () => {
                select.selectList = list.selectList
            })

            const openOption = ((index) => {
                if(select.currentIndex === index) {
                    select.currentIndex = -1
                } else {
                    select.currentIndex = index
                }
                emit('getSelectIndex', select.currentIndex)
            })

            const selectOption = ((gameName,tournamentName,teamName,gameId,tournamentId,teamId,index,val) => {
                select.selectList[index].selectValue = gameName || tournamentName || teamName
                select.currentIndex = -1
                emit('getSelectIds', gameId,tournamentId,teamId,val)
            })

            const selectOptionAll = ((placeholder,index) => {
                select.selectList[index].selectValue = placeholder
                if(index === 0) {
                    select.selectList.map((currentValue,index) => {
                        currentValue.selectValue = currentValue.placeholder
                    })
                }
                select.currentIndex = -1
                emit('getSelectAll', index)
            })

            return {
                ...toRefs(select),
                openOption,
                selectOption,
                selectOptionAll
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
                z-index: 999;
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
