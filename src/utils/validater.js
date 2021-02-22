function validateVerifycode(rule, value, callback) {
  if (value !== this.identifyCode) {
    callback(new Error('验证码不正确!'))
  } else {
    callback()
  }
}

function validPhone(rule, value, callback) {
  if (!value) {
    callback()
  } else if (!(/^1[3|4|5|7|8][0-9]\d{8}$/).test(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
}
export {
  validateVerifycode,
  validPhone
}