import { createRouter,createWebHistory } from "vue-router";
import MenuContent from "./View/MenuContent.vue"
import MainPage from "./View/MainPage.vue"
import ObjectPage from "./View/ObjectPage.vue"

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/',component:MenuContent,children:[
            {path:'/MainPage',component:MainPage},
            {path:'/ObjectPage',component:ObjectPage}
        ]},
        
    ]
})

export default router