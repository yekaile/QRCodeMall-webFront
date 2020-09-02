<template>
    <div>
        <div>
            <el-table :data="goodsList" style="width: 100%">
                <el-table-column prop="goodsName" label="商品名"/>
                <el-table-column prop="goodsTypeName" label="商品类别"/>
                <el-table-column prop="goodsPrice" label="商品价格"/>
                <el-table-column prop="goodsPrice" label="总计"/>
            </el-table>
        </div>
        <div style="float: right;margin-top: 30px">
            <span>实付款：¥{{allPrice}}</span>
            &nbsp;
            &nbsp;
            <el-button type="danger" style="border-radius: 0 !important;" @click="addOrderForm">确认支付</el-button>
        </div>
    </div>
</template>

<script>
    import {generateOrderForm} from "../../api/oderForm";
    import {deleteShoppingCartGoods} from './../../api/goods';
    export default {
        name: "AddOrderForms",
        methods: {


            addOrderForm() {
                generateOrderForm(JSON.stringify(this.goodsList)).then(res => {
                    if (res.data.code === 200) {
                        const goodsList=[...this.goodsList];
                        let goodsIds=[];
                        goodsList.forEach(item=>{
                            goodsIds.push(item.goodsId);
                        });
                        deleteShoppingCartGoods(JSON.stringify(goodsIds));
                        let orderForm = res.data.data;
                        let orderFormId = orderForm.orderFormId;
                        let orderFormNumber = orderForm.orderFormNumber;
                        let orderFormPrice = orderForm.orderFormPrice;
                        localStorage.removeItem('goodsList');
                        location.href = `http://stu.hrbkyd.com/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;
                    }

                });

            }
        },
        created() {
            this.goodsList = JSON.parse(localStorage.getItem('goodsList'));
            for (let i = 0; i < this.goodsList.length; i++) {
                this.allPrice += this.goodsList[i].goodsPrice;
            }

        },
        data() {
            return {
                goodsList: [],
                allPrice: 0
            }
        },
    }
</script>

<style scoped>

</style>
