import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/home/Index'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  //路由从默认的 hash 模式切换为 histroy 模式
  // mode: 'history',
  routes: [
    { path: '/login', name: 'Login', component: Login },
    { path: '/home',
      name: 'Home', 
      component:Home, 
      redirect: '/index', 
      children: [
        { path: '/index', 
          name: 'Index', 
          component: Index, 
          meta: {requireAuth: true} //这里好像和拦截器有关！！！
        }
      ]},
    
    
  ]
})
