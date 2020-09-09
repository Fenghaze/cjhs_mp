import VueRouter from 'vue-router'
import Index from './components/Index.vue'
import Xlcj from './components/Xlcj.vue'
import Ywlx from './components/Ywlx.vue'
import Bbdw from './components/Bbdw.vue'
import CommonSearch from './components/CommonSearch.vue'

var router = new VueRouter({
    routes:[
        {
            path: '/', 
            component:Index,
            children:[
                
            ]
        },
        {path:'/xlcj', component:Xlcj},
        {path:'/ywlx', component:Ywlx},
        {path:'/bbdw', component:Bbdw},
        {
            path:'/common_search', 
            component:CommonSearch,
        },


    ]
})

 export default router