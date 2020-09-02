<template>

    <el-container>
        <el-table :data="accountList" style="width: 100%">
            <el-table-column label="产品种类" prop="goodsTypeName">
            </el-table-column>
            <el-table-column label="剩余二维码数量" prop="goodsTypeQrcodeQuantity">
            </el-table-column>
        </el-table>
    </el-container>
</template>

<script>

    import {myAccount} from '../../api/account'
    export default {
        name: "Account",
        created(){
            this.fetchData();
        },

        data(){
            return{
                accountList:[]
            }
        },
        methods:{
            fetchData(){
                myAccount().then(res=>{
                    this.accountList=res.data.data;
                })
            }
        },

    }
</script>

<style scoped>

</style>
