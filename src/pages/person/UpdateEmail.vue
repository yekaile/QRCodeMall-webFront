<template>
    <el-container>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon style="margin: 140px auto;width: 40%">
            <el-form-item prop="newEmail">
                <el-input v-model="ruleForm.newEmail" placeholder="新邮箱号"/>
            </el-form-item>
            <el-form-item prop="repeatEmail">
                <el-input v-model="ruleForm.repeatEmail" placeholder="重复邮箱号"/>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="updateEmail">修改</el-button>
                <el-button @click="reset">取消
                </el-button>
            </el-form-item>
        </el-form>

    </el-container>
</template>

<script>
    import {selectUser} from '../../api/admin'
    import {modify} from '../../api/user';

    export default {
        name: "UpdateEmail",
        created() {
        },
        data() {
            let userEmailCheck = (rule, value, callback) => {
                if (value === '') {
                    callback("邮箱不能为空");
                } else if (value !== '') {
                    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                        callback(new Error("请输入正确的邮箱格式"));
                    }

                    else {
                        selectUser({
                            userEmail: value,
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
            let checkEmail = (rule, value, callback) => {
                if (value === '') {
                    callback("邮箱不能为空");
                } else if (value !== '') {
                    if (value !== this.ruleForm.newEmail) {
                        callback("前后邮箱不一致");
                    }
                } else {
                    callback();

                }
            }

            return {
                ruleForm: {
                    newEmail: '',
                    repeatEmail: ''
                },

                rules: {
                    newEmail: [{validator: userEmailCheck, trigger: 'blur'}],
                    repeatEmail: [{validator: checkEmail, trigger: 'blur'}],
                }
            }
        },
        methods: {

            reset() {
                this.ruleForm = {
                    newEmail: '',
                    repeatEmail: ''
                };
            },
            updateEmail() {


                let valid = this.ruleForm.newEmail !== '' && this.ruleForm.repeatEmail !== '' && this.ruleForm.newEmail === this.ruleForm.repeatEmail;
                if (valid) {
                    let user = JSON.parse(sessionStorage.getItem('user'));
                    modify(JSON.stringify({
                        userId: user.userId,
                        userEmail: this.ruleForm.repeatEmail
                    })).then(res => {
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
