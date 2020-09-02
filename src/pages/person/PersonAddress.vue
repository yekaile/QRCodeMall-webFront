<template>
    <div>

        <el-container style="width: 450px;margin: 20px auto;padding: 5px">

            <el-form style="margin: 0 auto" :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-form-item>
                    <el-select v-model="prov" style="width: 130px">
                        <el-option v-for="option in arr" :value="option.name" :key="option" :label="option.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="city" style="width: 130px">
                        <el-option v-for="option in cityArr" :value="option.name" :key="option" :label="option.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="district" v-if="district" style="width: 130px">
                        <el-option v-for="option in districtArr" :value="option.name" :key="option"
                                   :label="option.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiveName">
                    <el-input placeholder="请输入收件人姓名" v-model="ruleForm.receiveName" prop="receiveName"/>
                </el-form-item>
                <el-form-item prop="receivePhone">
                    <el-input  placeholder="请输入收件人手机号" v-model="ruleForm.receivePhone" prop="receivePhone"/>
                </el-form-item>
                <el-form-item prop="userAddressDetail">
                    <el-input type="textarea" placeholder="请输入详细地址" v-model="ruleForm.userAddressDetail" prop="userAddressDetail"></el-input>
                </el-form-item>

                <el-form-item prop="userAddressDefault">
                    <el-checkbox v-model="ruleForm.userAddressDefault" prop="userAddressDefault">设置为默认地址
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addAddress1">保存</el-button>
                </el-form-item>
            </el-form>
        </el-container>
        <el-table
                :data="addressList.filter(item=>item.isDeleted===0)"
                border

        >
            <el-table-column
                    prop="receiveName"
                    label="收货人"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressProvince"
                    label="所在省（自治区，直辖市）"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressCity"
                    label="所在市"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressDistrict"
                    label="所在县（区）"
                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressDetail"
                    label="详细地址"
                    width="">
            </el-table-column>

            <el-table-column
                    prop="receivePhone"
                    label="手机号"
                    width="">
            </el-table-column>

            <el-table-column
                    label="是否为默认地址">
                <template slot-scope="scope">
                    <span v-if="scope.row.userAddressDefault===1">
                        默认
                    </span>
                    <span v-else>
                        不默认
                    </span>
                </template>

            </el-table-column>
            <el-table-column
                    label="操作"
                    width="">
                <template slot-scope="scope">

                    <el-button
                            size="mini"
                            type="text"
                            @click="setDefault(scope.row.userAddressId)" v-if="scope.row.userAddressDefault===0">设为默认
                    </el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="makeDialogTrue(scope.row.userAddressId)">修改
                    </el-button>
                    <el-button
                            size="mini"
                            type="text"
                            @click="deleteAddress(scope.row.userAddressId)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogFormVisible" width="500px" center="true" style="border-radius: 30px">
            <el-form style="margin: 0 auto" :model="userAddress1" status-icon :rules="rules" ref="userAddress1">
                <el-form-item>
                    <el-select v-model="prov" style="width: 130px">
                        <el-option v-for="option in arr" :value="option.name" :key="option" :label="option.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="city" style="width: 130px">
                        <el-option v-for="option in cityArr" :value="option.name" :key="option" :label="option.name">
                        </el-option>
                    </el-select>
                    <el-select v-model="district" v-if="district" style="width: 130px">
                        <el-option v-for="option in districtArr" :value="option.name" :key="option"
                                   :label="option.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiveName">
                    <el-input type="text" placeholder="请输入收件人姓名" v-model="userAddress1.receiveName"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="receivePhone">
                    <el-input type="text" placeholder="请输入收件人手机号" v-model="userAddress1.receivePhone"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="userAddressDetail">
                    <el-input type="textarea" placeholder="请输入详细地址" v-model="userAddress1.userAddressDetail"
                              prop="userAddressDetail"></el-input>
                </el-form-item>

                <el-form-item prop="userAddressDefault">
                    <el-checkbox v-model="userAddress1.userAddressDefault" prop="userAddressDefault">设置为默认地址
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateAddress1()">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>


    import {arrAll} from '../../datas'
    import {myAddress, deleteAddress, addAddress, updateAddress, selectAddressById} from '../../api/user';

    export default {
        name: "PersonAddress",
        created() {
            this.fetchAddress();
        },
        data() {
            let userPhoneIsExist = (rule, value, callback) => {

                if (value === '') {
                    callback("手机号不能为空");
                } else if (value !== '') {
                    if (!/^1[3456789]\d{9}$/.test(value)) {
                        callback(new Error("请输入正确的手机号格式"));
                    }
                } else {
                    callback();

                }
            }

            return {
                arr: arrAll,
                prov: '北京',
                city: '北京',
                district: '东城区',
                cityArr: [],
                districtArr: [],
                user: {},
                addressList: [],
                dialogFormVisible: false,
                userAddressId: '',
                rules: {
                    receiveName: [{required: true, message: '收件人不能为空', trigger: 'change'}],
                    receivePhone: [{validator: userPhoneIsExist, trigger: 'change'}],
                    userAddressDetail: [{required: true, message: '收件详细地址不能为空', trigger: 'change'}],

                },
                ruleForm: {
                    userAddressProvince: '',
                    userAddressCity: '',
                    userAddressDistrict: '',
                    userAddressDetail: '',
                    receiveName: '',
                    receivePhone: '',
                    userAddressDefault: 0
                },

                userAddress1: {
                    userAddressProvince: '',
                    userAddressCity: '',
                    userAddressDistrict: '',
                    userAddressDetail: '',
                    receiveName: '',
                    receivePhone: '',
                    userAddressDefault: 0
                }
            }
        },

        methods: {

            updateCity() {
                for (var i in this.arr) {
                    var obj = this.arr[i];
                    if (obj.name == this.prov) {
                        this.cityArr = obj.sub;
                        break;
                    }
                }
                this.city = this.cityArr[1].name;
            },
            updateDistrict() {
                for (var i in this.cityArr) {
                    var obj = this.cityArr[i];
                    if (obj.name == this.city) {
                        this.districtArr = obj.sub;
                        break;
                    }
                }
                if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                    this.district = this.districtArr[1].name;
                } else {
                    this.district = '';
                }
            },

            fetchAddress() {
                myAddress().then(res => {
                    this.addressList = res.data.data;
                });
            },

            addAddress1() {
                this.$refs.ruleForm.validate((valid) => {
                    console.log(JSON.stringify(this.ruleForm));
                    if (valid===true) {
                        addAddress(JSON.stringify({
                            userAddressProvince: this.prov,
                            userAddressCity: this.city,
                            userAddressDistrict: this.district,
                            userAddressDetail: this.ruleForm.userAddressDetail,
                            receiveName: this.ruleForm.receiveName,
                            receivePhone: this.ruleForm.receivePhone,
                            userAddressDefault: this.ruleForm.userAddressDefault
                        })).then(res => {
                            alert(res.data.message);
                            this.fetchAddress();
                        });
                    }else {
                        return false;
                    }
                })
            },

            updateAddress1() {
                updateAddress(JSON.stringify({
                    userAddressId: this.userAddressId,
                    userAddressProvince: this.prov,
                    userAddressCity: this.city,
                    userAddressDistrict: this.district,
                    userAddressDetail: this.userAddress1.userAddressDetail,
                    receiveName: this.userAddress1.receiveName,
                    receivePhone: this.userAddress1.receivePhone,
                    userAddressDefault: this.userAddressDefault
                })).then(res => {
                    if (res.data.code === 200) {
                        alert("修改成功");
                        this.dialogFormVisible = false;
                        this.fetchAddress();
                    }
                });
            },
            setDefault(userAddressId) {
                updateAddress(
                    JSON.stringify({
                        userAddressId: userAddressId,
                        userAddressDefault: this.ruleForm.userAddressDefault
                    })
                ).then(() => {
                    alert("设置成功");
                    this.fetchAddress();
                })
            },
            deleteAddress(userAddressId) {
                deleteAddress({
                    userAddressId: userAddressId
                }).then(() => {
                    alert("删除成功");
                    this.fetchAddress();
                });
            },

            makeDialogTrue(userAddressId) {
                this.dialogFormVisible = true;
                selectAddressById({
                    userAddressId: userAddressId
                }).then(res => {
                    this.userAddress1.receiveName = res.data.data.receiveName;
                    this.userAddress1.receivePhone = res.data.data.receivePhone;
                    this.userAddress1.userAddressDetail = res.data.data.userAddressDetail;
                    this.userAddress1.userAddressDefault = res.data.data.userAddressDefault;
                    this.userAddressId = res.data.data.userAddressId;
                });

            },
        },

        watch: {
            prov() {
                this.updateCity();
                this.updateDistrict();
            },
            city() {
                this.updateDistrict();
            }
        }
    }
</script>

<style scoped>

</style>
