<template>
  <div>
    <el-row type="flex"
            justify="center">
      <el-col :xs="24"
              :sm="22"
              :md="18"
              :lg="15">
        <el-card>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/profile">个人信息管理</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
        <br>
      </el-col>
    </el-row>
    <el-row type="flex"
            justify="center"
            style="min-height:85vh">

      <el-col :xs="24"
              :sm="8"
              :md="6"
              :lg="5"
              class="el-col-justify-center photo-wrapper">
        <el-avatar :size="120"
                   class="avatar"
                   :src="photoUrl">
          <img :src="defaultheader" />
        </el-avatar>
        <br>
        <h4>小子有一剑</h4>
        <br>
        <el-upload ref="upload"
                   action=""
                   :http-request="uploadSectionFile"
                   :before-upload="beforeAvatarUpload"
                   :show-file-list="false">
          <el-button slot="trigger"
                     size="small"
                     type="primary">修改头像</el-button>
        </el-upload>
        <br>
        <el-input v-model="PersonalSignature"
                  placeholder=""
                  size="normal"
                  rows="5"
                  clearable
                  @change="updataPersonalSignature"
                  style="width:90%"
                  maxlength="150"
                  show-word-limit
                  type="textarea"></el-input>
      </el-col>
      <el-col :xs="24"
              :sm="14"
              :md="12"
              :lg="10"
              class="el-col-placement">
        <el-card class="box-card"
                 style="width:90%">
          <div slot="header"
               class="clearfix">
            <el-divider content-position="left"><span>账号信息</span></el-divider>
          </div>
          <el-custom-form :Options="Options1"
                          ref="el-customer-form1"
                          :Form="Form1"
                          :formLabel="formLabel1"
                          :rules="rules1">

          </el-custom-form>

        </el-card>
        <div class="el-col-btns">
          <el-button type="primary"
                     icon="el-icon-edit"
                     @click="edit1"></el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     @click="submitForm1('Form',action1)"
                     :disabled="btn1Disable"></el-button>
        </div>
        <el-card class="box-card"
                 style="width:90%">
          <div slot="header"
               class="clearfix">
            <el-divider content-position="left"><span>个人信息</span></el-divider>
          </div>
          <el-custom-form :Options="Options2"
                          ref="el-customer-form2"
                          :Form="Form2"
                          :formLabel="formLabel2"
                          :rules="rules2">
          </el-custom-form>
        </el-card>
        <div class="el-col-btns">
          <el-button type="primary"
                     icon="el-icon-edit"
                     @click="edit2"></el-button>
          <el-button type="success"
                     icon="el-icon-check"
                     @click="submitForm2('Form',action2)"
                     :disabled="btn2Disable"></el-button>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import ElCustomForm from 'components/common/form/ElCustomForm'
