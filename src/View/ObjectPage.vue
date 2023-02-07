<template>
    <div class="AllO">
        <div>
            <el-card style="border-radius: 8px"  max-height="700px">
                <el-form style="text-align:left;padding-bottom: 1rem;">
                    <el-input  placeholder="只能根据实验名称查询" style="width:15rem;padding-right: 1rem;" v-model="Alldata.input" clearable/>
                    <el-button :icon="Search" @click="SearchObj">搜索</el-button>
                    <el-button :icon="Plus" @click="OpenAdd"></el-button>
                    <el-button :icon="Refresh" @click="BBC"></el-button>
                </el-form>
                
                <el-form style="text-align:left;padding-bottom: 1rem;">
                    <el-table :data="Alldata.ObjList" border style="width: 100%" height="700px" :row-style="{height: '50px'}" :header-row-style="{height:'60px'}"
                :cell-style= "{textAlign:'center'}" :header-cell-style="{ 'text-align': 'center' }">
                        <el-table-column   label="图片" width="200">
                            <template #default="scope">
                                <el-image  :src="Alldata.url[scope.$index]" fit="fill"></el-image>
                            </template>   
                        
                        </el-table-column>
                        <el-table-column  prop="name" label="名称" width="160" />
                        <el-table-column  prop="unit" label="单位"  />
                        <el-table-column  prop="remark" label="备注" width="320"/>
                        <el-table-column   label="操作" width="400">
                            <template #default="scope">
                            <el-button type="danger" :icon="Delete" @click="WeiDelete(scope.row.name)">删除</el-button>
                            <el-button type="primary"  :icon="Picture" @click="ShowImg(scope.row.name,Alldata.url[scope.$index],scope.row.have)">添加图片</el-button>
                            <el-button type="primary"  :icon="DocumentAdd" @click="Change(scope.row.name,scope.row.unit,scope.row.remark)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>   
                </el-form>
            </el-card>
        </div>
    </div>
    
    <ChangeObj :info="AAc"/>
    <AddObj />
    <PhoObj :Imgfo="AAc" @fun="BB()"/>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import AddObj from './AddObj.vue';
import ChangeObj from './ChangeObj.vue';
import PhoObj from './PhoObj.vue';
import { useStore } from 'vuex'
import { Search,Plus,Refresh,Delete,DocumentAdd,Picture} from "@element-plus/icons-vue"
import $api from "@/http/index"
import { onMounted,reactive,watch,computed} from 'vue';
const store = useStore()
let Alldata =reactive({
    ObjList:[
        {
            name:"",
            unit:"",
            remark:"",
            path:"",
            have:"",
        }
    ],
    input:"",
    changeIndex:0,
    url:[],
})

//刷新不带输入框
async function BB() {
    console.log("我刷新了")
    Get_Objlist();
}

onMounted( async ()=>{
    await Get_Objlist()
})
//得到整体页面
async function Get_Objlist () {
    await $api.All_ObjList().then((res)=>{
        Alldata.ObjList.length=0;
        Alldata.url.length=0;
        // console.log('我清空了数组长度')
        Alldata.ObjList = res.data;
        for(let i = 0; i < res.data.length; i++) {
            //console.log(res.data[i].name+'  ssss   '+ res.data[i].path)
            let xx = "http://120.26.64.169:80" + res.data[i].path + "?id=" + Number(Date.now());
            Alldata.url.push(xx)
        }
    })
}
//传给子组件的参数
const AAc = reactive({
    name:'',
    unit:"",
    remark:"",
    path:"",
    have:Boolean,
})

//模糊查询
async function SearchObj() {
    let req = "?keyWord=" + Alldata.input
    await $api.selectObj(req).then(res =>{
        if(res.message == "操作成功"){
            // 显示查询结果
            Alldata.ObjList = res.data
        }else{
            ElMessage({
                message: '查询失败！',
                duration: 1000,
                type: 'error'
            })
        }
    })
}

//刷新带输入框
function BBC(){
    BB();
    Alldata.input = "";
}
//删除
async function WeiDelete(name:any) {

    const rep ="?name=" + name + "&fileName=" + name;
    await $api.delObj(rep).then(res=>{
        if(res.message == "操作成功"){
            ElMessage({
                message: '删除成功！',
                duration: 1000,
                type: 'success'
            })
            BB()
        }else{
            ElMessage({
                message: '删除失败！',
                duration: 1000,
                type: 'error'
        })
    }
    })
}
const getShowTask = computed(()=>{
	//返回的是ref对象
	return store.state.IsShowAdd;
})
//添加物品
const OpenAdd = () => {
  store.commit('OpenAdd')
  watch(getShowTask,(newVal, oldVal)=>{
    BB();
    console.log('AddCont已经发生变化'+{ newVal, oldVal })
  })
}

//修改物品
const getChageState = computed(()=>{
	return store.state.IsShowChange;
})

const getShowImg = computed(()=>{
	//返回的是ref对象
	return store.state.IsShowPhoto;
})

const ShowImg = (ObjN:string,Img:string,Have:any) => {
    AAc.name =  ObjN;
    AAc.path =  Img;
    AAc.have =  Have;
    store.commit('OpenPhoto')
    watch(getShowImg,(nv,ov)=>{
        BB();
        console.log(nv,ov);
    })
}


const NewImg=(N:string,U:string,R:string)=>{
    AAc.name = N;
    AAc.unit = U;
    AAc.remark = R;
}
//修改物品
const Change=(N:string,U:string,R:string)=>{
    NewImg(N,U,R);
    store.commit('OpenChange')
    watch(getChageState,(nv,ov)=>{
        BB();
        console.log(nv,ov);
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