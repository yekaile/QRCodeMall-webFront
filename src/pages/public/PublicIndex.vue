<template>
    <el-container style="">
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-carousel indicator-position="outside" height="580px">
                        <el-carousel-item v-for="item in imgList" :key="item">
                            <img :src="item" alt="图片" width="100%" height="100%">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
            <el-row>
                <h1 style="font-size: 36px;text-align: center;font-family: 黑体,serif">丰富场景应用 满足多样化需求</h1>
            </el-row>
            <el-row style="padding: 50px 0;width: 1120px;margin-left: 280px" gutter="">
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-menu"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">产品展示</p>
                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-search"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">防伪追溯 </p>
                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-document-copy"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">分行业管理 </p>

                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-first-aid-kit
"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">设备维检 </p>

                </el-col>
            </el-row>
            <el-row style="padding: 50px 0;width: 1120px;margin-left: 280px" gutter="">
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-place"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">代理管理 </p>

                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-s-data"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">数据分析 </p>

                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-key"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">权限管理 </p>

                </el-col>
                <el-col :span="6">
                    <el-button plain class="i-ground"><i class="el-icon-discount"></i></el-button>
                    <p style="margin-top: 20px;margin-left: 5px">营销推广 </p>
                </el-col>
            </el-row>

            <el-row class="el-row-message">
                <h2 style="text-align: center;padding-top: 160px">一站式二维码综合管理服务 助力企业快速迈向互联网+时代 </h2>
            </el-row>
            <div style="padding-top: 80px;text-align: center;padding-bottom: 80px">
                <h2 style="">商品类别</h2>
            </div>

            <el-container style="">
                <el-row type="flex" justify="start" gutter="">
                    <el-col offset="">
                        <el-card :body-style="{ padding: '0px' }" >

                    <router-link :to="{path:'/public/goods',query:{goodsTypeName:'农药'}}">
                            <img src="./../../assets/nongyao.jpg" style="width: 100%;display: block;height: 224px" />

                    </router-link>
                            <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                                <span style="">农药行业</span>
                            </div>
                        </el-card>
                    </el-col>

                    <el-col >
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="{path:'/public/goods',query:{goodsTypeName:'化肥'}}">

                        <img src="./../../assets/huafei.jpg" style="width: 100%;height: 224px;display: block"/>

                        </router-link>
                        <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                            <span style="">化肥行业</span>
                        </div>
                    </el-card>
                </el-col>   <el-col>
                    <el-card :body-style="{ padding: '0px' }">
                        <router-link :to="{path:'/public/goods',query:{goodsTypeName:'蔬菜'}}">
                        <img src="./../../assets/shucai.jpg" style="width: 100%;height: 224px;display: block"/>
                        </router-link>
                        <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                            <span style="">蔬菜行业</span>
                        </div>
                    </el-card>
                </el-col>   <el-col >
                    <el-card :body-style="{ padding: '0px' }">

                        <router-link :to="{path:'/public/goods',query:{goodsTypeName:'水果'}}">



                        <img src="./../../assets/shuiguo.jpg" style="width: 100%;height: 224px;display: block"/>

                        </router-link>
                        <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                            <span style="">水果行业</span>
                        </div>
                    </el-card>
                </el-col>

                </el-row>
            </el-container>
            <div style="padding-top: 80px;text-align: center;padding-bottom: 80px">
                <h2 style="">案例在线体验</h2>
            </div>
            <el-container style="">
                <el-row type="flex" justify="start" gutter="20">
                    <el-col offset="5">
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="./../../assets/QQ截图20200808143742.png" style="width: 100%;display: block"/>
                            <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                                <span style="">农药行业</span>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col >
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="./../../assets/QQ截图20200808143742.png" style="width: 100%;display: block"/>
                            <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                                <span style="">化肥行业</span>
                            </div>
                        </el-card>
                    </el-col>   <el-col>
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="./../../assets/QQ截图20200808143742.png" style="width: 100%;display: block"/>
                            <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                                <span style="">蔬菜行业</span>
                            </div>
                        </el-card>
                    </el-col>   <el-col >
                        <el-card :body-style="{ padding: '0px' }">
                            <img src="./../../assets/QQ截图20200808143742.png" style="width: 100%;display: block"/>
                            <div style="line-height: 20px;color: #00A3FF;text-align: center;padding-top: 4px">
                                <span style="">水果行业</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-container>
        </el-main>
    </el-container>

</template>

<script>

    import {selectGoods} from "../../api/admin";
    import {buyingSuccessfully} from "../../api/oderForm";

    export default {
        name: "PublicIndex",
        components: {},

        created() {

            this.getIndexData();
            let orderFormNumber=  this.$route.query.out_trade_no;
            let totalAmount=this.$route.query.total_amount;
          console.log(orderFormNumber);
          console.log(totalAmount);
          buyingSuccessfully({
                orderFormNumber:orderFormNumber,
                totalAmount:totalAmount
            });

        },
        data() {


            return {

                torrentGoodsList: [],
                farmProduceList: [],
                chemicalFertilizerList: [],
                imgList: [
                    'http://i.jisuma.cn/qrcode/ig/lunbo1.jpg',
                    'http://i.jisuma.cn/qrcode/ig/lunbo2.jpg',
                    'http://i.jisuma.cn/qrcode/ig/lunbo3.jpg',
                ]
            }
        },
        methods: {


            getIndexData() {


                selectGoods({
                    goodsTypeName: '种子'
                }).then(res => {
                    this.torrentGoodsList = res.data.data.list;

                });
                selectGoods({
                    goodsTypeName: '化肥'
                }).then(res => {
                    this.chemicalFertilizerList = res.data.data.list;
                });
                selectGoods({
                    goodsTypeName: '农产品'
                }).then(res => {
                    this.farmProduceList = res.data.data.list;
                });
            }
        },


    }
</script>

<style scoped>


    * {
        font-family: 微软雅黑, serif;

    }

    .goods {
        border: 1px solid #ededed;
        min-height: 200px;
        background: white;
        padding: 20px;
    }


    a {
        color: black;
        text-align: center;
    }

    a:hover {
        text-decoration: none;
    }

    .notice {

    }


    .el-main {
        line-height: 0;
        padding: 0;
    }

    .message {
        min-height: 400px;
        background: white;
        margin-right: 10px;
        padding: 40px;
        text-align: center;
    }


    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }


    .aside {

    }


    .i-ground {
        background: #00A3FF;
        width: 80px;
        height: 80px;
        font-size: 40px;
        color: white;


    }

    .el-row-message {
        height: 360px !important;
        width: 100%;
        background: url("./../../assets/joinbg.jpg");
        color: white;
        font-family: 黑体, serif;
        font-size: 20px;
        margin-top: 50px;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }


</style>
