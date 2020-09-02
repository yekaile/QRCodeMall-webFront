<template>
    <el-container style="">

            <el-header style="margin-bottom: 100px">
                <el-row style="color: #909399">
                    <h4>个人信息</h4>
                </el-row>

                <el-table style="width: 100%" :data="user">
                    <el-table-column prop="userId" label="用户id"/>
                    <el-table-column prop="userName" label="用户名"/>
                    <el-table-column prop="userPhone" label="电话号"/>
                    <el-table-column prop="userEmail" label="邮箱"/>
                    <el-table-column prop="userPoint" label="积分"/>
                    <el-table-column prop="userFatherProxyName" label="一级代理"/>
                    <el-table-column prop="userGrandFatherProxyName" label="二级代理"/>
                </el-table>

            </el-header>

         <el-tabs style="width: 100%">
             <el-tab-pane label="一级代理">
                 <el-table style="width: 100%" :data="userProxy1">
                     <el-table-column prop="userId" label="用户id"/>
                     <el-table-column prop="userName" label="用户名"/>
                     <el-table-column prop="userPhone" label="电话号"/>
                     <el-table-column prop="userEmail" label="邮箱"/>
                 </el-table>
             </el-tab-pane>
             <el-tab-pane label="二级代理">
                 <el-table style="width: 100%" :data="userProxy2">
                     <el-table-column prop="userId" label="用户id"/>
                     <el-table-column prop="userName" label="用户名"/>
                     <el-table-column prop="userPhone" label="电话号"/>
                     <el-table-column prop="userEmail" label="邮箱"/>
                 </el-table>
             </el-tab-pane>
         </el-tabs>


    </el-container>
</template>

<script>

    import {invitees,selectUser} from './../../api/user'

    export default {
        name: "PersonInfo",
        created() {
            this.user = JSON.parse(localStorage.getItem("user"));
            this.fetchData();
        },

        data() {
            return {
                user: [],
                userProxy1: [],
                userProxy2: []
            }
        },

        methods: {
            fetchData() {

                selectUser().then(res=>{
                    this.user=[res.data.data];
                });
                invitees().then(res=>{
                    this.userProxy1=res.data.data[0];
                    this.userProxy2=res.data.data[1];
                });

            }
        },


    }
</script>

<style scoped>
    .el-main {
        line-height: 20px;
    }
</style>
