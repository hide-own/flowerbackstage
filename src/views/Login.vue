<template>
    <div class="login">
        <h1>HZQ</h1>
        <h3>欢迎使用后台管理系统</h3>
        <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <el-form-item prop="pass">
                <el-input
                    type="text"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input
                    type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >提交</el-button
                >
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import router from "../router/index.js";
export default {
    name: "Home",
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                pass: "",
                checkPass: "",
            },
            rules: {
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }],
            },
        };
    },
    methods: {
        // 登录
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },

        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 登录请求
        async login() {
            let login = await this.$api.login({
                user_name: this.ruleForm.pass,
                password: this.ruleForm.checkPass,
            });

            if (login.data.code == 200) {
                localStorage.setItem("token", login.data.token);
                // vuex计算属性
                this.$store.commit("setToken", login.data.token);
                this.$store.commit("userName", this.ruleForm.pass);

                // 获取的router权限
                let permissions = JSON.parse(login.data.exist[0].permissions);
                let routerChildren = router.options.routes[0].children;
                this.$store.commit("updateRouter", permissions);

                for (let index = 0; index < permissions.length; index++) {
                    routerChildren[index + 1] = permissions[index];
                }

                this.$router.push({path:'/',query: {login:'登录成功'}})
            } else {
                this.$message("账号密码错误");
            }
        },
    },
};
</script>
<style lang="less" scoped>
.login {
    width: 400px;
    margin: 10% auto 0;
    text-align: center;

    h1 {
        color: #e6e6e6;
        font-size: 180px;
        font-weight: 800;
        letter-spacing: -10px;
        margin-bottom: 0;
    }

    h3 {
        font-weight: bold;
        line-height: 2;
        color: #696b6d;
    }

    /deep/ .demo-ruleForm .el-form-item__label {
        width: 0px !important;
    }
    /deep/ .el-form-item__content {
        margin-left: 0px !important;
    }
}
</style>
