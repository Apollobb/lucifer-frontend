<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path" :unique-opened="true">
        <div class="logo">Lucifer</div>
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
        color: #e015d1;
        font-weight: 700;
        padding-left: 70px;
    }
</style>
