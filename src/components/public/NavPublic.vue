<template>
    <div>
        <el-menu router="true" mode="horizontal" style="float: right">
            <el-menu-item ><strong class="el-menu-item1">一物一码商户自主商品溯源系统</strong></el-menu-item>

            <el-menu-item>
                <el-input placeholder="请输入...." size="small" v-on:keyup.enter.native="searchGoods(goodsName)"
                          v-model="goodsName"></el-input>
            </el-menu-item>
            <el-menu-item index="/public">首页</el-menu-item>
            <el-menu-item index="/public/notices">公告</el-menu-item>
            <el-menu-item index="/public/shopcart">购物车</el-menu-item>
            <el-submenu v-if="isLogin">
                <template slot="title">我的工作台</template>
                <el-menu-item index="/person/personInfo">个人管理</el-menu-item>
                <el-menu-item @click="logout">退出登录</el-menu-item>
            </el-submenu>
            <el-menu-item @click="dialogFormVisible = true" v-else>
                <el-button type="primary">登录</el-button>
            </el-menu-item>

            <el-menu-item index="/public/register" v-if="!isLogin">
                <el-button type="primary" plain>注册</el-button>
            </el-menu-item>
        </el-menu>
        <el-dialog :visible.sync="dialogFormVisible" width="400px" center="true" style="border-radius: 30px">
            <Login @fromLogin="fetchLoginData" @forgetPassword="fetchForgetPasswordData"></Login>
        </el-dialog>

    </div>

</template>

<script>
    import Login from "./Login";
    import {logout} from "../../api/user";

    export default {
        name: "NavPublic",
        components: {Login},
        data() {
            return {
                dialogFormVisible: false,
                goodsName: '',
                isLogin: sessionStorage.getItem('user') !== null,
                logo: '../../assets/QQ截图20200805230507.png'
            }
        },
        created() {

        },
        methods: {

            logout() {
                logout().then(() => {
                    sessionStorage.removeItem('user');
                    location.reload();
                });
            },


            fetchForgetPasswordData(forgetPassword){
                console.log(forgetPassword);
                if(forgetPassword===null){
                    this.dialogFormVisible=true;
                }
            },
            fetchLoginData(user) {
                if (user !== '') {
                    this.dialogFormVisible = false;
                    this.isLogin = true;
                }
            },
            searchGoods(goodsName) {
                this.$router.push({path: '/public/searchGoods', query: {goodsName: goodsName}});
            }
        },
        watch: {


            $route: {
                handler() {
                    this.isLogin = sessionStorage.getItem('user') !== null;
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

    .el-menu-item:hover {
        color: #00A3FF;
    }

    .el-menu-item1:hover {
        color: #00A3FF;
    }

    .el-menu-item1 {

        font-family: 微软雅黑, serif;
        font-size: 23px;
        float: left;
        margin-right: 400px;
        color: #00A3FF;

    }
</style>
