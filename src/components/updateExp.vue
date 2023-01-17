<template>
    <el-dialog
        v-model="data.dialogVisible"
        title="修改实验信息"
        width="30%"
    >
        <el-form-item label="实验名称">
        <el-input v-model="exp.Exp.experiment_name" />
        </el-form-item>

        <template #footer>
            <span class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary" @click="clickChild">
                    确认提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, defineProps, defineEmits} from "vue";
import { toRaw } from '@vue/reactivity';

const props = defineProps({
    exp:[]
})
let exp = toRaw(props.exp);

let data = reactive({
    dialogVisible : true,
    exp:undefined
})

console.log("data.exp")

console.log(exp)

const emit = defineEmits(['visiable'])
const clickChild = ()=>{
    let param = {
        content:false
    }
    console.log("param")
    console.log(param)
    emit('visiable', param)
}

</script>

<style>

</style>