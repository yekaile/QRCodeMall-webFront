<template>
    <div style="width: 450px;border: 1px solid #409EFF;border-radius: 30px;margin: 20px auto;padding: 30px">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                 size="medium" style="width: 400px;margin: 0px auto">


            <el-form-item prop="userPhone">
                <el-input v-model="ruleForm.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item prop="userPassword">
                <el-input show-password placeholder="新密码" prop="userPassword" v-model="ruleForm.userPassword"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
                <el-input placeholder="请输入验证码" style="width: 280px" v-model="ruleForm.verifyCode"/>
                &nbsp;
                <el-button :disabled="isDisabled" @click="sendCode">{{codeValue}}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doRegister" style="width: 400px">修改密码</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script>

    import { sendVerifyCode, checkVerifyCode} from '../../api/user'
    import {selectUser, updateUser} from '../../api/admin'

    export default {
        name: "ForgetPassword",
        data() {
            let userPhoneIsExist = (rule, value, callback) => {
                if (value === '') {
                    callback("手机号不能为空");
                    this.userPhoneFlag=false;
                } else if (value !== '') {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                      this.userPhoneFlag=false;
                        callback(new Error("请输入正确的手机号格式"));
                    } else {
                        selectUser({
                            userPhone: this.ruleForm.userPhone,
                        }).then(res => {
                            if (res.data.data.list.length === 0) {
                              this.userPhoneFlag=false;
                                callback('手机号不存在');
                            } else {
                                this.userPhoneFlag=true;
                                callback();
                            }
                        })
                    }

                } else {
                    callback();

                }
            }


            let checkVerifCode = (rule, value, callback) => {
                if (value === '') {
                    callback("验证码不能为空");
                }else {
                  callback();
                }
            }


            let checkPassword = (rule, value, callback) => {
                if (value === '') {
                    callback("密码不能为空");
                    this.userPasswordFlag=false;
                    this.isDisabled=true;
                } else if (value.length < 8 || value.length > 16) {
                    callback("密码未在8-16位之间");


                } else {
                  this.userPasswordFlag=true;
                  callback();

                }
              if(this.userPhoneFlag&&this.userPasswordFlag){
                this.isDisabled=false;
              }
            }


            return {
                codeValue: '获取验证码',
                isDisabled: true,
                wait: 30,

              userPhoneFlag:false,
              userPasswordFlag:false,
                ruleForm: {
                    userName: '',
                    userPassword: '',
                    userPhone: '',
                    code: '',
                    userFatherProxyName: '',
                    verifyCode: '',
                    userEmail: ''

                },
                rules: {
                    userPhone: [{validator: userPhoneIsExist, trigger: 'blur'}],
                    userPassword: [{validator: checkPassword, trigger: 'blur'}],
                    verifyCode: [{validator: checkVerifCode, trigger: 'blur'}],

                }
            }
        },
        methods: {

            sendCode() {

                if(this.ruleForm.userPhone===''&&!/^1[3456789]\d{9}$/.test(this.ruleForm.userPhone)){
                    this.$message.error("手机号未填写或格式不对");
                }else {
                    let params = new URLSearchParams();
                    params.append('userPhone', this.ruleForm.userPhone);
                    sendVerifyCode(JSON.stringify({
                        userPhone: this.ruleForm.userPhone
                    })).then(() => {
                        this.$message({
                            message:'验证码已发送！',
                            type:'success'
                        });
                    });
                    this.isDisabled = true;
                    this.codeValue = this.wait + '秒';
                    let clock = window.setInterval(() => {
                        this.wait--
                        this.codeValue = this.wait + '秒'
                        if (this.wait < 0) { //当倒计时小于0时清除定时器
                            window.clearInterval(clock)
                            this.codeValue = '获取验证码'
                            this.wait = 30
                            this.isDisabled = false
                        }
                    }, 1000)
                }


            },
            doRegister() {

                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        checkVerifyCode(JSON.stringify({
                          verifyCode: this.ruleForm.verifyCode,
                          userPhone: this.ruleForm.userPhone
                        })).then(res=>{
                          if(res.data.code===200||res.data.code===201){
                            selectUser({
                              userPhone:this.ruleForm.userPhone
                            }).then(res=>{
                              let user=res.data.data.list[0];
                              this.ruleForm["userId"]=user.userId;
                              user.userPassword=this.ruleForm.userPassword;

                              updateUser(JSON.stringify(user)).then(res => {
                                if (res.data.code === 201) {
                                  this.$message({
                                    message: '修改成功',
                                    type:"success"
                                  })
                                }
                              });
                            })

                          }else {
                            this.$message.error("验证码错误");
                          }
                        });


                    }
                })
            },
        },


    }
</script>

<style scoped>

</style>
