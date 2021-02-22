import {
  ArgForInput,
  resetForm,
  submitForm
} from 'components/common/form/index'
import {
  validateVerifycode
} from 'utils/validater'
import {
  randomNum
} from 'utils/random'
import ElCustomForm from 'components/common/form/ElCustomForm'
import SIdentify from 'components/common/form/Identify'


let userName = new ArgForInput({
  label: '用户名',
  key: 'userName',
  typeInner: 'text',
  autoComplete: 'on',
  placeholder: '请输入用户名',
  isNumber: false
})
let passWord = new ArgForInput({
  label: '密码',
  key: 'passWord',
  typeInner: 'password',
  autoComplete: 'off',
  placeholder: '请输入密码',
  isNumber: false,
  showIcon: true
})
let verifyCode = new ArgForInput({
  label: '验证码',
  key: 'verifyCode',
  typeInner: 'text',
  autoComplete: 'off',
  placeholder: '请输入验证码',
  isNumber: false
})
export {
  // 所需子组件
  ElCustomForm,
  SIdentify,
  // 所需字段
  userName,
  passWord,
  verifyCode,
  // 所需方法
  resetForm,
  submitForm,
  randomNum,
  // 自定义验证规则
  validateVerifycode,
}