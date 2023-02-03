<template>
    <div>
        <div class="menu" style="padding-left: 3rem;background-color:rgb(33, 35, 41);">
            <el-menu default-active="/MainPage" router class="el-menu-demo" mode="horizontal" style="background-color: rgb(33, 35, 41);">
            <el-menu-item index="/MainPage" default-openeds="index" style="font-size:1.4rem;color:rgba(143, 150, 170)">实验页面</el-menu-item>
            <el-menu-item index="/ObjectPage" default-openeds="index" style="font-size:1.4rem;color:rgba(143, 150, 170)">物品页面</el-menu-item>
            </el-menu>
        </div>
        <router-view key="$route.fullPath"></router-view>
    </div>
</template>

<script>
export default {
    name: 'HeadSecond',
    mounted() {
        this.$router.push('/MainPage')
    }
}
</script>

<style>
.Exe_All{
    background-color: rgb(143, 150, 170);
}
.el-menu--horizontal {
    border-bottom: solid 1px #4c74d300!important;
}
:root {
    --el-menu-active-color: #ffffff!important;
    --el-menu-text-color: b3b0c4!important;
    --el-menu-hover-text-color: var(--el-color-primary);
    --el-menu-bg-color: rgba(0,0,0,0)!important;
    --el-menu-hover-bg-color: rgba(0,0,0,0)!important;
    --el-menu-item-font-size: var(--el-font-size-base);
    --el-menu-item-hover-fill: var(--el-color-primary-light-9);
}
/*以下两种写法都能把横向滚动条关闭
/*.el-scrollbar__bar.is-horizontal>div {
    /*height: 0;
}*/
/* .el-scrollbar__bar.is-horizontal {
    display: none!important;
} */
</style>