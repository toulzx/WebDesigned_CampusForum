<template>
    
  <body id='poster'>
      <!-- 分栏 -->
      <div id="container">
        <div onselectstart="return false">
            <el-button type="text" v-on:click="isRegistered=1" class="containerTitle" v-bind:disabled="isRegistered==1">登录</el-button>
            <span>/</span>
            <el-button type="text" v-on:click="isRegistered=0" class="containerTitle" v-bind:disabled="isRegistered==0">注册</el-button>
            <span>/</span>
            <el-button type="text" v-on:click="isRegistered=-1" class="containerTitle" v-bind:disabled="isRegistered==-1">找回</el-button>
        </div>
        <!-- 登录 -->
        <el-form v-if="isRegistered==1"  label-position="left" label-width="0px">
            <el-form-item><el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="用户名"></el-input></el-form-item>
            <el-form-item><el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input></el-form-item>
            <el-form-item style="width: 100%"><el-button type="primary" style="width: 100%;border: none" v-on:click="login(loginForm)" v-bind:disabled="!(loginForm.username&&loginForm.password)">登录</el-button>
            </el-form-item>
        </el-form>
        <!-- 注册  尝试表单验证失败 涉及ref prop rules-->
        <el-form v-else-if="isRegistered==0" label-position="left" label-width="0px" v-model="registerForm">
            <el-form-item><el-input type="text" v-model="registerForm.username" auto-complete="off" placeholder="创建用户名" minlength="3" maxlength="10"></el-input></el-form-item>
            <el-form-item><el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="创建密码" show-password></el-input>
            <!-- ↑要不要加个确认密码↑ --> </el-form-item>
            <el-form-item><el-input type="text" v-model="registerForm.email" auto-complete="off" placeholder="请输入您的邮箱"></el-input></el-form-item>
            <el-form-item><el-row :gutter="10"> 
                <el-col :span="16"><el-input type="text" v-model="registerForm.vcode" auto-complete="off" placeholder="验证码"></el-input> </el-col>
                <el-col :span="8"><el-button type="primary" style="width: 100%; border: none" v-on:click="send_vcode" v-bind:disabled="registerForm.email && isEmail(registerForm.email)">获取验证码</el-button></el-col>
            </el-row></el-form-item>
            
            <el-form-item style="width: 100%"><el-button type="primary" style="width: 100%; border: none" v-on:click="register(registerForm)">注册</el-button></el-form-item>
        </el-form>
        <!-- 找回 -->
        <el-form v-else label-position="left" label-width="0px">
            <el-form-item><el-input type="text" v-model="retrieveForm.email" auto-complete="off" placeholder="邮箱"></el-input>  </el-form-item>
            <el-form-item><el-row :gutter="10">
                <el-col :span="16"><el-input type="text" v-model="retrieveForm.vcode" auto-complete="off" placeholder="验证码"></el-input></el-col>
                <el-col :span="8"><el-button type="primary" style="width: 100%; border: none" v-on:click="send_vcode" v-bind:disabled="retrieveForm.email && isEmail(retrieveForm.email)">获取验证码</el-button></el-col>
            </el-row></el-form-item>
            <el-form-item><el-input type="newPassword" v-model="retrieveForm.password" auto-complete="off" placeholder="新密码" show-password></el-input>
            <!-- ↑要不要加个确认密码↑ --> </el-form-item>
            <el-form-item style="width: 100%"><el-button type="primary" style="width: 100%; border: none" v-on:click="retrieve(retrieveForm)">重置</el-button></el-form-item>
        </el-form>
      </div>
  </body>
</template>

<script>

  export default {
    name: 'Login',
    data () {
      return {
        isRegistered: 0,
        //↑默认为0 未注册，1 登录，-1找回密码
        loginForm: {
            username: '',
            password: ''
        },
        registerForm: {
            username: '',
            password: '',
            email: '',
            vcode: ''
        },
        retrieveForm:{
            email: '',
            vcode: '',
            newPassword: ''
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
      }
    },  
    methods: {
      
      login (loginForm) {
          this.$axios
          .post('/Login',{
              username: this.loginForm.username,
              password: this.loginForm.password
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {//！！！这里还需修改：如果成功，返回值？
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {//！！！这里还需修改：如果失败，该做什么
          })
      },

      isEmail (email) {
          let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
          return reg.test(email);
      },

      send_vcode () {
          this,$axios
          .post('/SendIdentification',{
              email: this.registerForm.email
          })
      },

      register (registerForm) {
        // this.$refs.toString(registerForm).validate((valid) => {//注意这里传参时要register (‘registerForm’)单引号
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });

        this.$axios
          .post('/Register', {
            username: this.registerForm.username,
            password: this.registerForm.password,
            email: this.registerForm.email,
            vcode: this.registerForm.vcode
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {//！！！这里还需修改：如果成功，返回值？
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {//！！！这里还需修改：如果失败，该做什么
          })
      },

      retrieve (retrieveForm) {
          this.$axios
          .post('/Retrieve',{
              email: this.retrieveForm.email,
              vcode: this.retrieveForm.vcode,
              newPassword: this.retrieveForm.newPassword
          })
          .then(successResponse => {
            if (successResponse.data.code === 200) {//！！！这里还需修改：如果成功，返回值？
              this.$router.replace({path: '/index'})
            }
          })
          .catch(failResponse => {//！！！这里还需修改：如果失败，该做什么
          })
      }
      
    }
  }
</script>

<style>
/* #poster {
        background:url("../assets/eva.jpg") no-repeat;
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
  } */
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
  
  /* .containerTitle {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  } */

    

</style>