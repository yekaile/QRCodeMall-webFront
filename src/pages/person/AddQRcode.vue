<template>

    <div style="width: 550px;border: 1px solid #409EFF;border-radius: 30px;margin-left: 200px;padding: 30px">
        选择行业：
        <el-select style="margin-bottom: 20px" v-model="value" @change="fetchPropertyKeys(value)">
            <el-option v-for="goodsType in goodsTypeList" :value="goodsType.goodsTypeName" :key="goodsType"
                       :label="goodsType.goodsTypeName">
            </el-option>
        </el-select>
        <el-form :model="properties" label-position="left" ref="properties" class="demo-dynamic" :key="index"
                 status-icon>

            <div v-for="(property,index) in properties" :key="index">
                <el-form-item :label="property.propertyKey"
                              :rules="[ { required: true, message: '不能为空', trigger: 'change' } ]"
                              label-width="100px" class="demo-dynamic" >

                    <el-input type="textarea" v-if="property.propertyKey==='注意事项'" placeholder="注意事项"
                              style="width: 300px;margin-top: 6px;" v-model="property.propertyValue"/>
                    <el-date-picker
                            v-model="property.propertyValue"
                            type="date"
                            placeholder="选择日期" v-if="property.propertyKey==='生产日期'">
                    </el-date-picker>
                    <el-input v-model="property.propertyValue" :placeholder="property.propertyKey"
                              v-if="isInput(property.propertyKey)"/>
                </el-form-item>


            </div>
            <el-form-item >
                <center>
                    <el-button type="primary" @click="submit" >提交</el-button>
                    <el-button @click="reset">清空</el-button>
                </center>

            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import {getKeys, addProperty, addQrcode} from '../../api/qrcode'
    import {myAccount} from '../../api/account'

    export default {
        name: "AddQRcode",
        created() {
            this.fetchData();
        },
        data() {
            return {

                qrcodeId: null,
                value: '',
                propertyKeys: [],
                properties: [],
                goodsTypeList: [],
                disabled:false
            }
        },
        methods: {


            fetchData() {
                this.fetchGoodsType();
            },

            fetchGoodsType() {
                myAccount().then(res => {
                    this.goodsTypeList = res.data.data;
                    if(this.goodsTypeList.length===0){
                        this.disabled=true;
                    }
                })
            },

            fetchPropertyKeys(goodsType) {
                getKeys({
                    goodsType: goodsType
                }).then(res => {
                    if (res.data.data.length === 0) {
                        this.properties = []
                    } else {
                        this.properties = []
                        this.propertyKeys = res.data.data;
                        let len = this.propertyKeys.length;
                        for (let i = 0; i < len; i++) {
                            this.properties.push({
                                propertyId: this.propertyKeys[i].propertyId,
                                qrcodeId: 1,
                                propertyKey: this.propertyKeys[i].propertyKey,
                                propertyValue: ''
                            });
                        }
                    }

                });
            },
            reset() {
                this.properties.forEach(item => {
                    item.propertyValue = '';
                });
            },


           async addQRcode() {

                let goodsTypeName = this.value;
                let goodsTypeId = 1;
                for (let i = 0; i < this.goodsTypeList.length; i++) {
                    let goodsType = this.goodsTypeList[i];
                    if (goodsType.goodsTypeName === goodsTypeName) {
                        goodsTypeId = goodsType.goodsTypeId;
                        break;
                    }
                }

             await   addQrcode(JSON.stringify({
                    goodsId:1,
                    goodsTypeId: goodsTypeId,
                    goodsTypeName: goodsTypeName,
                    qrcodeLink: goodsTypeId
                })).then(res => {

                    this.qrcodeId = res.data.data;
                });


            },


          async  addProperty() {
                let flag1 = true;
                this.properties.forEach(property => {
                    if (property.propertyValue === '' && property.propertyKey !== '注意事项') {
                        flag1 = false;
                    }
                });

                if (flag1) {

                    for (let i = 0; i < this.properties.length; i++) {
                        this.properties[i].qrcodeId=this.qrcodeId;
                    }

                 await   addProperty(JSON.stringify(this.properties)).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message:'添加成功',
                                type:'success'
                            });
                        }
                    });
                } else {
                   this.$message.error("添加失败");
                }
            },
            async submit ()  {
                await this.addQRcode();
                await this.addProperty();
                this.$message({
                    message:'添加成功',
                    type:'success'
                });
                this.reset();
            },

            isInput(propertyKey) {
                return propertyKey !== '生产日期' && propertyKey !== '注意事项';
            }
        }
    }
</script>

<style scoped>

    .el-form-item {
        width: 450px;
    }
</style>
