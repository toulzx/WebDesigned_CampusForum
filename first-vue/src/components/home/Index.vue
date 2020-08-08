<template>
    <div id="mainIndex">
      <!-- 走马灯 -->
      <el-carousel :interval="5000" type="card" height="300px" arrow="never">
        <el-carousel-item v-for="item in 3" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>

      <!-- 卡片板块 -->
      <el-row :gutter="20">
        <el-col :span="8" v-for="o in 3" v-bind:key="o"  >
          <el-card class="box-card" shadow="hover" v-on:click="plateLink">
            <div class="text item">
              {{'板块内容 ' + o }}
            </div>
          </el-card>
        </el-col>
      </el-row>
  

      Hello World!
      你终于来了！
      
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

      o:{},
      plateLink:{},
    }
  }
  }
  
</script>

<style scoped>
  #mainIndex {
    width: 1000px;
    position: absolute;
    left: 50%;
    margin-left: -500px;
    
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
  }

  .box-card {
    width: auto;
  }
</style>