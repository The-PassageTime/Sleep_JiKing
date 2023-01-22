<template>
  <!-- 查看反应物抽屉 -->
  <el-drawer direction="rtl" size="40%">
        <template #header>
        <h3>查看反应物</h3>
        </template>
        <el-form style="text-align:left; padding-bottom: 1rem;">
            <el-button :icon="Plus" @click="addReact">添加反应物</el-button>
        </el-form>

        <el-table :data="reactInfo.react"  
                border 
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style= "{textAlign:'center'}" 
                :row-style="{height: '40px'}">

            <el-table-column label="编号">
                <template v-slot="scope">
                <span v-if="scope.$index === reactInfo.rowIndex">
                    <el-input v-model.number="scope.row.Rea.reactantID" placeholder="ID"/>
                </span>
                <span v-else>{{scope.row.Rea.reactantID}}</span>
                </template>
            </el-table-column>

            <el-table-column label="名称">
                <template v-slot="scope">
                <span v-if="scope.$index === reactInfo.rowIndex">
                    <el-input v-model="scope.row.Rea.reaName" placeholder="名称"/>
                </span>
                <span v-else>{{scope.row.Rea.reaName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="数量">
                <template v-slot="scope">
                <span v-if="scope.$index === reactInfo.rowIndex">
                    <el-input v-model.number="scope.row.Rea.amount" placeholder="数量"/>
                    /
                    <el-input v-model="scope.row.Unit" placeholder="单位"/>
                </span>
                <span v-else>{{scope.row.Rea.amount}}/{{ scope.row.Unit }}</span>
                </template>
            </el-table-column>

            <el-table-column label="备注">
                <template v-slot="scope">
                <span v-if="scope.$index === reactInfo.rowIndex">
                    <el-input v-model="scope.row.Rea.remark" placeholder="备注"/>
                </span>
                <span v-else>{{scope.row.Rea.remark}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="140px">
                <template v-slot="scope">
                    <el-button type="primary" :icon="Edit" @click="changeReact(scope.$index)" v-if="reactInfo.editVisible || scope.$index !== reactInfo.rowIndex" />
                    <el-button type="primary" :icon="Finished" @click="commitReactChange(scope.$index)" v-if="reactInfo.finishVisible && scope.$index === reactInfo.rowIndex" />
                    <el-button type="danger" :icon="Delete" @click="delReact(scope.$index)" ></el-button>
                </template>
            </el-table-column>

        </el-table> 
    </el-drawer>
</template>

<script lang="ts" setup>
import {reactive,defineExpose} from "vue";
import { ElMessage } from 'element-plus'
import {Plus,Delete,Edit,Finished} from "@element-plus/icons-vue"
import $api from "@/http/index"

//反应物信息
let reactInfo = reactive({
    react:[],
    rowIndex:null,
    editVisible:true,
    finishVisible:false,
    exp_id:null,
    add:false,
    test:false
})

//查看反应物，显示抽屉
async function showReact(id:any){
    reactInfo.exp_id = id
    console.log("id")
    console.log(id)
    var req = "/{" + id + "}"
    await $api.getReact(req).then(res=>{
        console.log("res")
        console.log(res)

        if(res.data.message == "操作成功"){
            reactInfo.react = res.data.data
        }else{
            ElMessage({
                message: '获取反应物信息失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//添加反应物，多出一行
function addReact(){
    console.log("thishish")
    reactInfo.react.push({Rea:{reactantID:null, reaName:'', amount:null, remark:'', experimentID:reactInfo.exp_id},Unit:""})
    reactInfo.add = true
    reactInfo.editVisible = false
    reactInfo.finishVisible = true
    reactInfo.rowIndex = reactInfo.react.length - 1
}

//点击修改反应物
function changeReact(row:number){
    reactInfo.editVisible = false
    reactInfo.finishVisible = true
    reactInfo.rowIndex = row
}

//提交和更改反应物 提交反应物和要求不太符合，将所有都提交一遍
async function commitReactChange(index:number){
    if(reactInfo.add == true){
        commitAdd(index)
    }else{
        commitChange(index)
    }
}

//添加反应物
async function commitAdd(index:number) {
    var req1 = {
        rea:reactInfo.react[index].Rea,
        id:reactInfo.exp_id
    }
    await $api.addReact(req1).then(res=>{
        console.log(res)
        if(res.data.message == "操作成功"){
            reactInfo.editVisible = true
            reactInfo.finishVisible = false
            reactInfo.rowIndex = null
            reactInfo.add = false
            ElMessage({
                message: '添加成功！',
                duration: 1000,
                type: 'success'
            })
        }else{
            ElMessage({
                message: '添加失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//更改反应物
async function commitChange(index:number) {
    var req = reactInfo.react[index].Rea
    await $api.updateReact(req).then(res=>{
        if(res.data.message == "操作成功"){
            reactInfo.editVisible = true
            reactInfo.finishVisible = false
            reactInfo.rowIndex = null
            ElMessage({
                message: '修改成功！',
                duration: 1000,
                type: 'success'
            })
        }else{
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//删除反应物
async function delReact(index:number){
    var req = {
        id: reactInfo.react[index].Rea.experimentID,
        name:reactInfo.react[index].Rea.reaName
    }
    await $api.delReact(req).then(res=>{
        if(res.data.message == "操作成功"){
            ElMessage({
                message: '删除成功！',
                duration: 1000,
                type: 'success'
            })
            showReact(req.id)
        }else{
            ElMessage({
                message: '删除失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

defineExpose({ showReact })

</script>

<style>

</style>