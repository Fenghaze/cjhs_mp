<template>
  <div>
    <!-- 标题 -->
    <div class="service-type_title">
      <h1 style="margin-top: 15px;">业务类型查询</h1>
    </div>
    <!-- 效力层级功能按钮 -->
    <div class="service-type_menu">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_cbgl" to>
            <img src="../assets/img/cbgl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link @click.native="search_cbgl" to>船舶管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_gsgl" to>
            <img src="../assets/img/gsgl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_gsgl">公司管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_cjgl" to>
            <img src="../assets/img/cjgl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_cjgl">船检管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_cygl" to>
            <img src="../assets/img/cygl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_cygl">船员管理</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/gfgl.png" class="grid-img" />
            <div align="center">
              <router-link to @click.native="search_gfgl">规费管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/hhbz.png" class="grid-img" />
            <div align="center">
              <router-link to @click.native="search_hhbz">航海保障</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/wfgl.png" class="grid-img" />
            <div align="center">
              <router-link to @click.native="search_wfgl">危防管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/thgl.png" class="grid-img" />
            <div align="center">
              <router-link to @click.native="search_thgl">通航管理</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_sgdc" to>
            <img src="../assets/img/sgdc.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_sgdc">事故调查</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_zhgl" to>
            <img src="../assets/img/zhgl.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_zhgl">综合管理</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link @click.native="search_yjsj" to>
            <img src="../assets/img/yjsj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_yjsj">应急搜救</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link @click.native="search_dnfg" to>
            <img src="../assets/img/dnfg.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to @click.native="search_dnfg">党内法规</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果 -->
    <div style="font-size: large;padding: 1rem" v-if="$store.state.total">
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
    <pagination :results_len="$store.state.total" :path_name="'ywlx'" :search_type="service"></pagination>

    </div>
  </div>
</template>

<script>
import pagination from "./subcomponents/Pagination.vue";
export default {
  data() {
    return {
      page: 1, // 页码，默认为 1
      total: 0, // 查询总数
      service:''
    };
  },
  components: {
    pagination,
  },
  beforeRouteLeave (to, from, next) {
    this.busy = true
    this.$store.state.results = []
    this.$store.state.total = 0
    next()
  },
  methods: {
    show_file(filename){
      this.$router.push({
        path: 'pdf-preview',
        query: { pdf_url: this.$store.state.base_url + "/file/show/" + filename },
      });
    },
    search_cbgl() {
      this.service = "船舶管理"
      this.$store.commit("getformdata", {
        service_type: "船舶管理", // 业务类型
      });
      // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
      this.$store.commit("search", this.page);
    },
    search_gsgl() {
      this.service = "公司管理"
      this.$store.commit("getformdata", {
        service_type: "公司管理",
      });
      this.$store.commit("search", this.page);
    },
    search_cjgl() {
      this.service = "船检管理"
      this.$store.commit("getformdata", {
        service_type: "船检管理",
      });
      this.$store.commit("search", this.page);
    },
    search_cygl() {
      this.service = "船员管理"
      this.$store.commit("getformdata", {
        service_type: "船员管理",
      });
      this.$store.commit("search", this.page);
    },
    search_gfgl() {
      this.service = "规费管理"
      this.$store.commit("getformdata", {
        service_type: "规费管理",
      });
      this.$store.commit("search", this.page);
    },
    search_hhbz() {
      this.service = "航海保障"
      this.$store.commit("getformdata", {
        service_type: "航海保障",
      });
      this.$store.commit("search", this.page);
    },
    search_wfgl() {
      this.service = "危防管理"
      this.$store.commit("getformdata", {
        service_type: "危防管理",
      });
      this.$store.commit("search", this.page);
    },
    search_thgl() {
      this.service = "通航管理"
      this.$store.commit("getformdata", {
        service_type: "通航管理",
      });
      this.$store.commit("search", this.page);
    },
    search_sgdc() {
      this.service = "事故调查"
      this.$store.commit("getformdata", {
        service_type: "事故调查",
      });
      this.$store.commit("search", this.page);
    },
    search_zhgl() {
      this.service = "综合管理"
      this.$store.commit("getformdata", {
        service_type: "综合管理",
      });
      this.$store.commit("search", this.page);
    },
    search_yjsj() {
      this.service = "应急搜救"
      this.$store.commit("getformdata", {
        service_type: "应急搜救",
      });
      this.$store.commit("search", this.page);
    },
    search_dnfg() {
      this.service = "党内法规"
      this.$store.commit("getformdata", {
        service_type: "党内法规",
      });
      this.$store.commit("search", this.page);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/ServiceType.css";
</style>
