<template>
    <div class="banner">
        <h1>轮播图数据</h1>
        <el-button
            type="primary"
            class="button"
            size="small"
            @click="dialogVisible = true"
            >新增banner</el-button
        >
        <el-dialog
            title="新增banner图"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form ref="form" label-width="80px">
                <el-form-item label="链接地址">
                    <el-input v-model="bannerUrl"></el-input>
                </el-form-item>
            </el-form>
            <!-- 
                action ： 上传地址
                on-preview :点击文件列表中已上传的钩子
                on-remove ： 文件列表移除的钩子
                on-success:文件上传成功的钩子
                file-list：上传的文件列表
                auto-upload：是否自动上传
             -->
            <el-upload
                class="upload-demo"
                ref="upload"
                :action="url"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="fileList"
                :auto-upload="false"
            >
                <el-button slot="trigger" size="small" type="primary"
                    >选取文件</el-button
                >
                <el-button
                    style="margin-left: 10px"
                    size="small"
                    type="success"
                    @click="submitUpload"
                    >上传到服务器</el-button
                >
            </el-upload>
            <div class="demo-image">
                <div class="block">
                    <el-image
                        style="width: 100px; height: 100px"
                        :src="bannerUrlOver"
                    ></el-image>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="add()">确 定</el-button>
            </span>
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
            <!-- -----------------------------------------------------图片 -->
            <el-table-column
                prop="address"
                label="图片"
                align="center"
                header-align="center"
            >
                <template slot-scope="scope">
                    <el-image
                        style="height: 50px"
                        :src="$url + scope.row.pic"
                        :preview-src-list="[$url + scope.row.pic]"
                        :key="scope.row.id"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <!-- ---------------------------------------------------跳转地址 -->
            <el-table-column
                prop="route"
                label="跳转地址"
                style="width: 90%"
                align="center"
            >
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
                        title="确定修改?"
                        class="modify"
                        @confirm="handleEdit(scope.$index, scope.row)"
                    >
                        <el-button size="mini" slot="reference">
                            修改</el-button
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
import api from "../../serve/api";
export default {
    nmae: "",
    data() {
        return {
            tableData: [], //banner数据
            currentPage1: 0, //共计
            currentPage4: 1, //跳转数
            dialogVisible: false,
            fileList: [], // 上传的数据列表
            url: api.uploadBannerImage, //banner上传地址
            bannerUrl: "", //上传的图片input跳转路径
            bannerUrlOver: "", //上传成功后的图片路径
            beforePic: "", //修改之前的pic
            id: "", //修改的id
        };
    },
    mounted() {},
    methods: {
        // 修改
        handleEdit(index, row) {
            // 打开弹窗
            this.dialogVisible = true;
            this.bannerUrl = row.route;
            this.id = row.id;
            this.beforePic = "http://www.huangzq.top:9999/" + row.pic;
            this.bannerUrlOver = "http://www.huangzq.top:9999/" + row.pic;
        },

        // 删除
        async handleDelete(index, row) {
            let bannerDel = await this.$api.bannerDel({
                id: row.id,
                pic: row.pic,
            });
            if (bannerDel.status == 200) {
                this.$router.go();
            }
        },

        // 取消新增
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },

        // 新增
        async add() {
            // this.beforePic 判断是不是修改
            if (this.beforePic == "") {
                // 普通保存
                let pic = this.bannerUrlOver.split(
                    "http://www.huangzq.top:9999/"
                )[1];

                let bannerSave = await this.$api.bannerSave({
                    route: this.bannerUrl,
                    pic,
                });

                if (bannerSave.status == 200) {
                    this.$router.go();
                }
            } else {
                // 修改保存
                let bannerModify = await this.$api.bannerModify({
                    id: this.id,
                    pic: this.beforePic.split("http://www.huangzq.top:9999/")[1],
                    newPic: this.bannerUrlOver.split("http://www.huangzq.top:9999/")[1],
                    route: this.bannerUrl,
                });

                if (bannerModify.status == 200) {
                    this.$router.go();
                }
            }
        },

        // 提交上传图片
        submitUpload() {
            this.$refs.upload.submit();
        },

        // 图片上传成功回调
        handleSuccess(res, file, fileList) {
            this.bannerUrlOver = "http://www.huangzq.top:9999/" + res;
        },

        // 删除上传文件
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        // 已文件上传的钩子
        handlePreview(file) {
            console.log(file);
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
        let banner = await this.$api.banner();
        this.tableData = banner.data;
        this.currentPage1 = banner.data.length;
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