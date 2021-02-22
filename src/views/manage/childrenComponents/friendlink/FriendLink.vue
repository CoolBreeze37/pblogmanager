<template>
  <div>
    <el-row type="flex"
            justify="center">

      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20"
              :xl="20">
        <el-card class="box-card">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/friendLink">友链</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
        <el-card class="box-card">
          <el-tag :key="index"
                  v-for="(tag,index) in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag.id)">
            {{tag.title}}
          </el-tag>
          <el-input class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
          </el-input>
          <el-button v-else
                     class="button-new-tag"
                     size="small"
                     @click="showInput">+ 新建分类</el-button>
          <div style="display:inline-block;float:right">
            <el-select v-model="category"
                       placeholder="添加搜索分类"
                       clearable
                       style="margin-right:5px"
                       @change="filterHandler">
              <el-option v-for="(tag,index) in dynamicTags"
                         :key="index"
                         :label="tag.title"
                         :value="tag.title">
              </el-option>
            </el-select>

            <el-button type="primary"
                       size="default"
                       @click="showDialog()">+ 新建友链</el-button>
          </div>

        </el-card>

      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="height:60vh">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20"
              :xl="20"
              class="el-col-my-justify">
        <el-col :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                v-for="(friend,index) in friends"
                :key="index"
                style="cursor:pointer">

          <el-card shadow="hover"
                   style="position:relative">
            <el-popover placement="right"
                        width="400"
                        trigger="click">
              <p>
                I D &nbsp;:&nbsp;{{friend.id}}
              </p>
              <p>
                签名&nbsp;:&nbsp;{{friend.word}}
              </p>
              <p>
                链接&nbsp;:&nbsp;
                <a :href="friend.url"
                   target="blank">
                  <el-link type="primary">{{friend.url}}</el-link>
                </a>
              </p>
              <p>
                权重&nbsp;:&nbsp;{{friend.weight}}
              </p>
              <p>
                Icon链接&nbsp;:&nbsp;
                <a :href="friend.photoUrl"
                   target="blank">
                  <el-link type="primary">{{friend.photoUrl}}</el-link>
                </a>
              </p>
              <div slot="reference">
                <h5 style="display:inline">{{friend.name}}</h5>

                <el-tag type="primary"
                        style="position:absolute;right:150px;top:15px"
                        size="normal">{{friend.category}}</el-tag>
              </div>
            </el-popover>
            <el-button-group style="position:absolute;right:5px;top:11px">
              <el-button type="primary"
                         icon="el-icon-edit"
                         @click.prevent="showUpdateFriendLink(index)"></el-button>
              <el-button type="danger"
                         icon="el-icon-delete"
                         @click.prevent="deleteFriendLink(friend.id)"></el-button>
            </el-button-group>
          </el-card>

        </el-col>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="20"
              :md="20"
              :lg="20"
              :xl="20"
              class="el-col-my-justify">
        <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                              :Options="options"
                              :Total="total"></el-custom-pagination>
      </el-col>
    </el-row>
    <el-dialog title="新建友链"
               :visible.sync="dialogTableVisible">
      <el-form :model="form"
               :rules="rules"
               ref="Form"
               label-position="top">
        <el-form-item label="昵称"
                      prop="name">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类"
                      prop="friendLinkCategoryId">
          <el-select v-model="form.friendLinkCategoryId"
                     placeholder="请选择分类">
            <el-option v-for="(tag,index) in dynamicTags"
                       :key="index"
                       :label="tag.title"
                       :value="tag.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重"
                      prop="weight">
          <el-input-number v-model="form.weight"
                           controls-position="right"
                           size="small"
                           :min="0"
                           :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="链接"
                      prop="url">
          <el-input v-model="form.url"
                    placeholder="添加网站地址">
          </el-input>
        </el-form-item>
        <el-form-item label="Icon链接"
                      prop="photoUrl">
          <el-input v-model="form.photoUrl"
                    placeholder="添加网站图标地址">
          </el-input>
        </el-form-item>
        <el-form-item label="签名"
                      prop="word">
          <el-input type="textarea"
                    v-model="form.word"
                    show-word-limit
                    rows="3"
                    maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="resetForm('Form')">重置</el-button>
        <el-button type="primary"
                   @click="submitForm('Form')">添加</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑友链"
               :visible.sync="dialogTableVisible2">
      <el-form :model="form2"
               :rules="rules"
               ref="Form2"
               label-position="top">
        <el-form-item label="昵称"
                      prop="name">
          <el-input v-model="form2.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类"
                      prop="friendLinkCategoryId">
          <el-select v-model="form2.friendLinkCategoryId"
                     placeholder="请选择分类">
            <el-option v-for="(tag,index) in dynamicTags"
                       :key="index"
                       :label="tag.title"
                       :value="tag.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权重"
                      prop="weight">
          <el-input-number v-model="form2.weight"
                           controls-position="right"
                           size="small"
                           :min="0"
                           :max="100"></el-input-number>
        </el-form-item>
        <el-form-item label="链接"
                      prop="url">
          <el-input v-model="form2.url"
                    placeholder="添加网站地址">
          </el-input>
        </el-form-item>
        <el-form-item label="Icon链接"
                      prop="photoUrl">
          <el-input v-model="form2.photoUrl"
                    placeholder="添加网站图标地址">
          </el-input>
        </el-form-item>
        <el-form-item label="签名"
                      prop="word">
          <el-input type="textarea"
                    v-model="form2.word"
                    show-word-limit
                    rows="3"
                    maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm2('Form2')">提交更改</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { getFriendLinkCategoriesData, deleteFriendLinkCategoryData, addFriendLinkCategory } from 'network/friendLinkCategories'
