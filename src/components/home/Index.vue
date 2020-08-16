<template>
    
    <div id="mainIndex">
      <div id="welcome">
        <span style="color:#409EFF">Hello World!</span>
        <br>
        <span style="color:#213F99">你终于来了</span>
      </div>
      <!-- 走马灯 -->
      <!-- <el-carousel :interval="5000" type="card" height="300px" arrow="never">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel> -->

      <!-- 卡片板块 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover" v-on:click="plateLink">
            <div class="text item">
              <img class="module" src="http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg"/>
              <el-divider direction="vertical"></el-divider>
              <a href="#module1" style="text-decoration: none;">学习互助</a>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover" v-on:click="plateLink">
            <div class="text item">
              <img class="module" src="https://wx4.sinaimg.cn/mw690/69e273f8gy1ft1541dmb7j215o0qv7wh.jpg"/>
              <el-divider direction="vertical"></el-divider>
              <a href="#module2" style="text-decoration: none;">项目对接</a>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover" v-on:click="plateLink">
            <div class="text item">
              <img class="module" src="http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg"/>
              <el-divider direction="vertical"></el-divider>
              <a href="#module3" style="text-decoration: none;">选课咨询</a>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 评论 -->
      <comment :comments="commentData"></comment>

    </div>
</template>

<script>
  import * as CommentData from '../common/comment_mockdata'//评论
  import comment from '../common/Comment'//评论

  export default {
    components: {//评论
      comment
    },
    created() {//评论
      this.commentData = CommentData.comment.data;
    },
    name: 'Index',
    data () {
    return{
      commentData: [],//评论
      plateLink:{},
    }
  }
  }
  
</script>

<style scoped>
  #welcome {
    width: 900px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  #mainIndex {
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;/*去你大爷，没这个不居中*/ 
    padding: 20px;
  }
/* 走马灯 */
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
/* 板块卡片 */
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
    display: flex;
    align-items: center;
  }

  .box-card {
    width: auto;
    height: auto;
  }

  .module {
    width: 100px;
    height: 100px;
  }
</style>