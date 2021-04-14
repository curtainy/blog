import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/article'
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/index')
  },
  {
    path: '/findpassword',
    component: () => import('views/login/findPassword')
  },
  {
    path: '/article',
    component: () => import('views/allblog/AllBlog')
  },
  {
    path: '/creation',
    component: () => import('views/creation/Creation')
  },
  {
    path: '/chat',
    component: () => import('views/chat/index')
  },
  // {
  //   path: '/myblog',
  //   component: () => import('views/myblog/MyBlog')
  // },
  // {
  //   path: '/modifyblog/:blogId',
  //   component: () => import('views/modifyblog/ModifyBlog')
  // },
  {
    path: '/personal/:id',
    component: () => import('views/personal/index')
  },
  {
    path: '/blogdetail/:blogId',
    component: () => import('components/detailblog/DetailBlog')
  },
  {
    path: '/search/:input',
    component: () => import('views/search/Search')
  },
  {
    path: '/profile',
    component: () => import('views/profile/Profile')
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})

