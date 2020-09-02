<template>
    <el-container>
        <el-header>
            <h1>积分兑换</h1>
        </el-header>
        <el-main>
            <el-card style="width: 300px;height: 150px">
                <el-input-number placeholder="10积分兑换1元" :step="10" v-model="point"/>
                <el-divider/>
                兑换￥{{ca}}元
                <el-button style="border-radius: 0 !important;float: right" type="primary" @click="exChangePoint">兑换 </el-button>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
    import {selectUser,userPoints} from "../../api/user";

    export default {
        name: "Point",
        computed:{
          ca(){
              return this.point * 0.1;
          }
        },
        data(){
            return{
                point:10
            }
        },
        methods:{
            exChangePoint(){
                selectUser().then(res=>{
                    let point=res.data.data.userPoint;
                    if(point<this.point){
                        this.$notify.error({
                            title: '错误',
                            message: '您的积分不够'
                        });
                    }else {
                        let point=-this.point;
                        userPoints(JSON.stringify({
                            userPoint:point
                        })).then(()=>{
                            this.$notify({
                                title: '兑换成功',
                                message: '请到qq号为2559659331的客服去领取兑换的钱',
                                type: 'success'
                            });
                        });
                    }
                });
            }
        },

    }
</script>

<style scoped>

</style>
