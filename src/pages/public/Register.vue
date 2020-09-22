<template>


  <div style="width: 450px;border: 1px solid #409EFF;border-radius: 30px;margin: 20px auto;padding: 30px">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
             size="medium" style="width: 400px;margin: 0px auto">

      <el-form-item>
        <h2 style="text-align: center">注&nbsp;&nbsp;册&nbsp;</h2>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请设置用户名"></el-input>
      </el-form-item>

      <el-form-item prop="userPhone">
        <el-input v-model="ruleForm.userPhone" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="userEmail">
        <el-input v-model="ruleForm.userEmail" placeholder="请输入邮箱号"></el-input>
      </el-form-item>


      <el-form-item prop="userPassword">
        <el-input show-password placeholder="密码" prop="userPassword" v-model="ruleForm.userPassword"/>
      </el-form-item>
      <el-form-item prop="userFatherProxyName">
        <el-input placeholder="请输入推荐你的人的用户名(选填)" v-model="ruleForm.userFatherProxyName"/>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input placeholder="请输入验证码" style="width: 280px" v-model="ruleForm.verifyCode"/>
        &nbsp;
        <el-button :disabled="isDisabled" @click="sendCode">{{ codeValue }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doRegister" style="width: 400px">注册</el-button>
      </el-form-item>


    </el-form>
  </div>


</template>

<script>


import {register, sendVerifyCode, checkVerifyCode} from "../../api/user"
import {selectUser} from '@/api/admin'


export default {
  name: "Register",
  data() {
    let userFatherProxyNameIsExist = (rule, value, callback) => {
      if (value === '') {

        callback();
      } else if (value !== '') {
        selectUser({
          userName: this.ruleForm.userFatherProxyName,
        }).then(res => {
          if (res.data.data.list.length === 0) {
            callback("该用户不存在");
          } else {
            callback();
          }
        })
      } else {
        callback();
      }
    }
    let userNameIsExist = (rule, value, callback) => {
      if (value === '') {

        callback(new Error("用户名不能为空"));
      } else if (value !== '') {
        selectUser({
          userName: this.ruleForm.userName,
        }).then(res => {
          if (res.data.data.list.length === 0) {
            callback();
          } else {

            callback(new Error("用户名已存在"));
          }
        })
      } else {
        callback();
      }
    }
    let userPhoneIsExist = (rule, value, callback) => {
      if (value === '') {
        callback("手机号不能为空");
      } else if (value !== '') {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号格式"));
        } else {
          selectUser({
            userPhone: this.ruleForm.userPhone,
          }).then(res => {
            if (res.data.data.list.length === 0) {
              this.isDisabled=false;
              callback();
            } else {
              callback('手机号已存在');
            }
          })
        }

      } else {
        callback();

      }
    }
    let userEmailCheck = (rule, value, callback) => {
      if (value === '') {
        callback("邮箱不能为空");
      } else if (value !== '') {
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
          callback(new Error("请输入正确的邮箱格式"));
        } else {
          selectUser({
            userEmail: this.ruleForm.userEmail,
          }).then(res => {
            if (res.data.data.list.length === 0) {
              callback();
            } else {
              callback('邮箱号已存在');
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

      } else {
        callback();
      }
    }


    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback("密码不能为空");
      } else if (value.length < 8 || value.length > 16) {
        callback("密码未在8-16位之间");
      } else {
        callback();

      }
    }


    return {
      codeValue: '获取验证码',
      isDisabled: true,
      wait: 30,
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
        userName: [{validator: userNameIsExist, trigger: 'blur'}],
        userPhone: [{validator: userPhoneIsExist, trigger: 'blur'}],
        userPassword: [{validator: checkPassword, trigger: 'blur'}],
        verifyCode: [{validator: checkVerifCode}],
        userFatherProxyName: [{validator: userFatherProxyNameIsExist, trigger: 'blur'}],
        userEmail: [{validator: userEmailCheck, trigger: 'blur'}],

      }
    }
  },
  methods: {

    sendCode() {
      if (this.ruleForm.userPhone === '' && !/^1[3456789]\d{9}$/.test(this.ruleForm.userPhone)) {
        this.$message.error("手机号未填写或格式不对");
      } else {
        let params = new URLSearchParams();
        params.append('userPhone', this.ruleForm.userPhone);
        sendVerifyCode(JSON.stringify({
          userPhone: this.ruleForm.userPhone
        })).then(() => {
          this.$message({
            message: '验证码已发送！',
            type: 'success'
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

      console.log(JSON.stringify(this.ruleForm));
      this.$refs.ruleForm.validate(valid => {
        if (valid) {

          checkVerifyCode(JSON.stringify({
            verifyCode: this.ruleForm.verifyCode,
            userPhone: this.ruleForm.userPhone
          })).then(res => {
            if (res.data.code === 200 || res.data.code === 201) {
              if (this.ruleForm.userFatherProxyName === '') {
                delete this.ruleForm["userFatherProxyName"];
              }
              register(JSON.stringify(this.ruleForm)).then(res => {
                if (res.data.code === 201) {
                  this.$message({
                    message: '注册成功！',
                    type: "success"
                  });
                  this.$router.push('/public');

                }
              });
            } else {
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
