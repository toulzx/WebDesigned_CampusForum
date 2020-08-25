<template>
    
    <el-container style="width:50%; margin-left:25%">
        <el-main >
            <el-card  id="userInfo">
                <!--头像、性别和用户名-->
                    <div class="userInfoElement" id="shownBasicInfo">
                        <el-avatar class="avater basic" shape="circle" :size="100" :src="userInfo.headerUrl" :key="userInfo.headerUrl"></el-avatar>
                        <div class="basic"  id="basicInfo">
                        <span style="font-size:25px; font-weight:bolder" id="username">{{userInfo.username}}</span>
                        <span style="font-size:20px; color:grey"  id="gender" >{{getGender()}}</span>
                        </div>
                    </div>
                    
                 <div id="moreInfo">
                     <el-collapse @change="changeTitle" v-bind:changed = false>
                    <el-collapse-item>
                         <!--下拉标题-->
                    <template slot="title" >
                        <span id="title">想看更多吗</span>
                    </template>
                    <!--个人信息内容-->
                    <h3 class="userInfoElement">邮箱:{{userInfo.email}}</h3>
                    <h3 class="userInfoElement">个性签名:{{userInfo.signature}}</h3>
                    <router-link to='/updateInfo'><el-button type="primary" plain @click="goToUpdate" id="updateUserInfo">我要改一改</el-button></router-link>
                    </el-collapse-item>
                </el-collapse>
                 </div>
            </el-card>
            

            <!-- <el-card id="userPosts">
                 <div id="userPostsHeader" slot="header" class="clearfix">
                  <h1>👴的发帖</h1>
                 </div>
                 <Tiezi v-bind:tiezi="userInfo.tiezi"></Tiezi>
            </el-card> -->

        </el-main>
    </el-container>

</template>

<script>
// import Tiezi from "@/components/Tiezi"
// import {tiezi} from "../tiezi_mockdata.js"
export default {
    data(){
        return{
            userInfo:
            {
                username:"惠惠",
                email:"xxxxx@qq.com",
                signature:"我が名はめぐみん!アークウィザードにして,爆裂魔法を操る者!",
                gender:"female",
                headerUrl:"../../../static/megumi.jpg",
                // tiezi:tiezi.data,
            }
        }
    },
    methods:{
       goToUpdate(){
           this.$store.commit('getUserInfo',this.userInfo)
       },
       getGender(){
          return (this.userInfo.gender == "male")?  "♂":"♀"
       },
       changeTitle()
       {
          document.getElementById("title").innerText =this.changed?"想看更多吗" :"这么想看就让你看个够啊"
          this.changed = !this.changed
       }
    },
    // components:{Tiezi},
}

</script>

<style>
#userInfo
{
   display: flex;
   flex-direction: column;
}
.userInfoElement
{
    text-align: left;
}
#shownBasicInfo
{
    display: flex;
    flex-direction: row;
}
#basicInfo
{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.basic
{
    
    text-align: left;
    margin-bottom: 20px;
}
#updateUserInfo
{
    float: right;
}
#userPosts
{
    margin-top: 15px;
}
#userPostsHeader
{
    text-align: left;
}
</style>