import { petName, userName, email, phone, submitForm } from './index.js'
import { validPhone } from 'utils/validater'
import { getUserData, getUserProfileInfoData, updataUserData, updataUserProfileInfoData, uploadPhoto } from 'network/profile.js'
export default {
  data () {

    return {
      photoUrl: null,
      submitForm1: null,
      submitForm2: null,
      btn1Disable: true,
      btn2Disable: true,
      defaultheader: require('@/' + "assets/defaultHeader.png"),
      PersonalSignature: "",
      disable: true,

      Options1: {
        inline: true,
        statusIcon: true
      },
      oldForm1Data: {
        petName: '',
      },
      oldForm2Data: {
        email: '',
        phone: '',
      },
      Form1: {
        userName: '',
        petName: '',
      },
      formLabel1: [
        userName,
        petName
      ],
      rules1: {
        petName: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '昵称须在1~20个字符之间', trigger: 'blur' }
        ],
      },
      Options2: {
        inline: true,
        statusIcon: true
      },
      Form2: {
        email: '',
        phone: '',
      },
      formLabel2: [
        email,
        phone
      ],
      rules2: {
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        phone: [
          { validator: validPhone, trigger: ['blur'] }
        ],
      },
      user: null
    }
  },
  components: {
    ElCustomForm
  },
  methods: {
    getData (op = 0) {
      getUserData(JSON.parse(window.sessionStorage.getItem("user")).id).then((result) => {
        this.user = result.data
        if (op == 1) {
          this.resetSetItem("user", JSON.stringify(this.user))
        }
        this.oldForm1Data.petName = result.data.petName
        this.Form1.userName = result.data.userName
        this.Form1.petName = result.data.petName
      });
      getUserProfileInfoData(JSON.parse(window.sessionStorage.getItem("user")).id).then((result) => {
        this.oldForm2Data.email = result.data.email
        this.oldForm2Data.phone = result.data.phone
        this.Form2.email = result.data.email
        this.Form2.phone = result.data.phone
        this.photoUrl = this.$store.state.hostUrl + result.data.photoPath
        this.PersonalSignature = result.data.personalSignature
      });
    },
    updataPersonalSignature () {

      var data = [{
        "op": "replace",
        "path": "/personalsignature",
        "value": this.PersonalSignature
      }]
      updataUserProfileInfoData(this.user.id, data).then(result => {
        this.getData()
        this.$message({
          type: 'success',
          message: '个性签名修改成功!'
        })
      })
    }
    ,
    uploadSectionFile (params) {
      var file = params.file;
      var form = new FormData()
      form.append("file", file)
      uploadPhoto(this.user.id, form).then((result) => {
        if (result.status == 204) {
          this.getData(1)
          params.onSuccess()
          this.$message({
            type: 'success',
            message: '上传成功'
          })

        } else {
          this.$message({
            type: 'error',
            message: "上传失败"
          })
        }
      });
    },
    submitUpload () {
      this.$refs.upload.submit();
    },
    // 限制上传文件格式
    beforeAvatarUpload (file) {
      const isJP = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJP) {
        this.$message({
          showClose: true,
          type: 'error',
          message: "上传头像图片只能是 jpeg/png 格式!"
        })
        return isJP
      }

      if (!isLt2M) {

        this.$message({
          showClose: true,
          type: 'error',
          message: "上传头像图片大小不能超过 2MB!"
        })
        return isLt2M;
      }
      return true
    },
    edit1 () {
      petName.disable = !petName.disable;
      this.btn1Disable = !this.btn1Disable
    },
    edit2 () {
      email.disable = !email.disable;
      phone.disable = !phone.disable;
      this.btn2Disable = !this.btn2Disable
    },
    action1 () {
      if (this.oldForm1Data.petName == this.Form1.petName) {
        this.$message({
          type: 'info',
          message: '账号信息未作任何更改'
        })
        return
      }
      var data = [
        {
          "op": "replace",
          "path": "/petname",
          "value": this.Form1.petName
        }
      ]
      updataUserData(this.user.id, data).then(result => {
        if (result.status == 204) {
          this.getData()
          this.edit1()
          this.$message({
            type: 'success',
            message: '账号信息修改成功!'
          })
        }
      })
    },
    action2 () {
      if (this.oldForm2Data.email == this.Form2.email && this.oldForm2Data.phone == this.Form2.phone) {
        this.$message({
          type: 'info',
          message: '个人信息未作任何更改'
        })
        return
      }
      var data = []
      if (this.oldForm2Data.email != this.Form2.email) {
        data.push({
          "op": "replace",
          "path": "/email",
          "value": this.Form2.email
        })
      }
      if (this.oldForm2Data.phone != this.Form2.phone) {
        data.push({
          "op": "replace",
          "path": "/phone",
          "value": this.Form2.phone
        })
      }
      console.log(data)
      updataUserProfileInfoData(this.user.id, data).then(result => {
        if (result.status == 204) {
          this.getData()
          this.edit2()
          this.$message({
            type: 'success',
            message: '个人信息修改成功!'
          })
        }
      })
    }
  },
  mounted () {
    this.submitForm1 = submitForm.bind(this.$refs['el-customer-form1'])
    this.submitForm2 = submitForm.bind(this.$refs['el-customer-form2'])
  },
  created () {
    this.getData()
  },
}
</script>

<style>
.photo-wrapper {
  background-color: #2282c682;
  box-shadow: 3px 3px 5px 0 #2282c6;
  margin-bottom: 10px;
}
.el-col-justify-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  margin-top: 100px;
}
.el-col-btns {
  margin-top: 10px;
  width: 80%;
  display: flex;
  justify-content: flex-end;
}
.el-col-placement {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.el-card__header {
  height: 30px;
  padding: 5px 0;
  border-bottom: none;
}
@media screen and (max-width: 600px) {
  .el-row--flex.is-justify-center {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>