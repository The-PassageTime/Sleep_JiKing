<template>
<!-- 查看环境信息抽屉 -->
<el-drawer direction="rtl" size="35%">
        <template #header>
        <h3>查看实验环境</h3>
        </template>
        <el-form style="text-align:left; padding-bottom: 1rem;">
            <el-button :icon="Edit" @click="envInfo.editVisible = false" v-if="envInfo.editVisible && !envInfo.noenvVisiable">修改环境信息</el-button>
            <el-button :icon="Finished" type="success" @click="commitenvChange()" v-if="!envInfo.editVisible && !envInfo.noenvVisiable">提交修改</el-button>
        </el-form>
        
        <!-- 未添加实验环境展示 -->
        <el-result sub-title="暂未添加实验环境" v-if="envInfo.noenvVisiable">
            <template #icon>
                <el-icon size="90px"><WarningFilled /></el-icon>
            </template>
            <template #extra>
                <el-button type="primary" key="primary" :icon="Plus" @click="addenv" > 点击添加 </el-button>
            </template>
        </el-result>

        <!-- 添加实验环境展示 -->
        <el-descriptions column="1" size="large" border v-if="!envInfo.noenvVisiable">
            <el-descriptions-item label="温度" label-align="center" align="center" width="30px">
                <span v-if="envInfo.editVisible === false">
                    <el-input v-model.number="envInfo.env.temperature" placeholder="输入温度"/>
                </span>
                <span v-else>{{envInfo.env.temperature}}</span>
            </el-descriptions-item>
                
            <el-descriptions-item label="湿度" label-align="center" align="center" >
                <span v-if="envInfo.editVisible === false">
                    <el-input v-model.number="envInfo.env.humidity" placeholder="输入湿度"/>
                </span>
                <span v-else>{{envInfo.env.humidity}}</span>
            </el-descriptions-item>

            <el-descriptions-item label="其他" label-align="center" align="center">
                <span v-if="envInfo.editVisible === false">
                    <el-input v-model="envInfo.env.other" placeholder="其他信息"/>
                </span>
                <span v-else>{{envInfo.env.other}}</span>
            </el-descriptions-item>
        </el-descriptions>
    </el-drawer>
</template>

<script lang="ts" setup>
import {reactive,defineExpose} from "vue";
import { ElMessage } from 'element-plus'
import {Plus,Edit,Finished,WarningFilled} from "@element-plus/icons-vue"
import $api from "@/http/index"

//环境信息信息
let envInfo = reactive({
    env:[],
    exp_id:null,
    add:false,
    editVisible:false,
    noenvVisiable:false
})

//查看环境信息，显示抽屉
async function showenv(id:any){
    envInfo.exp_id = id
    var req = "?expID=" + id
    await $api.getEnv(req).then(res=>{
        if(res.message == "操作成功"){
            envInfo.env = []
            if(res.data != null){
                envInfo.env = res.data
                envInfo.noenvVisiable = false
                envInfo.editVisible = true
            }else{
                envInfo.noenvVisiable = true
                envInfo.editVisible = false
            }
            envInfo.add = false
        }else{
            ElMessage({
                message: '获取环境信息信息失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//添加环境信息
function addenv(){
    envInfo.noenvVisiable = false
    envInfo.editVisible = false
    envInfo.add = true
    envInfo.env = {envConditionID:0, experimentID:envInfo.exp_id, humidity:0, other:'', temperature:0}
}

//提交和更改环境信息 提交环境信息和要求不太符合，将所有都提交一遍
async function commitenvChange(){
    if(envInfo.add == true){
        commitAdd()
    }else{
        commitChange()
    }
}

//添加环境信息
async function commitAdd() {
    var req1 = "?expID=" + envInfo.exp_id
    await $api.addEnv(req1, envInfo.env).then(res=>{
        if(res.message == "操作成功"){
            envInfo.editVisible = true
            envInfo.add = false
            ElMessage({
                message: '添加成功！',
                duration: 1000,
                type: 'success'
            })
            showenv(envInfo.exp_id)
        }else{
            ElMessage({
                message: '添加失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//提交更改环境信息
async function commitChange() {
    var req1 = "?expID=" + envInfo.exp_id
    var req = envInfo.env
    await $api.updateEnv(req, req1).then(res=>{
        if(res.message == "操作成功"){
            envInfo.editVisible = true
            ElMessage({
                message: '修改成功！',
                duration: 1000,
                type: 'success'
            })
            showenv(envInfo.exp_id)
        }else{
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

defineExpose({ showenv })

</script>

