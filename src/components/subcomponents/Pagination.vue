<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="results_len"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
    };
  },
  computed: {
    total: function () {
      //计算总页码需要使用 计算属性 ，放在data运算不出来
      return (this.results_len / 10) * 10; // 一页显示 10 条数据
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      /* 综合查询的分页 */
      this.$store.commit('search', this.currentPage)
      
      /* 按具体分类查询的分页 */
      switch (this.path_name) {
        case "xlcj":
          this.$store.commit("getformdata", {
            scope: this.search_type, // 效力层级
          });
          // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
          this.$store.commit("search", val);
          break;
        case "ywlx":
          this.$store.commit("getformdata", {
            service_type: this.search_type, // 效力层级
          });
          // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
          this.$store.commit("search", val);
          break;
        case "bbdw":
          this.$store.commit("getformdata", {
            dept: this.search_type, // 效力层级
          });
          // 使用store.js中的公共查询方法，传入两个参数：page当前页码，formdata表单内容
          this.$store.commit("search", val);
          break;
        default:break;
      }
    },
  },
  props: ["results_len", "path_name", "search_type"],
};
</script>

<style scoped lang="less">
</style>
