<template>
    <div class="page-result flex flex_column flex_center">
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
                        <p>详情</p>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        setup(props,ctx) {
            
            
            return {
                
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
    }
</style>