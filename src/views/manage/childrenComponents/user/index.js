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
  label: 'UID',
})
let userName = new Column({
  prop: 'userName',
  fixed: false,
  label: '用户名',
  sortable: true
})
let petName = new Column({
  prop: 'petName',
  fixed: false,
  label: '昵称',
})
let profileInfoId = new Column({
  prop: 'profileInfoId',
  fixed: false,
  label: 'PID',
})
let email = new Column({
  prop: 'email',
  fixed: false,
  label: '邮箱',
})
let phone = new Column({
  prop: 'phone',
  fixed: false,
  label: '电话',
})
let personalSignature = new Column({
  prop: 'personalSignature',
  fixed: false,
  label: '个性签名'
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
    button2
  ]
})

export {
  id,
  userName,
  petName,
  profileInfoId,
  email,
  phone,
  personalSignature,
  custom2,
  options
}