import vue from 'vue'
import VueRouter from 'vue-router'

vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/article'
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
    path: '/fans',
    component: () => import('views/fans/index')
  },
  {
    path: '/request',
    component: () => import('views/QA/Request')
  },
  {
    path: '/reqdetail/:title',
    component: () => import('views/QA/ReqDetail')
  },
  {
    path: '/login',
    component: () => import('views/login-demo/Login')
  },
  {
    path: '/register',
    component: () => import('views/register/index')
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
    path: '/personal',
    component: () => import('views/personal/index')
  },
  {
    path: '/detailblog',
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

