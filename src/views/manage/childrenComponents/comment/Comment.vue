<template>
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
          <el-breadcrumb-item><a href="/comments">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <br>
      <el-select v-model="value"
                 placeholder="选择所属文章"
                 clearable
                 filterable
                 :loading="loading"
                 @change="change">
        <el-option v-for="item in options"
                   :key="item.id"
                   :label="item.title"
                   :value="item.id">
        </el-option>

        <el-custom-pagination style="text-align:center;height:3vh;margin-top:10px"
                              :Options="paginationConfig2"
                              :Total="total2"></el-custom-pagination>
      </el-select>

      <!-- <el-select value-key=""
                 placeholder="选择所属用户"
                 clearable
                 filterable
                 @change="">
        <el-option v-for="item in options"
                   :key="item.id"
                   :label="item.title"
                   :value="item.id">
        </el-option>
      </el-select> -->
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
                       align:center>
      </el-custom-table>
      <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                            :Options="paginationConfig"
                            :Total="total"></el-custom-pagination>
    </el-col>

  </el-row>
</template>

<script>
import ElCustomTable from 'components/common/table/ElCustomTable'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import { getCommentsData, deleteCommentData } from 'network/comment'
import { getArticlesData } from 'network/article'
import {
  id,
  articleId,
  content,
  publishTime,

  custom,
  custom1,
  custom2,
  paginationConfig,
  paginationConfig2
} from './index'
export default {
  data () {
    return {
      loading: false,
      options: [],
      value: null,
      // 分页
      paginationConfig,
      paginationConfig2,
      total: 0,
      total2: 0,
      // 表格
      tableData: [],
      border: false,
      stripe: true,
      height: "80vh",
      showSelector: true,
      showIndex: true,
      expands: ['content'],
      // 排序改变事件处理函数
      sortChange: this.sortChangeHandler,
      searchInputChange: this.searchInputChangeHandler,
      columns: [
        id,
        articleId,
        content,
        publishTime,
        // fromId,
        // fromPetName,
        // fromUserName,
        // toId,
        // toPetName,
        // toUserName,

        custom,
        custom1,
        custom2
      ],




      //comment分页 
      currentPage: 0,
      pageSize: 0,
      articleId: null,
      sortBy: null,
      searchQuery: null,

      //选择框分页
      currentPage2: 0,
      pageSize2: 0,
    }
  },
  components: {
    ElCustomTable,
    ElCustomPagination
  },
  methods: {
    //删除按钮点击处理函数
    clickHandler (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        deleteCommentData(row.id).then(res => {
          this.getData()
          console.log(res)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    getOptions () {
      getArticlesData(this.currentPage2,
        this.pageSize2).then(res => {
          var x_pagination = JSON.parse(res.headers["x-pagination"])
          this.total2 = x_pagination.totalCount
          console.log(res.data)
          this.options = res.data
        })
    },
    change (val) {
      this.articleId = val
      this.getData()
    },
    mapper (data) {
      var array = []
      data.forEach(element => {
        array.push({
          id: element.id,
          articleId: element.articleId,
          content: element.content,
          publishTime: element.publishTime,
          fromId: element.from != null ? element.from.id : "空",
          fromPetName: element.from != null ? element.from.petName : "空",
          fromUserName: element.from != null ? element.from.userName : "空",
          toId: element.to != null ? element.to.id : "空",
          toPetName: element.to != null ? element.to.petName : "空",
          toUserName: element.to != null ? element.to.userName : "空"
        })
      });
      return array
    },
    getData () {
      getCommentsData(this.currentPage,
        this.pageSize,
        this.articleId,
        this.searchQuery,
        this.sortBy).then(res => {
          var x_pagination = JSON.parse(res.headers["x-pagination"])
          this.total = x_pagination.totalCount

          this.tableData = this.mapper(res.data)
        })
    },
    // 分页1相关处理函数
    // 下一页处理函数
    handleNextClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    // 上一页处理函数
    handlePrevClick (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    // 当前页改变处理函数
    handleCurrentChange (currentPage, pageSize) {
      this.currentPage = currentPage
      this.getData()
    },
    // 分页大小改变处理函数
    handleSizeChange (currentPage, pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    // 排序改变处理函数
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
    // 搜索内容改变处理函数
    searchInputChangeHandler (search) {
      this.searchQuery = search
      console.log(search)
      this.getData()
    },



    // 分页2相关处理函数
    handleNextClick2 (currentPage, pageSize) {
      this.currentPage2 = currentPage
      this.getOptions()
    },
    // 上一页处理函数
    handlePrevClick2 (currentPage, pageSize) {
      this.currentPage2 = currentPage
      this.getOptions()
    },
    // 当前页改变处理函数
    handleCurrentChange2 (currentPage, pageSize) {
      this.currentPage2 = currentPage
      this.getOptions()
    },

  },
  created () {
    // 初始数据
    this.currentPage = 1,
      this.pageSize = this.paginationConfig.pageSizes[0]
    this.currentPage2 = 1,
      this.pageSize2 = this.paginationConfig2.pageSizes[0]
    this.getData()
    this.getOptions()
  },
  mounted () {
    // 绑定分页1处理函数
    this.paginationConfig.handleNextClick = this.handleNextClick
    this.paginationConfig.handlePrevClick = this.handlePrevClick
    this.paginationConfig.handleCurrentChange = this.handleCurrentChange
    this.paginationConfig.handleSizeChange = this.handleSizeChange

    // 绑定分页2处理函数
    this.paginationConfig2.handleNextClick = this.handleNextClick2
    this.paginationConfig2.handlePrevClick = this.handlePrevClick2
    this.paginationConfig2.handleCurrentChange = this.handleCurrentChange2

    this.columns[this.columns.length - 1].customElements[0].clickHandler = this.clickHandler
    console.log(this.columns[this.columns.length - 1].customElements[0])
  },
}
</script>

<style>
</style>