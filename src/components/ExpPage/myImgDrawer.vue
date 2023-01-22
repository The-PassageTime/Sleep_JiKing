<template>
  <el-drawer direction="rtl">
        <template #header>
        <h3>查看实验图片</h3>
        </template>

        <div class="demo-image">
            <div v-for="url in data.urls" :key="url" class="block">
                <el-image style="width: 300px" :src="url" fit="fill"></el-image>
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
                <el-tag type="warning">最多上传5张，最大上传大小2MB</el-tag>
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
    urls: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
        'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
        'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
    ],  
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
        console.log("查看图片的res:");
        console.log(res);
        if(res.data.message == "操作成功"){
            data.urls = res.data.data
            if(data.urls == null){
                data.emptyVisible = true
            }else{
                data.emptyVisible = false
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

//图片超过限制数量
function handlePictureExceed(){
    ElMessage({
        message: '一次最多上传8个图片！',
        duration: 1000,
        type: 'error'
    })
}
//提交图片
async function commitPhoto(){
    // 取出文件的url
    data.fileList.forEach(function(file){
        if(data.urlList == null){
            data.urlList = [file.url.slice(5,)]
        }else{
            data.urlList.push(file.url.slice(5,))
        }
    })
    //提交图片，操作失败
    let req = "?id=" + data.photoExpid
    await $api.commitPhoto(req, data.urlList).then(res =>{
        console.log(res)
        console.log("提交图片的res")
        data.fileList = []
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
        console.log("删除图片的res：")
        console.log(res)
        for (let i=0; i<data.urls.length; i++){
            if(data.urls[i] == url){
                data.urls.splice(i,1)
            }
        }
        if(data.urls == null){
            data.emptyVisible = true
        }
    })
}

defineExpose({ viewPhoto })

</script>

<style>

</style>