<template>
  <div>
    <!-- 标题 -->
    <div class="scope_title">
      <h1 style="margin-top: 15px;">效力层级查询</h1>
    </div>
    <!-- 效力层级功能按钮 -->
    <div class="scope_menu">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_gjgy" to>
            <img src="../assets/img/gjgy.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link @click.native="search_gjgy" to>国际公约</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_fl" to>
            <img src="../assets/img/fl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_fl">法律</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_xzfg" to>
            <img src="../assets/img/xzfg.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_xzfg">行政法规</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_dfxfg" to>
            <img src="../assets/img/dfxfg.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_dfxfg">地方性法规</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_bmgz" to>
            <img src="../assets/img/bmgz.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_bmgz">部门规章</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_dfzfgz" to>
            <img src="../assets/img/dfzfgz.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_dfzfgz">地方政府规章</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_gfxwj" to>
            <img src="../assets/img/gfxwj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_gfxwj">规范性文件</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_others" to>
            <img src="../assets/img/other.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_others">其他</router-link>
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
    search_gjgy() {
      this.$store.commit("getformdata", {
        scope: "国际公约", // 效力层级
      });
      // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
      this.$store.commit("search", this.page);
    },
    search_fl() {
      this.$store.commit("getformdata", {
        scope: "法律",
      });
      this.$store.commit("search", this.page);
    },
    search_xzfg() {
      this.$store.commit("getformdata", {
        scope: "行政法规",
      });
      this.$store.commit("search", this.page);
    },
    search_dfxfg() {
      this.$store.commit("getformdata", {
        scope: "地方性法规",
      });
      this.$store.commit("search", this.page);
    },
    search_bmgz() {
      this.$store.commit("getformdata", {
        scope: "部门规章",
      });
      this.$store.commit("search", this.page);
    },
    search_dfzfgz() {
      this.$store.commit("getformdata", {
        scope: "地方政府规章",
      });
      this.$store.commit("search", this.page);
    },
    search_gfxwj() {
      this.$store.commit("getformdata", {
        scope: "规范性文件",
      });
      this.$store.commit("search", this.page);
    },
    search_others() {
      this.$store.commit("getformdata", {
        scope: "其他",
      });
      this.$store.commit("search", this.page);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/ScopeLevel.css";
</style>
