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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
@import "../assets/css/index.css";
</style>