import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './route'
import store from './store'
// import hljs from 'highlight'

// import '@/assets/css/markdown/dark.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

// Vue.directive('highlight', (el) => {
//   let blocks = el.querySelectorAll('pre code')
//   blocks.forEach((block) => {
//       hljs.highlightBlock(block)
//   })
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
