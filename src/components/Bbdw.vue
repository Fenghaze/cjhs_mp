<template>
  <div>
    <!-- 标题 -->
    <div class="scope_title">
      <h1 style="margin-top: 15px;">颁布单位查询</h1>
    </div>
    <!-- 效力层级功能按钮 -->
    <div class="scope_menu">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_qgrd" to><img src="../assets/img/qgrd.png" class="grid-img" /></router-link>
            <div align="center">
              <router-link @click.native="search_qgrd" to>全国人大</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_gwy" to>
                <img src="../assets/img/gwy.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_gwy">国务院</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_jtysb" to>
                <img src="../assets/img/jtysb.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_jtysb">交通运输部</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_dffg" to>
            <img src="../assets/img/dffg.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_dffg">地方人大、政府</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_jtysbhsj" to>
            <img src="../assets/img/jtysbhsj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_jtysbhsj">交通运输部海事局</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_cjhwglj" to>
            <img src="../assets/img/cjhwglj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_cjhwglj">长江航务管理局</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_cjhsj" to>
            <img src="../assets/img/cjhsj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_cjhsj">长江海事局</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_jshsj" to>
            <img src="../assets/img/jshsj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_jshsj">江苏海事局</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果 -->
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">查询结果</b>
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
    };
  },
  components: {
    pagination,
  },
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
    search_qgrd() {
      this.$store.commit("getformdata", {
        dept: "全国人大", // 颁布单位
      });
      // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
      this.$store.commit("search", this.page);
    },
    search_gwy() {
      this.$store.commit("getformdata", {
        dept: "国务院",
      });
      this.$store.commit("search", this.page);
    },
    search_jtysb() {
      this.$store.commit("getformdata", {
        dept: "交通运输部",
      });
      this.$store.commit("search", this.page);
    },
    search_dffg() {
      this.$store.commit("getformdata", {
        dept: "地方人大、政府",
      });
      this.$store.commit("search", this.page);
    },
    search_jtysbhsj() {
      this.$store.commit("getformdata", {
        dept: "交通运输部海事局",
      });
      this.$store.commit("search", this.page);
    },
    search_cjhwglj() {
      this.$store.commit("getformdata", {
        dept: "长江航务管理局",
      });
      this.$store.commit("search", this.page);
    },
    search_cjhsj() {
      this.$store.commit("getformdata", {
        dept: "长江海事局",
      });
      this.$store.commit("search", this.page);
    },
    search_jshsj() {
      this.$store.commit("getformdata", {
        dept: "江苏海事局",
      });
      this.$store.commit("search", this.page);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/ScopeLevel.css";
</style>
