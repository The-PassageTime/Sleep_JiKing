<template>
    
    <div class="All">
        <div >
            <div   mode="horizontal"  class="Main_menu">
                <div class="item_Rema">实验编号</div>
                <div class="item_Rema" >实验名称</div>
                <div class="item_Rema" >反应物</div>
                <div class="item_Rema" >生成物</div>
                <div class="item_Rema" >催化剂</div>
                <div class="item_Rema" >实验环境</div>
                <div class="item_Rema" >备注</div>
                <div class="item_Rema" >实验日期</div>
            </div>
            <div>
                <ul v-infinite-scroll class="infinite-list">
                    <li v-for="i in ExpList" :key="i" class="infinite-list-item">
                        <div class="flex_menu">
                            <div class="show_box">{{i.Env.envConditionID}}</div>
                            <div class="show_box">{{i.Exp.experiment_name}}</div>
                            <div class="show_box">
                                <el-tooltip placement="top">
                                    <template #content>剩余物品：
                                            <li v-for="MyL in i.ReaName?.length-1" :key="MyL">
                                                {{i.ReaName?.[MyL]}}
                                            </li >
                                    </template>
                                    {{i.ReaName?.[0]}}
                                </el-tooltip>
                            </div>
                            <div class="show_box">
                                <el-tooltip placement="top">
                                    <template #content>剩余物品：
                                            <li v-for="MyM in i.ResName?.length-1" :key="MyM">
                                                {{i.ResName?.[MyM]}}
                                            </li >
                                    </template>
                                    {{i.ResName?.[0]}}
                                </el-tooltip>
                            </div>
                            <div class="show_box">
                                <el-tooltip placement="top">
                                    <template #content>剩余物品：
                                            <li v-for="MyN in i.cataName?.length-1" :key="MyN">
                                                {{i.cataName?.[MyN]}}
                                            </li >
                                    </template>
                                    {{i.cataName?.[0]}}
                                </el-tooltip>
                            </div>
                            <div class="show_box">{{i.Env.temperature}}</div>
                            <div class="show_box">{{i.Exp.remark}}</div>
                            <div class="show_box">{{i.Exp.conductDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {All_ExeList} from '../http/index'
import { onMounted,ref } from "vue";
const All_data =ref()
onMounted(async () =>{
    await getList_num()
})

async function getList_num() {
    await All_ExeList().then((res)=>{
        All_data.value = res.data.data.ExpCount;
        ExpList.value = res.data.data.ExpSerialList;
        // console.log(res);
        //console.log(All_data.value);
        console.log(ExpList.value);
        ExpList.value.forEach( value => {
            console.log(value.Env.envConditionID);
        })
        ExpList.value.forEach( value => {
            console.log(value.ReaName.length);
        })

    })
}
const ExpList = ref<any[]>([])

</script>

<style>
.flex_menu{
    width: 1492px;
    height:70px;
    display: flex;

}
.show_box{
    
    position: relative;
    border-left: 2px solid rgba(153, 163, 172,0.9);
    flex: 8;
    line-height: 70px;
    color: rgb(192, 246, 246);
    font-size: large;
}
.All{
    height: 800px;
    padding: 1rem 0.85rem 1.5rem 0.85rem;
    background-image: url(../assets/black.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.Main_menu{
    height:3rem;
    padding-left:2rem;
    padding-right: 1rem;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 2rem;
    display: flex;
    vertical-align: middle;
}

.item_Rema{
    font-size: 1.2rem;
    flex: 8;
}
/*可以滚动并不超出div盒子3要素
1. 明确定义盒子大小
2. 声明竖向滚动条属性scroll;
3. 声明子style .xxxx::-webkit-scrollbar {
    display: none;
}
*/
.My_list{
  height: 500px;
  padding-left: 0;
  overflow-y: scroll;
  overflow-x: scroll;
}
.infinite-list {
  height: 730px;
  padding-left: 0;
  overflow-y: scroll;
}
.My_list::-webkit-scrollbar {
    display: none;
}
.infinite-list::-webkit-scrollbar {
    display: none;
}
.infinite-list .infinite-list-item {
  padding-top: 6px;
  padding-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background:rgba(71, 72, 77, 0.9);
  color:rgba(192, 198, 210, 0.9);
  margin-bottom: 0.4rem;
}
.My_list .infinite-list-item{
    height: 10px;
}
</style>