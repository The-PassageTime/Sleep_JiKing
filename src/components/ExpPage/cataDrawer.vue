<template>
<!-- 查看催化剂抽屉 -->
<el-drawer direction="rtl" size="40%">
        <template #header>
        <h3>查看催化剂</h3>
        </template>
        <el-form style="text-align:left; padding-bottom: 1rem;">
            <el-button :icon="Plus" @click="addCata" :disabled="!CataInfo.editVisible">添加催化物</el-button>
        </el-form>

        <el-table :data="CataInfo.cata"  
                border 
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style= "{textAlign:'center'}" 
                :row-style="{height: '40px'}">

            <el-table-column label="编号">
                <template v-slot="scope">
                <span>{{scope.row.Cata.cataId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="名称">
                <template v-slot="scope">
                <span v-if="scope.$index === CataInfo.rowIndex">
                    <el-input v-model="scope.row.Cata.cataName" placeholder="名称"/>
                </span>
                <span v-else>{{scope.row.Cata.cataName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="数量">
                <template v-slot="scope">
                <span v-if="scope.$index === CataInfo.rowIndex">
                <div>
                    <div style="width:43px; display: inline-block;"><el-input v-model.number="scope.row.Cata.amount" placeholder="数量"/></div>
                    <div style="width:30px; display: inline-block;"><span>/{{scope.row.Unit}}</span></div>
                </div>
                </span>
                <span v-else>{{scope.row.Cata.amount}}/{{ scope.row.Unit }}</span>
                </template>
            </el-table-column>

            <el-table-column label="备注">
                <template v-slot="scope">
                <span v-if="scope.$index === CataInfo.rowIndex">
                    <el-input v-model="scope.row.Cata.remark" placeholder="备注"/>
                </span>
                <span v-else>{{scope.row.Cata.remark}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="140px">
                <template v-slot="scope">
                <el-button type="primary" :icon="Edit" @click="changeCata(scope.$index)" v-if="CataInfo.editVisible || scope.$index !== CataInfo.rowIndex" :disabled="!CataInfo.editVisible" />
                <el-button type="primary" :icon="Finished" @click="commitCataChange(scope.$index)" v-if="CataInfo.finishVisible && scope.$index === CataInfo.rowIndex" />
                <el-button type="danger" :icon="Delete" @click="delCata(scope.$index)" :disabled="(!CataInfo.editVisible) && scope.$index !== CataInfo.rowIndex" ></el-button>
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

//催化剂信息
let CataInfo = reactive({
    cata:[],
    rowIndex:null,
    editVisible:true,
    finishVisible:false,
    exp_id:null,
    add:false,
})
const initInfo = []

//查看催化剂，显示抽屉
async function showCata(id:any){
CataInfo.exp_id = id
var req = "?expID=" + id
await $api.getCata(req).then(res=>{
    if(res.message == "操作成功"){
        CataInfo.cata = res.data
        for(let i = 0; i < res.data.length; i++){
            initInfo[i] = res.data[i].Cata.cataName
        }
        CataInfo.editVisible = true
        CataInfo.finishVisible = false
        CataInfo.rowIndex = null
        CataInfo.add = false
    }else{
        ElMessage({
            message: '获取催化剂信息失败！',
            duration: 1000,
            type: 'error'
        })
    }
})
}

//添加催化剂，多出一行
function addCata(){
    CataInfo.cata.push({Cata:{cataId:null, cataName:'', amount:null, remark:'', experimentID:CataInfo.exp_id},Unit:""})
    CataInfo.add = true
    CataInfo.editVisible = false
    CataInfo.finishVisible = true
    CataInfo.rowIndex = CataInfo.cata.length - 1
}

//点击修改催化剂
function changeCata(row:number){
    CataInfo.editVisible = false
    CataInfo.finishVisible = true
    CataInfo.rowIndex = row
}

//提交和更改催化剂 提交催化剂和要求不太符合，将所有都提交一遍
async function commitCataChange(index:number){
    if(CataInfo.add == true){
        commitAdd(index)
    }else{
        commitChange(index)
    }
}

//添加催化剂
async function commitAdd(index:number) {
    await $api.addCata(CataInfo.cata[index].Cata).then(res=>{
        if(res.message == "操作成功"){
            CataInfo.editVisible = true
            CataInfo.finishVisible = false
            CataInfo.rowIndex = null
            CataInfo.add = false
            ElMessage({
                message: '添加成功！',
                duration: 1000,
                type: 'success'
            })
            showCata(CataInfo.exp_id)
        }else{
            ElMessage({
                message: '添加失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//更改催化剂
async function commitChange(index:number) {
var cataname = initInfo[index]
cataname = encodeURI(cataname)
cataname = encodeURI(cataname)
    var req1 = "?expID=" + CataInfo.exp_id + "&name=" + cataname
    var req = CataInfo.cata[index].Cata
    await $api.updateCata(req, req1).then(res=>{
        if(res.message == "操作成功"){
            CataInfo.editVisible = true
            CataInfo.finishVisible = false
            CataInfo.rowIndex = null
            ElMessage({
                message: '修改成功！',
                duration: 1000,
                type: 'success'
            })
            showCata(CataInfo.exp_id)
        }else{
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//删除催化剂
async function delCata(index:number){
    if(CataInfo.add == true){
        CataInfo.cata.splice(index, 1)
        CataInfo.add = false
        CataInfo.editVisible = true
        CataInfo.finishVisible = false
        CataInfo.rowIndex = null
    }else{
        var req = "?expID=" + CataInfo.exp_id + "&name=" + CataInfo.cata[index].Cata.cataName
        await $api.delCata(req).then(res=>{
            if(res.message == "操作成功"){
                ElMessage({
                    message: '删除成功！',
                    duration: 1000,
                    type: 'success'
                })
                showCata(CataInfo.exp_id)
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

defineExpose({ showCata })

</script>

<style>

</style>