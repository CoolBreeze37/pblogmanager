<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20">
        <el-card>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/albums">相册</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20">
        <el-button type="primary"
                   icon="el-icon-folder-add"
                   style="margin-bottom:10px"
                   @click="dialogTableVisible=!dialogTableVisible">新建相册</el-button>

        <el-dialog title="新建相册"
                   :visible.sync="dialogTableVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="Form"
                   label-position="top">
            <el-form-item label="相册标题"
                          prop="title">
              <el-input v-model="form.title"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="私有性"
                          prop="isPrivate">
              <el-select v-model="form.isPrivate"
                         @change="updateRule()"
                         placeholder="请选择相册私有性">
                <el-option label="私有"
                           :value="true"
                           selected></el-option>
                <el-option label="公开"
                           :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码"
                          prop="passWord"
                          v-show="form.isPrivate==true">
              <el-input v-model="form.passWord"
                        placeholder="为相册设置密码">
              </el-input>
            </el-form-item>
            <el-form-item label="相册描述"
                          prop="description">
              <el-input type="textarea"
                        v-model="form.description"
                        show-word-limit
                        rows="5"
                        maxlength="200"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="resetForm('Form')">重置</el-button>
            <el-button type="primary"
                       @click="submitForm('Form')">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑相册"
                   @closed="resetForm2()"
                   :visible.sync="dialogTableVisible2">
          <el-form :model="form2"
                   :rules="rules"
                   ref="Form2"
                   label-position="top">
            <el-form-item label="相册标题"
                          prop="title">
              <el-input v-model="form2.title"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="私有性"
                          prop="isPrivate">
              <el-select v-model="form2.isPrivate"
                         @change="updateRule()"
                         placeholder="请选择相册私有性">
                <el-option label="私有"
                           :value="true"></el-option>
                <el-option label="公开"
                           :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密码"
                          prop="passWord"
                          v-show="form2.isPrivate==true">
              <el-input v-model="form2.passWord"
                        placeholder="为相册设置密码">
              </el-input>
            </el-form-item>
            <el-form-item label="相册描述"
                          prop="description">
              <el-input type="textarea"
                        v-model="form2.description"
                        show-word-limit
                        rows="5"
                        maxlength="200"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button type="primary"
                       @click="submitForm2('Form2')">更改</el-button>
          </div>
        </el-dialog>
        <div class="album-wrapper"
             style="background-color:#f9f9f9">
          <el-card v-for="(album,index) in albums"
                   :key="index"
                   :body-style="{ padding: '0px' }"
                   style="margin:10px;min-width:200px;max-width:200px;cursor:pointer">
            <img :src="$store.state.hostUrl+album.photo"
                 @click="jump(index)"
                 style="min-height:250px;max-height:250px"
                 class="image">
            <div style="padding: 14px;">
              <span>{{album.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ album.publishTime }}</time>
                <br>
                <br>
                <el-popconfirm title="确定要删除该相册吗？"
                               icon-color="red"
                               @confirm="deleteAlbum(index)">
                  <el-button type="text"
                             class="button"
                             slot="reference">删除</el-button>
                </el-popconfirm>

                <el-button type="text"
                           class="button"
                           @click="edit(index)">编辑</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="20"
              style="text-align:center">
        <el-button type="primary"
                   size="default"
                   v-show="hasMore"
                   @click="loadMore">加载更多</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { getAlbumsData, deleteAlbumData, addAlbumData, updataAlbumData } from 'network/album'
