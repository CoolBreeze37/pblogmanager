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
export {
  options
}