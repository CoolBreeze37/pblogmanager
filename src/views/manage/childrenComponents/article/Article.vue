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
        </el-breadcrumb>
      </el-card>
      <br>
      <el-tabs v-model="activeName"
               type="border-card"
               :tab-position="'top'"
               @tab-click="handleClick"
               style="background-color:white">
        <el-tab-pane label="我的文章"
                     name="first">
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
                                :Options="options"
                                :Total="total"></el-custom-pagination>
        </el-tab-pane>
        <el-tab-pane label="写文章"
                     name="second">
          <write @fresh="fresh"></write>
        </el-tab-pane>

      </el-tabs>
    </el-col>

  </el-row>

</template>

<script>
import ElCustomTable from 'components/common/table/ElCustomTable'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import Write from './Write'
import { getArticlesData, deleteArticleData } from 'network/article'
import {
  id,
  title,
  summary,
  publishTime,
  lastChangeTime,
  weight,
  views,
  commentCount,
  custom1,
  custom2,
  options
} from './index'
export default {
  data () {
    return {
      activeName: 'first',
      // 分页
      options,
      total: 0,
      // 表格
      tableData: [],
      border: false,
      stripe: true,
      height: "80vh",
      showSelector: false,
      showIndex: true,
      expands: ['id', 'summary'],
      // 排序改变事件处理函数
      sortChange: this.sortChangeHandler,
      searchInputChange: this.searchInputChangeHandler,
      columns: [
        id,
        title,
        summary,
        publishTime,
        lastChangeTime,
        weight,
        views,
        commentCount,
        custom1,
        custom2
      ],





      currentPage: 0,
      pageSize: 0,
      sortBy: null,
      publishTimeYear: null,
      publishTimeMonth: null,
      publishTimeDay: null,
      searchQuery: null
    }
  },
  components: {
    ElCustomTable,
    ElCustomPagination,
    Write
  },
  methods: {
    fresh () {
      this.getData()
    },
    clickHandler1 (row) {
      this.$router.push('/articles/' + row.id)
    },
    clickHandler2 (row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        deleteArticleData(row.id).then(res => {
          this.getData()
          console.log(res)
          if (res.status == 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getData()
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
    handleClick (tab, event) {
      console.log(tab, event);
    },
    getData () {
      getArticlesData(this.currentPage,
        this.pageSize,
        this.publishTimeYear,
        this.publishTimeMonth,
        this.publishTimeDay,
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
      this.searchQuery = search
      this.getData()
    }

  },
  created () {
    // 初始数据
    this.currentPage = 1
    this.pageSize = this.options.pageSizes[0]
    this.getData()
  },
  mounted () {
    this.options.handleNextClick = this.handleNextClick
    this.options.handlePrevClick = this.handlePrevClick
    this.options.handleCurrentChange = this.handleCurrentChange
    this.options.handleSizeChange = this.handleSizeChange

    this.columns[this.columns.length - 1].customElements[0].clickHandler = this.clickHandler1
    this.columns[this.columns.length - 1].customElements[1].clickHandler = this.clickHandler2
  },
}
</script>

<style>
</style>