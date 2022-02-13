<template>
    <div class="banner">
        <h1>商品数据</h1>
        <el-button type="primary" class="button" size="small" @click="add"
            >新增商品</el-button
        >
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
                width="80"
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
                        style="height: 100px"
                        :src="$url + scope.row.goods_pic"
                        :preview-src-list="[$url + scope.row.goods_pic]"
                        :key="scope.row.id"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <!-- ---------------------------------------------------名称 -->
            <el-table-column
                prop="goods_name"
                label="名称"
                width="100"
                align="center"
            >
            </el-table-column>
            <!-- ----------------------------------------------------选项 -->
            <el-table-column
                prop="goods_composition[0].conList"
                label="选项"
                style="width: 90%"
                align="center"
            >
            </el-table-column>
            <!-- ---------------------------------------------------时间 -->
            <el-table-column
                prop="crate_time"
                label="时间"
                style="width: 90%"
                align="center"
            >
            </el-table-column>
            <!-- -----------------------------------------------------价格 -->
            <el-table-column
                prop="new_price"
                label="价格"
                width="100"
                align="center"
            >
            </el-table-column>
            <!-- ---------------------------------------------------操作 -->
            <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="180"
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
        <!-- -------------------------------------分页 -->
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
            tableData: [], //数据
            currentPage1: 1, //共计
            currentPage4: 1, //跳转页数
        };
    },
    methods: {
        // 修改
        handleEdit(index, row) {
            console.log(index, row);
        },

        // 删除
        handleDelete(index, row) {
            console.log(index, row);
        },

        // 新增
        add() {
            alert("fdjh");
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

    // 获取商品数据
    async beforeMount() {
        let goods = await this.$api.goods();

        // 转化选项为数组
        for (let i = 0; i < goods.data.result.length; i++) {
            if (goods.data.result[i].goods_composition != "") {
                goods.data.result[i].goods_composition = JSON.parse(
                    goods.data.result[i].goods_composition
                );
            }
        }
        this.tableData = goods.data.result;
        this.currentPage1=this.tableData.length
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