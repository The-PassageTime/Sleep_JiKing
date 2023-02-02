<template>
  <el-drawer direction="rtl" size="550">
        <template #header>
        <h3>查看实验图片</h3>
        </template>

        <div class="demo-image">
            <div v-for="url in data.urls" :key="url" class="block">
                <el-image  :src="url" fit="fill"></el-image>
                <div>
                    <el-button type="danger" :icon="Delete" circle  @click="delImg(url)"></el-button>
                    <el-divider border-style="dashed" />
                </div>
            </div>
            <el-empty description="暂无添加图片" v-if="data.emptyVisible"/>
        </div>
        <div>
            <el-upload
                :auto-upload="false"
                v-model:file-list="data.fileList"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-exceed="handlePictureExceed"
            >
            <el-icon><Plus /></el-icon>
            <template #tip>
            <div class="form-tips" style="margin-top: 10px" >
                <el-tag type="warning">图片最大上传大小2MB</el-tag>
            </div>
            </template>
            </el-upload>
                <br>
                <el-button type="primary" @click="commitPhoto">
                提交图片<el-icon class="el-icon--right"><Upload /></el-icon>
                </el-button>
        </div>

        <el-dialog v-model="data.photoDetailVisible">
        <img :src="data.dialogImageUrl" alt="Preview Image" width="600"/>
        </el-dialog>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import $api from "@/http/index"
import {reactive, defineExpose} from "vue";
import { Upload,Delete,Plus} from "@element-plus/icons-vue"

let data = reactive({
    dialogImageUrl:"",
    fileList: [],    //图片列表
    urlList:[],
    urls: [],  
    photoExpid:null,
    limit: 6,  //上传图片的数量
    dialogVisibles: false,  //控制浏览图片的对话框显示隐藏
    hideUpload: false,   // 判断是否隐藏上传按钮
    isAdd: true,   //判断对应的操作
    emptyVisible:false,
    photoDetailVisible:false,
})

//查看实验所有图片
async function viewPhoto(experiment_id:any) {
    data.photoExpid = experiment_id
    let req = "?id=" + experiment_id;
    await $api.viewPhoto(req).then(res =>{
        if(res.message == "操作成功"){
            data.urls = []
            if(res.data !== null){
                for(let i = 0; i < res.data.length; i++) {
                    let url = "http://120.26.64.169:80" + res.data[i]
                    data.urls.push(url)
                }
                data.emptyVisible = false
            }else{
                data.emptyVisible = true
            }
        }else{
            ElMessage({
                message: '获取实验图片失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//点击图片放大查看
function handlePictureCardPreview(uploadFile){
    data.dialogImageUrl = uploadFile.url
    data.photoDetailVisible = true
}

//图片超过限制数量,删除了此项功能
function handlePictureExceed(){
    ElMessage({
        message: '一次最多上传6个图片！',
        duration: 1000,
        type: 'error'
    })
}

//提交图片
async function commitPhoto(){
    var urlList=new FormData();
    data.fileList.forEach(function(file){
        urlList.append("exp",file.raw)
    })
    //提交图片
    let req = "?id=" + data.photoExpid
    await $api.commitPhoto(req, urlList).then(res =>{
        data.fileList = []
        data.urlList = []
        if(res.message == null){
            data.fileList = []
            data.urlList = []
        }
    })
    data.emptyVisible = false
    //提交后重新加载实验图片
    viewPhoto(data.photoExpid)
}

//删除图片
async function delImg(url){
    var imgname = url.split("/")
    imgname.reverse()
    //实验id和img名字
    const req = "?id=" + data.photoExpid + "&fileName=" + imgname[0];
    await $api.delPhoto(req).then(res=>{
        if(res.message == "操作成功"){
            for (let i=0; i<data.urls.length; i++){
                if(data.urls[i] == url){
                    data.urls.splice(i,1)
                }
            }
            if(data.urls == null){
                data.emptyVisible = true
            }
            ElMessage({
                message: '删除成功！',
                duration: 1000,
                type: 'success'
            })
        }else{
            ElMessage({
                message: '删除失败！',
                duration: 1000,
                type: 'error'
            })
        }
        
    })
}

defineExpose({ viewPhoto })

</script>

<style>

</style>