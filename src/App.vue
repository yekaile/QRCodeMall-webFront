<template>
    <div id="app">
        <router-view name="public"></router-view>
        <router-view name="user"></router-view>
        <router-view name="person"></router-view>

    </div>
</template>

<script>


    export default {
        name: 'App',
        components: {},
        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
            }
        },
        methods: {}
    }
</script>

<style>
    .el-main {
        line-height: 0;
        padding: 0;
    }



</style>
