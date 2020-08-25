import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
    email:"",
    signature:"",
    gender:"",
    },
    mutations:{
        getUserInfo(state,msg){
           state.email=msg.email;
           state.signature = msg.signature;
           state.gender = msg.gender
        }
    }
   })
    
   export default store