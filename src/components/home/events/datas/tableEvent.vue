<template>
    <div :class="['table-event',className]">
        <div class="tip" v-if="className === 'home'">
            <span class="dot"></span>
            <span>该排行榜为小场比赛的数据统计</span>
        </div>
        <div class="data">
            <div class="title" v-if="className === 'home'">选手数据</div>
            <div class="list flex flex_between flex_center">
                <div :style="{width: `${1200/10}%`}"
                    class="item"
                    v-for="item in 10" :key="item">
                    <img src="../../../../assets/imgs/home/player01.png">
                    <p>击杀</p>
                </div>
            </div>
        </div>
        <table>
            <thead>
                <th>排名</th>
                <th>选手</th>
                <th>位置</th>
                <th>出场次数</th>
                <th>总击杀(场均)</th>
                <th>总助攻(场均)</th>
                <th>总死亡(场均)</th>
                <th>KDA</th>
                <th>场均经济</th>
                <th>场均补刀</th>
                <th>场均插眼</th>
                <th>场均排眼</th>
                <th>场均参团率</th>
                <th>场均输出</th>
            </thead>
            <tbody>
                <tr v-for="item in 3" :key="item">
                    <td class="rank">1</td>
                    <td>LGD-Knight</td>
                    <td>中单</td>
                    <td>128</td>
                    <td>517（4.0）</td>
                    <td>820(6.4)</td>
                    <td>487(3.8)</td>
                    <td>5.5</td>
                    <td>13832</td>
                    <td>999</td>
                    <td>999</td>
                    <td>999</td>
                    <td>72%</td>
                    <td>587k</td>
                </tr>
            </tbody>
        </table>
        <Pagination 
            v-if="className === 'home'"
            :pageData="page"
            @currentPage="currentPage" 
        />
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        props: {
            className: {
                type: String,
                default: ''
            }
        },
        setup(props,ctx) {
            const tableData = reactive({
                page: {
                    limit: 5,    // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                }
            })
            const currentPage = (val) => {
                listData.page.current = val
            }
            return {
                ...toRefs(tableData),
                currentPage
            }
        },
        components: {
            Pagination: defineAsyncComponent(() => import('@/components/common/pagination/pagination')) // 分页
        }
    })
</script>

<style lang="less" scoped>
    .table-event {
        margin-top: 50px;
        .tip {
            font-size: 12px;
            margin-bottom: 5px;
            .dot {
                width: 6px;
                height: 6px;
                margin-right: 5px;
                border-radius: 100%;
                display: inline-block;
                background-color: #AE8E50;
            }
        }
        .data {
            .title {
                width: 100%;
                height: 40px;
                color: #fff;
                font-size: 18px;
                font-weight: 600;
                line-height: 40px;
                text-align: center;
                background-color: #B29873;
            }
            .list {
                width: 100%;
                .item {
                    
                    height: 100px;
                    cursor: pointer;
                    font-size: 16px;
                    padding: 20px 0;
                    font-weight: 500;
                    text-align: center;
                    box-sizing: border-box;
                    position: relative;
                    &::after {
                        width: 1px;
                        content: '';
                        height: 60px;
                        display: block;
                        border-radius: 1px;
                        position: absolute;
                        right: 0;
                        top: 50%;
                        transform: translate(0, -50%);
                    }
                    &:last-child::after {
                        display: none;
                    }
                    img {
                        width: 34px;
                        height: 34px;
                    }
                }
            }
        }
        table {
            width: 100%;
            text-align: center;
            thead {
                height: 50px;
                color: #333;
                font-weight: 500;
                line-height: 50px;
            }
            tbody {
                tr {
                    height: 95px;
                    border-radius: 0px 0px 2px 2px;
                }
            }
        }
        .rank {
            color: #B29873;
            font-weight: 500;
        }
        &.home {
            .data {
                .list {
                    background-color: #585858;
                    .item {
                        color: #fff;
                        &::after {
                            background-color: #4C4C4C;
                        }
                        &:hover {
                            background-color: #4C4C4C;
                        }
                    }
                }
            }
            table {
                thead {
                    background-color: #989898;
                }
                tbody {
                    tr {
                        color: #D6D5D5;
                        background-color: #585858;
                        border-bottom: 1px solid #4C4C4C;
                    }
                }
            }
        }
        &.mean {
            .data {
                .list {
                    background-color: #E3E5E8;
                    .item {
                        color: #333;
                        &::after {
                            background-color: #A6A7A9;
                        }
                        &:hover {
                            color: #fff;
                            background-color: #A6A7A9;
                        }
                    }
                }
            }
            table {
                thead {
                    background-color: #CACCCF;
                }
                tbody {
                    tr {
                        color: #333;
                        background-color: #E3E5E8;
                        border-bottom: 1px solid #CACCCF;
                    }
                }
            }
        }
    }
</style>
