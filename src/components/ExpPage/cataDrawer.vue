<template>
    <!-- 查看催化剂抽屉 -->
    <el-drawer direction="rtl" size="40%">
          <template #header>
          <h3>查看催化剂</h3>
          </template>
          <el-form style="text-align:left; padding-bottom: 1rem;">
              <el-button :icon="Plus" @click="addCata">添加催化物</el-button>
          </el-form>
  
          <el-table :data="CataInfo.Cata"  
                  border 
                  :header-cell-style="{ 'text-align': 'center' }"
                  :cell-style= "{textAlign:'center'}" 
                  :row-style="{height: '40px'}">
  
              <el-table-column label="编号">
                  <template v-slot="scope">
                  <span v-if="scope.$index === CataInfo.rowIndex">
                      <el-input v-model.number="scope.row.Rea.CataID" placeholder="ID"/>
                  </span>
                  <span v-else>{{scope.row.Rea.CataID}}</span>
                  </template>
              </el-table-column>
  
              <el-table-column label="名称">
                  <template v-slot="scope">
                  <span v-if="scope.$index === CataInfo.rowIndex">
                      <el-input v-model="scope.row.Rea.reaName" placeholder="名称"/>
                  </span>
                  <span v-else>{{scope.row.Rea.reaName}}</span>
                  </template>
              </el-table-column>
  
              <el-table-column label="数量">
                  <template v-slot="scope">
                  <span v-if="scope.$index === CataInfo.rowIndex">
                      <el-input v-model.number="scope.row.Rea.amount" placeholder="数量"/>
                      /
                      <el-input v-model="scope.row.Unit" placeholder="单位"/>
                  </span>
                  <span v-else>{{scope.row.Rea.amount}}/{{ scope.row.Unit }}</span>
                  </template>
              </el-table-column>
  
              <el-table-column label="备注">
                  <template v-slot="scope">
                  <span v-if="scope.$index === CataInfo.rowIndex">
                      <el-input v-model="scope.row.Rea.remark" placeholder="备注"/>
                  </span>
                  <span v-else>{{scope.row.Rea.remark}}</span>
                  </template>
              </el-table-column>
  
              <el-table-column label="操作" width="140px">
                  <template v-slot="scope">
                      <el-button type="primary" size="small" :icon="Edit" @click="changeCata(scope.$index)" v-if="CataInfo.editVisible || scope.$index !== CataInfo.rowIndex" />
                      <el-button type="primary" size="small" :icon="Finished" @click="commitCataChange(scope.$index)" v-if="CataInfo.finishVisible && scope.$index === CataInfo.rowIndex" />
                      <el-button type="danger" size="small" :icon="Delete" @click="delCata(scope.$index)" ></el-button>
                  </template>
              </el-table-column>
  
          </el-table> 
      </el-drawer>
  </template>
  
  <script lang="ts" setup>
  import {reactive,defineExpose} from "vue";
  import { ElMessage } from 'element-plus'
  import {Plus,Delete,Edit,Finished} from "@element-plus/icons-vue"
  import $api from "@/http/index"
  
  //催化剂信息
  let CataInfo = reactive({
      Cata:[],
      rowIndex:null,
      editVisible:true,
      finishVisible:false,
      exp_id:null,
      add:false,
      test:false
  })
  
  //查看催化剂，显示抽屉
  async function showCata(id:any){
      CataInfo.exp_id = id
      console.log("id")
      console.log(id)
      var req = "/{" + id + "}"
      await $api.getCata(req).then(res=>{
          if(res.data.message == "操作成功"){
              CataInfo.Cata = res.data.data
          }else{
              ElMessage({
                  message: '获取催化剂信息失败！',
                  duration: 1000,
                  type: 'error'
              })
          }
      })
  }
  
  //添加催化剂，多出一行
  function addCata(){
      console.log("thishish")
      CataInfo.Cata.push({Rea:{CataantID:null, reaName:'', amount:null, remark:'', experimentID:CataInfo.exp_id},Unit:""})
      CataInfo.add = true
      CataInfo.editVisible = false
      CataInfo.finishVisible = true
      CataInfo.rowIndex = CataInfo.Cata.length - 1
  }
  
  //点击修改催化剂
  function changeCata(row:number){
      CataInfo.editVisible = false
      CataInfo.finishVisible = true
      CataInfo.rowIndex = row
  }
  
  //提交和更改催化剂 提交催化剂和要求不太符合，将所有都提交一遍
  async function commitCataChange(index:number){
      if(CataInfo.add == true){
          commitAdd(index)
      }else{
          commitChange(index)
      }
  }
  
  //添加催化剂
  async function commitAdd(index:number) {
      var req1 = {
          rea:CataInfo.Cata[index].Rea,
          id:CataInfo.exp_id
      }
      await $api.addCata(req1).then(res=>{
          console.log(res)
          if(res.data.message == "操作成功"){
              CataInfo.editVisible = true
              CataInfo.finishVisible = false
              CataInfo.rowIndex = null
              CataInfo.add = false
              ElMessage({
                  message: '添加成功！',
                  duration: 1000,
                  type: 'success'
              })
          }else{
              ElMessage({
                  message: '添加失败！',
                  duration: 1000,
                  type: 'error'
              })
          }
      })
  }
  
  //更改催化剂
  async function commitChange(index:number) {
      var req = CataInfo.Cata[index].Rea
      await $api.updateCata(req).then(res=>{
          if(res.data.message == "操作成功"){
              CataInfo.editVisible = true
              CataInfo.finishVisible = false
              CataInfo.rowIndex = null
              ElMessage({
                  message: '修改成功！',
                  duration: 1000,
                  type: 'success'
              })
          }else{
              ElMessage({
                  message: '修改失败！',
                  duration: 1000,
                  type: 'error'
              })
          }
      })
  }
  
  //删除催化剂
  async function delCata(index:number){
      var req = {
          id: CataInfo.Cata[index].Rea.experimentID,
          name:CataInfo.Cata[index].Rea.reaName
      }
      await $api.delCata(req).then(res=>{
          if(res.data.message == "操作成功"){
              ElMessage({
                  message: '删除成功！',
                  duration: 1000,
                  type: 'success'
              })
              showCata(req.id)
          }else{
              ElMessage({
                  message: '删除失败！',
                  duration: 1000,
                  type: 'error'
              })
          }
      })
  }
  
  defineExpose({ showCata })
  
  </script>
  
  <style>
  
  </style>