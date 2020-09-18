<template>
    <div>
        <div>
            <el-table :data="goods" style="width: 100%">
                <el-table-column prop="goodsName" label="商品名"/>
                <el-table-column prop="goodsTypeName" label="商品类别"/>
                <el-table-column prop="goodsPrice" label="商品价格"/>
                <el-table-column prop="goodsPrice" label="总计"/>
            </el-table>
        </div>
        <div style="float: right;margin-top: 30px">
            <span>实付款：¥{{goods[0].goodsPrice}}</span>
            &nbsp;
            &nbsp;
            <el-button type="danger" style="border-radius: 0 !important;" @click="addOrderForm">提交订单</el-button>
        </div>
    </div>

</template>

<script>

    import {selectGoods} from '../../api/admin'
    import {generateOrderForm} from '../../api/oderForm'

    export default {
        name: "AddOneOrderForm",
        created() {
            let goodsId = this.$route.query.goodsId;
            selectGoods({
                goodsId: goodsId
            }).then(res => {
                this.goods = res.data.data.list;
            });
        },
        methods: {
            addOrderForm(){
                generateOrderForm(JSON.stringify(this.goods)).then(res=>{
                    let orderForm = res.data.data;
                    console.log(JSON.stringify(orderForm));
                    let orderFormId = orderForm.orderFormId;
                    let orderFormNumber = orderForm.orderFormNumber;
                    let orderFormPrice = orderForm.orderFormPrice;
                    location.href = `http://stu.hrbkyd.com/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;
                });
            }
        },
        data() {
            return {
                goods:{},
            }
        }
    }
</script>

<style scoped>

</style>
