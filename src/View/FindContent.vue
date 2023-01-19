<template>
    <el-dialog v-model="IsShowFind" title="找回密码" width="600px" :before-close="handleClose">
    <div class="Big">
      <div class="One1">
        <el-image src="/images/X3.png" fit="contain" />
      </div>
      <div class="Two2">
        <el-form :model="form" >
    <el-form-item label="需找回账号" stylr="padding-left:2rem">
            <el-input v-model="form.UId" style="width :70%;padding-right: 15px;" ></el-input>
            <el-button >发送</el-button>
          </el-form-item>
    <el-form-item label="验证码&emsp;&emsp;">
            <el-input v-model="form.UId" style="width :70%;padding-right: 15px;" ></el-input>
            <el-button>确认</el-button>
          </el-form-item>
          <el-form-item >
          <el-link  @click="BackLogin">返回登录</el-link>
        </el-form-item>
    </el-form>
      </div>
    </div>
    
    </el-dialog>
    
    </template>
    
    <script lang="ts" setup>
    import { useStore } from 'vuex'
    import { computed, ref } from "vue";
    //import { Find } from '../http/index'
    const store = useStore()
    const IsShowFind = computed(() => store.state.IsShowFind)
    const handleClose = (done: () => void) => {
      store.commit('CloseFind')
      done();
    };
    /*const Check = async () => {
       var data = {
        id: form.value.UId,
      }
     //var res = (await Find(data)).data;
    }*/
    const form = ref()
    form.value = {
      UId: "",
      UCheck: "",
      UPassword: "",
    }
    const BackLogin = () => (
    store.commit('CloseFind'),
    store.commit('OpenLogin')
  )
    </script>
    <style>
    .One1{
      display: 1;
    }
    .Two2{
      display: 4;
      padding-left: 4rem;
      padding-top: 1rem;
    }
  </style>