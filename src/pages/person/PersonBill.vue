<template>
    <el-container>
        <el-main>
            <el-table :data="userBills">
                <el-table-column
                        prop="userBillMoney"
                        label="金额"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="userBillDirection"
                        label="收入/支出"
                        width="">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userBillDirection===1">支出</span>
                        <span v-else>收入</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="userBillRemark"
                        label="备注"
                        width="">
                </el-table-column>
                <el-table-column
                        prop="gmtCreated"
                        label="时间"
                        width="">
                </el-table-column>

            </el-table>

        </el-main>
     <el-footer style="padding-left: 900px">

         <el-pagination
                 layout="prev, pager, next"
                 :total="total"
                 :page-size="9"
                 @current-change="currentChange"
          style="float: left">
         </el-pagination>
     </el-footer>

    </el-container>
</template>

<script>

    import {myBill} from "../../api/user";

    export default {
        name: "PersonBill",

        created() {
            this.fetchData();
        },
        data() {
            return {
                userBills: [],
                total: 0
            }
        },
        methods: {
            currentChange(pageNum){
                myBill({
                    pageNum:pageNum
                }).then(res => {
                    this.userBills = res.data.data.list;
                });
            },
            fetchData() {
                myBill().then(res => {
                    this.userBills = res.data.data.list;
                    this.total = res.data.data.total;
                });
            }
        }
    }
</script>

<style scoped>

</style>
