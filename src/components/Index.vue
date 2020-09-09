<template>
  <div>
    <div class="title"></div>
    <div class="menu">
      <grid>
        <grid-item link="/xlcj">
          <img src="../assets/img/xlcj.png" class="grid-img" />
          <div align="center">效力层级</div>
        </grid-item>
        <grid-item link="/ywlx">
          <img src="../assets/img/ywlx.png" class="grid-img" />
          <div align="center">业务类型</div>
        </grid-item>
        <grid-item>
          <img src="../assets/img/fbsj.png" class="grid-img" />
          <div align="center">发布时间</div>
        </grid-item>
        <grid-item link="bbdw">
          <img src="../assets/img/bbdw.png" class="grid-img" />
          <div align="center">颁布单位</div>
        </grid-item>
      </grid>
      <grid>
        <router-link to="/common_search" class="btn btn-primary zh_search">
            综合查询
        </router-link>
      </grid>
    </div>
    <div style="font-size: large;padding: 1rem">
      <b style="float:left">最近浏览</b>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    Grid,
    GridItem,
  },
};
</script>

<style scoped>
@import "../assets/css/index.css";
.grid-img {
  width: 100%;
  height: 100%;
  margin-bottom: 5px;
}
</style>