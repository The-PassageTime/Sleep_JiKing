<template>
    <div class="AllO">
        <div>
            <el-card style="border-radius: 8px"  max-height="700px">
                <el-form style="text-align:left; padding-bottom: 1rem;">
                    <el-input placeholder="只能根据实验名称查询" v-model="data.selectName" style="width:20rem; padding-right: 1rem;"/>
                    <el-button :icon="Search" @click="selectExp">搜索</el-button>
                    <el-button :icon="Plus" @click="data.addVisible = true">添加实验</el-button>
                </el-form>

                <el-table :data="data.expList" border style="width: 100%" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }" >
                    <el-table-column prop="Exp.experiment_id" label="实验编号" width="130" ></el-table-column>
                    <el-table-column prop="Exp.experiment_name" label="实验名称" width="130"></el-table-column>
                    <el-table-column prop="ReaName" label="反应物" width="130">
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
                            <el-button type="primary" @click="viewPhoto(scope.row.Exp.experiment_id)">图片</el-button>
                            <el-button type="primary" @click="changeExp(scope.row.Exp.experiment_id, scope.$index)">修改</el-button>
                            <el-button type="primary" @click="viewItem(scope.row.Exp.experiment_id, scope.$index)">查看反应物</el-button>
                            <el-button type="danger" @click="deleteExp(scope.row.Exp.experiment_id, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>

    <!-- 修改实验信息弹窗 -->
    <el-dialog
        v-model="data.updateVisible"
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

    <!-- 添加实验弹窗，和修改差不多 -->
    <el-dialog
        v-model="data.addVisible"
        title="添加实验"
        width="30%"
        :close-on-click-modal="false"
    >
        <el-form :model="addInfo" label-width="auto" style="margin:20px;" >
            <el-form-item label="实验编号:">
            <el-input v-model.number="addInfo.experiment_id"/>
            </el-form-item>
            <el-form-item label="实验名称:">
            <el-input v-model="addInfo.experiment_name" />
            </el-form-item>
            <el-form-item label="实验时间:">
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
                <el-button type="primary" @click="addExp">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 添加图片抽屉 -->
    <el-drawer v-model="data.addPhotoVisible" direction="rtl">
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
            <!-- <el-button :icon="Plus"></el-button> -->
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
    </el-drawer>

    <el-dialog v-model="data.photoDetailVisible">
    <img :src="data.dialogImageUrl" alt="Preview Image" width="600"/>
    </el-dialog>

    <!-- 查看反应物抽屉 -->
    <el-drawer v-model="data.itemVisible" direction="rtl">
        <template #header>
        <h3>查看实验图片</h3>
        </template>
    </el-drawer>

</template>

<script lang="ts" setup>
import $api from "@/http/index"
import {onMounted,reactive} from "vue";
import { ElMessage } from 'element-plus'
import { Search,Plus,Delete,Upload} from "@element-plus/icons-vue"

let data = reactive({
    allData:[],
    expList:[],
    selectName:"",
    changeIndex: 0,
    updateVisible:false,
    addVisible:false,
    addPhotoVisible:false,
    photoDetailVisible:false,
    emptyVisible:false,
    itemVisible:false,
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
})

//修改实验信息弹窗部分数据保存
let updateInfo = reactive({
    experiment_name:"",
    experiment_id:0,
    conductDate:"",
    remark:""
})

//添加实验信息
let addInfo = reactive({
    experiment_name:"",
    experiment_id:null,
    conductDate:"",
    remark:""
})

//修改反应物信息


//挂载时获取所有实验
onMounted(async () =>{
    await getList_num()
})

//加载所有实验
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

//根据实验名称，模糊查询，未接好，后端无对应接口
async function selectExp() {
    await $api.selectExp(data.selectName).then(res =>{
        console.log("res");
        console.log(res);
        // 显示查询结果
    })
}

//添加实验
async function addExp() {
    await $api.addExp(addInfo).then(res =>{
        // 显示查询结果
        if(res.status == 200){
            //添加成功
            ElMessage({
                message: '添加实验成功！',
                duration: 1000,
                type: 'success'
            })
            data.addVisible = false
            addInfo.remark = ""
            addInfo.experiment_id = null
            addInfo.experiment_name = ""
            addInfo.conductDate = ""
            getList_num()
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

//修改实验，显示弹窗
function changeExp(id:number, index:number) {
    data.changeIndex = index
    data.updateVisible = true
    updateInfo.experiment_id = data.expList[index].Exp.experiment_id
    updateInfo.experiment_name = data.expList[index].Exp.experiment_name
    updateInfo.conductDate = data.expList[index].Exp.conductDate
    updateInfo.remark = data.expList[index].Exp.remark
}

//提交修改实验内容，返回信息没有统一
async function commitChange() {
    console.log("updateInfo")
    console.log(typeof(updateInfo.conductDate))
    console.log(data.expList)

    await $api.updateExp(updateInfo).then((res)=>{
        if(res.data.data.code == "200"){
            //修改成功
            ElMessage({
                message: '修改实验成功！',
                duration: 1000,
                type: 'success'
            })
            data.expList[data.changeIndex].Exp.experiment_id = updateInfo.experiment_id
            data.expList[data.changeIndex].Exp.experiment_name = updateInfo.experiment_name
            data.expList[data.changeIndex].Exp.conductDate = updateInfo.conductDate
            data.expList[data.changeIndex].Exp.remark = updateInfo.remark
            data.updateVisible = false
        }else if(res.data.data.code == "400"){
            //查询失败
            ElMessage({
                message: '修改失败！',
                duration: 1000,
                type: 'error'
            })
        }else{
            console.log(res)
                //查询失败
                ElMessage({
                    message: '修改失败！',
                    duration: 1000,
                    type: 'error'
                })
        }
    })
}

//删除实验
async function deleteExp(id:number, index:number) {
    const req = "/{" + id + "}";
    console.log(req);
    await $api.delExp(req).then(res =>{
        console.log("res");
        console.log(res);
        //如果删除失败，弹窗展示失败，否则成功
        //成功后删除对应的行
        if(res.data.data == "删除成功！"){
            data.expList.splice(index, 1)
            ElMessage({
                message: '删除实验成功！',
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

//图片部分
//查看实验所有图片
async function viewPhoto(experiment_id:any) {
    data.drawerVisible = true
    data.photoExpid = experiment_id
    let req = "?id=" + experiment_id;
    await $api.viewPhoto(req).then(res =>{
        console.log("查看图片的res:");
        console.log(res);
        if(res.data.message == "操作成功"){
            data.urls = res.data.data
            if(data.urls == null){
                data.emptyVisiable = true
            }else{
                data.emptyVisiable = false
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
    data.emptyVisiable = false
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
            data.emptyVisiable = true
        }
    })
}


//反应物部分
//查看反应物，显示抽屉
function viewItem(id:number, index:number){
    console.log(id+index)
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

.demo-image__lazy {
  height: 400px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}


</style>