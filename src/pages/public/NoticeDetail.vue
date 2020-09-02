<template>
    <el-container>

        <el-header>
            <el-row>
                <h1 style="text-align: center"><strong>{{notice.noticeTittleName}}</strong></h1>
            </el-row>
            <br>
            <el-row style="text-align: center;margin: 0 auto;padding-top: 10px">
                <span style="text-align: center">编辑于：{{notice.gmtCreated}}</span>
            </el-row>
        </el-header>

        <el-main>
            <div v-html="notice.noticeMessage" style="margin: 0 auto;width: 800px;background: white">
            </div>
        </el-main>

    </el-container>
</template>

<script>

    import {selectNotice} from '../../api/admin'
    export default {
        name: "NoticeDetail",

        created() {
            this.noticeId=this.$route.query.noticeId;
            selectNotice({
                noticeId:this.$route.query.noticeId
            }).then(res=>{
                this.notice=res.data.data.list[0];

            }) ;
        },
        data(){
            return{
                noticeId:'',
                notice:{}
            }
        },

        methods:{

        },

        watch:{
            $route:{
                fetchData(){


                }
            }
        }

    }
</script>

<style scoped>
    .el-main{
        line-height: 20px;
    }
</style>
