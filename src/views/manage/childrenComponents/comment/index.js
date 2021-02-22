import {
  Column,
  CustomButton,
  CustomTag,
  CustomPopover
} from 'components/common/table/index'
import {
  Options
} from 'components/common/pagination/index'

let paginationConfig = new Options({
  // small: true,
  // 可选分页数
  pageSizes: [5, 10, 3, 1],
  // 选择器个数
  pagerCount: 5,
  // 组件
  layout: "sizes,prev,pager,next,->,jumper",
  // 是否添加背景颜色
  backGround: true,
  // 代替图标显示上一页或下一页''空则启用图标
  // prevText: '上一页',
  // nextText: '下一页',

})
let paginationConfig2 = new Options({
  // small: true,
  // 可选分页数
  pageSizes: [5],
  // 选择器个数
  pagerCount: 5,
  // 组件
  layout: "prev,pager,next",
  // 是否添加背景颜色
  // 代替图标显示上一页或下一页''空则启用图标
  // prevText: '上一页',
  // nextText: '下一页',

})
let id = new Column({
  prop: 'id',
  label: 'Id',
})
let articleId = new Column({
  prop: 'articleId',
  fixed: false,
  label: '文章Id',
  sortable: false
})
let content = new Column({
  prop: 'content',
  fixed: false,
  label: '评论内容',
  width: 300
})
let publishTime = new Column({
  prop: 'publishTime',
  fixed: false,
  label: '发布时间',
  sortable: true,
  width: 150
})

let fromId = new Column({
  prop: 'fromId',
  fixed: false,
  label: 'ID',
})
let fromUserName = new Column({
  prop: 'fromUserName',
  fixed: false,
  label: '用户名',
})
let toId = new Column({
  prop: 'toId',
  fixed: false,
  label: 'ID',
})
let toUserName = new Column({
  prop: 'toUserName',
  fixed: false,
  label: '用户名',
})


let button2 = new CustomButton({
  label: '删除',
  type: 'danger',
  size: 'mini',
})
let tag = new CustomTag({
  style: {
    评论人: 'success',
    被评论人: 'primary'
  }
})
let popover = new CustomPopover({
  popoverItems: [{
    label: 'ID',
    prop: 'fromId'
  }, {
    label: '用户名',
    prop: 'fromUserName'
  }, {
    label: '昵称',
    prop: 'fromPetName'
  }],
  tag: tag
})
let popover2 = new CustomPopover({
  popoverItems: [{
    label: 'ID',
    prop: 'toId'
  }, {
    label: '用户名',
    prop: 'toUserName'
  }, {
    label: '昵称',
    prop: 'toPetName'
  }],
  tag: tag
})
// 自定义popover列0
let custom = new Column({
  prop: 'fromPetName',
  fixed: false,
  custom: true,
  // widthSearchInput: true,
  label: '评论人',
  // scope: 'scope',
  // name: "Option",
  // fixed: 'right',
  customType: 'popover',
  customElements: [
    popover
  ]
})
// 自定义popver列1
let custom1 = new Column({
  prop: 'toPetName',
  fixed: false,
  custom: true,
  // widthSearchInput: true,
  label: '被评论人',
  // scope: 'scope',
  // name: "Option",
  // fixed: 'right',
  customType: 'popover',
  customElements: [
    popover2
  ]
})
// 自定义操作列
let custom2 = new Column({
  custom: true,
  widthSearchInput: true,
  label: '操作',
  width: '150',
  // scope: 'scope',
  // name: "Option",
  fixed: 'right',
  customType: 'button',
  customElements: [
    button2
  ]
})

export {
  id,
  articleId,
  content,
  publishTime,
  fromId,
  fromUserName,
  toId,
  toUserName,
  custom,
  custom1,
  custom2,
  paginationConfig,
  paginationConfig2
}