export default {
  data () {
    return {
      albums: [],
      pageNumber: 1,
      pageSize: 5,
      editId: "",
      hasMore: true,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      form: {
        title: '',
        isPrivate: false,
        passWord: '',
        description: ''
      },
      form2: {
        title: '',
        isPrivate: false,
        passWord: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入相册标题', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在3~20个字符之间', trigger: 'blur' }
        ],
        isPrivate: [
          { required: true, message: '请选择相册私有性', trigger: 'blur' }
        ],
        passWord: [],
        description: []
      },
    }
  },
  methods: {
    // 加载更多
    loadMore () {
      this.getData()
    },
    // 跳转
    jump (index) {
      console.log(index)
      this.$router.push('/albums/' + this.albums[index].id + '/' + this.albums[index].title)
    },
    // 新建相册提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addAlbum()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 编辑相册提交
    submitForm2 (formName, index) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateAlbum()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm (formName) {
      console.log("我执行了")
      this.$refs[formName].resetFields();
      this.updateRule()
    },
    // 重置表单2
    resetForm2 () {
      this.editId = null
      this.form2.passWord = null
      this.form2.description = null
      this.form2.title = null
      this.form2.isPrivate = null
    },
    // 编辑
    edit (index) {
      this.dialogTableVisible2 = !this.dialogTableVisible2
      this.form2.title = this.albums[index].title
      this.form2.isPrivate = this.albums[index].isPrivate
      this.form2.description = this.albums[index].description
      this.editId = this.albums[index].id
    },
    // 更新校验规则
    updateRule () {
      this.rules.passWord = this.form.isPrivate == true ? [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 50, message: '长度在6~50个字符之间', trigger: 'blur' }
      ] : []
    },
    // 刷新数据
    fleshData () {
      this.albums = []
      console.log("进来了")
      for (var i = 1; i < this.pageNumber; i++) {
        console.log(i)
        getAlbumsData(i, this.pageSize).then((result) => {
          console.log(result)
          this.albums = this.albums.concat(result.data)
          var x_pagination = JSON.parse(result.headers["x-pagination"])
          this.hasMore = x_pagination.nextPageLink == null ? false : true
        });
      }
    },
    // 获取数据
    getData () {
      getAlbumsData(this.pageNumber, this.pageSize).then((result) => {
        this.pageNumber = this.pageNumber + 1
        this.albums = this.albums.concat(result.data)
        var x_pagination = JSON.parse(result.headers["x-pagination"])
        this.hasMore = x_pagination.nextPageLink == null ? false : true
      });
    },
    // 添加相册
    addAlbum () {
      var form = new FormData()
      form.append('title', this.form.title)
      form.append('isPrivate', this.form.isPrivate)
      if (this.form.isPrivate == true) {
        form.append('passWord', this.form.passWord)
      }

      form.append('description', this.form.description)
      addAlbumData(form).then((result) => {
        if (result.status == 201) {
          this.$message({
            type: 'success',
            message: '创建成功！'
          })
          this.resetForm("Form")
          this.dialogTableVisible = false
          this.fleshData()
        }

      }).catch((err) => {
        this.$message({
          type: 'error',
          message: '创建失败！'
        })
      });

    },
    // 更新相册
    updateAlbum () {
      var data = [{
        "op": "replace",
        "path": "/title",
        "value": this.form2.title
      },
      {
        "op": "replace",
        "path": "/isPrivate",
        "value": this.form2.isPrivate
      },
      {
        "op": "replace",
        "path": "/description",
        "value": this.form2.description
      }
      ]
      if (this.form2.isPrivate == true) {
        data.push(
          {
            "op": "replace",
            "path": "/passWord",
            "value": this.form2.passWord
          })
      }
      updataAlbumData(this.editId, data).then((result) => {
        if (result.status == 204) {
          this.$message({
            type: "success",
            message: '修改成功！'
          })
          this.resetForm2()
          this.dialogTableVisible2 = false
          this.fleshData()
        }
      }).catch((err) => {
        if (err.response.status == 400) {
          this.$message({
            type: "error",
            message: '相册名可能已存在了亲！'
          })
        }
      })
    },
    // 删除相册
    deleteAlbum (index) {
      deleteAlbumData(this.albums[index].id).then((res) => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: '删除成功！'
          })

          this.fleshData()
        }
      }).catch((err) => {
        if (err.response.status == 400) {
          this.$message({
            type: "error",
            message: '删除失败！可能相册不为空！'
          })
        }
      })
    }
  },
  created () {
    this.getData()
  },
}
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.album-wrapper {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  border-radius: 5px;
  padding: 20px 0 60px 0;
}
.album-wrapper-item {
  width: 200px;
  height: 300px;
}
.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
@media screen and (max-width: 500px) {
  .el-row-my-justify {
    flex-direction: column;
  }
  .album-wrapper {
    justify-content: center;
  }
}
</style>