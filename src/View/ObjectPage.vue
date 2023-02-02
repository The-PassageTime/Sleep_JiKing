<template>
    <div class="AllO">
        <div>
            <el-card style="border-radius: 8px"  max-height="700px">
                <el-form style="text-align:left;padding-bottom: 1rem;">
                    <el-input  placeholder="只能根据实验名称查询" style="width:20rem;padding-right: 1rem;"/>
                    <el-button :icon="Search">Search</el-button>
                    <el-button>增加</el-button>
                </el-form>
                
                <el-form style="text-align:left;padding-bottom: 1rem;">
                    <el-table :data="Alldata.ObjList" border style="width: 100%" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }" >
                        <el-table-column   label="图片" width="160">
                            <el-img  src="/img/Why.png" fit="fill"></el-img>
                        </el-table-column>
                        <el-table-column  prop="name" label="名称" width="160" />
                        <el-table-column  prop="unit" label="单位" width="160" />
                        <el-table-column   label="备注" width="160"/>
                        <el-table-column   label="操作">
                            <el-button></el-button>
                        </el-table-column>
                    </el-table>   
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search} from '@element-plus/icons-vue'
import $api from "@/http/index"
import { onMounted,reactive} from 'vue';
let Alldata =reactive({
    ObjList:[]
})

onMounted( async ()=>{
    await Get_Objlist()
    console.log(Alldata.ObjList)
})

async function Get_Objlist () {
    await $api.All_ObjList().then((res)=>{
        Alldata.ObjList = res.data;
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