import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './route'
import store from './store'
import VueHighlightJS from 'vue-highlight.js'
import hljs from 'highlight.js'
// import VueQuillEditor from 'vue-quill-editor'

// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

import 'highlight.js/styles/atom-one-dark.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueHighlightJS)
// Vue.use(VueQuillEditor)

Vue.prototype.$bus = new Vue()

Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
})

import marked from 'marked'
import { dateFormat } from 'common/util'

Vue.filter('articleText',(input) => {
    //转为html
    var html = marked(input)
    //转为string类型
    var str = html.toString()
    //使用正则表达式将标签删除
    var res = str.replace(/<.*?>/gi,'')
    return res
})

Vue.filter('date',(input) => {
  return dateFormat(input)
})


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
