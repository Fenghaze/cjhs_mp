<template>
  <div>
    <!-- 标题 -->
    <div class="scope_title">
      <h1 style="margin-top: 15px;">发布时间查询</h1>
    </div>
    <!-- 选择时间 -->
    <div>
      <el-form  label-width="80px" :model="form" style="margin:10px">
        <el-form-item label="开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.pub_time_start"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.pub_time_end"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 查询结果 -->
    <div style="font-size: large;padding: 1rem; margin-top:50px">
      <b style="float:left">最新</b>
      <el-table :data="$store.state.results" stripe style="width: 100%">
        <el-table-column label="文件名" width="250">
          <template slot-scope="scope">
            <router-link @click.native="show_file(scope.row.id)" v-html="scope.row.name" to></router-link>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a :href="$store.state.base_url +'/file/download/' + scope.row.id">下载</a>
          </template>
        </el-table-column>
      </el-table>
      <pagination :results_len="$store.state.total" :path_name="'xlcj'"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "./subcomponents/Pagination.vue";

export default {
  data() {
    return {
      page: this.$route.query.page || 1, // 页码，默认为 1
      total: 0, // 查询总数
      form: {
        pub_time_start: "", // 开始发布时间
        pub_time_end: "", // 结束发布时间
      },
    };
  },
  components: {
    pagination,
  },
  watch: {
    $route(to, from) {
      if (to.query.page != from.query.page) {
        this.page = to.query.page;
      }
    },
  },
  created() {
    this.$store.commit("getformdata", {
      pub_time_start: "",
      pub_time_end: "",
    });
    this.$store.commit("search", this.page);
  },
  methods: {
    show_file(filename) {
      this.$router.push({
        path: "pdf-preview",
        query: {
          pdf_url: this.$store.state.base_url + "/file/show/" + filename,
        },
      });
    },
    onSubmit() {
      this.$store.commit("getformdata", {
        pub_time_start: this.form.pub_time_start,
        pub_time_end: this.form.pub_time_end,
      });
      this.$store.commit("search", this.page);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/ScopeLevel.css";
</style>
