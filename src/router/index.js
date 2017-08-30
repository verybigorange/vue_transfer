import Vue from 'vue'
import Router from 'vue-router'
import transferPage from '@/components/transferPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      component:transferPage
    }
  ]
})
