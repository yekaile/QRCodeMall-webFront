<template>

    <el-container>

        <span><strong>确认收货地址</strong></span>
        <el-divider/>
        <el-table
                :data="addressList.filter(item=>item.isDeleted===0)"
                highlight-current-row
                ref="singleTable"
                @current-change="handleCurrentChange"

        >

            <el-table-column
                    prop="receiveName"

                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressProvince"

                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressCity"

                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressDistrict"

                    width="">
            </el-table-column>
            <el-table-column
                    prop="userAddressDetail"

                    width="">
            </el-table-column>

            <el-table-column
                    prop="receivePhone"

                    width="">
            </el-table-column>

            <el-table-column>
                <template slot-scope="scope">
                    <span v-if="scope.row.userAddressDefault===1">
                        默认地址
                    </span>
                </template>

            </el-table-column>

        </el-table>

        <el-main>
            <el-table ref="multipleTable"
                      tooltip-effect="dark" @selection-change="handleSelectionChange"
                      :data="mailQrcodesVO.filter(item=>item.isDeleted===0)">

                <el-table-column prop="qrcodeId" label="No" type="selection">
                </el-table-column>

                <el-table-column prop="goodsTypeName" label="二维码所属类别">
                </el-table-column>


                <el-table-column label="二维码链接">

                    <template scope="scope">
                        <el-link type="primary"
                                 :href="`http://stu.jeehon.com/view/view.html?qrcodeId=${scope.row.qrcodeId}`">链接
                        </el-link>
                    </template>
                </el-table-column>

                <el-table-column prop="gmtCreated" label="二维码创建时间">
                </el-table-column>
                <el-table-column label="二维码图片">

                    <template scope="scope">
                        <el-image
                                :src="`http://qr.liantu.com/api.php?text=http://stu.jeehon.com/view/view.html?qrcodeId=${scope.row.qrcodeId}`"
                                style="width: 120px;height: 120px"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="邮寄数量" >
                    <template scope="scope">
                    <el-input-number v-model="scope.row.qrcodeNumber" :min="1" placeholder="邮寄数量" size="small"/>
                    </template>
                </el-table-column>


            </el-table>
        </el-main>
        <el-footer>
            <el-button type="danger" style="border-radius: 0 !important;float: right" @click="submit" >确认邮寄</el-button>
        </el-footer>
    </el-container>
</template>

<script>

    import {addBatch} from '../../api/qrcodeBatch'
    import {myAddress} from "../../api/user";

   export default {
        name: "MailQrcode",
        created() {
          this.fetchData();
        },

       beforeDestroy() {
           localStorage.setItem('qrcodes',JSON.stringify(this.mailQrcodes));
       },
       data() {
            return {


                select:1,
                addressList: [],
                mailQrcodesVO: [],
                mailQrcodes:[],
                multipleSelection: [],
                currentRow: null,
                user:JSON.parse(sessionStorage.getItem('user')),
                flag:true
            }
        },


       watch:{

           $route: {
               handler() {


                   this.mailQrcodes= JSON.parse(localStorage.getItem('qrcodes'));
               },
               deep: true
           },




       },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },

          async fetchData(){
             await myAddress().then(res => {
                    this.addressList = res.data.data;
                });
                for (let i = 0; i <  this.addressList.length ; i++) {
                    let address=this.addressList[i];
                    if(address.userAddressDefault===1){
                        this.setCurrent(address);
                        this.currentRow=address;
                        break;
                    }
                }

                this.mailQrcodes= JSON.parse(localStorage.getItem('qrcodes'));
                this.mailQrcodes.forEach(qrcode => {
                    this.mailQrcodesVO.push({qrcodeId: qrcode.qrcodeId,gmtCreated:qrcode.gmtCreated,
                        goodsTypeName:qrcode.goodsTypeName,goodsTypeId:qrcode.goodsTypeId, isDeleted:qrcode.isDeleted,qrcodeNumber: 0,userId:this.user.userId,userAddressId:this.currentRow.userAddressId});
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            deleteQrcode(qrcodeIds){
                let mailQrcodesTemp=[];
               this.mailQrcodes.forEach(qrcode=>{
                 if(qrcodeIds.indexOf(qrcode.qrcodeId)<0){
                    mailQrcodesTemp.push(qrcode);
                 }
               });
               this.mailQrcodes=mailQrcodesTemp;
               localStorage.setItem('qrcodes',JSON.stringify(this.mailQrcodes));


            },
            submit(){


                if(this.multipleSelection.length===0){
                    this.$message.error('未添加邮寄二维码');
                    return
                }
                let qrcodeIds=[];
                this.multipleSelection.forEach(item=>{
                    item.userAddressId=this.currentRow.userAddressId;
                    qrcodeIds.push(item.qrcodeId);
                });


                this.deleteQrcode(qrcodeIds);
                addBatch(JSON.stringify(this.multipleSelection)).then(res=>{
                   if(res.data.code===201){
                       this.deleteQrcode(qrcodeIds);
                       location.reload();
                   }
                });
            }
        },
    }
</script>

<style scoped>

</style>
