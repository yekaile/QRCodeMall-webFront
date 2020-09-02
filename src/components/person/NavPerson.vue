<template>
    <el-row>
        <el-col :span="24">
            <el-menu
                    style="border: 1px solid #dfe4ed" router="true">

                <el-menu-item index="/person/personInfo">
                    个人信息
                </el-menu-item>
                <el-menu-item index="/person/point">
                    积分兑换
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <span>二维码管理</span>
                    </template>
                        <el-menu-item index="/person/addQRcode">添加二维码</el-menu-item>
                        <el-menu-item index="/person/qrcode">二维码信息</el-menu-item>
                        <el-menu-item index="/person/account">二维码邮寄管理</el-menu-item>
                        <el-menu-item index="/person/qrcodeBatch">二维码账户</el-menu-item>

                </el-submenu>
              <!--  <el-submenu>
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-form-item index="/person/addQrCode">
                            添加二维码
                        </el-form-item>
                        <el-form-item index="/person/addQrCode">
                            查看二维码
                        </el-form-item>
                    </el-menu-item-group>

                </el-submenu>-->
                <el-menu-item index="/person/safety">
                    安全管理
                </el-menu-item>
                <el-menu-item index="/person/address">
                    地址管理
                </el-menu-item>
                <el-menu-item index="/person/order">
                    订单管理
                </el-menu-item>
                <el-menu-item index="/person/bill">
                    账单
                </el-menu-item>



            </el-menu>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "NavPerson",
        data() {
            return {
                menuList: [
                    {menuName: '个人信息', link: '/person/personInfo'},
                    {menuName: '二维码管理', link: '/person/personInfo'},
                    {menuName: '安全管理', link: '/person/safety'},
                    {menuName: '地址管理', link: '/person/address'},
                    {menuName: '订单管理', link: '/person/order'},
                    {menuName: '账单', link: '/person/bill'},
                ],
            }
        }
    }
</script>

<style scoped>

</style>
