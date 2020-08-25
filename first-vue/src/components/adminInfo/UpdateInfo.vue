<template>
    <el-container class="updateForm">
        <el-card class="updateCard">
            <el-form ref="form"  label-width="200px" labelPosition="left" size="medium">
                <el-form-item label="性别"  class="updateObject" label-width="40px">
                    <el-radio-group v-model="newUserInfo.gender" >
                    <el-radio label="female">female</el-radio>
                    <el-radio label="male">male</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="邮箱"  class="updateObject" label-width="40px">
                    <el-input v-model="newUserInfo.email" :placeholder="getEmail"></el-input>
                </el-form-item>
                <el-form-item label="个人签名" class="updateObject" label-width="80px">
                    <el-input type="textarea" v-model="newUserInfo.signature" :placeholder="getSignature"></el-input>
                </el-form-item>
                <el-button type="info" plain @click="cancel">我不玩了</el-button>
                <el-button type="primary" @click="updateUserInfo" v-bind:disabled="!isEmail(newUserInfo.email)">决定好了</el-button>
            </el-form>
        </el-card>
    </el-container>
</template>

<script>
export default {
    data(){
        return {
            newUserInfo:
            {email:"",
             signature:"",
             gender:""}
             
        }
         
    },
    methods:{
        updateUserInfo(){
            let param = new URLSearchParams()
            param.append('email', this.newUserInfo.email),
            param.append('signature', this.newUserInfo.signature),
            param.append('gender', this.newUserInfo.gender),
            this.$axios({
                method: 'post',
                url: '/login',
                data: param
            })
            .then(successResponse=>{
                if(successResponse.data.isUpdated=="修改成功")
                {
                    this.$router.replace({path:'/admin'})
                }
            })
            .catch(failResponse=>{})//再说要加什么吧

                this.$store.commit('getUserInfo',this.newUserInfo)
            },
        cancel(){
            this.$router.replace({path:'/admin'})
        },
        isEmail (email) {
          let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/
          return reg.test(email);
      },
    },
    computed:{
             getGender(){return this.$store.state.gender},
             getEmail(){return this.$store.state.email},
             getSignature(){return this.$store.state.signature},
    }
}
</script>

<style scoped>
.updateObject
{
    margin:20px
}
.updateForm
{
    width:50%;
    margin-left: 25%;
    margin-top: 15%;
    
}
.updateCard
{
    width: 100%;
    
}
</style>

