<template>

    <div class="AllO">
        <div>
            <el-card style="border-radius: 8px"  max-height="700px">
                <el-form style="text-align:left; padding-bottom: 1rem;">
                    <el-input placeholder="只能根据实验名称查询" v-model="data.selectName" style="width:20rem; padding-right: 1rem;" clearable/>
                    <el-button :icon="Search" @click="selectExp">搜索</el-button>
                    <el-button :icon="Plus" @click="data.addVisible = true">添加实验</el-button>
                </el-form>

                <el-table :data="data.expList" border style="width: 100%" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }" >
                    <el-table-column prop="Exp.experiment_id" label="实验编号" width="130" ></el-table-column>
                    <el-table-column prop="Exp.experiment_name" label="实验名称" width="130"></el-table-column>
                    <el-table-column label="反应物" width="130">                       
                        <template v-slot="scope">
                            <div v-if="scope.row.ReaName?.length > 1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.ReaName?.length-1" :key="MyN">
                                        {{scope.row.ReaName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.ReaName?.[0]}}
                                </el-tooltip>
                                <el-link>
                                <el-icon class="el-icon--right" @click="showReact(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                                </el-link>
                            </div>
                            <div v-else>
                                {{scope.row.ReaName?.[0]}}
                                <el-link>
                                <el-icon class="el-icon--right" @click="showReact(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="生成物" width="130">
                        <template  v-slot="scope">
                            <div v-if="scope.row.ResName?.length>1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.ResName?.length-1" :key="MyN">
                                        {{scope.row.ResName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.ResName?.[0]}}
                            </el-tooltip>
                            <el-link>
                                <el-icon class="el-icon--right" @click="showResultant(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                            </el-link>
                            </div>
                            <div v-else>
                                {{scope.row.ResName?.[0]}}
                                <el-link>
                                <el-icon class="el-icon--right" @click="showResultant(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column label="催化剂">
                        <template  v-slot="scope">
                            <div v-if="scope.row.cataName?.length>1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.cataName?.length-1" :key="MyN">
                                        {{scope.row.cataName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.cataName?.[0]}}
                                <el-link>
                                    <el-icon class="el-icon--right" @click="showCata(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                                </el-link>
                            </el-tooltip>
                            </div>
                            <div v-else>
                                {{scope.row.cataName?.[0]}}
                                <el-link>
                                    <el-icon class="el-icon--right" @click="showCata(scope.row.Exp.experiment_id)" size="large"><Edit /></el-icon>
                                </el-link>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="Env.temperature" label="实验环境" width="130"></el-table-column>
                    <el-table-column  prop="Exp.remark" label="备注" width="180"></el-table-column>
                    <el-table-column  prop="Exp.conductDate" label="实验日期" width="130"></el-table-column>
                    <el-table-column  label="操作" width="270">
                        <template #default="scope">
                            <el-button type="primary" @click="viewPhoto(scope.row.Exp.experiment_id)">图片</el-button>
                            <el-button type="primary" @click="changeExpInfo(scope.row.Exp.experiment_id, scope.$index)">修改</el-button>
                            <el-button type="danger" @click="deleteExp(scope.row.Exp.experiment_id, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>

    <!-- 修改实验信息弹窗 -->
    <updateExpDialogue ref="updateDialogue" v-model="data.updateVisible" :changeExpList="changeExpList" />

    <!-- 添加实验弹窗，和修改差不多 -->
    <addExpDialogue v-model="data.addVisible" :addExpRes="addExpRes" />

    <!-- 添加图片抽屉 -->
    <myImgDrawer ref="imgComponent" v-model="data.addPhotoVisible" />

    <!-- 查看反应物抽屉 -->
    <reactDrawer ref="reactDraw" v-model="data.reactVisible"></reactDrawer>

    <!-- 查看生成物抽屉 -->
    <resultantDrawer ref="resultantDraw" v-model="data.resultantVisible" />

    <!-- 查看催化剂抽屉 -->
    <cataDrawer ref="cataDraw" v-model="data.cataVisible" />

