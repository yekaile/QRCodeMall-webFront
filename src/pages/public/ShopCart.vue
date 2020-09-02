<template>
    <div >
        <div >
            <el-table :data="goodsList"  style="width: 100%" ref="multipleTable"
             tooltip-effect="dark" @selection-change="handleSelectionChange" >
                <el-table-column prop="goodsName" label="商品名" type="selection"/>
                <el-table-column prop="goodsTypeName" label="商品类别"/>
                <el-table-column prop="goodsPrice" label="商品价格"/>
                <el-table-column prop="goodsPrice" label="总计"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini" type="text" @click="deleteGoods(scope.row.goodsId)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="float: right;margin-top: 30px">
            <span>实付款：¥{{allPrice}}</span>
            &nbsp;
            &nbsp;
            <el-button type="danger" style="border-radius: 0 !important;" @click="submit" v-if="goodsList.length!==0"> 提交订单</el-button>
            <el-button type="danger" style="border-radius: 0 !important;" @click="submit" v-else disabled> 提交订单</el-button>
        </div>
    </div>
</template>

<script>

    import {shoppingCart,deleteShoppingCartGoods} from './../../api/goods';

    export default {
        name: "ShopCart",

        methods: {
            deleteGoods(goodsId){
                deleteShoppingCartGoods(JSON.stringify([goodsId])).then(res=>{
                        if(res.data.code===200){
                            this.allPrice=0;
                            this.fetchData();
                        }
                });
            },

            handleSelectionChange(val) {
                this.allPrice=0;
                this.multipleSelection=val;
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.allPrice+=this.multipleSelection[i].goodsPrice;
                }
            },

            fetchData(){
                shoppingCart().then(res=>{
                    this.goodsList=res.data.data;
                });
            },
            submit(){
                localStorage.setItem('goodsList',JSON.stringify(this.multipleSelection));
                this.$router.push('/public/addOrderForms');
            }
        },


        created() {
           this.fetchData();
        },
        data() {
            return {
                multipleSelection:[],
                goodsList:[],
                allPrice:0
            }
        },
    }
</script>

<style scoped>

</style>
