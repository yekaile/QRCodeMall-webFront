<template>

    <el-container>
        <el-header>
            <NavPublic/>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <NavPerson/>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>


    </el-container>
</template>

<script>
    import NavPerson from "../../components/person/NavPerson";
    import NavPublic from "../../components/public/NavPublic";

    export default {
        name: "Person",
        components: {NavPerson, NavPublic},

        data() {
            return {}
        },

        methods: {},


        created() {
        },
    }
</script>

<style scoped>
    .el-main {
        line-height: 0;
    }
</style>