</template>

<script lang="ts" setup>
import $api from "@/http/index"
import reactDrawer from "@/components/ExpPage/reactDrawer.vue";
import updateExpDialogue from "@/components/ExpPage/updateExpDialogue.vue"
import addExpDialogue from "@/components/ExpPage/addExpDialogue.vue";
import myImgDrawer from "@/components/ExpPage/myImgDrawer.vue";
import resultantDrawer from "@/components/ExpPage/resultantDrawer.vue";
import cataDrawer from "@/components/ExpPage/cataDrawer.vue";

import {onMounted,reactive,ref} from "vue";
import { ElMessage } from 'element-plus'
import { Search,Plus,Edit} from "@element-plus/icons-vue"

let data = reactive({
    allData:[],
    expList:[],
    selectName:"",
    changeIndex: 0,

    updateVisible:false,
    addVisible:false,
    addPhotoVisible:false,
    reactVisible:false,
    resultantVisible:false,
    cataVisible:false
})

//挂载时获取所有实验
onMounted(async () =>{
    await getList_num()
})

//加载所有实验
async function getList_num() {
    await $api.All_ExeList().then((res)=>{
        data.allData = res.data.data.ExpCount;
        data.expList = res.data.data.ExpSerialList;
        console.log("res");
        console.log(res);
        console.log(data.allData);
        console.log(data.expList);
    })
}

//根据实验名称，模糊查询，未接好，后端无对应接口
async function selectExp() {
    await $api.selectExp(data.selectName).then(res =>{
        console.log("res");
        console.log(res);
        // 显示查询结果
    })
}

//删除实验
async function deleteExp(id:number, index:number) {
    const req = "/{" + id + "}";
    console.log(req);
    await $api.delExp(req).then(res =>{
        console.log("res");
        console.log(res);
        //如果删除失败，弹窗展示失败，否则成功
        //成功后删除对应的行
        if(res.data.data == "删除成功！"){
            data.expList.splice(index, 1)
            ElMessage({
                message: '删除实验成功！',
                duration: 1000,
                type: 'success'
            })
        }else{
            ElMessage({
                message: '删除失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

/* 添加实验子组件 */
function addExpRes(){
    data.addVisible = false,
    getList_num()
}

/* 修改实验子组件  */
let updateDialogue = ref();
//修改实验，显示弹窗
function changeExpInfo(id:number, index:number) {
    data.changeIndex = index
    data.updateVisible = true
    updateDialogue.value.changeExp(data.expList, id, index)
}

//实验修改成功后，更改信息
function changeExpList(updateInfo:[]){
    data.expList[data.changeIndex].Exp.experiment_id = updateInfo.experiment_id
    data.expList[data.changeIndex].Exp.experiment_name = updateInfo.experiment_name
    data.expList[data.changeIndex].Exp.conductDate = updateInfo.conductDate
    data.expList[data.changeIndex].Exp.remark = updateInfo.remark
    data.updateVisible = false
}


/* 图片子组件 */
let imgComponent = ref();
//查看实验所有图片
function viewPhoto(experiment_id:any) {
    data.addPhotoVisible = true
    console.log(data.addPhotoVisible)
    imgComponent.value.viewPhoto(experiment_id)
}

//反应物子组件
let reactDraw = ref();
async function showReact(id:null) {
    data.reactVisible = true
    reactDraw.value.showReact(id)
}

//生成物子组件
let resultantDraw = ref();
async function showResultant(id:null) {
    data.resultantVisible = true
    resultantDraw.value.showResultant(id)
}

//催化剂子组件
let cataDraw = ref();
async function showCata(id:null) {
    data.cataVisible = true
    cataDraw.value.showCata(id)
}


</script>

<style>
.AllO{
    height: 800px;
    padding: 1rem 0.85rem 1.5rem 0.85rem;
    background-image: url(../assets/black.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.el-table-column{
    align:"center";
    header-align:"center"
}

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}


</style>