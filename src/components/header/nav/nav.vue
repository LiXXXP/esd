<template>
    <div class="navlist">
        <router-link
            v-for="item in navList"
            :key="item.title"
            :to="item.path"
            :class="['link',{active: toPath === item.path}]"
        >{{item.title}}</router-link>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    import { onBeforeRouteUpdate } from "vue-router"
    export default defineComponent({
        props: {
            navList: {
                type: Array,
                default: () => []
            }
        },
        setup(props,ctx) {
            let toPath = ref('')
            return {
                toPath
            }
        },
        watch: {
            $route (to, from) {
                this.toPath = to.path
                if (to.path === '/match/detail') {
                    this.toPath = '/match'
                }
                if (to.path === '/mean/detail') {
                    this.toPath = '/mean'
                }
            }
        }
    })
</script>

<style lang="less" scoped>
    .navlist {
        .link {
            color: #fff;
            font-weight: 500;
            line-height: 50px;
            margin-right: 55px;
            &:hover,
            &.active {
                color: #B29873;
            }
        }
    }
</style>