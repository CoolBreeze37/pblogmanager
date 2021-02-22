<template>
  <el-container class="bg"
                direction="vertical">
    <el-row type="flex"
            align="middle"
            justify="center"
            style="height:100vh;width:100vw">
      <el-col :xs="23"
              :sm="14"
              :md="12"
              :lg="8"
              :xl="8">
        <el-card shadow="always"
                 style="background-color:#e3f2fd">
          <h1 style="text-align:center;color:#303133">Pblog管理员的登录</h1>
          <br>
          <el-custom-form :Options="Options"
                          ref="el-customer-form"
                          :Form="Form"
                          :formLabel="formLabel"
                          :rules="rules">

            <!-- 验证码 -->
            <div class="identifybox">
              <div>
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
              <el-button @click="refreshCode"
                         type='text'
                         class="textbtn">看不清，换一张</el-button>
            </div>
            <!-- 底部按钮 -->
            <el-form-item slot="bottom"
                          label=""
                          align="right"
                          size="normal">
              <el-button type="primary"
                         size="default"
                         @click="submitForm('Form',action)">登录</el-button>
              <el-button size="default"
                         @click="resetForm('Form')">重置</el-button>

            </el-form-item>

          </el-custom-form>
        </el-card>

      </el-col>
    </el-row>

  </el-container>

</template>

<script>
import { GetTokenData } from 'network/login'
import { getUserData } from 'network/profile'
import {
  ElCustomForm,
  SIdentify,
  userName,
  passWord,
  verifyCode,
  resetForm,
  submitForm,
  randomNum,
  validateVerifycode
} from './index'

export default {
  data () {
    return {
      identifyCodes: '1234567890',
      identifyCode: '',
      resetForm: null,
      submitForm: null,
      Options: {
        inline: false,
        statusIcon: true
      },
      Form: {
        userName: 'administrator',
        passWord: '12345678',
        verifyCode: ''
      },
      formLabel: [
        userName,
        passWord,
        verifyCode
      ],
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 6, max: 25, message: '用户名格式不正确', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 30, message: '密码格式不正确', trigger: 'blur' }
        ],
        // 对验证码进行本地验证，不进行提交
        verifyCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { validator: validateVerifycode.bind(this), trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    ElCustomForm,
    SIdentify
  },
  methods: {
    action () {
      var data = {
        "username": this.Form.userName,
        "password": this.Form.passWord
      }
      GetTokenData(data).then((result) => {
        if (result.status == 200) {
          // if (result.data.role != "Admin") {
          //   this.$message({
          //     type: "error",
          //     message: "用户未被授权！"
          //   })
          // }
          if (result.data.role == "Admin") {
            this.$message({
              type: 'success',
              message: '登陆成功！'
            })
            window.sessionStorage.setItem('token', result.data.token)
            getUserData(result.data.uid).then((res) => {
              window.sessionStorage.setItem('user', JSON.stringify(res.data))
              this.$router.push('/home')
            })
          }
        }
      }).catch((err) => {
        if (err.response.status == 401) {
          this.$message({
            type: "error",
            message: "用户名或密码错误！"
          })
        }
      });


    },
    // 切换验证码
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    // 生成四位随机验证码
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          randomNum(0, this.identifyCodes.length)
        ]
      }
    }
  },
  mounted () {
    // 通过bind改变方法中this的指向使其可以访问子组件的$refs属性
    this.resetForm = resetForm.bind(this.$refs['el-customer-form'])
    this.submitForm = submitForm.bind(this.$refs['el-customer-form'])
  },
}
</script>

<style scoped>
.bg {
  background-color: blue;
}
</style>