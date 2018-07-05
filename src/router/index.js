// 配置路由对象
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Index = () => import('@/components/index/index');
const About = () => import('@/components/about/about');
const Login = () => import('@/components/login/login');

const Details = () => import('@/components/details/details');
const UserInfo = () => import('@/components/details/user/user');
const Create = () => import('@/components/create/create');
const Message = () => import('@/components/message/message');

let router = new VueRouter({
  // mode:'history',
  routes:[
    {
      path:'/index',
      component:Index,
      meta:{
        login:false,
        title:"CNode：Node.js专业中文社区"
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
      path:'/my/message',
      component:Message,
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
});

export default router
