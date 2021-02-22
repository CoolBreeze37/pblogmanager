<template>
  <el-table :data="getData"
            :border="border"
            :stripe="stripe"
            :height="height"
            ref="table"
            @sort-change="changeSort"
            @selection-change="handleSelectionChange"
            @filter-change="handleFilterChange"
            @header-dragend="handleHeaderDragend">
    <el-table-column align="center"
                     type="selection"
                     fixed="left"
                     v-if="showSelector">
    </el-table-column>
    <el-table-column align="center"
                     label="序号"
                     type="index"
                     v-if="showIndex">
    </el-table-column>
    <el-table-column type="expand"
                     v-if="expands.length>0">
      <template slot-scope="props">
        <el-form label-position="left"
                 inline
                 class="demo-table-expand">
          <el-form-item v-for="(col,index) in columns"
                        :key="index"
                        v-if="expands.includes(col.prop)"
                        :label="col.label">
            <span>{{props.row[col.prop]}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-for="(col,index) in columns"
                     v-if="!expands.includes(col.prop)"
                     :key="index"
                     :fixed="col.fixed"
                     :filters="col.filters"
                     :filter-method="col.filterHandler"
                     :filter-placement="col.filterPlacement"
                     :prop="col.prop"
                     :sortable="col.sortable"
                     :label="col.label"
                     :width="col.width"
                     align="center">
      <template v-slot:header
                v-if="col.widthSearchInput">
        <el-input v-model="searchInput"
                  size="mini"
                  class="searchInput"
                  clearable
                  @input="searchInputChange"
                  :validate-event="false"
                  placeholder="输入关键字搜索" />
      </template>
      <!-- 自定义列 -->
      <template v-slot="scope"
                v-if="col.custom">

        <!-- 自定义弹出框 -->
        <el-popover v-if="col.customType=='popover'"
                    trigger="hover"
                    placement="top"
                    v-for="(customItem,customIndex) in col.customElements"
                    :key="customIndex">
          <el-divider><span>{{col.label+"信息"}}</span></el-divider>
          <!-- popoverItems表示要弹出的元素 -->
          <!-- popoverItem.label 弹出元素标签 -->
          <!-- scope.row[popoverItem.prop]弹出元素属性值 -->
          <div v-for="(popoverItem,popoverIndex) in customItem.popoverItems"
               :key="popoverIndex">
            <el-button style="display:inline-block;width:80px;"
                       size="small">{{popoverItem.label}}</el-button>
            <el-input style="display:inline-block;width:250px;margin-left:1px;"
                      :value="scope.row[popoverItem.prop]"
                      size="small"
                      disabled></el-input>
          </div>
          <div slot="reference"
               class="name-wrapper">
            <el-tag size="medium"
                    :type="getStyle(col.label,customItem.tag.style)">{{scope.row[col.prop]}}</el-tag>
          </div>
        </el-popover>

        <!-- 自定义按钮组 -->
        <el-button v-if="col.customType=='button'"
                   v-for="(customItem,customIndex) in col.customElements"
                   :key="customIndex"
                   :type="customItem.type"
                   :size="customItem.size"
                   @click="handleClick(scope.row,customItem.clickHandler)">{{customItem.label}}</el-button>

        <!-- 自定义标签 -->
        <el-tag v-if="col.customType=='tag'"
                v-for="(customItem,customIndex) in col.customElements"
                :key="customIndex"
                :type="getStyle(scope.row[col.prop],customItem.style)"
                disable-transitions>{{customItem.mapper[scope.row[col.prop]]}}</el-tag>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>

</template>

<script>
export default {
  data () {
    return {
      searchInput: '',
      selections: [],
      // loading: this.$store.state.loading
    }
  },
  props: {
    tableData: Array,
    // 是否添加边框
    border: Boolean,
    // 是否隔行换色
    stripe: Boolean,
    // 表格高度
    height: Number | String,
    // 表格字段
    columns: Array,
    // 是否显示选择框
    showSelector: Boolean,
    // 是否显示标号
    showIndex: Boolean,
    // 自定义组
    customs: Array,

    // sortChange处理函数
    sortChange: Function,
    //
    searchInputChangeHandler: Function,
    // 被展开项
    expands: {
      type: Array,
      default: () => {
        return []
      }
    }

  },
  computed: {
    getData () {
      return this.tableData.filter(data => data)
    }
  },
  methods: {
    searchInputChange (e) {
      this.$forceUpdate()
      console.log(this.searchInput)
      if (this.searchInputChangeHandler) {
        this.searchInputChangeHandler(this.searchInput)
      }
    },
    // 按钮点击事件
    handleClick (row, clickHandler) {
      if (clickHandler) {
        clickHandler(row)
      }
      else {
        console.log(row)
      }
      // console.log(row)
    },
    // 获取标签type
    getStyle (tag, style) {
      return style[tag]
    },
    // 选项改变处理函数
    handleSelectionChange (value) {
      this.selections = value;
      console.log(this.selections)
    },
    changeSort (val) {
      if (this.sortChange) {
        this.sortChange(val)
      }
    },
    handleFilterChange (val) {
      console.log(val)
    },
    handleHeaderDragend (val) {
      console.log(val)
    }
  },
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  display: block !important;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 0;
  margin-bottom: 0;
  width: 50%;
}
/* .searchInput {
  border-radius: 3px;
  height: 30px;
  width: 120px;
  outline: skyblue;
  text-overflow: clip;
  border-color: skyblue;
} */
</style>