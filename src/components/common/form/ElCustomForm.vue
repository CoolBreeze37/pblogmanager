<template>
  <el-form :model="Form"
           :inline="Options.inline"
           :status-icon="Options.statusIcon"
           :rules="rules"
           index
           ref="Form"
           label-width="80px">
    <el-form-item v-for="(item,index) in formLabel"
                  :key="index"
                  :label="item.label"
                  :prop="item.key">
      <!-- type类型为input时 -->
      <el-input v-model="Form[item.key]"
                :style="{width:item.width+'px'}"
                :disabled="item.disable"
                :type="item.typeInner"
                :placeholder="item.placeholder"
                :autoComplete="item.autoComplete"
                v-if="item.type==='input'&&item.isNumber==false">
        <i class="el-icon-view el-input__icon"
           slot="suffix"
           @click="showPassword(index)"
           v-if="item.showIcon">
        </i>
      </el-input>
      <el-input v-model.number="Form[item.key]"
                :type="item.typeInner"
                :disabled="item.disable"
                :placeholder="item.placeholder"
                :autoComplete="item.autoComplete"
                v-if="item.type==='input'&&item.isNumber==true">
      </el-input>
      <!-- type类型为select类型时 -->
      <el-select v-model="Form[item.key]"
                 :placeholder="item.placeholder"
                 :filterable="item.filterable"
                 v-if="item.type==='select'">
        <el-option v-for="(subItem,index) in item.options"
                   :key="index"
                   :label="subItem.label"
                   :value="subItem.value"></el-option>

      </el-select>
      <!-- type类型为date-picker -->
      <el-date-picker v-model="Form[item.key]"
                      :type="item.typeInner"
                      :size="item.size"
                      :placeholder="item.placeholder"
                      v-if="item.type==='date-picker'">
      </el-date-picker>
      <!-- type为button -->
      <!-- <el-button v-for="(button,index) in item.buttons"
                 :key="index"
                 :type="button.typeInner"
                 :size="button.size"
                 @click="button.clickEvent.bind($refs)(button.clickEventArg)"
                 v-if="item.type==='button'">{{button.label}}</el-button> -->

    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
    <slot name="bottom"></slot>
  </el-form>
</template>
<script>
export default {
  name: 'Form',
  // Options: {
  //       inline: false,
  //       statusIcon: true
  //     },
  //     Form: {
  //       pass: '',
  //       region: '',
  //       checkPass: '',
  //     },
  //     formLabel: [
  //       pass,
  //       region,
  //       checkPass,
  //       date,
  //       button
  //     ],
  //     rules: {
  //       pass: [
  //         { validator: validatePass.bind(this), trigger: 'blur' }
  //       ],
  //       checkPass: [
  //         { validator: validatePass2.bind(this), trigger: 'blur' }
  //       ],
  //       age: [
  //         { validator: checkAge.bind(this), trigger: 'blur' }
  //       ]
  //     },
  data () {
    return {
      width: 100
    }
  },
  props: {
    Options: Object,
    Form: Object,
    formLabel: Array,
    rules: Object
  },
  methods: {
    // 通过改变input的type使密码可见
    showPassword (index) {
      this.formLabel[index].typeInner === ''
        ? (this.formLabel[index].typeInner = 'password')
        : (this.formLabel[index].typeInner = '')
    },
  },
}
</script>
<style>
</style>

