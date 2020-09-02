<template>
    <el-container>
        <el-main>

            <el-table :data="qrcodeBatchs" style="width: 100%">
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

                <el-table-column prop="expressNumber" label="快递单号">
                </el-table-column>
                <el-table-column prop="expressServicesCompany" label="快递公司">
                </el-table-column>


                <el-table-column label="二维码图片">

                    <template scope="scope">
                        <el-image
                                :src="`http://qr.liantu.com/api.php?text=http://stu.jeehon.com/view/view.html?qrcodeId=${scope.row.qrcodeId}`"
                                style="width: 120px;height: 120px"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="qrcodeNumber" label="邮寄二维码数量">

                </el-table-column>
                <el-table-column label="是否已邮寄">

                    <template scope="scope">
                        <span v-if="scope.row.expressNumber===null">未邮寄</span>
                        <span v-else>已邮寄</span>
                    </template>
                </el-table-column>

            </el-table>

        </el-main>
        <el-footer>
            <el-pagination
                    layout="prev, pager, next"
                    :total="total" :page-size="pageSize" style="float: right" @current-change="fetchData">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>

    import {getQrcodeBatch} from '../../api/qrcode'

    export default {
        name: "QrCodeBatch",
        created() {
            this.fetchData();
        },
        data() {
            return {
                qrcodeBatchs: [],
                user: JSON.parse(sessionStorage.getItem('user')),
                pageNum: 1,
                pageSize: 9,
                total: 0,
            }
        },
        methods: {
            fetchData(pageNum) {
                getQrcodeBatch({
                    userId: this.user.userId,
                    pageNum: pageNum
                }).then(res => {
                    this.qrcodeBatchs = res.data.data.list;
                    this.total = res.data.data.total;
                });
            },
        }
    }
</script>

<style scoped>

</style>
