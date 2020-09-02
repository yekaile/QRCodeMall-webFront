<template>
    <el-container>

        <ul>
            <li><router-link to="/person/updatePassword">修改密码</router-link>
            </li>
            <li><router-link  to="/person/updatePhone">修改手机号</router-link>
            </li>
            <li><router-link  to="/person/updateEmail">修改邮箱</router-link>
            </li>
        </ul>


    </el-container>
</template>

<script>
    export default {
        name: "SafeConfig",
        created() {
        },


        data() {
            return {}
        },
        methods: {},
    }
</script>

<style scoped>
    ul li{
        list-style: none;
    }
    .el-container {
        line-height: 30px;
    }
    a{
        color: black;
        text-decoration: none;

    }
</style>
