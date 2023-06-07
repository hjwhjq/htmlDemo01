import {createRouter, createWebHashHistory} from 'vue-router'

import Table_Order from "./components/Table.vue"
import Hello from "./components/Hello.vue"
import Chart from "./components/Chart.vue";
import SettingRules from './components/SettingRules.vue'
import SettingMessages from './components/SettingsMessages.vue'
import Table_Reader from './components/Table_Reader.vue'
import Admin from './admin/Admin.vue'
import Login from './homePage/Login.vue'
import HomePage from './homePage/HomePage.vue'
import CurSeat from './components/CurSeat.vue'
import StuOpinionTable from './homePage/StuOpinionTable.vue'
import StuOperationLof from './homePage/StuOperationLog.vue'
import AdminOperationLog from './homePage/AdminOperationLog.vue'


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/',component: HomePage
        },
        {
            path:'/Login',name:'Login',component:Login
        },
        {
            path: '/Admin',
            component: Admin,
            children:[
                {path: '',component: Hello },//加载为Admin的默认页面
                {path: '/Table_Order',component: Table_Order },
                {path: '/Table_Reader',component:Table_Reader},
                {path: '/SettingRules',component:SettingRules},
                {path: '/Chart',component:Chart},
                {path: '/SettingMessages',component:SettingMessages},
                {path: '/CurSeat',component:CurSeat},
                {path:'/stuopinion', component:StuOpinionTable},
                {path: '/StuOperationLog',component: StuOperationLof},
                {path: '/AdminOperationLog',component: AdminOperationLog}
            ]
        },


    ]
})

export default router;
