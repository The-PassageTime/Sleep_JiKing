<template>
  <!-- 查看反应物抽屉 -->
  <el-drawer direction="rtl" size="40%">
        <template #header>
        <h3>查看反应物</h3>
        </template>
        <el-form style="text-align:left; padding-bottom: 1rem;">
            <el-button :icon="Plus" @click="addReact" :disabled="!reactInfo.editVisible" >添加反应物</el-button>
        </el-form>

        <el-table :data="reactInfo.react"  
                border 
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style= "{textAlign:'center'}" 
                :row-style="{height: '40px'}">
            <el-table-column label="编号">
                <template v-slot="scope">
                <span>{{scope.row.Rea.reactantID}}</span>
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
                    <div>
                        <div style="width:43px; display: inline-block;"><el-input v-model.number="scope.row.Rea.amount" placeholder="数量"/></div>
                        <div style="width:30px; display: inline-block;"><span>/{{scope.row.Unit}}</span></div>
                    </div>
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
                    <el-button type="primary" :icon="Edit" @click="changeReact(scope.$index)" v-if="reactInfo.editVisible || scope.$index !== reactInfo.rowIndex" :disabled="!reactInfo.editVisible"/>
                    <el-button type="primary" :icon="Finished" @click="commitReactChange(scope.$index)" v-if="reactInfo.finishVisible && scope.$index === reactInfo.rowIndex" />
                    <el-button type="danger" :icon="Delete" @click="delReact(scope.$index)" :disabled="(!reactInfo.editVisible) && scope.$index !== reactInfo.rowIndex" ></el-button>
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
})
const initInfo = []

//查看反应物，显示抽屉
async function showReact(id:any){
    reactInfo.exp_id = id
    var req = "/" + id
    await $api.getReact(req).then(res=>{
        if(res.message == "操作成功"){
            console.log("res")
            console.log(res)

            reactInfo.react = res.data
            for(let i = 0; i < res.data.length; i++){
                initInfo[i] = res.data[i].Rea.reaName
            }
            reactInfo.editVisible = true
            reactInfo.finishVisible = false
            reactInfo.rowIndex = null
            reactInfo.add = false
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

//添加反应物，显示成功但更新不出
async function commitAdd(index:number) {
    var req1 = "?id=" + reactInfo.exp_id
    await $api.addReact(req1, reactInfo.react[index].Rea).then(res=>{
        if(res.message == "操作成功"){
            reactInfo.editVisible = true
            reactInfo.finishVisible = false
            reactInfo.rowIndex = null
            reactInfo.add = false   
            showReact(reactInfo.exp_id)
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
    var reaname = initInfo[index]
    reaname = encodeURI(reaname)
    reaname = encodeURI(reaname)
    var req1 = "?expID=" + reactInfo.exp_id + "&name=" + reaname
    await $api.updateReact(req1, reactInfo.react[index].Rea).then(res=>{
        if(res.message == "操作成功"){
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

//删除反应物，但是显示不出
async function delReact(index:number){
    if(reactInfo.add == true){
        reactInfo.react.splice(index, 1)
        reactInfo.add = false
        reactInfo.editVisible = true
        reactInfo.finishVisible = false
        reactInfo.rowIndex = null
    }else{
        var req = "?id=" + reactInfo.react[index].Rea.experimentID + "&name=" + reactInfo.react[index].Rea.reaName
        await $api.delReact(req).then(res=>{
            if(res.message == "操作成功"){
                ElMessage({
                    message: '删除成功！',
                    duration: 1000,
                    type: 'success'
                })
                showReact(reactInfo.react[index].Rea.experimentID)
            }else{
                ElMessage({
                    message: '删除失败！',
                    duration: 1000,
                    type: 'error'
                })
            }
        })
    }
}

defineExpose({ showReact })

</script>

<style>

</style>