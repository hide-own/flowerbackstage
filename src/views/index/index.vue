<template>
    <div class="index">
        <!-- 头部订单状态 -->
        <state></state>
        <race></race>
    </div>
</template>

<script>
import Race from "./components/race.vue";
import state from "./components/state.vue";
export default {
    components: { state, Race },

    nmae: "",
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped lang='less'>
.index{
    position: relative;
}
</style>