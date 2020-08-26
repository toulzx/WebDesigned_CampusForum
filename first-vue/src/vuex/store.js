import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

// const store = new Vuex.Store({
//     // 定义状态
//     state: {
//     email:"",
//     signature:"",
//     gender:"",
//     },
//     mutations:{
//         getUserInfo(state,msg){
//            state.email=msg.email;
//            state.signature = msg.signature;
//            state.gender = msg.gender
//         }
//     }
//    })
    
//    export default store

//在项目打开的时候会判断本地存储中是否有 user 这个对象存在，如果存在就取出来并获得 username 的值，否则则把 username 设置为空。这样我们只要不清除缓存，登录的状态就会一直保存。
   export default new Vuex.Store({
    state: {
      user: {
        username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
      }
    },
    mutations: {
      login (state, user) {
        state.user = user
        window.localStorage.setItem('user', JSON.stringify(user))
      }
    }
  })