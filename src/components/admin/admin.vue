<template>
    <div class="admin">
        <div class="list flex flex_column flex_center">
            <div class="table">
                <el-table
                    :data="list"
                    height="700"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="date"
                        label="产品"
                    ></el-table-column>
                    <el-table-column
                        prop="name"
                        label="Banner名称"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="Banner位置"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="权重"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="上架状态"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="开始时间"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="结束时间"
                    ></el-table-column>
                    <el-table-column
                        prop="address"
                        label="图片"
                    ></el-table-column>
                    <el-table-column
                        label="操作">
                        <template #default="scope">
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, provide, onMounted } from 'vue'
    import { useRoute, onBeforeRouteUpdate } from "vue-router"

    export default defineComponent({
        name: 'admin',
        setup(props,ctx) {

            const tableData = reactive({
                list: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄',
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ]
            })

            const tableRowClassName = ({row, rowIndex}) => {
                if (rowIndex % 2 === 0) {
                    return 'success-row'
                }
                return ''
            }

            return {
                ...toRefs(tableData),
                tableRowClassName,
            }
        },
        components: {
            
        }
    })
</script>

<style lang="less" scoped>
    .admin {
        width: 100%;
        overflow: hidden;
        background: linear-gradient(0deg, #CED2E8 0%, #E2E2E2 100%);
        .list {
            height: 100vh;
            .table {
                width: calc(100% - 400px);
                box-shadow: 0 0 25px 5px rgb(73 73 73 / 13%);
            }
        }
    }
</style>

<style lang="less">
    .el-table .success-row {
        background: #f0f9eb;
    }
</style>
