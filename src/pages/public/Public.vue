<template>
    <el-container>

        <el-header>
            <NavPublic></NavPublic>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
        <el-footer>
            <Foot style="text-align: center"></Foot>
        </el-footer>
    </el-container>

</template>

<script>
    import NavPublic from "../../components/public/NavPublic";
    import Foot from "../../components/common/Foot";

    export default {
        name: "Public",
        components: {Foot, NavPublic},
        created() {
        }
    }
</script>

<style scoped>
    .el-main{
        line-height: 0;
        padding: 0;
    }
</style>
