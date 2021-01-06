<template>
    <div class="breadcrumb page-content">
        <div class="flex flex_start flex_only_center">
            <router-link :to="'/home'" class="link">首页</router-link>
            <span> - </span>
            <router-link :to="'/mean'" class="link">资料库</router-link>
            <span> - </span>
            <router-link :to="'/mean'" class="link active">战队详情</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
        components: {

        }
    }
</script>

<style lang="less" scoped>
    .breadcrumb {
        .link {
            color: #333;
            font-size: 16px;
            padding: 15px 0;
            &.active {
                color: #B29873;
            }
        }
    }
</style>
