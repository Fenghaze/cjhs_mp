<template>
  <div>
    <!-- 标题 -->
    <div class="search_title">
      <h1 style="margin-top: 15px;">意见反馈</h1>
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
        <el-form-item style="float:right">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      total: 0,
      form: {
        img: "",
        img_name: "",
        type: "",
        select: ["文件增加", "文件修改", "功能反馈"],
        author: "",
        tel: "",
        content: "",
      },
      rules: {
        author: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        tel: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        content: [
          { required: true, message: "请输入您的意见", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择意见类型", trigger: "change" },
        ],
      },

      labelPosition: "right",

      comments_lst: [],
      state: 1,
    };
  },
  created() {},
  mounted() {},
  methods: {
    upload(event) {
      this.form.img = event.target.files[0];
      var iMaxFilesize = 2097152; //2M
      if (this.form.img.size > iMaxFilesize) {
        alert("图片大小不能超过2M");
        return;
      }
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var that = this;
          let formdata = new FormData();
          if (this.form.img != "") {
            formdata.append("img", this.form.img);
          }
          formdata.append("name", this.form.author);
          formdata.append("phone", this.form.tel);
          formdata.append("type", this.form.type);
          formdata.append("advice", this.form.content);

          let config = {
            headers: {
              "Content-Type": "multipart/form-data", //以表单传数据的格式来传递 fromdata
            },
          };
          this.axios
            .post("/feedback/add", formdata, config)
            .then(function (response) {
              if (response.status == 200) {
                that.$message({
                  type: "success",
                  message: "已反馈！等待管理员审核",
                });
              }
            })
            .catch(function (error) {
              alert(error);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>
