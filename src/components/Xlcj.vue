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
            <img src="../assets/img/gjgy.png" class="grid-img" />
            <div align="center">
              <router-link @click.native="search_gjgy" to="">国际公约</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/fl.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_fl">法律</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/xzfg.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_xzfg">行政法规</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/dfxfg.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_dfxfg">地方性法规</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/bmgz.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_bmgz">部门规章</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/dfzfgz.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_dfzfgz">地方政府规章</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/img/gfxwj.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_gfxwj">规范性文件</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <img src="../assets/img/other.png" class="grid-img" />
            <div align="center">
              <router-link to="" @click.native="search_others" >其他</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 查询结果 -->
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">查询结果</b>
      <el-table :data="results" stripe style="width: 100%">
        <el-table-column label="文件名" width="250">
          <template slot-scope="scope">
            <a
              :href="'http://10.138.105.177:8080/file/show/' + scope.row.id"
              v-html="scope.row.name"
            ></a>
          </template>
        </el-table-column>
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
        results:[], // 查询结果
        page:1,     // 页码，默认为 1
        total:0,    // 查询总数
    };
  },
  methods: {
    search_gjgy() {
      alert("gjyg");
    },
    search_fl() {
      alert("fl");
    },
    search_xzfg() {
      alert("xzfg");
    },
    search_dfxfg() {
      alert("search_dfxfg");
    },
    search_bmgz() {
      alert("bmgz");
    },
    search_dfzfgz() {
      alert("dfzfgz");
    },
    search_gfxwj() {
      alert("gfxwj");
    },
    search_others() {
      alert("others");
    },
  },
};
</script>

<style scoped>
@import "../assets/css/ScopeLevel.css";
</style>
