import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
     userLogin:false,
  },
  mutations:{
    loginSuccess(state,isLogin){
      state.userLogin = isLogin;
    }
  },
  actions:{

  }
});

export default store;
