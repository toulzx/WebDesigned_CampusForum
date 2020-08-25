<template>
    
  <body id='poster' :style="background">
      <!-- 分栏 -->
      <div id="container">
        <el-tabs v-model="activeName" stretch="true" >
          <!-- 登录 -->
            <el-tab-pane label="登录" name="login" >
                <el-form label-position="left" label-width="0px">
                    <el-form-item><el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input></el-form-item>
                    <el-form-item><el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input></el-form-item>
                    <el-form-item style="width: 100%">
                      <el-button type="primary" style="width: 100%;border: none" v-on:click="login(loginForm)" v-bind:disabled="!(loginForm.username&&loginForm.password)">登录</el-button>
                    </el-form-item>
                  </el-form>
              </el-tab-pane>
            <el-tab-pane label="注册" name="register">
                <el-form label-position="left" label-width="0px" v-model="registerForm">
                    <el-form-item><el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="创建用户名" minlength="3" maxlength="10"></el-input></el-form-item>
                    <el-form-item><el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="创建密码" show-password></el-input>
                    <!-- ↑要不要加个确认密码↑ --> </el-form-item>
                    <el-form-item><el-input type="text" v-model="registerForm.email" auto-complete="off" placeholder="请输入您的邮箱"></el-input></el-form-item>
                    <el-form-item><el-row :gutter="10"> 
                        <el-col :span="16"><el-input type="text" v-model="registerForm.vcode" auto-complete="off" placeholder="验证码"></el-input> </el-col>
                        <el-col :span="8"><el-button type="primary" style="width: 100%; border: none" v-on:click="send_vcode(registerForm)" v-bind:disabled="!isEmail(registerForm.email)">获取验证码</el-button></el-col>
                    </el-row></el-form-item>
                    <el-form-item style="width: 100%"><el-button type="primary" style="width: 100%; border: none" v-on:click="register(registerForm)">注册</el-button></el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="找回" name="retrieve">
                <el-form label-position="left" label-width="0px">
                    <el-form-item><el-input type="text" v-model="retrieveForm.email" auto-complete="off" placeholder="邮箱"></el-input>  </el-form-item>
                    <el-form-item><el-row :gutter="10">
                        <el-col :span="16"><el-input type="text" v-model="retrieveForm.vcode" auto-complete="off" placeholder="验证码"></el-input></el-col>
                        <el-col :span="8"><el-button type="primary" style="width: 100%; border: none" v-on:click="send_vcode(registerForm)" v-bind:disabled="!isEmail(retrieveForm.email)">获取验证码</el-button></el-col>
                    </el-row></el-form-item>
                    <el-form-item>
                        <el-input type="newPassword" v-model="retrieveForm.password" auto-complete="off" placeholder="新密码" show-password></el-input>
                    </el-form-item><!-- ↑要不要加个确认密码↑ --> 
                    <el-form-item style="width: 100%"><el-button type="primary" style="width: 100%; border: none" v-on:click="retrieve(retrieveForm)">重置</el-button></el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        
        <!-- 注册  尝试表单验证失败 涉及ref prop rules-->
        
        <!-- 找回 -->
        
      </div>
  </body>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        activeName: 'register',
        isRegistered: 0,
        //↑默认为0 未注册，1 登录，-1找回密码
        loginForm: {
            username: 'lzx1',
            password: '1111'
        },
        registerForm: {
            username: 'lzx2',
            password: '111',
            email: '820458126@qq.com',
            vcode: '111'
        },
        retrieveForm:{
            email: '820458126@qq.com',
            vcode: '1111',
            newPassword: '2222'
        },
        responseResult: [],

        // registerRules:{
        //   username:[
        //     { required: true, message: '请输入用户名', trigger: 'blur' },
        //     { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        //   ],
        //   password:[
        //     { required: true, message: '请输入密码', trigger: 'blur' }
        //   ],
        //   email:[
        //     { required: true, message: '请输入邮箱地址', trigger: 'blur' }
        //   ],
        //   vcode:[
        //     { required: true, message: '请输入验证码', trigger: 'blur' }
        //   ]
        // }
        background: {
          margin: "0",
          padding: "0",
          height: "100vh",
          width: "100%",
          backgroundImage: "url(" + require("../assets/1.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          // position: "absolute",
          overflow: "hidden",
      },
      }
    },  
    methods: {
      
      login (loginForm) {
          let param = new URLSearchParams()
          param.append('username', this.loginForm.username),
          param.append('password', this.loginForm.password),
          this.$axios({
              method: 'post',
              url: '/login',
              data: param
          })
          .then(successResponse => {
            if(successResponse.data == 200) this.$router.replace({path: '/index'})
            else 
            this.$message({
                showClose: true,
                message: '查无此人',
                type: 'error' 
            });
          })
      },

      isEmail (email) {
          let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/;
          if(email != ''){
            // console.log(reg.test(email));
            return reg.test(email);
          }else{
            return false;
          }  
      },

      send_vcode (registerForm) {
          let param = new URLSearchParams()
          param.append('username', this.registerForm.username),
          param.append('email', this.registerForm.email),
          this.$axios({
              method: 'post',
              url: '/sendIdentification',
              data: param
          })
          // this.$axios
          // .post('http://bravoboom.tpddns.cn:4321/sendIdentification',{
          //   params:{
          //     username: this.registerForm.username,
          //     email: this.registerForm.email

          //   }
          // })
          .then(successResponse => {
            console("send_vcode()返回")
            console("send_vcode()返回：" + successResponse)
          })
          // .catch(failResponse => {//！！！这里还需修改：如果失败，该做什么
          //   alert("服务器请求失败。tips:send_vcode()")
          // })
      },

      register (registerForm) {
        const _this = this
        let param = new URLSearchParams()
          param.append('username', this.registerForm.username),
          param.append('password', this.registerForm.password),
          param.append('email', this.registerForm.email),
          param.append('identification', this.registerForm.vcode),
          this.$axios({
              method: 'post',
              url: '/register',
              data: param
          })
           .then(successResponse => {
             if(successResponse.data == 200){
                this.$router.replace({path: '/index'})
             }else if(successResponse.data == 404){
                this.$message({
                  showClose: true,
                  message: '验证码错误',
                  type: 'error' 
                });
             }else if(successResponse.data == 411){
                this.$message({
                  showClose: true,
                  message: '好像还没获取验证码噢(⊙o⊙)？',
                  type: 'warning' 
                });
             }
           
          })
      },

      retrieve (retrieveForm) {
          let param = new URLSearchParams()
          param.append('email', this.retrieveForm.email),
          param.append('identification', this.retrieveForm.vcode),
          param.append('newPassword', this.retrieveForm.newPassword)
          this.$axios({
              method: 'post',
              url: '/retrieve',
              data: param
          })
           .then(successResponse => {
             if(successResponse.data == 200){
                this.$message({
                  showClose: true,
                  message: '密码修改成功',
                  type: 'success' 
                });
             }else if(successResponse.data == 404){
                this.$message({
                  showClose: true,
                  message: '验证码错误',
                  type: 'error' 
                });
             }else if(successResponse.data == 411){
                this.$message({
                  showClose: true,
                  message: '好像还没获取验证码噢(⊙o⊙)？',
                  type: 'warning' 
                }); 
             }  
          })
      }
    }
  }
</script>

<style>
  body{
    margin: 0px;
  }

  #container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>