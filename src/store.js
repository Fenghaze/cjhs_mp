import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


Vue.use(Vuex)
var store = new Vuex.Store({
    state: {
        base_url: "http://cjhsflfg.cn:8080/",  // 后台API接口

        results: [],    //查询结果
        total: 0,       // 查询总数

        title: "", // 查询标题
        content: "", // 查询内容
        service_type: "全部", // 业务类型
        scope: "全部", // 效力层级
        dept: "全部", //颁布单位
        effect_time_start: "", // 开始生效时间
        effect_time_end: "", // 结束生效时间
        pub_time_start: "", // 开始发布时间
        pub_time_end: "", // 结束发布时间
    },
    mutations: {
        search(state, page) {
            let formdata = new FormData();
            formdata.append('title', state.title);
            formdata.append('content', state.content);
            formdata.append('effect_time_start', String(state.effect_time_start));
            formdata.append('effect_time_end', String(state.effect_time_end));
            formdata.append('pub_time_start', String(state.pub_time_start));
            formdata.append('pub_time_end', String(state.pub_time_end));
            if (state.service_type == '全部') { state.service_type = '' }
            formdata.append('service_type', state.service_type);
            if (state.scope == '全部') { state.scope = '' }
            formdata.append('scope', state.scope);
            if (state.dept == '全部') { state.dept = '' }
            formdata.append('dept', state.dept);
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data", //以表单传数据的格式来传递 fromdata
                },
            };
            axios.post("/criteria_query?page=" + page, formdata, config).then(function (response) {
                state.results = response.data.fileDTOS;
                state.total = response.data.all_count;
            })
                .catch(function (error) {
                    alert(error);
                });
            /* state.title = ''
            state.content = ''
            state.service_type = '全部'
            state.scope = '全部'
            state.dept = '全部'
            state.effect_time_start = ''
            state.effect_time_end = ''
            state.pub_time_start = ''
            state.pub_time_end = '' */
        },
        /* 获取表单数据 */
        getformdata(state, data) {
            state.title = data.title || ''
            state.content = data.content || ''
            state.service_type = data.service_type || ''
            state.scope = data.scope || ''
            state.dept = data.dept || ''
            state.effect_time_start = data.effect_time_start || ''
            state.effect_time_end = data.effect_time_end || ''
            state.pub_time_start = data.pub_time_start || ''
            state.pub_time_end = data.pub_time_end || ''
        },
    }
})
export default store
