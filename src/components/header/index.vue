<template>
    <div class="head">
        <div class="page-content flex flex_between flex_only_center">
            <NavView :navList="navList" />
            <div class="flex flex_center">
                <SearchView />
                <LoginView />
                <!-- <LangView /> -->
            </div>
        </div>
    </div>
</template>

<script>
    import NavView from '@/components/header/nav/nav.vue'           // 导航
    import SearchView from '@/components/header/search/search.vue'  // 搜索
    import LoginView from '@/components/header/login/loginBox.vue'  // 登录
    import LangView from '@/components/header/lang/lang.vue'        // 语言

    import { defineComponent, reactive, toRefs } from 'vue'

    export default defineComponent({
        name: 'top',
        setup() {
            const navData = reactive({
                navList: [
                    {
                        title: '首页',
                        path: '/home'
                    },
                    {
                        title: '赛事',
                        path: '/match'
                    },
                    {
                        title: '战队',
                        path: '/mean'
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