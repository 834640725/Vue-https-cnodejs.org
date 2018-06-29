import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    id:"",
  },
  mutations:{
    succAuthorId(state,params){
      state.id = params.id;
    }
  },
  actions:{

  }
});

export default store;
