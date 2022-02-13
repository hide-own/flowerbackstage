import request from "./request"

const api = {
    // 登录
    login(config) {
        return request.post("/api/login/admin", config)
    },
    orders(config) {
        // 订单状态
        return request.post("/api/orders/state", config)
    },
    vip(config) {
        // 查询所有会员
        return request.get("/api/login/vip", config)
    },
    banner(config) {
        // 轮播图
        return request.get("/api/index/banner", config)
    },
    sort(config) {
        // 分类
        return request.get("/api/index/detail?id=" + config)
    },
    goods(config) {
        // 全部商品
        return request.get("/api/goods/index", config)
    },
    admin(config) {
        // 管理员信息
        return request.get("/api/dcna/index", config)
    },
    save(config) {
        // 修改管理员信息
        return request.post("/api/dcna/save", config)
    },
    deletes(config) {
        // 修改管理员信息
        return request.post("/api/dcna/deletes", config)
    },
    addAdmin(config) {
        // 修改管理员信息
        return request.post("/api/dcna/add", config)
    },
    uploadBannerImage: "/api/api/index/bannerHold",    //上传banner图片
    uploadBanner(config) {
        // 上传图片地址
        return request.post("/api/index/bannerHold", config)
    },
    bannerSave(config) {
        // 保存banner新增图片
        return request.post("/api/index/bannerSave", config)
    },
    bannerDel(config) {
        // 删除banner
        return request.post("/api/index/bannerDel", config)
    },
    bannerModify(config){
        // 修改banner
        return request.post("/api/index/bannerModify", config)
    }

}

export default api