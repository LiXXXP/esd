<template>
    <div class="pagination flex flex_center">
        <el-pagination
            :page-size="5"
            :pager-count="11"
            layout="prev, pager, next"
            :total="30">
        </el-pagination>
    </div>
</template>

<script>
    import { defineComponent , ref } from 'vue'
    export default defineComponent({
        props: {
            
        },
        setup(props,ctx) {
            
            return {
                
            }
        }
    })
</script>

<style lang="less">
    .pagination {
        margin-top: 15px;
        .el-pagination {
            padding: 0;
            color: #666;
            font-weight: 500;
        }
        .el-pagination .btn-next,
        .el-pagination .btn-prev {
            color: #666;
            background-color: #eceef1;
        }
        .el-pager li {
            background-color: #eceef1;
            &:hover {
                color: #B29873;
            }
        }
        .el-pager li.active {
            color: #B29873;
            font-weight: 600;
        }
    }
</style>
