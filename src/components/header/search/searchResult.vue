<template>
    <div class="page-result flex flex_column flex_center">
        <div v-if="searchList.length>0" >
            <table v-for="item in searchList" :key="">
                <thead>
                    <th v-for="item in theadList" :key="item.head">{{item.head}}</th>
                    <th>相关</th>
                </thead>
                <tbody>
                    <tr>
                        <td>第一局</td>
                        <td>2020全球总决赛</td>
                        <td>季后赛 第十七天</td>
                        <td>2020-8-15</td>
                        <td>
                            <div class="flex flex_center">
                                <div class="team flex flex_center">
                                    <img src="">
                                    <span>dd</span>
                                </div>
                                <div class="vs">
                                    1:2
                                </div>
                                <div class="team flex flex_center">
                                    <span>dd</span>
                                    <img src="">
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="detail">详情</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs, inject, watch } from 'vue'
    export default defineComponent({
        setup(props,ctx) {
            const search = reactive({
                type: '',
                theadList: [],
                searchList: []
            })
            const selectData = inject('selectData')
            watch(selectData, () => {
                search.type = selectData.selectVal
                switch (selectData.selectVal) {
                    case 'match':
                        search.theadList = [
                            {
                                head: '状态'
                            },
                            {
                                head: '赛事名称'
                            },
                            {
                                head: '赛事阶段'
                            },
                            {
                                head: '比赛时间'
                            },
                            {
                                head: '对阵情况'
                            }
                        ]
                    break
                    case 'team':
                        search.theadList = [
                            {
                                head: '战队图标'
                            },
                            {
                                head: '战队名称'
                            },
                            {
                                head: '赞助商'
                            },
                            {
                                head: '游戏项目'
                            },
                            {
                                head: '所属俱乐部'
                            }
                        ]
                    break
                    case 'player':
                        search.theadList = [
                            {
                                head: '选手头像'
                            },
                            {
                                head: '选手ID'
                            },
                            {
                                head: '选手姓名'
                            },
                            {
                                head: '游戏项目'
                            },
                            {
                                head: '所属俱乐部'
                            }
                        ]
                    break
                    default:
                    break
                }

                search.searchList = selectData.searchList
            })
            return {
                ...toRefs(search),
                selectData
            }
        },
    })
</script>

<style lang="less" scoped>
    .page-result {
        table {
            width: 1000px;
            margin: 50px;
            text-align: center;
            border-radius: 2px;
            thead {
                color: #333;
                font-size: 16px;
                font-weight: 500;
                line-height: 50px;
                background-color: #989898;
                border-radius: 2px 2px 0px 0px;
            }
            tbody {
                tr {
                    height: 120px;
                    color: #fff;
                    font-size: 14px;
                    background-color: #585858;
                    border-radius: 0px 0px 2px 2px;
                }
            }
        }
        .team {
            cursor: pointer;
            img {
                width: 35px;
                height: 35px;
                margin: 0 5px;
            }
            span {
                width: 80px;
            }
        }
        .detail {
            width: 80px;
            height: 25px;
            color: #fff;
            margin: 0 auto;
            cursor: pointer;
            line-height: 25px;
            border-radius: 2px;
            text-align: center;
            background: #B29873;
            &.disable {
                cursor: not-allowed;
                background-color: #ccc;
            }
        }
    }
</style>