<template>
    <div class="login-test">
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm">

            <el-form-item prop="email">
                <el-input
                    v-model="ruleForm.email"
                    autocomplete="off"
                    placeholder="邮箱"
                ></el-input>
            </el-form-item>

            <el-form-item prop="pass">
                <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    show-password
                    placeholder="密码"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button
                    :type="isType"
                    :disabled="isDisabled"
                    @click="submitForm('ruleForm')"
                >登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import { transHtml } from '@/scripts/utils'
    import { userLogin } from '@/scripts/request'

    export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('请输入邮箱'))
                } else {
                    if(this.ruleForm.pass !== '') {
                        this.isType = 'danger'
                        this.isDisabled = false
                    }
                    callback()
                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('请输入密码'))
                } else {
                    this.isType = 'danger'
                    this.isDisabled = false
                    callback()
                }
            }
            return {
                isType: 'info',    // 登录按钮类型
                isDisabled: true,  // 登录按钮是否可点击
                ruleForm: {        // 验证用户名和密码
                    email: '',
                    pass: '',
                },
                rules: {           // 验证用户名和密码规则
                    email: [
                        { validator: validateEmail, trigger: 'change' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            // 登录
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let params = {
                            email: transHtml(_this.ruleForm.email),
                            password: transHtml(_this.ruleForm.pass)
                        }
                        userLogin(params).then(res => {
                            if(res.code === 200) {
                                localStorage.setItem('userToken',res.data.token)
                                window.location.href = '/'
                            } else {
                                _this.$message.error(res.message)
                            }
                        })
                    } else {
                        return false
                    }
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .login-test {
        
    }
</style>

<style lang="less">
    .login-test {
        .el-input__inner {
            border: 0;
            border-radius: 0;
            border-bottom: 1px solid #E0E0E0;
        }
        .el-button {
            margin-top: 20px;
            border-radius: 2px;
            padding: 12px 185px;
        }
        .el-button--danger {
            border-color: #B29873;
            background-color: #B29873;
        }
    }
</style>