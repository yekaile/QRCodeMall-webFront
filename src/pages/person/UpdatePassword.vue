<template>
    <el-container>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" style="margin: 140px auto;width: 40%">
            <el-form-item prop="newPassword">
                <el-input type="password" v-model="ruleForm.newPassword" placeholder="新密码" show-password
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <el-input type="password" v-model="ruleForm.repeatPassword" placeholder="重复密码" show-password
                          auto-complete="off"/>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="updatePassword">修改</el-button>
                <el-button @click="reset">取消</el-button>
            </el-form-item>
        </el-form>

    </el-container>
</template>

<script>

    import {modify} from '../../api/user';

    export default {
        name: "UpdatePassword",
        created() {
        },
        data() {
            let checkPassword = (rule, value, callback) => {

                if (value === '') {
                    callback("密码不能为空");
                } else if (value !== '') {
                    if (value !== this.ruleForm.newPassword) {
                        callback("前后密码不一致");
                    }
                } else {
                    callback();

                }
            }
            return {
                ruleForm: {

                    newPassword: '',
                    repeatPassword: ''
                },

                rules: {
                    newPassword: [{required: true, message: '密码不能为空', trigger: 'change'}, {
                        min: 8,
                        max: 16,
                        message: '长度在 8 到 16 个字符',
                        trigger: 'blur'
                    }],
                    repeatPassword: [{validator: checkPassword, trigger: 'change'}, {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'change'
                    }, {
                        min: 8,
                        max: 16,
                        message: '长度在 8 到 16 个字符',
                        trigger: 'change'
                    }],


                }
            }
        },
        methods: {

            reset() {
                this.ruleForm = {

                    newPassword: '',
                    repeatPassword: ''
                };

            },
            updatePassword() {
                let valid = this.ruleForm.newPassword !== '' && this.ruleForm.newPassword !== '' && this.ruleForm.newPassword === this.ruleForm.repeatPassword;
                if (valid) {

                    let user = JSON.parse(sessionStorage.getItem('user'));
                    let userVO = {
                        userId: user.userId,
                        userPassword: this.ruleForm.repeatPassword
                    }
                    modify(JSON.stringify(userVO)).then(res => {
                        if (res.data.code === 201) {
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
                            this.reset();

                        } else {
                            this.$message.error('修改失败');

                        }
                    });
                } else {
                    this.$message.error('修改失败');
                }
            }
        },

    }
</script>

<style scoped>

</style>
