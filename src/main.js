import { createApp } from 'vue'
import App from './App.vue'

/* 引入路由 */
import router from './router'

/* 引入 vuex */
import store from './store'

/* 引入公共样式 */
import '@/styles/common.css'

/* 引入 ElementUI */
import ElementUI from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

/* 用于低版本浏览器兼容问题 es6语法兼容 */
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

const Vue = createApp(App)
Vue.use(router)
Vue.use(store)
Vue.use(ElementUI,{locale})

Vue.mount('#esd')
