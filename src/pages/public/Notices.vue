<template>
    <el-container>
        <el-header>
            <h1>公告</h1>
        </el-header>
        <el-main>
            <ul>
                <el-row>

                </el-row>
                <li v-for="notice in noticeList" :key="notice">

                    <h2>
                        <router-link :to="{path:'notice?noticeId='+notice.noticeId}">
                            {{notice.noticeTittleName}}
                        </router-link>

                    </h2>

                </li>
            </ul>
        </el-main>
    </el-container>
</template>

<script>

    import {selectNotice} from "../../api/admin";

    export default {
        name: "Notices",
        data() {
            return {

                noticeList: []
            }
        },
        methods: {

            fetchData() {
                selectNotice().then(res => {
                    this.noticeList = res.data.data.list;
                })

            }
        },


        created() {
            this.fetchData();
        },


    }
</script>

<style scoped>

    ul li{

        list-style: none;

    }

    .el-main{
        line-height: 30px;
    }

    a:hover{
        text-decoration: none;
    }
    a{
        color:black;
        text-decoration: none;
    }
</style>
