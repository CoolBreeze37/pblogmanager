<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20">
        <el-card>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/repository">项目仓库管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20">
        <el-button type="primary"
                   size="default"
                   @click="showDialog1">新建项目
        </el-button>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="min-height:65vh">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20">
        <el-col :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                v-for="(item,index) in repositories"
                :key="index"
                style="cursor:pointer;">
          <el-card class="box-card">
            <div slot="header">
              <el-popover placement="top-start"
                          width="200"
                          trigger="hover"
                          :content="item.title">
                <span slot="reference"
                      class="header-span"
                      style="display:inline-block;text-overflow: ellipsis;overflow:hidden;">{{item.title}}</span>
              </el-popover>
              <el-button-group style="float:right;">
                <el-button type="primary"
                           icon="el-icon-edit"
                           @click.prevent="showUpdateRepository(index)"></el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           @click.prevent="deleteRepository(item.id)"></el-button>
              </el-button-group>
            </div>
            <div>
              <el-tag type="primary"
                      style="width:70px">项目介绍</el-tag>
              <el-input type="textarea"
                        :rows="5"
                        disabled
                        :value="item.introduction"></el-input>
            </div>
            <div>
              <el-tag type="primary"
                      style="width:70px">项目链接</el-tag>
              <a :href="item.url"
                 target="blank">
                <el-link type="primary"
                         style="border:solid 1px #e4e7ed;height:30px;border-radius:6px;background-color:#f5f7fa;padding:0 15px">{{item.url}}</el-link>
              </a>
            </div>
            <div>
              <el-tag type="primary"
                      style="width:70px">发布日期</el-tag>
              <el-input style="display:inline-block;width:150px"
                        size="small"
                        :value="item.publishTime"
                        disabled></el-input>
            </div>
            <div>
              <el-tag type="success"
                      style="width:70px">权重</el-tag>
              <el-input style="display:inline-block;width:150px"
                        size="small"
                        :value="item.weight"
                        disabled></el-input>
            </div>
          </el-card>
        </el-col>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20">
        <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                              :Options="options"
                              :Total="total"></el-custom-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新建项目"
               :visible.sync="dialogTableVisible">
      <el-form :model="form"
               :rules="rules"
               ref="Form"
               label-position="top">
        <el-form-item label="项目名称"
                      prop="title">
          <el-input v-model="form.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍"
                      prop="introduction">
          <el-input type="textarea"
                    v-model="form.introduction"
                    show-word-limit
                    rows="5"
                    maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="权重"
                      prop="weight">
          <el-input-number v-model="form.weight"
                           controls-position="right"
                           size="small"
                           :min="0"
                           :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="项目链接"
                      prop="url">
          <el-input v-model="form.url"
                    placeholder="添加项目地址">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('Form')">重置</el-button>
        <el-button type="primary"
                   @click="submitForm('Form')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑项目"
               :visible.sync="dialogTableVisible2">
      <el-form :model="form2"
               :rules="rules"
               ref="Form2"
               label-position="top">
        <el-form-item label="项目名称"
                      prop="title">
          <el-input v-model="form2.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍"
                      prop="introduction">
          <el-input type="textarea"
                    v-model="form2.introduction"
                    show-word-limit
                    rows="5"
                    maxlength="300"></el-input>
        </el-form-item>
        <el-form-item label="权重"
                      prop="weight">
          <el-input-number v-model="form2.weight"
                           controls-position="right"
                           size="small"
                           :min="0"
                           :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="项目链接"
                      prop="url">
          <el-input v-model="form2.url"
                    placeholder="添加项目地址">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm2('Form2')">确认更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { options } from './index'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import { getRepositoriesData, addRepositoryData, updateRepositoryData, deleteRepositoryData } from 'network/repository'

export default {
  components: {
    ElCustomPagination
  },
  data () {
    return {
      total: 0,
      options,
      repositories: [],
      currentPage: 1,
      pageSize: 50,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      editRepositoryId: null,
      form: {
        title: '',
        introduction: '',
        weight: '',
        url: ''
      },
      form2: {
        title: '',
        introduction: '',
        weight: '',
        url: ''
      },
      rules: {
        title: [
          { required: true, message: '请添加项目标题', trigger: 'blur' },
          { max: 80, message: '长度不能超过80个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请为项目添加介绍', trigger: 'blur' },
          { max: 300, message: '长度不能超过300个字符', trigger: 'blur' }
        ],
        weight: [{ required: true, message: '请为项目添加权重', trigger: 'blur' }],
        url: [{ required: true, message: '请添加项目链接', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = [{
            "op": "replace",
            "path": "/title",
            "value": this.form2.title
          },
          {
            "op": "replace",
            "path": "/weight",
            "value": this.form2.weight
          },
          {
            "op": "replace",
            "path": "/introduction",
            "value": this.form2.introduction
          },
          {
            "op": "replace",
            "path": "/url",
            "value": this.form2.url
          }
          ]
          updateRepositoryData(this.editRepositoryId, data).then((result) => {
            if (result.status == 204) {
              this.$notify({
                title: '成功',
                message: '更新项目成功！',
                type: 'success'
              });
              this.dialogTableVisible2 = false
              this.getData()
            }
            else {
              this.$notify({
                title: '错误',
                message: '更新项目失败!',
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    deleteRepository (id) {
      this.$confirm('将永久删除此项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRepositoryData(id).then((res) => {
          if (res.status == 204) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '删除成功！'
            })
          }
          this.getData()
        })
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'info',
          message: '已取消删除'
        })
      });
    },
    showUpdateRepository (index) {
      this.editRepositoryId = this.repositories[index].id
      this.form2.title = this.repositories[index].title
      this.form2.url = this.repositories[index].url
      this.form2.introduction = this.repositories[index].introduction
      this.form2.weight = this.repositories[index].weight
      this.dialogTableVisible2 = true
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = new FormData()
          data.append("title", this.form.title)
          data.append("introduction", this.form.introduction)
          data.append("url", this.form.url)
          data.append("weight", this.form.weight)
          addRepositoryData(data).then((res) => {
            if (res.status == 201) {
              this.$notify({
                title: '成功',
                message: '已成功添加一个新的项目！',
                type: 'success'
              });
              this.getData()
              this.dialogTableVisible = false
            }
            else {
              this.$notify({
                title: '错误',
                message: '添加项目失败!',
                type: 'error'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    showDialog1 () {
      this.dialogTableVisible = true
    },
    getData () {
      getRepositoriesData(this.currentPage, this.pageSize).then((result) => {
        this.repositories = result.data
        var x_pagination = JSON.parse(result.headers["x-pagination"])
        this.total = x_pagination.totalCount
      });
    },
    handleNextClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    handlePrevClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    handleCurrentChange (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    handleSizeChange (currentPage, pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
  },
  created () {
    this.currentPage = 1
    this.pageSize = this.options.pageSizes[0]
    this.getData()
  },
  mounted () {
    this.options.handleNextClick = this.handleNextClick
    this.options.handlePrevClick = this.handlePrevClick
    this.options.handleCurrentChange = this.handleCurrentChange
    this.options.handleSizeChange = this.handleSizeChange
  },
}
</script>

<style>
.el-message-box {
  width: null;
}
.header-span {
  width: calc(100% - 111px);
}
</style>