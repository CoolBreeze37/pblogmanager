<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :sm="22"
              :md="22"
              :lg="17">
        <el-card class="box-card">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/songs">音乐管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
    </el-row>

    <br>
    <el-row type="flex"
            justify="center">
      <el-col :sm="14"
              :md="14"
              :lg="12"
              style="height:85vh;background-color:#efe8ec">
        <el-custom-table :tableData="tableData"
                         :border="border"
                         :stripe="stripe"
                         :height="height"
                         :showIndex="showIndex"
                         :showSelector="showSelector"
                         :columns="columns"
                         :sortChange="sortChange"
                         :searchInputChangeHandler="searchInputChange"
                         :expands="expands"
                         style="width:100%"
                         align:center></el-custom-table>
        <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                              :Options="options"
                              :Total="total"></el-custom-pagination>
      </el-col>
      <el-col :sm="8"
              :md="8"
              :lg="5"
              class="upload  hidden-xs-only"
              style="height:85vh;">
        <el-upload ref="upload"
                   action=""
                   :multiple="true"
                   :http-request="uploadSectionFile"
                   :before-upload="beforeAvatarUpload"
                   :file-list="fileList"
                   :auto-upload="false">
          <el-button slot="trigger"
                     size="small"
                     type="primary">选取文件</el-button>
          <el-button size="small"
                     class="el-upload-rbutton"
                     type="success"
                     @click="submitUpload">上传到服务器</el-button>
          <div slot="tip"
               class="el-upload__tip">只能上传MP3文件，且不超过20M</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { uploadSongs, getSongsData } from 'network/song'
import 'element-ui/lib/theme-chalk/display.css';
import ElCustomTable from 'components/common/table/ElCustomTable'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import {
  id,
  name,
  artist,
  size,
  length,
  path,
  custom2,
  options
} from './index'
export default {
  data () {
    return {
      action: 'https://localhost:5001/songs/multiplefiles',
      fileList: [],


      // 分页
      options,
      total: 0,
      // 表格
      tableData: [],
      border: true,
      stripe: true,
      height: "75vh",
      showSelector: false,
      showIndex: true,
      expands: ['id'],
      // 排序改变事件处理函数
      sortChange: this.sortChangeHandler,
      searchInputChange: this.searchInputChangeHandler,
      columns: [
        id,
        name,
        artist,
        size,
        length,
        path,
        custom2
      ],





      currentPage: 0,
      pageSize: 0,
      sortBy: null,
      searchQuery: null
    };
  },
  components: {
    ElCustomTable,
    ElCustomPagination
  },
  methods: {
    uploadSectionFile (params) {
      var file = params.file;
      var form = new FormData()
      form.append("files", file)
      let onUploadProgress = function (progressEvent) {
        let percent = (progressEvent.loaded) / progressEvent.total * 100 | 0
        params.onProgress({ percent: percent })
      }
      uploadSongs(form, onUploadProgress).then((result) => {
        if (result.status == 200) {
          params.onSuccess()
          this.$message({
            type: 'success',
            message: '上传成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: "上传失败"
          })
        }
      });
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    // 限制上传文件格式
    beforeAvatarUpload (file) {
      const isMP3 = file.type === 'audio/mpeg';
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isMP3) {
        this.$message.error('上传头像图片只能是 MP3 格式!');
      }
      if (!isLt20M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isMP3 && isLt20M;
    },


    getData () {
      getSongsData(this.currentPage,
        this.pageSize,
        this.searchQuery,
        this.sortBy).then(res => {
          console.log(res)
          var x_pagination = JSON.parse(res.headers["x-pagination"])
          this.total = x_pagination.totalCount
          this.tableData = res.data
        })
    },
    // 分页
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
    sortChangeHandler (sort) {
      console.log(sort)
      this.sortBy = sort.prop
      if (sort.order == "descending") {
        this.sortBy = this.sortBy + " desc"
      }
      if (sort.order == null) {
        this.sortBy = null
      }
      this.getData()
    },
    searchInputChangeHandler (search) {
      console.log(search)
      this.searchQuery = search
      this.getData()
    }
  }, created () {
    // 初始数据
    this.currentPage = 1,
      this.pageSize = this.options.pageSizes[0]
    this.getData()
  }, mounted () {
    this.options.handleNextClick = this.handleNextClick
    this.options.handlePrevClick = this.handlePrevClick
    this.options.handleCurrentChange = this.handleCurrentChange
    this.options.handleSizeChange = this.handleSizeChange
  },
}
</script>

<style scoped>
.el-upload-rbutton {
  margin-left: 10px;
}
@media screen and (max-width: 623px) {
  .el-upload-rbutton {
    margin-left: 0;
  }
}
.upload {
  box-shadow: 3px 3px 10px 3px #eef1f6;
  margin-left: 10px;
  padding-top: 10px;
  padding-left: 10px;
}
</style>