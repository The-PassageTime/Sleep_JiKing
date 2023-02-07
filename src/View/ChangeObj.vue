<template>
    <el-dialog v-model="IsShowChange" title="修改物品" width="500px" height="800px"  :before-close="handleClose">
        <el-form ref="ruleFormRef" :model="UpCha"  label-width="auto" style="margin:20px;" >
            <el-form-item label="物品名称:" prop="name">
            <el-input v-model="UpCha.name" />
            </el-form-item>
            <el-form-item label="单&emsp;&emsp;位:" prop="unit">
            <el-input v-model="UpCha.unit" />
            </el-form-item>
            <el-form-item label="备&emsp;&emsp;注:" prop="remark">
            <el-input v-model="UpCha.remark" />
            </el-form-item>
        </el-form>
        <template #footer>
             <span class="dialog-footer">
                 <el-button type="primary" @click="WW">确认修改</el-button>
             </span>
         </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import {computed,defineProps,toRefs,watch,reactive,ref} from "vue";
import { useStore } from 'vuex'
import $api from "@/http/index"
const store = useStore()
const IsShowChange = computed(() => store.state.IsShowChange)
const handleClose = (done: () => void) => {
    store.commit('CloseChange')
    done();
};

let UpCha = reactive({
    name:"",
    unit:"",
    remark:"",
    path:"",
})
let props = defineProps<{
    info:{
        name:string,
        unit:string,
        remark:string,
        path:string,
        default:"失败"
    }
}>()
let {info} =toRefs(props)
let OldName = ref("");
const getShowTask = computed(()=>{
	//返回的是ref对象
	return store.state.IsShowChange;
})

watch(getShowTask,(newVal, oldVal)=>{
    console.log('Change开始'+{ newVal, oldVal })
    OldName.value = info.value.name
    UpCha.name = info.value.name;
    UpCha.unit = info.value.unit;
    UpCha.remark = info.value.remark;
    UpCha.path = info.value.path;
})

async function WW() {
    var req = "?name=" + OldName.value;
    await $api.updateObj(req,UpCha).then(res=>{
        if(res.message == "操作成功"){
            //修改成功
            ElMessage({
                message: '修改实验成功！',
                duration: 1000,
                type: 'success'
            })
            store.commit('CloseChange')
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
</script>