import axios from 'axios'
import requsets from './ajax'
import {ref} from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const json = ref("/json")
const http = ref("http://120.26.64.169:80")

/**
 * 实验页面接口
 */
const expModel = {
    All_ExeList:() => {
        return requsets.get(http.value + "/api/v1/exp/expList"); 
    },
    All_ObjList:() => {
        //requsets.defaults.headers.common['Authorization'] = localStorage["token"];
        return requsets.get(http.value + "/api/v1/items/GetKindList");
    },
    //删除实验
    delExp:(id:any) =>{
        return requsets.delete(http.value + "/api/v1/exp/expDel" + id)
    },
    //提交修改实验信息
    updateExp:(id:any, param:any)=>{
        return requsets.post(http.value + "/api/v1/exp/updateExp"+id, param)
    },
    updateObj:(id:any, param:any)=>{
        return requsets.post(http.value + "/api/v1/items/UpdateItemsKind"+id, param)
    },
    //模糊查询实验信息
    selectExp:(keyWord:any)=>{
        return requsets.get(http.value + "/api/v1/exp/fuzzySearchExp" + keyWord)
    },
    selectObj:(keyWord:any)=>{
        return requsets.get(http.value + "/api/v1/items/fuzzySearchItems" + keyWord)
    },
    //添加实验信息
    addExp:(param:any)=>{
        return requsets.post(http.value + "/api/v1/exp/addOneExp", param)
    },
    //添加物品信息
    addObj:(param:any)=>{
        return requsets.post(http.value + "/api/v1/items/addItemsKind", param)
    },
    //图片
    //查看上传的图片
    viewPhoto:(id:any)=>{
        return requsets.get(http.value + "/api/v1/exp/getExpImage" + id)
    },
    //提交图片
    commitPhoto:(id:any, param:any)=>{
        return requsets.post(http.value + "/api/v1/exp/postExpImage" + id, param,{
            headers: {
            'Content-Type':'multipart/form-data'
            }
        })
    },
    //提交图片
    WcommitPhoto:(itemName:string, param:any)=>{
        return requsets.post(http.value + "/api/v1/items/postItemsImage" + itemName, param,{
            headers: {
                'Content-Type':'multipart/form-data'
                }
        })
    },
    //删除图片
    delPhoto:(req:any)=>{
        return requsets.delete(http.value + "/api/v1/exp/deleteExpImage" + req)
    },
    //删除物体图片
    delObjImg:(rep:any)=>{
        return requsets.delete(http.value + "/api/v1/items/delItemsImage" + rep)
    },
    //删除物品
    delObj:(req:any)=>{
        return requsets.delete(http.value + "/api/v1/items/DelItemsKind" + req)
    },
    //反应物
    //获取反应物列表
    getReact:(id:any)=>{
        return requsets.get(http.value + "/api/v1/rea/reaList" + id)
    },
    //更改反应物列表
    updateReact:(req:any,req2:any)=>{
        return requsets.post(http.value + "/api/v1/rea/UpdateReactant"+req, req2)
    },
    //删除反应物
    delReact:(req:any)=>{
        return requsets.delete(http.value + "/api/v1/rea/DelReactant" + req)
    },
    //添加反应物
    addReact:(req:any,req1:any)=>{
        return requsets.post(http.value + "/api/v1/rea/AddReactant" + req, req1)
    },
    //查看生成物
    getresultant:(id:any)=>{
        return requsets.get(http.value + "/api/v1/res/resList" + id)
    },
    //添加生成物
    addresultant:(req:any, req1:any)=>{
        return requsets.post(http.value + "/api/v1/res/AddResultant" + req, req1)
    },
    //修改生成物
    updateresultant:(req:any,id:any)=>{
        return requsets.post(http.value + "/api/v1/res/UpdateResultant"+id, req)
    },
    //删除生成物
    delresultant:(req:any)=>{
        return requsets.delete(http.value + "/api/v1/res/DelResultant" + req)
    },
    //查看催化剂
    getCata:(id:any)=>{
        return requsets.get(http.value + "/api/v1/cata/cataList" + id)
    },
    addCata:(req:any)=>{
        return requsets.post(http.value + "/api/v1/cata/AddCata", req)
    },
    updateCata:(req:any,req1:any)=>{
        return requsets.post(http.value + "/api/v1/cata/UpdateCata" + req1, req)
    },
    delCata:(req:any)=>{
        return requsets.delete(http.value + "/api/v1/cata/DelCata" + req)
    },
    /*getToken:(rep:any)=>{
        return requsets.post(http.value + "/api/v1/login" ,rep); 
    },*/
    //实验环境
    getEnv:(id:any)=>{
        return requsets.get(http.value + "/api/v1/env/envCondition" + id)
    },
    updateEnv:(req:any,req1:any)=>{
        return requsets.post(http.value + "/api/v1/env/UpdateEnvCondition" + req1, req)
    },
    addEnv:(id:any, req:any)=>{
        return requsets.post(http.value + "/api/v1/env/AddEnvCondition" + id, req)
    }
}


    //获取物品列表
/*export const All_ObjList=() => {
    requsets.defaults.headers.common['Authorization'] = localStorage["token"];
    return requsets.get(http.value + "/api/v1/items/GetKindList"); 
}*/

export const getToken = (parms: {}) =>{
    return axios.post(http.value + "/api/v1/login", parms); 
}

export default {
    ...expModel,
};
