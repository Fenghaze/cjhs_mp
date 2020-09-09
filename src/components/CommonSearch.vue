<template>
  <div>
    <div class="title1">
      <h1 style="margin-top: 15px;">综合查询</h1>
    </div>
    <div class="menu1">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="查询标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="查询内容">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.service_type" style="width:100%">
            <el-option v-for="item in form.types" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="效力层级">
          <el-select v-model="form.scope" style="width:100%">
            <el-option v-for="item in form.scopes" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颁布单位">
          <el-select v-model="form.dept" style="width:100%">
            <el-option v-for="item in form.depts" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.effect_time_start"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>至
          <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="form.effect_time_end"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker
            type="date"
            placeholder="选择开始日期"
            v-model="form.pub_time_start"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>至
          <el-date-picker
            type="date"
            placeholder="选择结束日期"
            v-model="form.pub_time_end"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">查询结果</b>
      <el-table :data="results" stripe style="width: 100%">
        <el-table-column label="文件名" width="130">
          <template slot-scope="scope">
            <a
              :href="'http://10.138.105.177:8080/file/show/' + scope.row.id"
              v-html="scope.row.name"
            ></a>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="相关内容" width="130"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a :href="'http://10.138.105.177:8080/file/download/' + scope.row.id">下载</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      form: {
        title: "",
        content: "",
        service_type: "全部", // 业务类型
        scope: "全部", // 效力层级
        dept: "全部", //颁布单位
        types: [
          "全部",
          "综合管理",
          "船舶管理",
          "公司管理",
          "船检管理",
          "船员管理",
          "规费征稽",
          "航海保障",
          "事故调查",
          "通航管理",
          "危防管理",
          "应急搜救",
          "党内法规",
        ], // 业务类型
        scopes: [
          "全部",
          "国际公约",
          "法律",
          "行政法规",
          "地方性法规",
          "部门规章",
          "地方政府规章",
          "规范性文件",
          "其他",
        ], //效力层级
        depts: [
          "全部",
          "全国人大",
          "国务院",
          "交通运输部",
          "地方人大、政府",
          "交通运输部海事局",
          "长江航务管理局",
          "长江海事局",
          "江苏海事局",
        ], //颁布单位
        effect_time_start: "",
        effect_time_end: "",
        pub_time_start: "",
        pub_time_end: "",
      },
      results: [],
      page: 1,
      total: "",
    };
  },
  methods: {
    onSubmit() {
      var that = this;
      let formdata = new FormData();
      formdata.append("title", this.form.title);
      formdata.append("content", this.form.content);
      formdata.append("effect_time_start", String(this.form.effect_time_start));
      formdata.append("effect_time_end", String(this.form.effect_time_end));
      formdata.append("pub_time_start", String(this.form.pub_time_start));
      formdata.append("pub_time_end", String(this.form.pub_time_end));
      if (this.form.service_type == "全部") {
        this.form.service_type = "";
      }
      formdata.append("service_type", this.form.service_type);
      if (this.form.scope == "全部") {
        this.form.scope = "";
      }
      formdata.append("scope", this.form.scope);
      if (this.form.dept == "全部") {
        this.form.dept = "";
      }
      formdata.append("dept", this.form.dept);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data", //以表单传数据的格式来传递 fromdata
        },
      };
      this.axios
        .post("/criteria_query?page=" + that.page, formdata, config)
        .then(function (response) {
          that.results = response.data.fileDTOS;
          that.total = response.data.all_count;
        })
        .catch(function (error) {
          alert(error);
        });
        this.title='',//查询标题
        this.content='',//查询内容
        this.service_type='全部', // 业务类型
        this.file_type='全部',//文件类型
        this.scope='全部',// 效力层级
        this.dept='全部',//颁布单位
        this.effect_time_start='',
        this.effect_time_end='',
        this.pub_time_start='',
        this.pub_time_end=''
    },
  },
};
</script>

<style scoped>
@import "../assets/css/search.css";
</style>