<template>
    <el-container class="home">
        <!-- 侧边导航 -->
        <el-aside width="auto">
            <div class="user" @click="exi">退出</div>
            <el-menu
                default-active="1-4-1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                @select="select"
                :collapse="isCollapse"
                background-color="#545c64"
                text-color="#fff"
            >
                <el-menu-item index="/">
                    <i class="ht ht-home-full"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-menu-item index="/banner" :disabled="!router[0].deta">
                    <i class="ht ht-app"></i>
                    <span slot="title">banner</span>
                </el-menu-item>
                <el-menu-item index="/sort" :disabled="!router[1].deta">
                    <i class="ht ht-yingyongzhongxin"></i>
                    <span slot="title">分类</span>
                </el-menu-item>
                <el-menu-item index="/goods" :disabled="!router[2].deta">
                    <i class="ht ht-shangpin"></i>
                    <span slot="title">商品</span>
                </el-menu-item>
                <el-menu-item index="/admin" :disabled="!router[3].deta">
                    <i class="ht ht-app"></i>
                    <span slot="title">管理员列表</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <!-- 头部 -->
            <el-header>
                <div
                    class="ht ht-gengduo"
                    @click="isCollapse = !isCollapse"
                ></div>
            </el-header>
            <!-- 内容 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    nmae: "",
    data() {
        return {
            isCollapse: false, //控制侧边条收缩
            user: this.$store.state.userName, //管理员名
            router: this.$store.state.router, //router
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        // 点击侧边菜单切换
        select(key, keyPath) {
            this.$router.push(key);
        },

        // 退出登录
        exi() {
            localStorage.removeItem("token");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("updateRouter")
            this.$router.push("/login");
        },
    },
    mounted() {
        // 登录提示
        if (this.$route.query.login == "登录成功") {
            this.$message({
                type: "info",
                message: "您好，欢迎使用HZQ后台管理系统",
            });
        }
    },
};
</script>

<style scoped lang='less'>
//
.home {
    width: 100%;
    overflow: hidden;
    height: 100vh;

    .user {
        line-height: 9vh;
        text-align: center;
        font-weight: bold;
        width: 99.7%;
        color: #fff;
        background: #545c64;
    }

    // 侧边导航
    .el-menu {
        height: 91vh;

        .ht {
            margin-right: 15px;
            vertical-align: middle;
            font-size: 18px;
        }
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }

    // 头部和内容区
    .el-header {
        background-color: #ffffff;
        color: #333;

        .ht-gengduo {
            background: #409eff;
            display: inline-block;
            padding: 6px 10px;
            color: #fff;
            font-weight: bold;
            border-radius: 3px;
            margin-top: 15px;
        }
    }
}
</style>