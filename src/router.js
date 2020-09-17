import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Xlcj from './components/Xlcj.vue'
import Ywlx from './components/Ywlx.vue'
import Bbdw from './components/Bbdw.vue'
import Fbsj from './components/Fbsj.vue'
import CommonSearch from './components/CommonSearch.vue'

var router = new VueRouter({
    routes:[
        {path: '/', component:Index},// 主页
        {path:'/xlcj', component:Xlcj}, // 效力层级
        {path:'/ywlx', component:Ywlx}, // 业务类型
        {path:'/bbdw', component:Bbdw}, // 颁布单位
        {path:'/fbsj', component:Fbsj}, // 发布时间
        {path:'/common_search', component:CommonSearch},   // 综合查询
        {path:'/pdf-preview', component:()=> import('./components/subcomponents/File.vue')}, // PDF展示界面
        {path:'/comment', component:()=>import('./components/Comment.vue')}     // 反馈意见
    ]
})

 export default router