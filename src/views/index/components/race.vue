<template>
    <div class="race">
        <div
            id="leiDaTu"
            class="echart"
            style="width: 600px; height: 600px"
        ></div>
    </div>
</template>

<script>
export default {
    nmae: "",
    data() {
        return {};
    },
    methods: {
        drawPie() {
            let charts = this.$echarts.init(document.getElementById("leiDaTu"));
            var option = {
                title: {
                    text: "销售量",
                    link: "",
                    target: "blank",
                    textAlign: "left",
                },
                tooltip: {}, //提示层
                legend: {
                    data: ["name1"],
                },
                radar: {
                    name: {
                        textStyle: {
                            color: "#fff", //字体颜色
                            backgroundColor: "#999", //背景色
                            borderRadius: 3, //圆角
                            padding: [3, 5], //padding
                        },
                    },
                    center: ["50%", "50%"],
                    radius: "60%",
                    startAngle: 270,
                    indicator: [
                        {
                            name: "订单",
                            max: 20,
                        },
                        {
                            name: "派送",
                            max: 20,
                        },
                        {
                            name: "会员",
                            max: 20,
                        },
                    ],
                },
                series: [
                    {
                        name: "测试标题名字",
                        type: "radar",
                        data: [
                            {
                                value: [5, 10, 2],
                                name: "销售量",
                            },
                        ],
                    },
                ],
            };
            charts.setOption(option);
        },
    },
    mounted() {
        this.$nextTick(function () {
            this.drawPie("leiDaTu");
        });
    },
};
</script>

<style scoped lang='less'>
.race{
    float: left;
    position: absolute;
    right: 0;
    top: 10rem;
}
</style>