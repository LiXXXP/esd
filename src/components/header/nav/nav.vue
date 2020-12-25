<template>
    <div class="navlist">
        <router-link
            v-for="item in navList"
            :key="item.title"
            :to="item.path"
            class="link"
        >{{item.title}}</router-link>
    </div>
</template>

<script>
    export default {
        props: {
            navList: Array
        },
        setup(props,ctx) {

        },
    }
</script>

<style lang="less" scoped>
    .navlist {
        .link {
            color: #fff;
            font-weight: 500;
            line-height: 50px;
            margin-right: 55px;
            &:hover {
                color: #B29873;
            }
        }
    }
</style>