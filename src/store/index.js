import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
     userLogin:false,
     usersaveAccess:"",
     youSelf:{},   //登陆用户的信息
     usetScore:"", //登陆用户积分
  },
  mutations:{
    loginSuccess(state,params){
      state.userLogin = params.state;
      state.usersaveAccess = params.AccessToken
    },

    // 当前登陆用户信息
    savaYouSelf(state,data){
      state.youSelf = data;
      console.log(state.youSelf,11111111111)
    },

    //用户积分
    savaScore(state,params){
       state.usetScore = params.score;
    }
  },
  actions:{

  }
});

export default store;
