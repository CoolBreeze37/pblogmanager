import {
  ArgForInput,
  submitForm
} from 'components/common/form/index'
let userName = new ArgForInput({
  label: '用户名',
  key: 'userName',
  typeInner: 'text',
  autoComplete: 'off',
  placeholder: '',
  disable: true,
  isNumber: false
})
let petName = new ArgForInput({
  label: '昵称',
  key: 'petName',
  typeInner: 'text',
  autoComplete: 'off',
  placeholder: '',
  isNumber: false,
  disable: true
})
let email = new ArgForInput({
  label: '邮箱',
  key: 'email',
  typeInner: 'text',
  autoComplete: 'off',
  placeholder: '',
  disable: true,
  isNumber: false
})
let phone = new ArgForInput({
  label: '电话',
  key: 'phone',
  typeInner: 'text',
  autoComplete: 'off',
  placeholder: '',
  isNumber: false,
  disable: true
})
export {
  userName,
  petName,
  email,
  phone,
  submitForm
}