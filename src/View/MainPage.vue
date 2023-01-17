<template>
    <div class="AllO">
        <div>
            <el-card style="border-radius: 8px"  max-height="700px">
                <el-form style="text-align:left; padding-bottom: 1rem;">
                    <el-input placeholder="只能根据实验名称查询" style="width:20rem; padding-right: 1rem;"/>
                    <el-button :icon="Search">Search</el-button>
                </el-form>

                <el-table :data="data.expList" border style="width: 100%" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }" >
                    <el-table-column prop="Exp.experiment_id" label="实验编号" width="130" ></el-table-column>
                    <el-table-column  prop="Exp.experiment_name" label="实验名称" width="130"></el-table-column>
                    <el-table-column  prop="ReaName" label="反应物" width="130">
                        <template v-slot="scope">
                            <div v-if="scope.row.ReaName?.length>1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.ReaName?.length-1" :key="MyN">
                                        {{scope.row.ReaName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.ReaName?.[0]}}
                            </el-tooltip>
                            </div>
                            <div v-else>
                                {{scope.row.ReaName?.[0]}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="ResName" label="生成物" width="130">
                        <template  v-slot="scope">
                            <div v-if="scope.row.ResName?.length>1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.ResName?.length-1" :key="MyN">
                                        {{scope.row.ResName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.ResName?.[0]}}
                            </el-tooltip>
                            </div>
                            <div v-else>
                                {{scope.row.ResName?.[0]}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="cataName" label="催化剂">
                        <template  v-slot="scope">
                            <div v-if="scope.row.cataName?.length>1">
                                <el-tooltip placement="top">
                                <template #content>剩余物品：
                                    <li v-for="MyN in scope.row.cataName?.length-1" :key="MyN">
                                        {{scope.row.cataName?.[MyN]}}
                                    </li>
                                </template>
                                {{scope.row.cataName?.[0]}}
                            </el-tooltip>
                            </div>
                            <div v-else>
                                {{scope.row.cataName?.[0]}}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column  prop="Env.temperature" label="实验环境" width="130"></el-table-column>
                    <el-table-column  prop="Exp.remark" label="备注" width="180"></el-table-column>
                    <el-table-column  prop="Exp.conductDate" label="实验日期" width="130"></el-table-column>
                    <el-table-column  label="操作" width="270">
                        <template #default="scope">
                            <el-button type="primary">图片</el-button>
                            <el-button type="primary" @click="changeExp(scope.row.Exp.experiment_id, scope.$index)">修改</el-button>
                            <el-button type="danger" @click="deleteExp(scope.row.Exp.experiment_id, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>

    <!-- 修改实验信息弹窗 -->
    <el-dialog
        v-model="data.dialogVisible"
        title="修改实验信息"
        width="30%"
    >
        <el-form label-width="auto" style="margin:20px;">
            <el-form-item label="实验名称:">
            <el-input v-model="data.updateInfo.Exp.experiment_name" />
            </el-form-item>

            <el-form-item label="实验时间:">
            <el-input v-model="data.updateInfo.Exp.conductDate" />
            </el-form-item>

            <el-form-item label="备注:">
            <el-input v-model="data.updateInfo.Exp.remark" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button>取消</el-button>
                <el-button type="primary" @click="commitChange">
                    确认提交
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import $api from "@/http/index"
import {onMounted,reactive} from "vue";
import { ElMessage } from 'element-plus'
import { Search } from "@element-plus/icons-vue"

let data = reactive({
    allData:[],
    expList:[],
    updateInfo:0,
    dialogVisible:false
})

//挂载时获取所有实验
onMounted(async () =>{
    await getList_num()
})

async function getList_num() {
    await $api.All_ExeList().then((res)=>{
        data.allData = res.data.data.ExpCount;
        data.expList = res.data.data.ExpSerialList;
        console.log("res");
        console.log(res);
        console.log(data.allData);
        console.log(data.expList);
    })
}

//修改实验
function changeExp(id:number, index:number) {
    data.dialogVisible = true
    data.updateInfo = index
    console.log(data.updateInfo)
}
//提交修改实验内容
async function commitChange() {
    
}

//删除实验
async function deleteExp(id:number, index:number) {
    const req = "?id=" + id;
    await $api.delExp(req).then(res =>{
        console.log("res");
        console.log(res);
        //如果删除失败，弹窗展示失败，否则成功
        //成功后删除对应的行
        data.expList.splice(index, 1);
        ElMessage({
            message: '删除实验成功！',
            duration: 1000,
            type: 'success'
        })
    })
}

</script>

<style>
.AllO{
    height: 800px;
    padding: 1rem 0.85rem 1.5rem 0.85rem;
    background-image: url(../assets/black.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.el-table-column{
    align:"center";
    header-align:"center"
}

</style>