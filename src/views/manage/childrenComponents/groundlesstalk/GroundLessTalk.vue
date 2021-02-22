<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="20"
              :md="15"
              :lg="15"
              :xl="15">
        <el-card>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/groundLessTalk">闲言碎语管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="10"
              :md="10"
              :lg="10"
              :xl="10">
        <el-input v-model="inputVal"
                  placeholder="发表一下你此时的心情吧"
                  size="normal"
                  type="textarea"
                  maxlength="150"
                  rows="5"
                  show-word-limit
                  clearable
                  @change=""></el-input>
        <el-button type="primary"
                   size="default"
                   style="float:right;margin-top:5px"
                   @click="release">发布</el-button>

      </el-col>
    </el-row>
    <br>
    <br>
    <el-row type="flex"
            justify="center">

      <el-col :xs="24"
              :sm="20"
              :md="15"
              :lg="15"
              :xl="15"
              class="time-line-bg">

        <el-custom-timeline :items="groundLessTalks"
                            :confirmHandler="confirmHandler"></el-custom-timeline>
        <el-custom-pagination style="text-align:center;height:5vh;margin-top:13px"
                              :Options="options"
                              :Total="total"></el-custom-pagination>

      </el-col>

    </el-row>

  </div>

</template>

<script>
import ElCustomTimeline from 'components/common/timeline/ElCustomTimeline'
import ElCustomPagination from 'components/common/pagination/ElCustomPagination'
import { getGroundLessTalksData, deleteGroundLessTalkData, createGroundLessTalkData } from 'network/groundLessTalk.js'
import {
  options
} from './index'
export default {
  components: {
    ElCustomTimeline,
    ElCustomPagination
  },
  data () {
    return {
      groundLessTalks: [],
      inputVal: '',
      options,
      total: 0,

      currentPage: 0,
      pageSize: 0,
    }
  },
  methods: {
    getData () {
      getGroundLessTalksData(this.currentPage, this.pageSize).then(res => {
        this.groundLessTalks = this.mapper(res.data)
        var x_pagination = JSON.parse(res.headers["x-pagination"])
        this.total = x_pagination.totalCount
      })
    },
    release () {
      if (this.inputVal.trim() == "") {
        this.$message({
          type: 'warning',
          message: '您什么内容都还没写呢!'
        })
        return
      }
      var form = new FormData()
      form.append("content", this.inputVal)
      createGroundLessTalkData(form).then(res => {
        if (res.status == 201) {
          this.getData()
          this.$message({
            type: 'success',
            message: '发布成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '发布失败!'
          })
        }
      })
    },
    confirmHandler (e) {
      deleteGroundLessTalkData(e).then((res) => {
        if (res.status == 204 || res.status == 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
    mapper (arr) {
      var items = []
      var time = null
      var preItem = null
      var item = null
      arr.forEach(element => {

        var publishTimeA = element.publishTime.match(/^[0-9]+.*\s/)[0]
        var publishTimeB = element.publishTime.match(/\s(.*[0-9]$)/)[0]


        publishTimeB = publishTimeB.replace(/([0-9]+):([0-9]+):([0-9]+)/, "$1时$2分$3秒")
        if (time != publishTimeA) {
          preItem = item
          if (preItem != null) {
            items.push(preItem)
          }

          time = publishTimeA
          item = {
            timestamp: publishTimeA,
            subItems: []
          }
        }
        item.subItems.push({ id: element.id, content: element.content, time: publishTimeB })

      });
      items.push(item)
      return items;
    }, handleNextClick (currentPage, pageSize) {
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
  },
}

</script>
<style>
.time-line-bg {
  padding: 10px;
  border-radius: 5px;
  background-color: #2d39368f;
}
.el-timeline-item__timestamp {
  color: black;
}
</style>