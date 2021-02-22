<template>

  <el-row type="flex"
          justify="center">
    <el-col :xs="24"
            :sm="20"
            :md="20"
            :lg="20"
            :xl="20">

      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/articles">文章管理</a></el-breadcrumb-item>
          <el-breadcrumb-item><a href="/articles/">编辑</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <br>
      <el-card class="box-card"
               style="margin-bottom:10px">
        <el-input v-model="title"
                  placeholder="请输入文章标题"
                  size="normal"
                  clearable></el-input>
      </el-card>
      <mavon-editor v-model="value"
                    @save="save"
                    ref=md
                    @imgAdd="$imgAdd"
                    @imgDel="$imgDel"></mavon-editor>
      <div style="position:relative;margin:20px 0;width:100%;height:30px">
        <el-button type="danger"
                   size="default"
                   style="position:absolute;right:0"
                   @click="publish">发布文章</el-button>
        <el-switch style="display: block;position:absolute;right:120px"
                   v-model="Weight"
                   active-color="#13ce66"
                   active-text="是否置顶">
        </el-switch>
      </div>
    </el-col>

  </el-row>

</template>

<script>
import { getArticleData, updataArticleData } from 'network/article'
export default {
  name: 'Edit',
  data () {
    return {
      value: '',
      title: '',
      Weight: null,
      ArticleId: null,
      isPublish: false
    }
  },
  methods: {
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      this.img_file[pos] = $file;
      uploadImgData(formdata).then((res) => {

        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, this.$store.state.hostUrl + res.data.path);
      })
    },
    $imgDel (pos) {
      // console.log(pos)
      delete this.img_file[pos];
    },
    updateArticle (option) {
      var data = [{
        "op": "replace",
        "path": "/title",
        "value": this.title
      },
      {
        "op": "replace",
        "path": "/content",
        "value": this.value
      },
      {
        "op": "replace",
        "path": "/weight",
        "value": this.Weight ? 100 : 0
      },
      {
        "op": "replace",
        "path": "/isPublish",
        "value": this.isPublish
      }
      ]
      updataArticleData(this.ArticleId, data).then((result) => {
        if (result.status == 204) {
          if (option == 0) {
            this.$message({
              type: 'success',
              message: '文章保存成功 更新时间:' + this.getNowFormatDate()
            })
          }
          if (option == 1) {
            this.$notify({
              title: '成功',
              message: '文章发布成功',
              type: 'success'
            });
          }
        } else {
          if (option == 0) {
            this.$message({
              type: 'error',
              message: '文章保存失败 更新时间:' + this.getNowFormatDate()
            })
          }
          if (option == 1) {
            this.$notify.error({
              title: '错误',
              message: '文章发布失败!'
            });
          }
        }
      });
    },
    // 保存文章
    save () {

      if (this.title == '') {
        this.$message({
          type: 'error',
          message: '请添加标题'
        })
        return
      }
      if (this.value == '') {
        this.$message({
          type: 'error',
          message: '请添加文章内容'
        })
        return
      }

      var option = 0;
      this.updateArticle(option)
    },
    // 发布文章
    publish () {

      if (this.title == '') {
        this.$message({
          type: 'error',
          message: '请添加标题'
        })
        return
      }
      if (this.value == '') {
        this.$message({
          type: 'error',
          message: '请添加文章内容'
        })
        return
      }

      var option = 1;
      this.isPublish = true
      if (this.ArticleId == null) {
        this.addArticle(option)
      }
      else {
        this.updateArticle(option)
      }

    },
    // 获取当前时间
    getNowFormatDate () {
      var date = new Date();
      var maoHao = ":";
      var month = date.getMonth() + 1;
      var curDate = date.getDate();
      var curHours = date.getHours();
      var curMinutes = date.getMinutes();
      var curSeconds = date.getSeconds();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (curDate >= 0 && curDate <= 9) {
        curDate = "0" + curDate;
      }
      if (curHours >= 0 && curHours <= 9) {
        curHours = "0" + curHours;
      }
      if (curMinutes >= 0 && curMinutes <= 9) {
        curMinutes = "0" + curMinutes;
      }
      if (curSeconds >= 0 && curSeconds <= 9) {
        curSeconds = "0" + curSeconds;
      }
      var currentdate =
        curHours + maoHao + curMinutes + maoHao + curSeconds;
      return currentdate;
    },
  },
  created () {
    console.log(this.$route.params.id)
    getArticleData(this.$route.params.id).then((result) => {
      console.log(result)
      this.value = result.data.content
      this.title = result.data.title
      this.isPublish = result.data.isPublish
      this.Weight = result.data.weight == 100 ? true : false
      this.ArticleId = result.data.id
    });
  },
}
</script>

<style>
.v-note-wrapper {
  min-height: 90vh !important;
}
</style>