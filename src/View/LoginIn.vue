
<template>
    <el-dialog v-model="IsShowLogin" title="登&emsp;&emsp;录" width="500px" height="800px"  :before-close="handleClose">
      <div class="Big">
        <div class="One">
          <el-image src="src/assets/black.png" fit="contain" />
        </div>
        <div class="Two">
          <el-form :model="form" label-width="60px" style="padding-right:20px">
        <el-form-item label="账号"  >
          <el-input v-model="form.UId" style="padding-top=2rem"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.UPassword" type="password" show-password /> 
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Submit" style="width:100%">确定</el-button>
        </el-form-item>
        <el-form-item >
        <el-link  @click="FindPass">忘记密码？</el-link>
      </el-form-item>
      </el-form>
        </div>
      </div>
    </el-dialog>
    <FindContent />
  </template>
  <script lang="ts" setup>
  import FindContent from "./FindContent.vue";
  import { computed, ref} from "vue";
  import { useStore } from 'vuex'
  import { getToken } from '../http/index'
  //import $api from "@/http/index"
  import { ElMessage } from 'element-plus'
  import router from "@/routes";
  const store = useStore()
  const IsShowLogin = computed(() => store.state.IsShowLogin)
  const handleClose = (done: () => void) => {
    store.commit('CloseLogin')
    done();
  };
  const form = ref()
  form.value = {
    UId: "",
    UName: "",
    UPassword: "",
  }

  const Submit = async () => {
    var data = {
      uid: form.value.UId,
      passWord: form.value.UPassword,
    }
    var res = (await getToken(data)).data;
    console.log(res.data.token);
    if (res.code== 1001) {
      ElMessage({
        message: "登录成功",
        type: 'success',
      })
      store.commit('SettingUId',res.data.uid)
      store.commit('SettingAAA',res.data.token)
      localStorage["token"] = res.data.token;
      store.commit('CloseLogin')
      router.push("/MenuContent")

    } else {
      ElMessage.error(res.msg)
    }
  }
//function Submit(){}

const FindPass = () => (
  console.log('CloseLogin'),
  store.commit('CloseLogin'),
  store.commit('OpenFind')
)

</script>
<style>
.el-dialog {
  background-color:#3a414e !important;
}
.Big{
  display: flex;
}
.One{
  flex:1;
  height:100%;
}
.Two{
  flex:2;
  
}
.el-dialog__title {
    color: rgb(255, 255, 255)!important;
}

.el-form-item {
  --font-size: 1rem!important;
  margin-bottom: 1.5rem!important;
}
.el-button--primary {
  --el-button-bg-color:#6084a7!important;
  --el-button-outline-color: #54575a!important;
  --el-button-border-color: #54575a!important;
  --el-button-hover-bg-color: #5a7d96!important;
  --el-button-active-bg-color: #75afd1!important;
  --el-button-active-border-color:#6a88dc!important;
}
.el-form-item__label {
  color: aliceblue !important;;
}
</style>
  
  