<template>
<!-- 使用了vue-router模式 -->
    <el-menu
      class="menu"
      :default-active="'/index'"
      router
      mode="horizontal"
      text-color="#213F99"
      active-text-color="#409EFF">
      
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
          {{ item.navItem }}
        </el-menu-item>
      <el-divider direction="vertical"></el-divider>
      <div class="info-container">
        <a href="#admin"><img class="avatar" :src="info.avatar"/></a>
        
      </div>
      
    </el-menu>
</template>

<script>

  export default {
    name: 'NavMenu',
    data () {
      return {
        navList: [
          {name: '/index', navItem: '首页'},
          {name: '/recommend', navItem: '广场'},
          {name: '/anonymous', navItem: '树洞'},
        ],
        info: {
          name: '犀利的评论家',   //个人昵称
          avatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg', //个人头像
        }
          
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }

  .menu {
    width: 900px;
    margin: auto;
    position: relative;
    left: 50%;
    margin-left: -450px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

  }

  .info-container {
    display: flex;
    align-items: center;
  }

  .avatar {
    widows: 24px;
    height: 24px;
    border-radius: 50%;
  }


</style>