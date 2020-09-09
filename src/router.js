import VueRouter from 'vue-router'
import Index from './Index.vue'

var router = new VueRouter({
    routes:[
        {
            path: '/', 
            component:Index,
            children:[
                
            ]
        },

    ]
})

 export default router