<template>
  <div>
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
    components: {NavMenu}
  }
</script>

<style scoped>

</style>
