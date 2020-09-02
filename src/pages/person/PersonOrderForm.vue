<template>

    <el-container>
        <el-tabs style="width: 100%">
            <el-tab-pane label="未付款">
                <split-table :headData="headData" :bodyData="orderForms"
                             :operFlag="true" :tableEditFlag="false" :checkFlag="false">
                    <template slot="operate" slot-scope="props">
                        <el-button type="text"
                                   @click="buyGoods(props.rowData.orderFormId,props.rowData.orderFormPrice,props.rowData.orderFormNumber)">
                            支付
                        </el-button>
                    </template>
                </split-table>

                <el-pagination
                        layout="prev, pager, next"
                        :total="total1"
                        :page-size="9"
                        @current-change="currentChange1"
                        style="float: left">
                </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="已付款">
                <split-table :headData="headData" :bodyData="orderForms1" :checkFlag="false"
                             :operFlag="false" :tableEditFlag="false">
                </split-table>
                <el-pagination
                        layout="prev, pager, next"
                        :total="total1"
                        :page-size="9"
                        @current-change="currentChange2"
                        style="float: left">
                </el-pagination>
            </el-tab-pane>
        </el-tabs>
    </el-container>

</template>

<script>

    import {selectAllOrderForms} from './../../api/oderForm'
    import SplitTable from 'vue-split-table';

    export default {
        name: "PersonOrderForm",
        components: {SplitTable},
        data() {
            return {
                headData: ["订单id","订单号", "订单发起时间", "商品名称", "商品单价", "二维码数量", "商品类别", "订单总价"],
                orderForms: [],
                orderForms1: [],
                total1: 0,
                total2: 0
            }
        },
        created() {
            this.fetchData();
        },
        methods: {


            buyGoods(orderFormId, orderFormPrice, orderFormNumber) {

                location.href = `http://stu.hrbkyd.com/QRCodeMall/orderForm/buyGoods?orderFormId=${orderFormId}&orderFormNumber=${orderFormNumber}&orderFormPrice=${orderFormPrice}&orderFormPayType=1`;
            },
            currentChange1(pageNum) {
                this.total1 = 0;
                selectAllOrderForms({
                    pageNum: pageNum
                }).then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }
                    }
                });
            },


            currentChange2(pageNum) {
                this.total2 = 0;
                selectAllOrderForms({
                    pageNum: pageNum
                }).then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 1) {
                            this.total2++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }
                    }
                });
            },


            fetchData() {
                selectAllOrderForms().then(res => {

                    for (let i = 0; i < res.data.data.list.length; i++) {

                        let item = res.data.data.list[i];
                        let orderForm = item.orderForm;
                        let details = item.details;
                        let goodsNames = [];
                        let goodsPrices = [];
                        let goodsQrcodeQuantitys = [];
                        let goodsTypeNames = [];
                        if (orderForm.orderFormStatus === 0) {
                            this.total1++;
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        } else {
                            this.total2++;
                            goodsNames = [];
                            goodsPrices = [];
                            goodsQrcodeQuantitys = [];
                            goodsTypeNames = [];
                            for (let j = 0; j < details.length; j++) {
                                goodsNames.push(details[j].goodsName);
                                goodsPrices.push(details[j].goodsPrice);
                                goodsQrcodeQuantitys.push(details[j].goodsQrcodeQuantity);
                                goodsTypeNames.push(details[j].goodsTypeName);
                            }
                            this.orderForms1.push(
                                {
                                    orderFormId: orderForm.orderFormId,
                                    orderFormNumber: orderForm.orderFormNumber,
                                    gmtCreated: orderForm.gmtCreated,
                                    goodsNames: goodsNames,
                                    goodsPrices: goodsPrices,
                                    goodsQrcodeQuantitys: goodsQrcodeQuantitys,
                                    goodsTypeNames: goodsTypeNames,
                                    orderFormPrice: orderForm.orderFormPrice,
                                }
                            );
                        }


                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
r
