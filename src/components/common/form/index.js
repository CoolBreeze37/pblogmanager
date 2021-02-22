class ArgForInput {
  constructor(options) {
    this.options = options === undefined ? {} : options;
    this.width = this.options.width === undefined ? "" : this.options.width;
    //设置标签
    this.label = this.options.label === undefined ? "label" : this.options.label;
    //设置对应的form表单数据对应字段
    this.key = this.options.key === undefined ? "key" : this.options.key;
    // 设置为el-input 的类型
    this.type = "input";
    // el-input 的内部属性类型
    this.typeInner = this.options.typeInner === undefined ? "text" : this.options.typeInner;
    // 是否自动显示填写过的选项 off/on
    this.autoComplete = this.options.autoComplete === undefined ? "off" : this.options.autoComplete;
    // 设置placeholder
    this.placeholder = this.options.placeholder === undefined ? "placeholder" : this.options.placeholder;
    // 是否使用v-model.number true/false
    this.isNumber = this.options.isNumber === undefined ? false : this.options.isNumber;
    // 是否为输入框添加图标 true/false
    this.showIcon = this.options.showIcon === undefined ? false : this.options.showIcon;
    this.disable = this.options.disable === undefined ? false : this.options.disable;

  }
}
class ArgForDatePicker {
  constructor(options) {
    this.width = this.options.width === undefined ? "" : this.options.width;
    this.options = options === undefined ? {} : options;
    //设置标签
    this.label = this.options.label === undefined ? "label" : this.options.label;
    //设置对应的form表单数据对应字段
    this.key = this.options.key === undefined ? "key" : this.options.key;
    // el-date-picker 的类型
    this.type = "date-picker";
    // el-date-picker的内部属性类型
    this.typeInner = this.options.typeInner === undefined ? "date" : this.options.typeInner;
    // 设置size
    this.size = this.options.size === undefined ? "default" : this.options.size;
    // 设置placeholder
    this.placeholder = this.options.placeholder === undefined ? "placeholder" : this.options.placeholder;
  }
}
class ArgForSelect {
  constructor(arg) {
    this.width = this.options.width === undefined ? "" : this.options.width;
    this.arg = arg === undefined ? {} : arg;
    //设置标签
    this.label = this.arg.label === undefined ? "label" : this.arg.label;
    //设置对应的form表单数据对应字段
    this.key = this.arg.key === undefined ? "key" : this.arg.key;
    // el-select 的类型
    this.type = "select";
    // el-select 是否可搜索
    this.filterable = this.arg.filterable === undefined ? false : this.arg.filterable;
    //选项
    this.options = this.arg.options === undefined ? [] : this.arg.options;
  }
}
class SelectItem {
  constructor(label, value) {
    this.label = label;
    this.value = value;
  }
}
// class ArgForButton {
//   constructor(options) {
//     this.options = options === undefined ? {} : options;
//     // select-button
//     this.type = "button";
//     // 按钮组
//     this.buttons = this.options.buttons === undefined ? [] : this.options.buttons
//   }
// }
// class ButtonItem {
//   constructor(options) {
//     this.options = options === undefined ? {} : options;
//     this.label = this.options.label === undefined ? "label" : this.options.label;
//     // el-button的内部属性类型
//     this.typeInner = this.options.typeInner === undefined ? "primary" : this.options.typeInner;
//     // 设置size
//     this.size = this.options.size === undefined ? "default" : this.options.size;
//     // 绑定clickEvent
//     this.clickEvent = this.options.clickEvent === undefined ? null : this.options.clickEvent;
//     // 为clickEvent传的参数
//     this.clickEventArg = this.options.clickEventArg === undefined ? null : this.options.clickEventArg;
//   }
// }



//提交并进行全局校验
function submitForm(formName, action) {
  var Form = this.$refs[formName]
  Form.validate((valid) => {
    // valid为校验后的结果true/false
    if (valid) {
      action()
    } else {
      alert("error submit!")
      return false;
    }
  });
}
//重置所有字段
function resetForm(formName) {
  this.$refs[formName].resetFields();
}

export {
  ArgForInput,
  ArgForSelect,
  SelectItem,
  ArgForDatePicker,
  // ArgForButton,
  // ButtonItem,
  submitForm,
  resetForm
}