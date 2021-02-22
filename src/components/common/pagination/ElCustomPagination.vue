<template>
  <!-- Options 
              small:是否小型分页
              layout:组件 total,sizes,prev,pager,next,->,jumper -->
  <el-pagination class=".el-pagination__total"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 @prev-click="handlePrevClick"
                 @next-click="handleNextClick"
                 :page-sizes="Options.pageSizes"
                 :background="Options.backGround"
                 :prev-text="Options.prevText"
                 :next-text="Options.nextText"
                 :pager-count="Options.pagerCount"
                 :current-page.sync="currentPage"
                 :page-size.sync="pageSize"
                 :small="Options.small"
                 :layout="Options.layout"
                 :total="Total">

  </el-pagination>
</template>

<script>
export default {

  data () {
    return {
      currentPage: 1,
      pageSize: 0
    }
  },
  props: {
    Options: Object,
    Total: Number
  },
  methods: {
    handleSizeChange (val) {
      if (this.Options.handleSizeChange) {
        console.log(val)
        this.Options.handleSizeChange(this.currentPage, val)
      }
      else {
        console.log(`每页 ${val} 条`);
      }
    },
    handleCurrentChange (val) {
      if (this.Options.handleCurrentChange) {
        console.log(val)
        this.Options.handleCurrentChange(val, this.pageSize)
      }
      else {
        console.log(`当前页: ${val}`);
      }
    },
    handlePrevClick (val) {
      if (this.Options.handlePrevClick) {
        this.Options.handlePrevClick(val, this.pageSize)
      }
      else {
        console.log(`我被点击了，当前页: ${val}`);
      }
    },
    handleNextClick (val) {
      if (this.Options.handleNextClick) {
        this.Options.handleNextClick(val, this.pageSize)
      }
      else {
        console.log(`我被点击了，当前页: ${val}`);
      }
    }
  },
  mounted () {
    this.pageSize = this.Options.pageSizes[0]
  },
}
</script>

<style scoped>
</style>