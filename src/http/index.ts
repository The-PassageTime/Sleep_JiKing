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
        return axios.delete(http.value + "/api/v1/exp/expDel" + id)
    },
    //提交修改实验信息
    updateExp:(param:any)=>{
        return axios.post(http.value + "/api/v1/exp/updateExp", param)
    },
    //模糊查询实验信息
    selectExp:(name:any)=>{
        return axios.get(http.value + "/api/v1/exp/selectExp", name)
    },
    //添加实验信息
    addExp:(param:any)=>{
        return axios.post(http.value + "/api/v1/exp/addOneExp", param)
    },
    //查看上传的图片
    viewPhoto:(id:any)=>{
        return axios.get(http.value + "/api/v1/exp/getExpImage" +id)
    },
    //提交图片
    commitPhoto:(id:any, param:any)=>{
        return axios.post(http.value + "/api/v1/exp/postExpImage" + id, param)
    },
    //删除图片
    delPhoto:(req:any)=>{
        return axios.post(http.value + "/api/v1/exp/deleteExpImage" + req)
    }
    
}

export default {
    ...expModel
};
export const getToken = (parms: {}) =>{
    return axios.post(http.value + "/login", parms); 
}


