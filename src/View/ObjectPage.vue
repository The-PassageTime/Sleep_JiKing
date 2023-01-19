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
                    <el-table  border style="width: 100%" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }" >
                        <el-table-column fixed  label="图片" width="160">
                            图片本体<el-button>删除</el-button>
                        </el-table-column>
                        <el-table-column fixed  label="名称" width="160" />
                        <el-table-column fixed  label="单位" width="160" />
                        <el-table-column fixed  label="备注" width="160"/>
                        <el-table-column fixed  label="操作">
                            <el-button>上传</el-button>
                        </el-table-column>
                    </el-table>   
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Search} from '@element-plus/icons-vue'
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