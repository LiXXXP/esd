<template>
    <div class="login-page">
        <div class="cont flex flex_column flex_only_center">
            <HeaderView />
            <div class="box">
                <div class="login-block">
                    <div class="tab flex flex_start">
                        <p v-for="(item,index) in tabTitle"
                            :key="item.title"
                            :class="{active: index === currentIndexRef}"
                            @click="currentIndexRef = index"
                        >{{item.title}}</p>
                    </div>
                    <LoginBox v-if="currentIndexRef === 0" />
                    <RegisterBox v-if="currentIndexRef === 1" />
                </div>
            </div>
        </div>
        <div class="footer">
            <p>数据版权所有 Copyright © 2002-2020</p>
            <p>经营许可证： 粤B1.B2-20060628粤ICP备09088851号 粤公网安备 44120202000185号</p>
        </div>
    </div>
</template>

<script>

    import { defineComponent, defineAsyncComponent, reactive, toRefs, ref } from 'vue'
    import { getUrlParam } from '@/scripts/utils'

    export default defineComponent({
        name: 'login',
        setup(props,ctx) {
            const tabData = reactive({
                tabTitle: [
                    {
                        title: '登录'
                    },
                    {
                        title: '注册'
                    }
                ]
            })
            let currentIndexRef = ref(0)
            if(parseInt(getUrlParam('r'))) {
                currentIndexRef.value = 1
            } else {
                currentIndexRef.value = 0
            }
            return {
                currentIndexRef,
                ...toRefs(tabData)
            }
        },
        watch: {
            $route (to, from) {
                if(parseInt(to.query.r)){
                    this.currentIndexRef = 1
                } else {
                    this.currentIndexRef = 0
                }
            }
        },
        components: {
            HeaderView: defineAsyncComponent(() => import('@/components/header/index')),          // 导航栏
            LoginBox: defineAsyncComponent(() => import('@/components/header/login/login')),      // 登录
            RegisterBox: defineAsyncComponent(() => import('@/components/header/login/register')) // 注册
        }
    })
</script>

<style lang="less" scoped>
    .login-page {
        width: 100%;
        height: 100vh;
        overflow: auto;
        box-sizing: border-box;
        background: linear-gradient(0deg, #CED2E8 0%, #E2E2E2 100%);
        .cont {
            flex: 1 1;
            overflow: hidden;
            min-height: 688px;
            height: calc(100% - 50px);
            box-sizing: border-box;
            .box {
                margin: auto 0;
                .login-block {
                    width: 480px;
                    border-radius: 4px;
                    padding: 30px 40px 50px;
                    box-sizing: border-box;
                    background-color: #fff;
                    box-shadow: 0 0 25px 5px rgba(73,73,73, .13);
                    .tab {
                        margin-bottom: 50px;
                        p {
                            cursor: pointer;
                            font-size: 18px;
                            color: #434343;
                            margin-right: 57px;
                            &.active {
                                color: #B29873;
                                font-weight: 600;
                            }
                        }
                    }
                }
            }
        }
        .footer {
            height: 50px;
            padding-top: 5px;
            box-sizing: border-box;
            background-color: #1C1C1C;
            p {
                font-size: 14px;
                color: #878787;
                line-height: 20px;
                text-align: center;
            }
        }
    }
</style>