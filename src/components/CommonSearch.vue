<template>
  <div>
    <!-- 标题 -->
    <div class="search_title">
      <h1 style="margin-top: 15px;">综合查询</h1>
    </div>
    <!-- 综合查询表单 -->
    <div class="search_menu">
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
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 查询结果 -->
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">查询结果</b>
      <el-table :data="$store.state.results" stripe style="width: 100%">
        <el-table-column label="文件名" width="130">
          <template slot-scope="scope">
            <router-link @click.native="show_file(scope.row.id)" v-html="scope.row.name" to></router-link>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="相关内容" width="130"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a :href="$store.state.base_url +'/file/download/' + scope.row.id">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <pagination :results_len="$store.state.total" :path_name="'common_search'"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "./subcomponents/Pagination.vue";
export default {
  data() {
    return {
      width: 100,
      pdfDoc: null,
      pages: 0,

      labelPosition: "right",
      form: {
        title: "", // 查询标题
        content: "", // 查询内容
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
        effect_time_start: "", // 开始生效时间
        effect_time_end: "", // 结束生效时间
        pub_time_start: "", // 开始发布时间
        pub_time_end: "", // 结束发布时间
      },
      page: this.$route.query.page || 1, // 页码，默认为 1
      total: 0, // 查询总数
    };
  },
  /* 实时监听page变化 */
  watch: {
    $route(to, from) {
      if (to.query.page != from.query.page) {
        this.page = to.query.page;
        this.onSubmit();
      }
    },
  },

  methods: {
   
    show_file(filename){
      this.$router.push({
        path: 'pdf-preview',
        query: { pdf_url: this.$store.state.base_url + "/file/show/" + filename },
      });
    },
    onSubmit() {
      this.$store.commit("getformdata", {
        title: this.form.title,
        content: this.form.content, //查询内容
        service_type: this.form.service_type, // 业务类型
        scope: this.form.scope, // 效力层级
        dept: this.form.dept, //颁布单位
        effect_time_start: this.form.effect_time_start,
        effect_time_end: this.form.effect_time_end,
        pub_time_start: this.form.pub_time_start,
        pub_time_end: this.form.pub_time_end,
      });
      // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
      this.$store.commit("search", this.page);
    },
    reset() {
      // 查询成功后，清空表单
      (this.form.title = ""), //查询标题
        (this.form.content = ""), //查询内容
        (this.form.service_type = "全部"), // 业务类型
        (this.form.scope = "全部"), // 效力层级
        (this.form.dept = "全部"), //颁布单位
        (this.form.effect_time_start = ""),
        (this.form.effect_time_end = ""),
        (this.form.pub_time_start = ""),
        (this.form.pub_time_end = "");
    },
  },
  components: {
    pagination,
  },
};
</script>

<style scoped>
@import "../assets/css/search.css";
.iframe {
  width: 100%;
  height: 100%;
  border: 0;
  overflow: hidden;
  box-sizing: border-box;
}
</style>