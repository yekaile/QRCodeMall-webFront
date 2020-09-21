<template>

    <el-container>

        <el-header>
            <el-button type="primary" style="border-radius: 0 !important;" @click="toMailQrcode">进行邮寄 </el-button>
        </el-header>
        <el-main>
            <el-table :data="qrcodeList.filter(item=>item.isDeleted===0)">

                <el-table-column prop="qrcodeId" label="二维码id">
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
                <el-table-column label="操作">
                    <template slot-scope="scope">


                        <el-button
                                size="mini"
                                type="text"
                                @click="updateQrcode(scope.row.qrcodeId)" slot="reference">编辑
                        </el-button>


                        <el-button
                                size="mini"
                                type="text"
                                @click="addMail(scope.row)" slot="reference">添加邮寄
                        </el-button>

                        <template>
                            <el-popconfirm
                                    title="确定删除？" @onConfirm="deleteQrcode(scope.row.qrcodeId)"
                            >
                                <el-button slot="reference" type="text" style="font-size: 12px">删除</el-button>
                            </el-popconfirm>

                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination
                    layout="prev, pager, next"
                    :total="total" :page-size="pageSize" style="float: right" @current-change="fetchQrcodeData">
            </el-pagination>
        </el-footer>

    </el-container>
</template>

<script>

    import {myQrcode, deleteQRcode} from '../../api/qrcode'

    export default {
        name: "QRCode",
        created() {

            if(localStorage.getItem('qrcodes')===null) {
                localStorage.setItem('qrcodes', JSON.stringify(this.mailQrcodes));
            }
            this.fetchQrcodeData(this.pageNum);
        },


        beforeDestroy() {

            localStorage.setItem('qrcodes',JSON.stringify(this.mailQrcodes));
        },
        data() {
            return {
                qrcodeList: [],
                pageNum: 1,
                pageSize: 9,
                total: 0,

                mailQrcodes: []
            }
        },
        methods: {


            toMailQrcode(){
              this.$router.push('/person/mailQrcode');
            },
            deleteQrcode(qrcodeId) {

                deleteQRcode({
                    qrcodeId: qrcodeId
                });
                this.fetchQrcodeData(this.pageNum);
            },


            addMail(qrcode) {

                console.log(JSON.stringify(qrcode));
                let flag=true;



                this.mailQrcodes.forEach(item=>{
                   if(item.qrcodeId===qrcode.qrcodeId){
                       flag=false;
                   }
                });
                if(flag){
                    this.mailQrcodes.push(qrcode);
                    alert("添加成功");
                }else {
                    alert("已添加过");
                }
            },
            updateQrcode(qrcodeId) {
                this.$router.push({path: '/person/updateQrcode', query: {qrcodeId: qrcodeId}});
            },
            fetchQrcodeData(pageNum) {
                myQrcode({
                    pageNum: pageNum
                }).then(res => {
                    this.qrcodeList = res.data.data.list;
                    this.total = res.data.data.total;
                });

            }
        },
    }
</script>

<style scoped>

</style>
