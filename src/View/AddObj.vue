<template>
    <el-dialog v-model="IsShowAdd" title="添加物品" width="400px" height="800px"  :before-close="handleClose">
        <el-form ref="ruleFormRef" :model="AddObjPro" :rules="rules" label-width="auto" style="margin:20px;" >
            <el-form-item label="物品名称:" prop="name">
            <el-input v-model="AddObjPro.name" />
            </el-form-item>
            <el-form-item label="单&emsp;&emsp;位:" prop="unit">
            <el-input v-model="AddObjPro.unit" />
            </el-form-item>
            <el-form-item label="备&emsp;&emsp;注:" prop="remark">
            <el-input v-model="AddObjPro.remark" />
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
import {reactive,computed, ref} from "vue";
import { ElMessage } from 'element-plus'
import $api from "@/http/index"
import { useStore } from 'vuex'
import type { FormInstance } from 'element-plus'
const store = useStore()
const IsShowAdd = computed(() => store.state.IsShowAdd)
const handleClose = (done: () => void) => {
    store.commit('CloseAdd')
    done();
};

let AddObjPro = reactive({
    name:"",
    remark:"",
    unit:"",
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) {
        console.log('未发送')
        return
    }
    else{
        await formEl.validate((valid) => {
         if (valid) {
            console.log('已发送json')
            addObj();
         } else {
             console.log('提交错误')
             return false
         }
     })
    }
}
/*const props = defineProps({
    addObject: {
        type: Function,
    }
})*/
async function addObj() {
    await $api.addObj(AddObjPro).then(res =>{
        console.log(res);
        // 显示查询结果
        if(res.message == "操作成功"){
            //添加成功
            console.log("进入成功分支")
            ElMessage({
                message: '添加实验成功！',
                duration: 1000,
                type: 'success'
            })
            AddObjPro.remark = ""
            AddObjPro.name=""
            AddObjPro.unit=""
            store.commit('CloseAdd')
            //props.addObject()
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
    name: [{ required: true, message: '请输入物品名字！', trigger: 'blur' },],
    unit: [{ required: true, message: '请输入物品单位！', trigger: 'blur' },],
 })
</script>