import axios from 'axios'       //引用axios
import ElementUI from 'element-ui'
import VueRouter from '../router/index'
import store from "../store/index.js"

let instance = axios.create({   //创建axios实例的请求头
    baseURL: 'http://47.96.158.85:9999',	//跨域代理  电脑/api   手机 http://47.96.158.85:9999
    timeout: 3000		//设置超时请求
})



// 封装get  post方法
const HTTP = {
    get: function (url, config = {}) {
        return new Promise((resolve, reject) => {
            instance.get(url, config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post: function (url, config = {}) {
        return new Promise((resolve, reject) => {
            instance.post(url, config).then(res => {
                resolve(res)
            }, err => {
                reject(err)
            })
        })
    }
    // get: async function (url, config = {}) {
    //     var response = {}
    //     try {
    //         let result = await instance.get(url, config)
    //         response = result
    //     } catch (err) {
    //         response = err
    //     }
    //     return response
    // }
}
// 请求拦截器
instance.interceptors.request.use(config => {

    if (store.state.token) {
        // 登录后携带koen请求接口
        config.headers['Authorization'] = `Bearer ${store.state.token}`
    }

    return config
})

// 响应拦截器
instance.interceptors.response.use(config => {

    // token过期，删除token去登录页面
    if (config.data.msg == "token验证失败") {
        ElementUI.Message({
            message: '警告,您还没有登录！！！',
            type: 'warning',
            duration: "2000",
            onClose: () => {
                localStorage.removeItem("token")
                store.commit("setToken", undefined);
                VueRouter.push("/login")
            }
        })
    }

    return config
})

export default HTTP