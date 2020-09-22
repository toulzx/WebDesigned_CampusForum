import Vue from 'vue'
import Router from 'vue-router'


import Login from '@/components/Login'
import Home from '@/components/Home'
import Index from '@/components/home/Index'
import Recommend from '@/components/home/Recommend'
import Anonymous from '@/components/home/Anonymous'

import Admin from '@/components/adminInfo/Admin'
import UpdateInfo from '@/components/adminInfo/UpdateInfo'
import UploadPic from '@/components/adminInfo/UploadPic'

import Modules from '@/components/Modules'
import Module1 from '@/components/modules/Module1'
import Module2 from '@/components/modules/Module2'
import Module3 from '@/components/modules/Module3'

import Tiezi from '@/components/Tiezi'
import TieziEdit from '@/components/TieziEdit'


Vue.use(Router)

export default new Router({
  //路由从默认的 hash 模式切换为 histroy 模式
  // mode: 'history',
  
  routes: [
    {
      path:'/',
      name:'/',
      component:Login
  },
    {
       path: '/login', 
      name: 'Login', 
      component: Login 
    },

    {
      path: '/home',
      name: 'Home', 
      component:Home, 
      redirect: 'Index', 
      //meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      children: [
        {
          path: '/index', 
          name: 'Index', 
          component: Index
        },
        {
          path: '/recommend', 
          name: 'Recommend', 
          component: Recommend
        },
        {
          path: '/anonymous',
          name: 'Anonymous',
          component: Anonymous
        }
      ]},
      {
        path: '/modules',
        name: 'Modules',
        component: Modules,
        //meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
        children: [
          {
            path: '/module1',
            name: 'Module1',
            component: Module1
          },
          {
            path: '/module2',
            name: 'Module2',
            component: Module2
          },
          {
            path: '/module3',
            name: 'Module3',
            component: Module3
          }
        ]
      },
      {
        path: '/admin',
        name: 'Admin',
        component: Admin,
       //meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      },
      {
        path: '/updateInfo',
        name: 'UpdateInfo',
        component: UpdateInfo,
        //meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      },
      {
        path: '/uploadPic',
        name: 'UploadPic',
        component: UploadPic,
        meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      },
      
      {
        path: '/tiezi/add',
        name: 'TieziEdit',
        component: TieziEdit,
        // meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      },
      {
        path: '/tiezi/:tzId',
        name: 'Tiezi',
        component: Tiezi,
        meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      },
      // {
      //   path: '/tiezi/:tzId/edit',
      //   name: 'TieziEdit',
      //   component: TieziEdit,
      //   meta: {requireAuth: true}, //这里好像和拦截器有关！！！//需要token
      // }
      
    
  ]
})
