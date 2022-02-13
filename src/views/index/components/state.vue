<template>
    <div class="state">
        <el-row :gutter="24">
            <el-col :lg="6" :md="24"
                ><div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>收入</span>
                        </div>
                        <div class="text item">
                            <div class="num">￥{{ income }}.00元</div>
                            <div class="title">总收入</div>
                        </div>
                    </el-card>
                </div></el-col
            >
            <el-col :lg="6" :md="24"
                ><div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>订单</span>
                        </div>
                        <div class="text item">
                            <div class="num">{{ order }}</div>
                            <div class="title">新订单</div>
                        </div>
                    </el-card>
                </div></el-col
            >
            <el-col :lg="6" :md="24"
                ><div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>派送</span>
                        </div>
                        <div class="text item">
                            <div class="num">{{ toSend }}</div>
                            <div class="title">派送订单</div>
                        </div>
                    </el-card>
                </div></el-col
            >
            <el-col :lg="6" :md="24"
                ><div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>会员</span>
                        </div>
                        <div class="text item">
                            <div class="num">{{ members }}</div>
                            <div class="title">总会员</div>
                        </div>
                    </el-card>
                </div></el-col
            >
        </el-row>
        <!-- 图表 -->
        <div ref="myChart" :style="{ width: '300px', height: '300px' }"></div>
    </div>
</template>

<script>
export default {
    nmae: "",
    data() {
        return {
            income: 0, //收入
            order: 0, //订单
            toSend: 0, //派送
            members: 0, //会员
        };
    },
    async mounted() {
        let income = await this.$api.orders({
            state: "收货",
        });
        if (income.data.msg.goods.length)
            for (var i = 0; i < income.data.msg.goods.length; i++) {
                this.income +=
                    income.data.msg.goods[i].new_price *
                    income.data.msg.goods[i].num;
            }

        let order = await this.$api.orders({
            state: "下单",
        });
        this.order = order.data.msg.goods.length;

        let toSend = await this.$api.orders({
            state: "发货中",
        });
        this.toSend = toSend.data.msg.goods.length;

        let vip = await this.$api.vip();
        this.members = vip.data.length;

        // 运行图表
        this.drawLine();
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(this.$refs.myChart);
            // 绘制图表
            myChart.setOption({
                title: { text: "数据表单" },
                tooltip: {},
                xAxis: {
                    data: ["收入", "订单", "派送", "会员"],
                },
                yAxis: {},
                series: [
                    {
                        name: "数量",
                        type: "bar",
                        data: [this.income,this.order,this.toSend,this.members]
                    },
                ],
            });
        },
    },
};
</script>

<style scoped lang='less'>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
/deep/ .el-card,
.el-message {
    border-radius: 1px;
    overflow: hidden;
}

.num {
    font-size: 20px;
    color: #676a6c;
    line-height: 2;
}

.title {
    font-size: 12px;
    color: #676a6c;
}

/deep/ .el-card__header {
    padding: 15px 20px;
}

/deep/ .el-card__body {
    padding: 10px 20px;
}
.el-card {
    margin: 10px 0;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
    clear: both;
}
.clearfix span {
    font-weight: bold;
}

.box-card {
    width: 100%;
}
</style>