import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
     userLogin:false,
     usersaveAccess:"",
     youSelf:{},   //登陆用户的信息
     usetScore:"", //登陆用户积分
     editContent:{}, //编辑内容,同步到create组件
  },
  mutations:{
    loginSuccess(state,params){
      state.userLogin = params.state;
      state.usersaveAccess = params.AccessToken
    },

    // 当前登陆用户信息
    savaYouSelf(state,data){
      state.youSelf = data;

    },

    //用户积分
    savaScore(state,params){
       state.usetScore = params.score;
    },

    //编辑的内容
    saveEditHander(state,params){
      state.editContent = params;
    }
  },
  actions:{

  }
});

export default store;
