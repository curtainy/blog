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
    component: () => import('views/article/Article')
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
  }
]

export default new VueRouter({
  routes,
  mode: 'history'
})