<template>
   <el-dialog
        title="添加实验"
        width="30%"
        :close-on-click-modal="false"
    >
        <el-form ref="ruleFormRef" :model="addInfo" :rules="rules" label-width="auto" style="margin:20px;" >
            <el-form-item label="实验编号:" prop="experiment_id">
                <el-input v-model.number="addInfo.experiment_id"/>
            </el-form-item>
            <el-form-item label="实验名称:" prop="experiment_name">
            <el-input v-model="addInfo.experiment_name" />
            </el-form-item>
            <el-form-item label="实验时间:" prop="conductDate">
            <el-date-picker
                v-model="addInfo.conductDate"
                type="date"
                style="width: 400px"
                value-format="YYYY-MM-DD"
            ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注:">
            <el-input v-model="addInfo.remark" />
            </el-form-item>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, defineProps, ref} from "vue";
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import $api from "@/http/index"

//添加实验信息
let addInfo = reactive({
    experiment_name:"",
    experiment_id:null,
    conductDate:"",
    remark:""
})

const props = defineProps({
    addExpRes: {
        type: Function,
    }
})

//添加实验
async function addExp() {
    console.log('提交成功add')
    await $api.addExp(addInfo).then(res =>{
        // 显示查询结果
        if(res.status == 200){
            //添加成功
            props.addExpRes()
            ElMessage({
                message: '添加实验成功！',
                duration: 1000,
                type: 'success'
            })
            addInfo.remark = ""
            addInfo.experiment_id = null
            addInfo.experiment_name = ""
            addInfo.conductDate = ""
        }else{
            //添加失败，根据返回message显示提示信息
            ElMessage({
                message: '添加失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

const ruleFormRef = ref<FormInstance>()

const rules = reactive({
    experiment_id: [{ required: true, message: '请输入实验编号！', trigger: 'blur' },],
    experiment_name: [{ required: true, message: '请输入实验名称！', trigger: 'blur' },],
    conductDate: [{ required: true, message: '请输入实验日期！', trigger: 'blur' },],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            addExp()
        } else {
            console.log('提交错误')
            return false
        }
    })
}

</script>

<style>

</style>