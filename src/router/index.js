import Vue from "vue";

import VueRouter from "vue-router";
import {
  MessageBox
} from "element-ui"

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/manage',
    component: () => import('views/manage/Manage'),
    children: [{
        path: '/home',
        component: () => import('views/manage/childrenComponents/home/Home')
      }, {
        path: '/users',
        component: () => import('views/manage/childrenComponents/user/User')
      },
      {
        path: '/articles',
        component: () => import('views/manage/childrenComponents/article/Article')
      },
      {
        path: '/articles/:id',
        component: () => import('views/manage/childrenComponents/article/Edit')
      },
      {
        path: '/comments',
        component: () => import('views/manage/childrenComponents/comment/Comment')
      },
      {
        path: '/albums',
        component: () => import('views/manage/childrenComponents/album/Album')
      },
      {
        path: '/albums/:id/:title',
        component: () => import('views/manage/childrenComponents/album/Photo')
      },
      {
        path: '/songs',
        component: () => import('views/manage/childrenComponents/song/Song')
      },
      {
        path: '/groundLessTalk',
        component: () => import('views/manage/childrenComponents/groundlesstalk/GroundLessTalk')
      },
      {
        path: '/friendLink',
        component: () => import('views/manage/childrenComponents/friendlink/FriendLink')
      },
      {
        path: '/profile',
        component: () => import('views/manage/childrenComponents/profile/Profile')
      },
      {
        path: '/repository',
        component: () => import('views/manage/childrenComponents/myrepository/Repository')
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  //to将要访问的路径，
  //from 代表从那个路径跳转
  //next是一个函数 放行
  //next('/login')强制跳转
  if (to.path == '/login') {
    return next()
  }
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {

    MessageBox.confirm(
      '请先登录！',
      '未登录', {
        confirmButtonText: '前往登录',
        type: 'warning',
        showCancelButton: false
      }
    ).then(() => {
      return next('/login')
    })
  }
  next()

})
export default router;