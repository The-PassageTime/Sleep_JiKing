import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入路由
import router from './routes'
import store from './vuex/store'
import axios from 'axios'
const app = createApp(App)
//挂载
app.use(store)
//createApp(App).mount('#app')
//使用路由
app.use(router)
app.config.globalProperties.$axios = axios
app.use(ElementPlus)
app.mount('#app')