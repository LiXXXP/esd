<template>
    <div class="search">
        <input type="text" placeholder="搜索">
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
    }
</script>

<style lang="less" scoped>
    .search {
        input {
            width: 180px;
            height: 25px;
            color: #fff;
            padding: 0 10px;
            border-radius: 13px;
            box-sizing: border-box;
            background-color: #555555;
        }
    }
</style>