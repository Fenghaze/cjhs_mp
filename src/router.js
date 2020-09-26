import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Xlcj from './components/Xlcj.vue'
import Ywlx from './components/Ywlx.vue'
import Bbdw from './components/Bbdw.vue'
import Fbsj from './components/Fbsj.vue'
import CommonSearch from './components/CommonSearch.vue'

var router = new VueRouter({
    //base:'/mp',
    routes: [
        { path: '/', component: Index, meta: { title: '法律法规服务系统' } },// 主页
        { path: '/xlcj', component: Xlcj, meta: { title: '效力层级查询' } }, // 效力层级
        { path: '/ywlx', component: Ywlx, meta: { title: '业务类型查询' } }, // 业务类型
        { path: '/bbdw', component: Bbdw, meta: { title: '颁布单位查询' } }, // 颁布单位
        { path: '/fbsj', component: Fbsj, meta: { title: '发布时间查询' } }, // 发布时间
        { path: '/common_search', component: CommonSearch, meta: { title: '综合查询' } },   // 综合查询
        { path: '/pdf-preview', component: () => import('./components/subcomponents/File.vue') }, // PDF展示界面
        { path: '/comment', component: () => import('./components/Comment.vue'), meta: { title: '意见反馈' } }     // 反馈意见
    ]
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
export default router