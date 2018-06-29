import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state:{
    detailsId:"",
  },
  mutations:{
    succAuthorId(state,params){
      state.detailsId = params.id;
    }
  },
  actions:{

  }
});

export default store;
