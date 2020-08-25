<template>
  <div class="background" :style="background">
        <nav-menu></nav-menu>
        <!-- ↑存放导航栏 -->
        <router-view/>
    <!-- ↑子页面组件显示的地方 -->
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu'
  export default {
    name: 'Home',
    components: {NavMenu},
    data() {
      return {
      // background: {
      //   margin: "0",
      //   padding: "0",
      //   height: "100vh",
      //   width: "100%",
      //   backgroundImage: "url(" + require("../assets/1.jpg") + ")",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "100% 100%",
      //   // position: "absolute",
      //   overflow: "hidden",
      // },
  }
  }
  }
</script>

<style scoped>

</style>
