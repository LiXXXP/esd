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
        <div class="footer"></div>
    </div>
</template>

<script>
    import HeaderView from '@/components/header/index.vue'          // 导航栏
    import LoginBox from '@/components/header/login/login'          // 登录
    import RegisterBox from '@/components/header/login/register'    // 注册

    import { getUrlParam } from '@/scripts/utils'  // 获取页面参数方法
    import { defineComponent, reactive, toRefs, ref } from 'vue'

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
            HeaderView,
            LoginBox,
            RegisterBox
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