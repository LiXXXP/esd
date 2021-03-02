<template>
    <div>
        <div class="logout flex flex_start" v-if="email">
            <p class="beyond-ellipsis" :title="email">{{email}}</p>
            <p @click="logout">退出</p>
        </div>
        <div class="login-box flex flex_start" v-else>
            <router-link 
                to="/login?r=1"
                class="box register"
            >注册</router-link>
            <router-link 
                to="/login"
                class="box login"
            >登录</router-link>
        </div>
    </div>
</template>

<script>
    
    import { userInfo, userLogout } from "@/scripts/request"
    import { environmentType } from '@/scripts/config'
    import { defineComponent, ref, onMounted } from 'vue'
    import { useRouter } from "vue-router"
    import { ElMessage } from 'element-plus'

    export default defineComponent({
        setup(props,ctx) {
            const router = useRouter()
            const email = ref('')
            const getUserInfo = (() => {
                userInfo().then(res => {
                    if(res.code === 200) {
                        email.value = res.data.email
                    } else {
                        localStorage.removeItem('userToken')
                        if(environmentType === '极速') {
                            router.push({path: '/login'})
                        }
                    }
                })
            })
            const logout = (() => {
                userLogout().then(res => {
                    if(res.code === 200) {
                        localStorage.removeItem('userToken')
                        ElMessage.success(res.message)
                        window.location.href = '/'
                    } else {
                        ElMessage.error(res.message)
                    }
                })
            })
            onMounted(() => {
                getUserInfo()
            })
            return {
                email,
                getUserInfo,
                logout
            }
        },
    })
</script>

<style lang="less" scoped>
    .login-box {
        margin-left: 60px;
        .box {
            width: 67px;
            padding: 4px 0;
            border-radius: 2px;
            text-align: center;
            box-sizing: border-box;
            &.register {
                color: #B29873;
                margin-right: 10px;
                border: 1px solid #B29873;
            }
            &.login {
                color: #fff;
                background-color: #B29873;
            }
        }
    }
    .logout {
        margin-left: 60px;
        p {
            cursor: pointer;
            color: #B29873;
        }
        .beyond-ellipsis {
            width: 80px;
            padding-right: 10px;
        }
    }
</style>