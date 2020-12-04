<!--项目对接模块-->
<template>
<div id="mainIndex">
   <el-card class="box-card" v-for="item in ProjectDockings" v-bind:key="item.index" shadow="hover">
    <div class="research_title"> {{item.research_title}}  </div> 
    <br>
    <div>项目介绍： <span class="research_introduction">
          {{item.research_introduction}}</span>  
    </div> 
    <div>要求:
      <span class="requirements" v-for="requirement in item.requirements" v-bind:key="requirement.key">
        {{requirement.content+""+requirement.num+"人"}} </span> 
    </div>
    <div>补充:<span class="supplement">{{item.supplement}}</span>  </div> 
    <br>
    <div class="infoBox">
      <div class="info">   
      <span>{{item.author}}</span>  
      <span style="border:dashed #909399 1px">{{showStatus(item.status)}}</span>
    </div>   
    <div class="info"> {{item.self_introduction}}  </div> 
    <div class="info">联系方式：{{item.contact}}  </div>
    </div>
     
  </el-card>
</div>

</template>

<script>

  import Vue from 'vue'

  export default {
    props: {
      ProjectDockings: {
        type: Array,
        required: true
      }
    },


    components: {},


    data() {
      return {}
    },


    computed: {},


    methods: {
      showStatus: function(status) {
        if(status == 1) return"学生";
        else return "老师";
      }
    }
  }
</script>


<style scoped>
  #mainIndex {
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding: 20px;
  }
  *{
    color: #303133;
  }
  .box-card{
    width: 900px;
    margin: 10px auto; /*flex布局你太重要了 */
    padding: 5px;
  }
  .research_title {
    font-size: large;
    font-weight: bolder;
  }
  .research_introduction {
    color:#606266;
  }
  .requirements {
    color: #67C23A;
  }
  .supplement {
    color: #606266;
  }
  .infoBox {
    display: flex;
    flex-direction: column;
  }
  .info,
  .info span {
    font-size: small;
    color: #909399;
   
  }
  .info {
    text-align: center; 
    margin: auto;
  }

</style>