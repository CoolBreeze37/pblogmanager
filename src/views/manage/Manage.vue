<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <!-- 头部 -->
    <el-header style="font-size: 12px;padding:0 10px;">
      <el-row type="flex"
              justify="space-between">
        <!-- 展开按钮 -->
        <el-col :span="6">
          <el-button @click="drawer = true"
                     type="primary"
                     icon="el-icon-s-unfold">
          </el-button>
        </el-col>
        <!-- 标题 -->
        <el-col :span="12">
          <h1 style="text-align:center;">PBLOG管理</h1>
        </el-col>
        <!--  -->
        <el-col :span="6">
          <el-popconfirm title="确定退出登录吗？"
                         @confirm="quit">
            <el-avatar slot="reference"
                       :size="50"
                       style="float:right;margin-top:5px;margin-right:10px;cursor:pointer"
                       class="avatar"
                       :src="photoUrl1">
              <img :src="defaultheader" />
            </el-avatar>
          </el-popconfirm>
        </el-col>
      </el-row>
    </el-header>
    <!-- 侧边栏 -->
    <el-drawer title="我是标题"
               direction="ltr"
               :visible.sync="drawer"
               :with-header="false"
               size="250px">
      <el-aside width="250px"
                style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message">
              </i>导航一
            </template>
            <el-menu-item-group title="分组一">
              <el-menu-item index="1-1">
                <router-link to="/users"
                             tag="li">用户管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/articles"
                             tag="li">文章管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
                <router-link to="/comments"
                             tag="li">评论管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-4">
                <router-link to="/albums"
                             tag="li">相册管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-5">
                <router-link to="/songs"
                             tag="li">音乐管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-6">
                <router-link to="/groundLessTalk"
                             tag="li">闲言碎语</router-link>
              </el-menu-item>
              <el-menu-item index="1-8">
                <router-link to="/friendLink"
                             tag="li">友链</router-link>
              </el-menu-item>
              <el-menu-item index="1-9">
                <router-link to="/profile"
                             tag="li">个人信息管理</router-link>
              </el-menu-item>
              <el-menu-item index="1-10">
                <router-link to="/repository"
                             tag="li">项目仓库管理</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-drawer>
    <!-- 内容区域 -->
    <el-main>
      <c-switch></c-switch>
      <keep-alive exclude="Edit">
        <router-view></router-view>
      </keep-alive>

    </el-main>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>

<script>
import CSwitch from 'components/common/switch/Switch'
export default {
  data () {
    return {
      drawer: false,
      photoUrl1: null,
      defaultheader: require('@/' + "assets/defaultHeader.png"),
    }
  },
  watch: {
    $route: {
      handler () {
        this.drawer = false
      },
      deep: true
    }
  },
  methods: {
    quit () {
      window.sessionStorage.removeItem("token")
      this.$router.push('/login')
    }
  },
  components: {
    CSwitch
  },
  created () {
    this.photoUrl1 = this.$store.state.hostUrl + JSON.parse(sessionStorage.getItem('user')).profileInfo.photoPath
    window.addEventListener("setItem", (e) => {
      console.log(e)
      this.photoUrl1 = this.$store.state.hostUrl + JSON.parse(sessionStorage.getItem('user')).profileInfo.photoPath
      console.log(this.photoUrl1)
    })
  },
};
</script>