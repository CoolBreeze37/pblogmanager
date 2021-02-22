import {
  Column,
  CustomButton,
} from 'components/common/table/index'
import {
  Options
} from 'components/common/pagination/index'

let options = new Options({
  // small: true,
  // 可选分页数
  pageSizes: [2, 5],
  // 选择器个数
  pagerCount: 5,
  // 组件
  layout: "sizes,prev,pager,next,jumper",
  // 是否添加背景颜色
  backGround: true,
  // 代替图标显示上一页或下一页''空则启用图标
  // prevText: '上一页',
  // nextText: '下一页',

})
let id = new Column({
  prop: 'id',
  label: 'Id',
})
let name = new Column({
  prop: 'name',
  fixed: false,
  label: '歌曲名称',
  sortable: true,
  width: 150
})
let artist = new Column({
  prop: 'artist',
  fixed: false,
  label: '歌手',
})
let size = new Column({
  prop: 'size',
  fixed: false,
  label: '大小',
  sortable: true,

})
let length = new Column({
  prop: 'length',
  fixed: false,
  label: '时长',
})
let path = new Column({
  prop: 'path',
  fixed: false,
  label: '路径',
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
  width: '120',
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
  name,
  artist,
  size,
  length,
  path,
  custom2,
  options
}