<template>
  <div class="big">
    <div class="Photo">
      </div>
      <div class="Sleep">
          <el-row>
              <el-col >
                  <ul v-if="!store.state.UId" class="ul-1">
                      <li  @click="OpenLogin">
                          <el-link :underline="false" class="Rema_link">登录</el-link>
                      </li>
                  </ul>
                  <ul v-else class="ul-1">
                       <li >
                          <el-link :underline="false">{{ store.state.UId }}</el-link>
                      </li>
                      <li  @click="LoginOut">
                          <el-link :underline="false">注销</el-link>
                      </li>
                  </ul>
              </el-col>
          </el-row>
      </div>
  </div>
  <LoginIn />
  <ResigsterContent />
</template>
<script lang="ts" setup>
//import {userStore} from 'vuex'

import LoginIn from './LoginIn.vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
//import { routeLocationKey } from 'vue-router';
const store = useStore()
//import store from '@/vuex/store';

const OpenLogin = () => {
  store.commit('OpenLogin')
}


const LoginOut = () => {
  localStorage.removeItem('UId');
  store.commit('SettingUId', '')
  router.push('/MainPage')
}
</script>

<style lang="scss">
.big {
  display: flex;
  position: relative;
  background-color: rgb(33, 35, 41);
  color: rgb(203, 203, 211);
}
.Photo {
  flex:4;
}

.Sleep {
  flex: 8;
  height: 3.8rem;

}
.ul-1 {
  flex: 8;
  list-style: none;
  padding-left: 80%;
  padding-top: 2rem;
  font-size: medium;
  font-family:_GB2312 KaiTi_GB2312;

  li {
      float: left;
      margin-left: 20px;
  }
}

.el-link:hover {
  //color: #00ffff !important;
  --el-link-font-size: 1600 !important;
  --el-link-font-weight: 800 !important;
  --el-link-hover-text-color: rgb(246, 251, 189) !important;
  --el-link-disabled-text-color: rgb(42, 153, 94) !important;
  --el-link-text-color: rgb(234, 216, 166) !important;
}

.Rema_link{
  font-size: large;
}

.el-link {
  font-size: 1600 !important;
}

.el-link {
    --el-link-font-size: 1200 !important;
    --el-link-font-weight: 600 !important;
    --el-link-text-color:  rgb(211, 221, 211) !important;
    --el-link-hover-text-color: var(--el-color-primary);
    --el-link-disabled-text-color: var(--el-text-color-placeholder);
}
</style>