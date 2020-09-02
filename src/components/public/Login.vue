<template >



    <div>
        <el-tabs style="">
            <el-tab-pane label="用户名登录">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                         size="medium" style="width: 350px">

                    <el-form-item prop="userName">
                        <el-input v-model="ruleForm.userName" placeholder="用户名/手机号/邮箱"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input show-password placeholder="密码" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-link href="/public/forgetPassword" :underline="false" style="text-decoration: none;color: black;float: right;margin-right: 5px" @click="forgetPassword">
                            忘记密码
                        </el-link>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login" style="width: 350px">登录</el-button>
                    </el-form-item>


                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>


</template>

<script>

    import {login} from "../../api/user";
    import {selectUser} from "../../api/admin";

    export default {
        name: "Login",
        data() {
            return {

                phoneForm:{
                  userPhone:'',
                  code:'',
                },
                ruleForm: {
                    userName: '',
                    password: '',
                },
                rules: {
                    userName: [
                        {required: true, message: '用户名不能为空', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'change'}
                    ],

                }
            }
        },
        methods: {


            forgetPassword(){
                console.log('forget');
              this.$emit('forgetPassword','forgetPassword');
            },
            login(){
                this.$refs.ruleForm.validate(valid=>{
                    if(valid){

                        login(JSON.stringify({
                            account:this.ruleForm.userName,
                            password:this.ruleForm.password
                        })).then(res=>{
                            if(res.data.code===200) {
                                if (res.data.code === 200) {
                                    this.$message({
                                        message:'登录成功！',
                                        type:'success'
                                    });
                                }
                                selectUser({
                                    userName: this.ruleForm.userName
                                }).then(res => {
                                    let user=JSON.stringify(res.data.data.list[0]);
                                    sessionStorage.setItem("user", user);

                                    setTimeout(()=>{
                                        this.$emit('fromLogin',user);
                                    }, 1000);
                                })
                            }
                            else{
                              this.$message.error('账号或密码错误');
                                sessionStorage.setItem("user", '');

                            }
                        });
                    }

                });
            }
        },


    }
</script>

<style scoped>

</style>
