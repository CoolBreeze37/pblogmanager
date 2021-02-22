<template>
  <el-timeline>
    <el-timeline-item v-for="(item,index) in items"
                      :key="index"
                      :class="index%2==0?'':'el-timeline-left'"
                      :timestamp="item.timestamp"
                      placement="top">
      <el-card v-for="(subItem,subIndex) in item.subItems"
               :key="subIndex">
        <el-popconfirm class="custom-popconfirm"
                       @confirm="handleConfirm(subItem.id)"
                       @cancel="cancelHandler"
                       title="确定要永久删除这条闲言碎语吗？">
          <i slot="reference"
             class="el-icon-delete"></i>
        </el-popconfirm>
        <p>{{subItem.content}}</p>
        <span class="myspan"><i class="el-icon-timer"></i> {{subItem.time}}</span>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    confirmHandler: Function
  },
  methods: {
    cancelHandler (e) {
      console.log(e)
      this.$message({
        type: 'info',
        message: '已取消删除'
      });
    },
    handleConfirm (val) {
      if (this.confirmHandler) {
        this.confirmHandler(val)
      }
      else {
        console.log("请为我添加确认处理函数")
      }
    }
  }
}
</script>
<style>
.el-timeline-item__tail {
  left: 50%;
  transform: translateX(-50%);
}
.el-timeline-item__node--normal {
  left: 50%;
  transform: translateX(-50%);
}
.el-timeline-item__wrapper {
  width: calc(50% - 28px);
  left: 50%;
}
.el-timeline-left .el-timeline-item__wrapper {
  text-align: right;
  padding-left: 0;
  left: 0;
}
.el-timeline-item__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.el-timeline-left .el-timeline-item__content {
  align-items: flex-end;
}

.el-timeline-item__content .el-card {
  position: relative;
  text-align: left;
  padding-bottom: 20px;
  margin-bottom: 15px;
}
.el-card p {
  margin-bottom: 10px;
}
/*  .el-card::before {
  opacity: 0.3;
  cursor: pointer;
  position: absolute;
  right: 4px;
  color: red;
  content: "\2716";
} */
.el-timeline-item__content .el-card:hover {
  transform: scale(1.1);
}
/* .el-card:hover::before {
  transition: all 0.2s ease-in;
  opacity: 1;
} */
.el-card .myspan {
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: #b5b7b8;
  bottom: 15px;
}
.custom-popconfirm {
  opacity: 0.5;
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 1px;
  color: red;
  position: absolute;
}
.custom-popconfirm:hover {
  opacity: 1;
  transition: all 0.2s ease-in;
  opacity: 1;
}
</style>
