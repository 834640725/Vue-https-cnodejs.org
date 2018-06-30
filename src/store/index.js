import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
     userLogin:false,
     usersaveAccess:"",
  },
  mutations:{
    loginSuccess(state,params){
      state.userLogin = params.state;
      state.usersaveAccess = params.AccessToken
    }
  },
  actions:{

  }
});

export default store;
