import axios from 'axios'
import router from "../router"
import Vue from "vue";
// import store from "../store";
import {
  Message,
  MessageBox,
  Loading
} from 'element-ui';

var options = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)'
};
export function request(config) {

  //1.创建实例
  const instance = axios.create({
    baseURL: 'http://39.105.58.189',
    // baseURL: 'https://localhost:5001',

    timeout: 150000
  })
  let loadingInstance
  //2.axios的拦截器
  instance.interceptors.request.use(config => {
    // store.state.loading = true
    loadingInstance = Loading.service(options)
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token')
    return config
  }, err => {
    // store.state.loading = false
    Vue.nextTick(() => {
      loadingInstance.close()
    })
    console.log(err)
  })
  instance.interceptors.response.use(res => {
    Vue.nextTick(() => {
      loadingInstance.close()
    })
    // store.state.loading = false
    return res
  }, err => {
    Vue.nextTick(() => {
      loadingInstance.close()
    })
    if (err.response.headers["www-authenticate"] != undefined && err.response.status == 401) {
      // store.state.loading = false
      MessageBox.confirm(
        '你已被登出，请重新登录',
        '确定登出', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }
      ).then(() => {
        router.push('/login')
      })
    }
    window.sessionStorage.removeItem('token')
    return Promise.reject(err)
  })
  return instance(config)
}