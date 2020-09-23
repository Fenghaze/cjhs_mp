<template>
  <div>
    <!-- 标题 -->
    <div class="search_title">
      <h1 style="margin-top: 15px;">意见反馈</h1>
    </div>
    <!-- 表单 -->
    <div class="search_menu">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="反馈类型" prop="type">
          <el-select v-model="form.type" style="width:100%">
            <el-option v-for="item in form.select" :key="item" :value="item">{{item}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="反馈内容" prop="content">
          <el-input
            type="textarea"
            v-model="form.content"
            placeholder="请输入您的意见，我们将不断改进！"
            maxlength="200"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-button @click="onPickFile"  style="width:100%">{{form.img_name}}<i class="el-icon-upload el-icon--right"></i></el-button>
          <input
            type="file"
            ref="fileInput"
            accept="image/*"
            @change="getFile"
            style="display: none"
          />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('form')" style="width:100%">提交反馈</el-button>
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
        img: "", // 上传的图片
        img_name: "选择图片", // 图片名
        type: "", // 反馈类型
        select: ["文件增加", "文件修改", "功能反馈"], // 反馈类型选项
        name: "", // 姓名
        tel: "", // 联系方式
        content: "", // 反馈内容
      },

      labelPosition: "top",
      rules: {
        content: [
          { required: true, message: "请填写反馈意见！", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择反馈类型！", trigger: "change" },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    /* 上传图片 */
    onPickFile () {
      this.$refs.fileInput.click()
    },
    /* 获取图片 */
    getFile(event) {
      this.form.img = event.target.files[0];  // 获取图片对象，0表示只有一个文件
      this.form.img_name = event.target.files[0].name // 获取图片名
    },
    /* 提交表单 */
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var that = this;
          let formdata = new FormData();
          if (this.form.img != "") {
            formdata.append("img", this.form.img);
          }
          formdata.append("name", this.form.name);
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

<style scoped lang="scss">
/deep/ .el-form--label-top .el-form-item__label {
  float: left;
}
</style>
