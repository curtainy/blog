import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/allblog'
  },
  {
    path: '/allblog',
    component: () => import('views/allblog/AllBlog')
  },
  {
    path: '/creation',
    component: () => import('views/creation/Creation')
  },
  {
    path: '/request',
    component: () => import('views/request/Request')
  },
  {
    path: '/member',
    component: () => import('views/member/Member')
  },
  {
    path: '/login',
    component: () => import('views/login/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/Register')
  },
  {
    path: '/myblog',
    component: () => import('views/myblog/MyBlog')
  },
  {
    path: '/modifyblog/:title',
    component: () => import('views/modifyblog/ModifyBlog')
  },
  {
    path: '/editmessage',
    component: () => import('views/editmessage/EditMessage')
  },
  {
    path: '/detailblog',
    component: () => import('components/detailblog/DetailBlog')
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})

