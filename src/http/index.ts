import axios, { AxiosRequestConfig } from 'axios'
import {ref} from 'vue'
const json = ref("/json")
const http = ref("http://120.26.64.169:80")

/**
 * 实验页面接口
 */
const expModel = {
    All_ExeList:() => {
        return axios.get(http.value + "/api/v1/exp/expList"); 
    },
    //删除实验，未连接好
    delExp:(id:any) =>{
        return axios.delete(http.value + "/api/v1/exp/expDel", id)
    }
    
}

export default {
    ...expModel
};