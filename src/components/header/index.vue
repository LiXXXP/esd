<template>
    <div class="head">
        <div class="page-content flex flex_end flex_only_center">
            <nav-view 
                :navList="list"
            ></nav-view>
            <search-view></search-view>
            <login-view></login-view>
            <lang-view></lang-view>
        </div>
    </div>
</template>

<script>
    import { defineComponent, reactive, toRefs } from 'vue'

    import NavView from '@/components/header/nav/nav.vue'           // 导航
    import SearchView from '@/components/header/search/search.vue'  // 搜索
    import LoginView from '@/components/header/login/loginBox.vue'  // 登录
    import LangView from '@/components/header/lang/lang.vue'        // 语言

    export default defineComponent({
        name: 'top',
        setup() {
            const navData = reactive({
                list: [
                    {
                        title: '首页',
                        path: '/'
                    },
                    {
                        title: '电竞比赛',
                        path: '/'
                    },
                    {
                        title: '资料库',
                        path: '/'
                    },
                    {
                        title: '系统通知',
                        path: '/'
                    },
                    {
                        title: '意见反馈',
                        path: '/'
                    }
                ]
            })
            return {
                ...toRefs(navData)
            }
        },
        components: {
            NavView,
            SearchView,
            LoginView,
            LangView
        }
    })
</script>

<style lang="less" scoped>
    .head {
        width: 100%;
        height: 50px;
        color: #fff;
        font-size: 16px;
        background-color: #333;
    }
</style>