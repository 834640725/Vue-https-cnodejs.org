// 配置路由对象
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Index from '@/components/index/index'
import About from '@/components/about/about'
import Login from '@/components/login/login'

let router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/index',
      component:Index,
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
      path:'*',
      redirect:'/index'
    }
  ]
});

export default router
