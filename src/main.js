import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastclick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue(); //把vue实例作为事件总线
// Vue.prototype.$store = store
// 插件：toast 

Vue.use(toast) //会执行toast中的install方法 我现在想把生成的模板直接放在body中 this.$toast来决定是否显示
fastclick.attach(document.body) //解决移动端300ms延迟
Vue.use(vueLazyLoad) // 使用图片懒加载
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

