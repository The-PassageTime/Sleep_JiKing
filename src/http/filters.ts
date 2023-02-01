//导入axios
import axios from 'axios'  //引入axios
import { ElMessage } from 'element-plus'
//创建一个axios实例
const instance = axios.create({
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true, 
})
// http request 拦截器
instance.interceptors.request.use(
    request => {
        if (request.data.isSuccess) {
            return request.data.result
        }else{
            ElMessage.error(request.data.msg)
            return request.data.result
        } 
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        if (error.request) {
        } 
    })
export default instance