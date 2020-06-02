import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './route'
import store from './store'
import VueHighlightJS from 'vue-highlight.js'
import hljs from 'highlight.js'

import 'highlight.js/styles/atom-one-dark.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueHighlightJS)

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
