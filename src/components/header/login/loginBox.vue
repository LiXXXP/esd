<template>
    <div class="login-box flex flex_start">
        <router-link 
            to="/register"
            class="box register"
        >注册</router-link>
        <router-link 
            to="/login"
            class="box login"
        >登录</router-link>
    </div>
</template>

<script>
    export default {
        setup(props,ctx) {

        },
    }
</script>

<style lang="less" scoped>
    .login-box {
        margin-left: 60px;
        .box {
            width: 67px;
            height: 30px;
            line-height: 30px;
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
</style>