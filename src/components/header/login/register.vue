<template>
    <div class="register-test">
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm">

            <el-form-item prop="email">
                <el-input
                    v-model="ruleForm.email"
                    autocomplete="off"
                    placeholder="输入邮箱"
                ></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <div class="code">
                    <el-input
                        v-model="ruleForm.code"
                        autocomplete="off"
                        placeholder="输入验证码"
                    ></el-input>
                    <span class="send" @click="getCode">{{btnText}}</span>
                </div>
            </el-form-item>

            <el-form-item prop="pass">
                <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    show-password
                    placeholder="输入密码"
                ></el-input>
            </el-form-item>

            <el-form-item prop="checkPass">
                <el-input
                    type="password"
                    show-password
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                    placeholder="确认密码"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-checkbox label="同意《服务条款》、《隐私政策》" v-model="ruleForm.protocol"></el-checkbox>
            </el-form-item>

            <span>密码必须同时包含英文字母和数字且只能包含字母和数字，密码长度大于等于6位且小于等于15位</span>

            <el-form-item>
                <el-button
                    :type="isType"
                    :disabled="isDisabled"
                    @click="submitForm('ruleForm')"
                >注册</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import { transHtml } from '@/scripts/utils'
    import { mailSend, userRegister } from '@/scripts/request'

    export default {
        data() {
            var validateEmail = (rule, value, callback) => {
                if (value === '') {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('请输入邮箱'))
                } else {
                    if(this.ruleForm.code !== '' & this.ruleForm.pass !== '' & this.ruleForm.checkPass !== '') {
                        this.isType = 'danger'
                        this.isDisabled = false
                    }
                    callback()
                }
            }
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('请输入验证码'))
                } else {
                    if(this.ruleForm.email !== '' & this.ruleForm.pass !== '' & this.ruleForm.checkPass !== '') {
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
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass')
                    }
                    callback()
                }
            }
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.pass) {
                    this.isType = 'info'
                    this.isDisabled = true
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    this.isType = 'danger'
                    this.isDisabled = false
                    callback()
                }
            }
            return {
                isType: 'info',    // 登录按钮类型
                isDisabled: true,  // 登录按钮是否可点击
                totalCount: 0,     // 60s
                interval: null,    // 验证码计时器
                isAgree: false,    // 是否同意条款
                isClick: true,     // 是否允许点击发送验证码
                ruleForm: {        // 验证用户名和密码
                    email: '',
                    code: '',
                    pass: '',
                    checkPass: '',
                    protocol: false,
                },
                rules: {           // 验证用户名和密码规则
                    email: [
                        { validator: validateEmail, trigger: 'change' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'change' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'change' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'change' }
                    ]
                }
            }
        },
        computed: {
            btnText(){
                return this.totalCount !==0? `${this.totalCount} s后再获取`: "获取验证码"
            }
        },
        methods: {
            // 获取邮箱验证码
            getCode() {
                let _this = this
                let params = {
                    email: _this.ruleForm.email
                }
                if(_this.isClick) {
                    // mailSend
                    mailSend(params).then(res => {
                        if(res.code === 200) {
                            _this.isClick = false
                            _this.totalCount = 60
                            this.$message.success(res.message)
                            _this.interval = setInterval(()=>{
                                _this.totalCount--
                                if(_this.totalCount < 1){
                                    clearInterval(_this.interval)
                                    _this.totalCount = 0
                                    _this.isClick = true
                                }
                            },1000)
                        }
                        else {
                            this.$message.error(res.message)
                        }
                    })
                }
                
            },
            // 注册
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this
                        let params = {
                            email: transHtml(_this.ruleForm.email),
                            email_verification_code: transHtml(_this.ruleForm.code),
                            password: transHtml(_this.ruleForm.pass),
                            confirm_password: transHtml(_this.ruleForm.checkPass),
                            is_agree_term: _this.ruleForm.protocol? 1 : 2
                        }
                        userRegister(params).then(res => {
                            if(res.code === 200) {
                                _this.$message.success(res.message)
                                _this.$router.push('/login')
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
    .register-test {
        .code {
            position: relative;
            .send {
                cursor: pointer;
                color: #B29873;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        span {
            color: #c8c9cc;
        }
    }
</style>

<style lang="less">
    .register-test {
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
        .el-checkbox__inner {
            &:hover {
                border-color: #B29873;
            }
        }
        .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #B29873;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner {
            border-color: #B29873;
            background-color: #B29873;
        }
        .el-checkbox__input.is-checked+.el-checkbox__label {
            color: #B29873;
        }
    }
</style>