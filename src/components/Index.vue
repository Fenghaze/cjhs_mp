<template>
  <div>
    <div class="title">
      <router-link to='/comment'>
        <small style="float:right; margin: 10px;">意见反馈</small>
      </router-link>
    </div>
    <!-- 主页功能：效力层级、业务类型、发布时间、颁布单位、综合查询 -->
    <div class="menu">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/xlcj">
              <img src="../assets/img/xlcj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to="/xlcj">效力层级</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link to="/ywlx">
            <img src="../assets/img/ywlx.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to="/ywlx">业务类型</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <router-link to="/fbsj">
            <img src="../assets/img/fbsj.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to="/fbsj">发布时间</router-link>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light">
            <router-link to="/bbdw">
            <img src="../assets/img/bbdw.png" class="grid-img" />
            </router-link>
            <div align="center">
              <router-link to="/bbdw">颁布单位</router-link>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <router-link to="/common_search" class="btn btn-primary zh_search">综合查询</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 最近浏览 -->
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">最近浏览</b>
      <el-table :data="results" stripe style="width: 100%" v-if="results">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results:'',
    };
  },
  created(){
    this.get_recent();
  },
  methods:{
    show_file(filename){
      this.$router.push({
        path: 'pdf-preview',
        query: { pdf_url: this.$store.state.base_url + "/file/show/" + filename },
      });
    },
    get_recent(){
      var that = this
      this.axios.get('/file/recent_read').then((res)=>{
        that.results = res.data.fileDTOS
      }).catch((err)=>{
        alert(err)
      })
    },
  },
  components: {},
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>