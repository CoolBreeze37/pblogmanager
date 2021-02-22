function Handler(value, row, column) {
  const property = column['property'];
  return row[property] === value;
}

function filterTag(value, row) {
  return row.isPublish === value;
}

import {
  Column,
  CustomButton,
  CustomTag
} from 'components/common/table/index'
import {
  Options
} from 'components/common/pagination/index'

let options = new Options({
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
let id = new Column({
  prop: 'id',
  label: 'Id',
  // filters: [{
  //   text: '2016-05-01',
  //   value: '2016-05-01'
  // }, {
  //   text: '2016-05-02',
  //   value: '2016-05-02'
  // }, {
  //   text: '2016-05-03',
  //   value: '2016-05-03'
  // }, {
  //   text: '2016-05-04',
  //   value: '2016-05-04'
  // }],
  // filterHandler: Handler,
  // filterPlacement: "bottom-end"
})
let title = new Column({
  prop: 'title',
  fixed: false,
  label: '文章标题',
  sortable: false
})
let summary = new Column({
  prop: 'summary',
  fixed: false,
  label: '概要',
  width: 300
})
let publishTime = new Column({
  prop: 'publishTime',
  fixed: false,
  label: '发布时间',
  sortable: true,
  width: 150
})
let lastChangeTime = new Column({
  prop: 'lastChangeTime',
  fixed: false,
  label: '最新更新日期',
  width: 150
})
let weight = new Column({
  prop: 'weight',
  fixed: false,
  label: '权重',
  sortable: true
})
let views = new Column({
  prop: 'views',
  fixed: false,
  label: '浏览量',
  sortable: true
})
let commentCount = new Column({
  prop: 'commentCount',
  fixed: false,
  label: '评论数'
})
let tag = new CustomTag({
  mapper: {
    false: '未发布',
    true: '已发布'
  },
  style: {
    true: 'success',
    false: 'error'
  }
})
let custom1 = new Column({
  custom: true,
  label: '状态',
  customType: 'tag',
  prop: "isPublish",
  filters: [{
    text: '已发布',
    value: true
  }, {
    text: '未发布',
    value: false
  }],
  filterHandler: filterTag,
  filterPlacement: "bottom-end",
  customElements: [tag]
})
let button1 = new CustomButton({
  label: '编辑',
  type: 'primary',
  size: 'mini',
})
let button2 = new CustomButton({
  label: '删除',
  type: 'danger',
  size: 'mini',
})
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
    button1,
    button2
  ]
})

export {
  // date,
  // address,
  // name,
  // zip,
  // city,
  // province,
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
}