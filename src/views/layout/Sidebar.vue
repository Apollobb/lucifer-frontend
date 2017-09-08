<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path" :unique-opened="true">
        <div class="logo">Metero</div>
        <sidebar-item :routes='$router.options.routes'></sidebar-item>
    </el-menu>
</template>

<script>
    import SidebarItem from './SidebarItem';
    export default {
        components: {SidebarItem},
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }

    .logo {
        line-height: 50px;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        color: #e015bd;
        padding-left: 60px;
    }
</style>
