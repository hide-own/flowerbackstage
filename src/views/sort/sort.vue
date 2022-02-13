<template>
    <div class="banner">
        <h1>分类数据</h1>
        <el-button type="primary" class="button" size="small" @click="add"
            >新增分类</el-button
        >
        <div>
            <el-table
                :data="tableData1"
                style="width: 100%"
                row-key="id"
                border
                lazy
                :load="load"
                :tree-props="{
                    children: 'children',
                    hasChildren: 'hasChildren',
                }"
            >
                <!-- -----------------------------序列 -->
                <el-table-column
                    label="序列"
                    type="index"
                    align="center"
                    width="120"
                ></el-table-column>
                <!-- -------------------------------------------------------类别 -->
                <el-table-column prop="sort" label="类别"> </el-table-column>
                <!-- --------------------------------------------------------图片 -->
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
                <!-- -----------------------------------------------------操作 -->
                <el-table-column
                    fixed="right"
                    label="操作"
                    align="center"
                    width="200"
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
                            <el-button
                                size="mini"
                                type="danger"
                                slot="reference"
                            >
                                删除</el-button
                            >
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- --------------------------------------------分页 -->
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
            tableData: [], //全部数据
            tableData1: [], //渲染的数据
            currentPage1: 0, //共计
            currentPage2: 5,  //条数
            currentPage3: 1,
            currentPage4: 1, //跳转数
        };
    },
    methods: {
        // 新增
        add() {},

        async load(tree, treeNode, resolve) {
            //请求下级分类
            let sort = await this.$api.sort(tree.id);

            let sortItem = [];
            for (var i = 0; i < sort.data.data.erji.length; i++) {
                sort.data.data.erji[i].hasChildren = true;
                sortItem.push(sort.data.data.erji[i]);
            }
            setTimeout(() => {
                resolve(sortItem);
            }, 50);
        },

        // 条数
        handleSizeChange(val) {
           this.currentPage2 = val
           this.tableData1 = this.tableData.slice((this.currentPage4-1)*val,val)
        },

        // 页数
        handleCurrentChange(val) {
           this.tableData1 = this.tableData.slice((val-1)*this.currentPage2+1,(val-1)*this.currentPage2+6)
        },
    },

    // 获取分类数据数据
    async mounted() {
        let sort = await this.$api.sort("0");
        console.log(sort);
        let sortItem = [];
        for (var i = 0; i < sort.data.data.erji.length; i++) {
            sort.data.data.erji[i].hasChildren = true;
            sortItem.push(sort.data.data.erji[i]);
        }
        this.tableData1 = sortItem.slice(0, 5);
        this.tableData = sortItem;
        this.currentPage1 = sortItem.length;
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