<template>
    <div class="table-event">
        <table>
            <thead>
                <th>状态</th>
                <th>赛事名称</th>
                <th>赛事阶段</th>
                <th>比赛时间</th>
                <th>对阵情况</th>
                <th>相关</th>
            </thead>
            <tbody>
                <tr v-for="item in 3" :key="item">
                    <td>第一局</td>
                    <td>2020全球总决赛</td>
                    <td>季后赛 第十七天</td>
                    <td>
                        <p>2020-8-15</p>
                        <p>17:00 </p>
                    </td>
                    <td>
                        <div class="flex flex_center">
                            <div class="team flex flex_center">
                                <img src="">
                                <span>LGD</span>
                            </div>
                            <div class="vs">1:2</div>
                            <div class="team flex flex_center">
                                <span>TES</span>
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
</template>

<script>

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        setup(props,ctx) {
            return {
                
            }
        },
        components: {

        }
    })
</script>

<style lang="less" scoped>
    .table-event {
        table {
            width: 100%;
            text-align: center;
            thead {
                height: 50px;
                color: #333;
                font-size: 16px;
                font-weight: 500;
                line-height: 50px;
                background-color: #989898;
            }
            tbody {
                tr {
                    height: 95px;
                    color: #fff;
                    background-color: #585858;
                    border-radius: 0px 0px 2px 2px;
                    border-bottom: 1px solid #eceef1;
                }
            }
        }
        .team {
            img {
                width: 35px;
                height: 35px;
                margin: 0 5px;
            }
        }
        .vs {
            margin: 0 25px;
            font-size: 24px;
            font-weight: 600;
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
        }
    }
</style>