import { getFriendLinksData, addFriendLinkData, deleteFriendLinkData, updateFriendLinkData } from 'network/friendLink'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import { options } from './index'
export default {
  components: {
    ElCustomPagination
  },
  data () {
    return {
      total: 0,
      options,
      dialogTableVisible: false,
      dialogTableVisible2: false,
      editFriendLinkId: null,
      form: {
        name: '',
        friendLinkCategoryId: '',
        weight: 0,
        url: '',
        word: '',
        photoUrl: ''
      },
      form2: {
        name: '',
        friendLinkCategoryId: '',
        weight: 0,
        url: '',
        word: '',
        photoUrl: ''
      },
      rules: {
        word: [
          { required: true, message: '请添加一个签名', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '请添加权重', trigger: 'blur' }
        ],
        friendLinkCategoryId: [
          { required: true, message: '请选择分类', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请添加一个昵称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在1~20个字符之间', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        photoUrl: [
          { required: true, message: '请输入网站图标地址', trigger: 'blur' }
        ]
      },
      dynamicTags: [],
      friends: [],
      inputVisible: false,
      inputValue: '',

      currentPage: 1,
      pageSize: 2,
      category: "",
    };
  },
  methods: {
    filterHandler () {
      this.getFriendLinks()
    },
    getFriendLinks () {
      getFriendLinksData(this.currentPage, this.pageSize, this.category).then(res => {
        var x_pagination = JSON.parse(res.headers["x-pagination"])
        this.total = x_pagination.totalCount
        this.friends = res.data
      })
    },
    showUpdateFriendLink (index) {
      this.dialogTableVisible2 = true
      this.form2.name = this.friends[index].name
      this.form2.url = this.friends[index].url
      this.form2.word = this.friends[index].word
      this.form2.weight = this.friends[index].weight
      this.form2.friendLinkCategoryId = this.friends[index].friendLinkCategoryId
      this.editFriendLinkId = this.friends[index].id
    },

    deleteFriendLink (id) {
      this.$confirm('将永久删除此友链, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFriendLinkData(id).then((res) => {
          if (res.status == 204) {
            this.$notify({
              title: '成功',
              type: 'success',
              message: '删除成功！'
            })
          }
          this.getFriendLinks()
        })
      }).catch(() => {
        this.$notify({
          title: '提示',
          type: 'info',
          message: '已取消删除'
        })
      });
    },
    submitForm2 (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = [{
            "op": "replace",
            "path": "/name",
            "value": this.form2.name
          },
          {
            "op": "replace",
            "path": "/weight",
            "value": this.form2.weight
          },
          {
            "op": "replace",
            "path": "/word",
            "value": this.form2.word
          },
          {
            "op": "replace",
            "path": "/friendlinkcategoryId",
            "value": this.form2.friendLinkCategoryId
          }, {
            "op": "replace",
            "path": "/url",
            "value": this.form2.url
          },
          {
            "op": "replace",
            "path": "/photourl",
            "value": this.form2.photoUrl
          }
          ]
          updateFriendLinkData(this.editFriendLinkId, data).then((result) => {
            if (result.status == 204) {
              this.$notify({
                title: '成功',
                message: '更新友链成功！',
                type: 'success'
              });
              this.dialogTableVisible2 = false
              this.getFriendLinks()
            }
            else {
              this.$notify({
                title: '错误',
                message: '更新友链失败!',
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formData = new FormData()
          formData.append("name", this.form.name)
          formData.append("weight", this.form.weight)
          formData.append("url", this.form.url)
          formData.append("photoUrl", this.form.photoUrl)
          formData.append("word", this.form.word)
          formData.append("friendLinkCategoryId", this.form.friendLinkCategoryId)
          addFriendLinkData(formData).then((res) => {
            if (res.status == 201) {
              this.$notify({
                title: '成功',
                message: '已成功添加一个新的友链！',
                type: 'success'
              });
              this.getFriendLinks()
              this.dialogTableVisible = false
            }
            else {
              this.$notify({
                title: '错误',
                message: '添加友链失败!',
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
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    showDialog () {
      this.dialogTableVisible = true
    },
    getFriendLinkCategories () {
      getFriendLinkCategoriesData().then((result) => {
        console.log(result)
        this.dynamicTags = result.data
      });
    },
    handleClose (id) {
      this.$confirm('此分类删除将会一同删除该分类下的所有友链, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFriendLinkCategoryData(id).then((res) => {
          if (res.status == 204) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.getFriendLinks()
            this.getFriendLinkCategories()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      });
    },
    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        var formData = new FormData();
        formData.append("Title", inputValue)
        addFriendLinkCategory(formData).then((res) => {
          if (res.status == 201) {
            this.$message({
              type: 'success',
              message: '添加成功！'
            })
            this.getFriendLinkCategories()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败,该分类可能已存在！'
            })
          }
        })
      }
      this.inputVisible = false;
      this.inputValue = '';

    },
    handleNextClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getFriendLinks()
    },
    handlePrevClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getFriendLinks()
    },
    handleCurrentChange (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getFriendLinks()
    },
    handleSizeChange (currentPage, pageSize) {
      this.pageSize = pageSize
      this.getFriendLinks()
    },
  },
  created () {
    this.currentPage = 1
    this.pageSize = this.options.pageSizes[0]
    this.getFriendLinkCategories()
    this.getFriendLinks()
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

@media screen and (max-width: 500px) {
  .el-col-my-justify {
    flex-direction: column;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>