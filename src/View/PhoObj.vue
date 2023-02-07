<template>
    <el-drawer direction="rtl" size="550" v-model="IsShowPhoto" :before-close="handleClose">
        <template #header>
        <h3>查看物品图片</h3>
        </template>
        <div >
            <div class="demo-image" v-if="Pho.path=='http://120.26.64.169:80'">
                <el-empty description="暂无添加图片"/>
            </div>
            <div v-else>
                <el-image  :src="Pho.path" fit="fill"></el-image>
                <div>{{ Pho.name }}</div>
                <div>{{ Pho.path }}</div>
                <div>
                    <el-button type="danger" :icon="Delete" circle  @click="delImg()"></el-button>
                    <el-divider border-style="dashed" />
                </div>
            </div>
        <div>
            <el-upload :auto-upload="false"  :limit="1" list-type="picture-card" ref="upload" v-model:file-list="data.ImgUrl" :on-exceed="handleExceed" method>
            <el-icon><Plus /></el-icon>
            <template #tip>
            <div class="form-tips" style="margin-top: 10px" >
                <el-tag type="warning">图片最大上传大小2MB</el-tag>
            </div>
            </template>
            </el-upload>
            <br>
            <el-button type="primary" @click="commitPhoto">提交图片<el-icon class="el-icon--right"><Upload /></el-icon>
            </el-button>
        </div>
        </div>
    </el-drawer>
</template>
<script lang="ts" setup>
import { Upload,Plus,Delete} from "@element-plus/icons-vue"
import $api from "@/http/index"
import { ElMessage } from 'element-plus'
import { genFileId } from 'element-plus'
import { useStore } from 'vuex'
import {computed,defineProps,toRefs,reactive,watch,ref,defineEmits} from "vue";
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { getCurrentInstance} from 'vue'
//const update = getCurrentInstance() as ComponentInternalInstance | null
const { ctx: _this }: any = getCurrentInstance()
const emit = defineEmits(['fun'])
const upload = ref<UploadInstance>()
const store = useStore()
const IsShowPhoto = computed(() => store.state.IsShowPhoto)
const handleClose = (done: () => void) => {
    store.commit('ClosePhoto')
    done();
};
let props = defineProps<{
    Imgfo:{
        name:string,
        unit:string,
        remark:string,
        path:string,
        default:"失败"
    }
}>()
let {Imgfo} =toRefs(props)
let Pho =reactive({
    name:"",
    unit:"",
    remark:"",
    path:"",
})

//监听窗口打开开始
const getShowTask = computed(()=>{
	return store.state.IsShowPhoto;
})
watch(getShowTask,(newVal, oldVal)=>{

    console.log('Photo开始'+{ newVal, oldVal })
    console.log('原来图片url'+Imgfo.value.path);
    Pho.name = Imgfo.value.name;
    Pho.path = Imgfo.value.path;
})

//提交图片
let data = reactive({
    ImgUrl:[],    //图片
})

//上传文件
async function commitPhoto(){
    var urlList=new FormData();
    data.ImgUrl.forEach(function(file){
        urlList.append("item",file.raw)
    })
    let req = "?itemName=" + Pho.name;
    await $api.WcommitPhoto(req,urlList ).then(res =>{
        console.log('上传图片'+res);
        if(res.code=='1001'){
            console.log('成功'+res);
            ElMessage({
                message: '图片增加成功！',
                duration: 1000,
                type: 'success'
            })
            //刷新物品页面
            emit('fun');
            _this.$forceUpdate()
            //清空上传栏
            data.ImgUrl=[];
            console.log('现在的路径'+Imgfo.value.path);
        }
    })
}
//自动替换上一个选中的文件
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

//删除图片
async function delImg(){
    const rep ="?fileName=" + Pho.name;
    await $api.delObjImg(rep).then(res=>{
        console.log('删除了啥'+res.code)
        if(res.message == "操作成功"){
            ElMessage({
                message: '删除成功！',
                duration: 1000,
                type: 'success'
            })

            emit('fun');
            _this.$forceUpdate()
        }else{
            ElMessage({
                message: '删除失败！',
                duration: 1000,
                type: 'error'
        })
    }
    })
}
/*function Jian (Shuru:string,Chart1:string,Chart2:string){
    var arr = new Array();
    var ArryShuRu = Shuru.split("&");
    for(var i=0;i<ArryShuRu.length;i++){
        var paramArr = ArryShuRu[i].split("=");
        for(var j=0;j<paramArr.length;j++){
            var FinArr = paramArr[i].split("/")
            if(FinArr[0]!=Chart1){
                if(FinArr[0]!=Chart2){
                    arr.push(paramArr[i]);
                }
            }
        }
    }
}*/
</script>