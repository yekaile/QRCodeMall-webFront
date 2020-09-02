<template>
    <el-container>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon style="margin: 140px auto;width: 40%">
            <el-form-item prop="newPhone">
                <el-input v-model="ruleForm.newPhone" placeholder="新手机号"/>
            </el-form-item>
            <el-form-item prop="repeatPhone">
                <el-input v-model="ruleForm.repeatPhone" placeholder="重复手机号"/>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="updatePhone">修改</el-button>
                <el-button @click="reset">取消</el-button>
            </el-form-item>
        </el-form>

    </el-container>
</template>

<script>
    import {selectUser} from '../../api/admin';
    import {modify} from "../../api/user";

    export default {
        name: "UpdatePhone",
        created() {
        },
        data() {
            let userPhoneIsExist = (rule, value, callback) => {
                if (value === '') {
                    callback("手机号不能为空");
                } else if (value !== '') {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                        callback(new Error("请输入正确的手机号格式"));
                    } else {
                        selectUser({
                            userPhone: value,
                        }).then(res => {
                            if (res.data.data.list.length === 0) {
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
            let checkPhone = (rule, value, callback) => {
                if (value === '') {
                    callback("电话号码不能为空");
                } else if (value !== '') {
                    if (value !== this.ruleForm.newPhone) {
                        callback("前后电话号码不一致");
                    }
                } else {
                    callback();

                }
            }

            return {
                ruleForm: {
                    newPhone: '',
                    repeatPhone: ''
                },

                rules: {
                    newPhone: [{validator: userPhoneIsExist, trigger: 'blur'}],
                    repeatPhone: [{validator: checkPhone, trigger: 'blur'}],
                }
            }
        },
        methods: {

            reset() {

                this.ruleForm = {
                    newPhone: '',
                    repeatPhone: ''
                }
            },

            updatePhone() {


                let valid = this.ruleForm.newPhone !== '' && this.ruleForm.repeatPhone !== '' && this.ruleForm.newPhone === this.ruleForm.repeatPhone;
                if (valid) {

                    let user = JSON.parse(sessionStorage.getItem('user'));
                    modify(JSON.stringify({
                        userId: user.userId,
                        userPhone: this.ruleForm.repeatPhone
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
        }
    }
</script>

<style scoped>

</style>
