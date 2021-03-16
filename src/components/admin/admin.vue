<template>
    <div class="admin">
        <div class="list flex flex_column flex_center">
            <div class="select flex flex_only_center">
                <div class="flex flex_only_center">
                    <div>图片位置：</div>
                    <el-select v-model="image.place" @change="selectImage">
                        <el-option
                            :label="'首页轮播图'"
                            :value="1"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex flex_only_center">
                    <div>图片分类：</div>
                    <el-select v-model="image.type" @change="selectImage">
                        <el-option
                            :label="'首页轮播图'"
                            :value="1"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex flex_only_center">
                    <div>上架状态：</div>
                    <el-select v-model="image.status" @change="selectImage">
                        <el-option
                            :label="'上架'"
                            :value="1"
                        ></el-option>
                        <el-option
                            :label="'下架'"
                            :value="2"
                        ></el-option>
                    </el-select>
                </div>
                <el-button plain @click="gotoCreate(0)">创建</el-button>
            </div>
            <div class="table">
                <el-table
                    :data="list"
                    height="700"
                    :row-class-name="tableRowClassName">
                    <el-table-column
                        prop="id"
                        label="图片ID"
                    ></el-table-column>
                    <el-table-column
                        prop="image_name"
                        label="图片名称"
                    ></el-table-column>
                    <el-table-column
                        prop="image_place"
                        label="图片位置"
                    ></el-table-column>
                    <el-table-column
                        prop="image_type"
                        label="图片分类"
                    ></el-table-column>
                    <el-table-column
                        prop="order"
                        label="权重"
                    ></el-table-column>
                    <el-table-column
                        prop="begin_time"
                        label="生效起始时间"
                    ></el-table-column>
                    <el-table-column
                        prop="end_time"
                        label="生效结束时间"
                    ></el-table-column>
                    <el-table-column
                        prop="status"
                        label="上架状态"
                    ></el-table-column>
                    <el-table-column
                        label="操作">
                        <template #default="scope">
                            <el-button type="text" size="small" @click="gotoCreate(scope.row.id)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <Pagination :pageData="page" @currentPage="currentPage" v-if="list.length>0" />
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, onMounted } from 'vue'
    import { useRouter } from "vue-router"
    import { imageList } from "@/scripts/request"

    export default defineComponent({
        name: 'admin',
        setup(props,ctx) {
            const router = useRouter()
            const tableData = reactive({
                list: [],
                image: {
                    place: 1,
                    type: 1,
                    status: 1
                },
                page: {
                    limit: 10,   // 条数
                    count: 0,    // 总数
                    current: 1   // 当前页
                },
            })

            const tableRowClassName = ({row, rowIndex}) => {
                if (rowIndex % 2 === 0) {
                    return 'success-row'
                }
                return ''
            }

            const gotoCreate = (imageId) => {
                router.push({
                    path: '/admin/create',
                    query: {
                        imageId: imageId
                    }
                })
            }

            const getImageList = () => {
                let params = {
                    image_place: tableData.image.place,
                    image_type: tableData.image.type,
                    status: tableData.image.status,
                    page: tableData.page.current,
                    limit: tableData.page.limit
                }
                imageList(params).then(res => {
                    if(res.code === 200) {
                        tableData.list = res.data.list
                        tableData.page.count = res.data.count
                    }
                })
            }

            const selectImage = () => {
                getImageList()
            }

            // 分页
            const currentPage = (val) => {
                tableData.page.current = val
                getImageList()
            }

            onMounted(() => {
                getImageList()
            })

            return {
                ...toRefs(tableData),
                tableRowClassName,
                selectImage,
                currentPage,
                gotoCreate
            }
        },
        components: {
            Pagination: defineAsyncComponent(() => import('@/components/common/pagination/pagination')), // 分页
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
            .select {
                width: calc(100% - 400px);
                .flex {
                    margin-right: 20px;
                }
            }
            .table {
                margin: 30px 0 10px;
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
