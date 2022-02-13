<template>
    <div class="banner">
        <h1>轮播图数据</h1>
        <el-button type="primary" class="button" size="small" @click="add"
            >新增管理员</el-button
        >

        <el-dialog
            title="新增管理员"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" label-width="80px">
                <el-form-item label="管理员">
                    <el-input
                        placeholder="管理员人名"
                        v-model="user_name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        placeholder="管理员密码"
                        v-model="password"
                    ></el-input>
                </el-form-item>
                <el-form-item :label="val.name" v-for="(val, index) in form">
                    <el-switch v-model="val.deta"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addValue()"
                        >立即创建</el-button
                    >
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-table
            :data="tableData"
            border
            class="table"
            style="width: 100%; mix-width: 1200px"
        >
            <!-- -----------------------------------------------------序列号 -->
            <el-table-column
                label="序列"
                type="index"
                align="center"
                width="120"
            ></el-table-column>
            <!-- -----------------------------------------------------用户名 -->
            <el-table-column
                prop="user_name"
                label="用户名"
                align="center"
                header-align="center"
            >
            </el-table-column>
            <!-- ---------------------------------------------------管理级别 -->
            <el-table-column
                prop="permissions"
                label="管理级别"
                style="width: 90%"
                align="center"
            >
                <template slot-scope="scope">
                    <el-switch
                        v-for="(val, index) in tableData[scope.$index]
                            .permissions"
                        :inactive-text="val.name"
                        v-model="val.deta"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <!-- -----------------------------------------------------操作 -->
            <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="150"
            >
                <template slot-scope="scope">
                    <el-popconfirm
                        title="确定保存?"
                        class="modify"
                        @confirm="handleEdit(scope.$index, scope.row)"
                    >
                        <el-button size="mini" slot="reference">
                            保存</el-button
                        >
                    </el-popconfirm>

                    <el-popconfirm
                        title="确定删除?"
                        @confirm="handleDelete(scope.$index, scope.row)"
                    >
                        <el-button size="mini" type="danger" slot="reference">
                            删除</el-button
                        >
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- ----------------------------------------------分页 -->
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentPage1"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    nmae: "",
    data() {
        return {
            tableData: [], //管理员数据
            currentPage1: 0, //共计
            currentPage2: 1,
            currentPage3: 1,
            currentPage4: 1, //跳转数
            dialogVisible: false, //弹窗
            form: [
                { deta: true, name: "banner" },
                { deta: true, name: "sort" },
                { deta: true, name: "goods" },
                { deta: true, name: "admin" },
            ], // 新增数据
            user_name: "", //新增管理名
            password: "", //新增管理密码
        };
    },

    methods: {
        // 修改管理员权限
        async handleEdit(index, row) {
            let handleEdit = await this.$api.save({
                id: row.id,
                permissions: JSON.stringify(row.permissions),
            });
            if (handleEdit.data.code == 200) {
                this.$message("修改成功");
            }
        },

        // 删除
        async handleDelete(index, row) {
            let deletes = await this.$api.deletes({ id: row.id });
            if (deletes.data.code == 200) {
                this.$message("删除成功");
                this.$router.go();
            }
        },

        // 取消新增
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    this.dialogVisible = false;
                })
                .catch((_) => {});
        },

        // 新增
        add() {
            this.dialogVisible = true;
        },

        // 保存新增
        async addValue() {
            let addValue = await this.$api.addAdmin({
                user_name: this.user_name,
                password: this.password,
                permissions: JSON.stringify(this.form),
            });

            if (addValue.data.code == 200) {
                this.$message("新增成功");
                this.$router.go();
            }
        },

        // 条数
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
        },

        // 页数
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
    },

    // 获取banner数据
    async beforeMount() {
        let admin = await this.$api.admin();
        for (let index = 0; index < admin.data.result.length; index++) {
            admin.data.result[index].permissions = JSON.parse(
                admin.data.result[index].permissions
            );
        }
        this.tableData = admin.data.result;
        this.currentPage1 = admin.data.result.length;
    },
};
</script>

<style scoped lang='less'>
.banner {
    background: white;
    border-radius: 5px;
    padding: 20px;

    // 标题
    h1 {
        font-size: 18px;
        font-weight: bold;
        display: block;
        padding-bottom: 5px;
        color: #686b6d;
        margin-bottom: 5px;
        border-bottom: 1px solid #ddd;
    }

    // 新增加
    .button {
        margin-bottom: 10px;
    }

    // 修改
    .modify {
        margin-right: 10px;
    }
}
</style>