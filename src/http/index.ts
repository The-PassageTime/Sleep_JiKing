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

    //图片
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
    },

    //反应物
    //获取反应物列表
    getReact:(id:any)=>{
        return axios.get(http.value + "/api/v1/rea/reaList" + id)
    },
    //更改反应物列表
    updateReact:(req:any)=>{
        return axios.post(http.value + "/api/v1/rea/UpdateReactant", req)
    },
    //删除反应物
    delReact:(req:any)=>{
        return axios.delete(http.value + "/api/v1/rea/DelReactant", req)
    },
    //添加反应物
    addReact:(req:any)=>{
        return axios.post(http.value + "/api/v1/rea/AddReactant", req)
    },
    //查看生成物
    getresultant:(id:any)=>{
        return axios.get(http.value + "/api/v1/res/resList" + id)
    },
    //添加生成物
    addresultant:(req:any)=>{
        return axios.post(http.value + "/api/v1/res/AddResultant", req)
    },
    //修改生成物
    updateresultant:(req:any)=>{
        return axios.post(http.value + "/api/v1/res/UpdateResultant", req)
    },
    //删除生成物
    delresultant:(req:any)=>{
        return axios.delete(http.value + "/api/v1/res/Delsultant", req)
    },
    //查看催化剂
    getCata:(id:any)=>{
        return axios.get(http.value + "/api/v1/cata/cataList" + id)
    },
    addCata:(req:any)=>{
        return axios.post(http.value + "/api/v1/cata/AddCata", req)
    },
    updateCata:(req:any)=>{
        return axios.post(http.value + "/api/v1/cata/UpdateCata", req)
    },
    delCata:(req:any)=>{
        return axios.delete(http.value + "/api/v1/cata/DelCata", req)
    },
}

export const getToken = (parms: {}) =>{
    return axios.post(http.value + "/login", parms); 
}

export default {
    ...expModel
};
