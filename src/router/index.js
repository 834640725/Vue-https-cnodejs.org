// 配置路由对象
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Index from '@/components/index/index'
import About from '@/components/about/about'
import Login from '@/components/login/login'

import Details from '@/components/details/details'
import UserInfo from '@/components/details/user/user'
import Create from '@/components/create/create'

let router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/index',
      component:Index,
      meta:{
        login:false,
      }
    },
    {
      path:'/about',
      component:About
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/topic/:id',
      component:Details
    },
    {
      path:'/user/:name',
      component:UserInfo,
    },
    {
      path:'/create',
      component:Create,
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
});

export default router
