<template>
    <div style="width: 550px;border: 1px solid #409EFF;border-radius: 30px;margin-left: 200px;padding: 30px">
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
            <el-form-item>
                <center>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button @click="reset">清空</el-button>
                </center>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import {getQRcodeInfo} from '../../api/qrcode'
    import {updateValue} from "@/api/qrcode";

    export default {
        name: "UpdateQRCode",
        created() {
            let qrcodeId = this.$route.query.qrcodeId;
            this.fetchData(qrcodeId);
        },
        data() {
            return {
                properties: [],
            }
        },
        methods: {

            isInput(propertyKey) {
                return propertyKey !== '生产日期' && propertyKey !== '注意事项';
            },


          submit(){
            updateValue(JSON.stringify(this.properties)).then(res=>{
              if(res.data.code===200||res.data.code===201){
                this.$message({
                  message:'修改成功',
                  type:'success'
                });
              }else {
                this.$message({
                  message:'修改失败',
                  type:'error'
                });
              }

            })
          },
            reset() {
                this.properties.forEach(item => {
                    item.propertyValue = '';
                });
            },
            fetchData(qrcodeId) {
                getQRcodeInfo({
                    qrcodeId: qrcodeId
                }).then(res => {
                    this.properties = res.data.data;
                });
            }
        },

    }
</script>

<style scoped>

</style>
