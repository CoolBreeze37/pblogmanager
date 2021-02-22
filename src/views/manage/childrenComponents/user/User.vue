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
          <el-breadcrumb-item><a href="/users">用户管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-card>
      <br>
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
        <el-table-column align="center"
                         label="授权">
          <template v-slot="scope">
            <el-switch v-model="scope.row.isAdmin"
                       @change="update(scope.row.isAdmin,scope.row.id,scope.$index)"
                       active-color="#13ce66">
            </el-switch>
          </template>
        </el-table-column>
      </el-custom-table>
      <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                            :Options="options"
                            :Total="total"></el-custom-pagination>
    </el-col>

  </el-row>

</template>

<script>
import ElCustomTable from 'components/common/table/ElCustomTable'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import { getUsersData, deleteUserData, updateUserData } from 'network/user.js'
import {
  id,
  userName,
  petName,
  profileInfoId,
  email,
  phone,
  personalSignature,
  custom2,
  options
} from './index'
export default {
  data () {
    return {
      // 分页
      options,
      total: 0,
      // 表格
      tableData: [],
      border: false,
      stripe: true,
      height: "80vh",
      showSelector: true,
      showIndex: true,
      expands: ['profileInfoId', 'personalSignature'],
      // 排序改变事件处理函数
      sortChange: this.sortChangeHandler,
      searchInputChange: this.searchInputChangeHandler,
      columns: [
        id,
        userName,
        petName,
        profileInfoId,
        email,
        phone,
        personalSignature,
        // custom1,
        custom2
      ],





      currentPage: 0,
      pageSize: 0,
      sortBy: null,
      searchQuery: null
    }
  },
  components: {
    ElCustomTable,
    ElCustomPagination
  },
  methods: {
    update (val, id, index) {
      console.log(val, id)
      console.log(index)
      var str = val ? "" : "取消"
      this.$confirm('将' + str + '对该用户授权, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var data = [{
          "op": "replace",
          "path": "/isadmin",
          "value": val
        }]
        updateUserData(id, data).then((res) => {
          if (res.status == 204) {
            this.$message({
              type: 'success',
              message: '授权成功！'
            })
          } else {
            this.$message({
              type: 'error',
              message: '授权失败！'
            })
          }
        })
      }).catch(() => {
        this.tableData[index].isAdmin = !this.tableData[index].isAdmin
        this.$message({
          type: 'info',
          message: '已取消操作！'
        });
      });



    },
    //删除按钮点击处理函数
    clickHandler (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        deleteUserData(row.id).then(res => {
          this.getData()
          console.log(res)
          if (res.status == 204) {
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
    mapper (data) {
      var array = []
      data.forEach(element => {
        array.push({
          id: element.id,
          userName: element.userName,
          petName: element.petName,
          profileInfoId: element.profileInfo.id,
          email: element.profileInfo.email,
          phone: element.profileInfo.phone,
          isAdmin: element.isAdmin,

          personalSignature: element.profileInfo.personalSignature
        })
      });
      return array
    },
    getData () {
      getUsersData(this.currentPage,
        this.pageSize,
        this.searchQuery,
        this.sortBy).then(res => {
          var x_pagination = JSON.parse(res.headers["x-pagination"])
          this.total = x_pagination.totalCount
          this.tableData = this.mapper(res.data)
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
    this.currentPage = 1,
      this.pageSize = this.options.pageSizes[0]
    this.getData()
  },
  mounted () {
    this.options.handleNextClick = this.handleNextClick
    this.options.handlePrevClick = this.handlePrevClick
    this.options.handleCurrentChange = this.handleCurrentChange
    this.options.handleSizeChange = this.handleSizeChange
    this.columns[this.columns.length - 1].customElements[0].clickHandler = this.clickHandler
  },
}
</script>

<style>
</style>