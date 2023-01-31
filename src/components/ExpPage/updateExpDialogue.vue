<template>
    <el-dialog
        title="修改实验信息"
        width="30%"
        :close-on-click-modal="false"
    >
        <el-form :model="updateInfo" label-width="auto" style="margin:20px;" >
            <el-form-item label="实验名称:">
                <el-input v-model="updateInfo.experiment_name" />
            </el-form-item>

            <el-form-item label="实验时间:">
                <el-date-picker
                    v-model="updateInfo.conductDate"
                    type="date"
                    style="width: 400px"
                    value-format="YYYY-MM-DD"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="备注:">
                <el-input v-model="updateInfo.remark" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="commitChange">
                    确认提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, defineProps, defineExpose} from "vue";
import { ElMessage } from 'element-plus'
import $api from "@/http/index"

//修改实验信息弹窗部分数据保存
let updateInfo = reactive({
    experiment_name:"",
    experiment_id:0,
    conductDate:"",
    remark:""
})

const props = defineProps({
    changeExpList: {
        type: Function,
    }
})

//修改实验信息
function changeExp(expList:[], id:number, index:number) {
    updateInfo.experiment_id = expList[index].Exp.experiment_id
    updateInfo.experiment_name = expList[index].Exp.experiment_name
    updateInfo.conductDate = expList[index].Exp.conductDate
    updateInfo.remark = expList[index].Exp.remark
}

//提交修改实验内容，返回信息没有统一
async function commitChange() {
    await $api.updateExp(updateInfo).then((res)=>{
        if(res.data.message == "操作成功"){
            //修改成功
            ElMessage({
                message: '修改实验成功！',
                duration: 1000,
                type: 'success'
            })
            // 调用父组件的方法
            props.changeExpList(updateInfo)
        }else{
            //查询失败
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

defineExpose({ changeExp })

</script>

<style>

</style>