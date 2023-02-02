<template>
<!-- 查看生成物抽屉 -->
<el-drawer direction="rtl" size="40%">
    <template #header>
    <h3>查看生成物</h3>
    </template>
    <el-form style="text-align:left; padding-bottom: 1rem;">
        <el-button :icon="Plus" @click="addresultant" :disabled="!resultantInfo.editVisible">添加生成物</el-button>
    </el-form>

    <el-table :data="resultantInfo.resultant"  
            border 
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style= "{textAlign:'center'}" 
            :row-style="{height: '40px'}">

        <el-table-column label="编号">
            <template v-slot="scope">
            <span>{{scope.row.Res.resultantID}}</span>
            </template>
        </el-table-column>

        <el-table-column label="名称">
            <template v-slot="scope">
            <span v-if="scope.$index === resultantInfo.rowIndex">
                <el-input v-model="scope.row.Res.resName" placeholder="名称"/>
            </span>
            <span v-else>{{scope.row.Res.resName}}</span>
            </template>
        </el-table-column>

        <el-table-column label="数量">
            <template v-slot="scope">
            <span v-if="scope.$index === resultantInfo.rowIndex">
            <div>
                <div style="width:43px; display: inline-block;"><el-input v-model.number="scope.row.Res.amount" placeholder="数量"/></div>
                <div style="width:30px; display: inline-block;"><span>/{{scope.row.Unit}}</span></div>
            </div>
            </span>
            <span v-else>{{scope.row.Res.amount}}/{{ scope.row.Unit }}</span>
            </template>
        </el-table-column>

        <el-table-column label="备注">
            <template v-slot="scope">
            <span v-if="scope.$index === resultantInfo.rowIndex">
                <el-input v-model="scope.row.Res.remark" placeholder="备注"/>
            </span>
            <span v-else>{{scope.row.Res.remark}}</span>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="140px">
            <template v-slot="scope">
            <el-button type="primary" :icon="Edit" @click="changeresultant(scope.$index)" v-if="resultantInfo.editVisible || scope.$index !== resultantInfo.rowIndex" :disabled="!resultantInfo.editVisible" />
            <el-button type="primary" :icon="Finished" @click="commitresultantChange(scope.$index)" v-if="resultantInfo.finishVisible && scope.$index === resultantInfo.rowIndex" />
            <el-button type="danger" :icon="Delete" @click="delresultant(scope.$index)" :disabled="(!resultantInfo.editVisible) && scope.$index !== resultantInfo.rowIndex"  ></el-button>
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

//生成物信息
let resultantInfo = reactive({
    resultant:[],
    rowIndex:null,
    editVisible:true,
    finishVisible:false,
    exp_id:null,
    add:false,
})
//保存初始反应物名称
const initInfo = []

//查看生成物，显示抽屉
async function showResultant(id:any){
resultantInfo.exp_id = id
var req = "/" + id
await $api.getresultant(req).then(res=>{
    if(res.message == "操作成功"){
        resultantInfo.resultant = res.data
        for(let i = 0; i < res.data.length; i++){
            initInfo[i] = res.data[i].Res.resName
        }
        resultantInfo.editVisible = true
        resultantInfo.finishVisible = false
        resultantInfo.rowIndex = null
        resultantInfo.add = false
    }else{
        ElMessage({
            message: '获取生成物信息失败！',
            duration: 1000,
            type: 'error'
        })
    }
})
}

//添加生成物，多出一行
function addresultant(){
    resultantInfo.resultant.push({Res:{resultantID:null, resName:'', amount:null, remark:'', experimentID:resultantInfo.exp_id},Unit:""})
    resultantInfo.add = true
    resultantInfo.editVisible = false
    resultantInfo.finishVisible = true
    resultantInfo.rowIndex = resultantInfo.resultant.length - 1
}

//点击修改生成物
function changeresultant(row:number){
    resultantInfo.editVisible = false
    resultantInfo.finishVisible = true
    resultantInfo.rowIndex = row
}

//提交和更改生成物 提交生成物和要求不太符合，将所有都提交一遍
async function commitresultantChange(index:number){
    if(resultantInfo.add == true){
        commitAdd(index)
    }else{
        commitChange(index)
    }
}

//添加生成物 不行
async function commitAdd(index:number) {
    var req1 = "?id=" + resultantInfo.exp_id
    await $api.addresultant(req1, resultantInfo.resultant[index].Res).then(res=>{
        if(res.message == "操作成功"){
            resultantInfo.editVisible = true
            resultantInfo.finishVisible = false
            resultantInfo.rowIndex = null
            resultantInfo.add = false
            ElMessage({
                message: '添加成功！',
                duration: 1000,
                type: 'success'
            })
            showResultant(resultantInfo.exp_id)
        }else{
            ElMessage({
                message: '添加失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//更改生成物
async function commitChange(index:number) {
    var resname = initInfo[index]
    resname = encodeURI(resname)
    resname = encodeURI(resname)
    var req2 = "?expID=" + resultantInfo.exp_id + "&name=" + resname
    await $api.updateresultant(resultantInfo.resultant[index].Res, req2).then(res=>{
        if(res.message == "操作成功"){
            resultantInfo.editVisible = true
            resultantInfo.finishVisible = false
            resultantInfo.rowIndex = null
            ElMessage({
                message: '修改成功！',
                duration: 1000,
                type: 'success'
            })
            showResultant(resultantInfo.exp_id)
        }else{
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//删除生成物 不行
async function delresultant(index:number){
    if(resultantInfo.add == true){
        resultantInfo.resultant.splice(index, 1)
        resultantInfo.add = false
        resultantInfo.editVisible = true
        resultantInfo.finishVisible = false
        resultantInfo.rowIndex = null
    }else{
        var req = "?id=" + resultantInfo.resultant[index].Res.experimentID + "&name=" + resultantInfo.resultant[index].Res.resName
        await $api.delresultant(req).then(res=>{
            if(res.message == "操作成功"){
                ElMessage({
                    message: '删除成功！',
                    duration: 1000,
                    type: 'success'
                })
                showResultant(resultantInfo.resultant[index].Res.experimentID)
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

defineExpose({ showResultant })

</script>

<style>

</style>