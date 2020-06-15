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
    path: '/QA',
    component: () => import('views/QA/QA')
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
    path: '/profile',
    component: () => import('views/profile/Profile')
  },
  {
    path: '/detailblog',
    component: () => import('components/detailblog/DetailBlog')
  },
  {
    path: '/search/:input',
    component: () => import('views/search/Search')
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})

