<template>

  <el-container>

        <span><strong>确认收货地址</strong>
          &nbsp;&nbsp;&nbsp;
        <el-button type="text" @click="makeDialogTrue">添加地址</el-button>
        </span>
    <el-divider/>
    <el-table
        :data="addressList.filter(item=>item.isDeleted===0)"
        highlight-current-row
        ref="singleTable"
        @current-change="handleCurrentChange"

    >

      <el-table-column>
        <template  slot-scope="scope">
          <input name="address"  :value="scope.row"  type="radio"/>
        </template>
      </el-table-column>
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
                :src="`https://api.pwmqr.com/qrcode/create/?url=http://stu.jeehon.com/view/view.html?qrcodeId=${scope.row.qrcodeId}`"
                style="width: 120px;height: 120px"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="邮寄数量">
          <template scope="scope">
            <el-input-number v-model="scope.row.qrcodeNumber" :min="1" placeholder="邮寄数量" size="small"/>
          </template>
        </el-table-column>


      </el-table>
    </el-main>
    <el-footer>
      <el-button type="danger" style="border-radius: 0 !important;float: right" @click="submit">确认邮寄</el-button>
    </el-footer>

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
          <el-button type="primary" @click="addAddress" style="width: 100%;border-radius: 0">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>

import {addBatch} from '@/api/qrcodeBatch'
import {myAddress} from "@/api/user";
import {arrAll} from '@/datas'
import {addAddress} from "@/api/user";

export default {
  name: "MailQrcode",

  created() {
    this.fetchData();
  },

  beforeDestroy() {
    localStorage.setItem('qrcodes', JSON.stringify(this.mailQrcodes));
  },
  data() {
    return {

      arr: arrAll,
      prov: '北京',
      city: '北京',
      district: '东城区',
      cityArr: [],
      districtArr: [],
      select: 1,
      addressList: [],
      mailQrcodesVO: [],
      mailQrcodes: [],
      multipleSelection: [],
      currentRow: null,
      dialogFormVisible:false,
      user: JSON.parse(sessionStorage.getItem('user')),
      flag: true,
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


  watch: {


    prov() {
      this.updateCity();
      this.updateDistrict();
    },
    city() {
      this.updateDistrict();
    },
    $route: {
      handler() {
        this.mailQrcodes = JSON.parse(localStorage.getItem('qrcodes'));
      },
      deep: true
    },


  },

  methods: {


    addAddress(){
      addAddress(JSON.stringify({
        userAddressProvince: this.prov,
        userAddressCity: this.city,
        userAddressDistrict: this.district,
        userAddressDetail: this.userAddress1.userAddressDetail,
        receiveName: this.userAddress1.receiveName,
        receivePhone: this.userAddress1.receivePhone,
        userAddressDefault: this.userAddressDefault
      })).then(res => {
        if (res.data.code === 201) {
          this.$message({
            message:'添加成功',
            type:'success'
          });
          this.dialogFormVisible = false;
          this.fetchData();
        }else {
          this.$message.error(res.data.message);
        }
      });
    },


    makeDialogTrue() {
      this.dialogFormVisible = true;

    },
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

    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    async fetchData() {
      await myAddress().then(res => {
        this.addressList = res.data.data;
      });
      for (let i = 0; i < this.addressList.length; i++) {
        let address = this.addressList[i];
        if (address.userAddressDefault === 1) {
          this.setCurrent(address);
          this.currentRow = address;
          break;
        }
      }

      this.mailQrcodes = JSON.parse(localStorage.getItem('qrcodes'));
      console.log(JSON.stringify(this.mailQrcodes));
      if (this.currentRow === null) {
        this.mailQrcodes.forEach(qrcode => {
          this.mailQrcodesVO.push({
            qrcodeId: qrcode.qrcodeId,
            gmtCreated: qrcode.gmtCreated,
            goodsTypeName: qrcode.goodsTypeName,
            goodsTypeId: qrcode.goodsTypeId,
            isDeleted: qrcode.isDeleted,
            qrcodeNumber: 0,
            userId: this.user.userId,
            userAddressId: ''
          });
        });
      } else {
        this.mailQrcodes.forEach(qrcode => {
          this.mailQrcodesVO.push({
            qrcodeId: qrcode.qrcodeId,
            gmtCreated: qrcode.gmtCreated,
            goodsTypeName: qrcode.goodsTypeName,
            goodsTypeId: qrcode.goodsTypeId,
            isDeleted: qrcode.isDeleted,
            qrcodeNumber: 0,
            userId: this.user.userId,
            userAddressId: this.currentRow.userAddressId
          });
        });
      }


      console.log(JSON.stringify(this.mailQrcodesVO));
      console.log(JSON.stringify(this.mailQrcodes));
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },


    deleteQrcode(qrcodeIds) {
      let mailQrcodesTemp = [];
      this.mailQrcodes.forEach(qrcode => {
        if (qrcodeIds.indexOf(qrcode.qrcodeId) < 0) {
          mailQrcodesTemp.push(qrcode);
        }
      });
      this.mailQrcodes = mailQrcodesTemp;
      localStorage.setItem('qrcodes', JSON.stringify(this.mailQrcodes));


    },
    submit() {


      if (this.multipleSelection.length === 0) {
        this.$message.error('未添加邮寄二维码');
        return
      }
      if (this.currentRow === null) {
        this.$message.error('未添加邮寄地址');
      }
      let qrcodeIds = [];
      this.multipleSelection.forEach(item => {
        item.userAddressId = this.currentRow.userAddressId;
        qrcodeIds.push(item.qrcodeId);
      });


      this.deleteQrcode(qrcodeIds);
      addBatch(JSON.stringify(this.multipleSelection)).then(res => {
        if (res.data.code === 201) {
          this.deleteQrcode(qrcodeIds);
          this.$message({
            message:'添加邮寄成功',
            type:'success'
          })
          location.reload();
        }
      });
    }
  },

}
</script>

<style scoped>

</style>
