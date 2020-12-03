<template>
  <div id="mainIndex">
    <nav-menu></nav-menu>
    <div id="release" style="visibility:hidden">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="项目名称" prop="title">  <el-input v-model="ruleForm.title"></el-input> </el-form-item>
        <el-form-item label="项目介绍" prop="research_introduction">  <el-input type="textarea" v-model="ruleForm.research_introduction"></el-input> </el-form-item>
        <div>
          <div class="requirements" v-for="(item, index) in itemArr" :key="index">
            <el-form-item  label="需求" prop="requirements" ><el-input v-model="item.content"></el-input> </el-form-item>
            <el-input-number v-model="item.num"  @change="handleChange" :min="1" :max="100"></el-input-number>
          </div>
          <el-button plain v-on:click="addEle">增加需求</el-button>
          <el-button plain v-on:click="deleteEle()" v-bind:disabled="isMinNum()">删除需求</el-button>
        </div>
        <el-form-item label="补充" prop="supplement" style="marginTop: 20px;">  <el-input type="textarea" v-model="ruleForm.supplement"></el-input> </el-form-item>
        <el-form-item label="联系方式" prop="contact">  <el-input v-model="ruleForm.contact"></el-input> </el-form-item>
        <el-button type="primary" v-on:click="">发布项目需求</el-button>
        <el-button id="toReleaseBtn" v-on:click="todetail()">取消</el-button>
      </el-form>
    </div>
    <button class="el-icon-s-promotion" id="add" v-on:click="toRelease()"></button>
    <ProjectDocking :ProjectDockings="ProjectDockingData" id="ProjectDocking"></ProjectDocking>   
  </div>
     

</template>




<script>
  import {ProjectDockingData} from '../common/ProjectDocking_mockdata'
  import ProjectDocking from '../common/ProjectDocking' 
  import NavMenu from '../common/NavMenu'

  export default {
    components: {
      ProjectDocking,
      ProjectDockingData,
      NavMenu
    },
    created() {
      this.ProjectDockingData = ProjectDockingData.data;
    },
    data () {
    return{
      ProjectDockingData: [],
      ruleForm: {
        title:  '',
        research_introduction: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        research_introduction: [
          { required: true, message: '请填写项目介绍', trigger: 'blur' }
        ],
        contact: [
           { required: true, message: '请输入联系方式', trigger: 'blur' },
        ],
        requirements: [
          {required:true, message: '请输入需求', trigger: 'blur' },
        ]
      },
      itemArr: [
          {content: '',num: 1},
      ],
      requirementNum: 1,

    }
  },
  methods: {
    handleChange: function(value) {console.log(value); },
    addEle: function() {
      this.itemArr.push(
        {content: '',num: 1}
        );
      this.requirementNum++;
    },
    deleteEle() {
      this.itemArr.splice(this.itemArr.length-1, 1);
      this.requirementNum--;
    },
    isMinNum: function(){
      if(this.requirementNum == 1) return true;
      else return false;
    },
    toRelease() {
       document.getElementById("ProjectDocking").style.visibility = "hidden";
       document.getElementById("release").style.visibility = "visible";
       document.getElementById("add").style.visibility = "hidden";
    },
    todetail() {
      document.getElementById("ProjectDocking").style.visibility = "visible";
       document.getElementById("release").style.visibility = "hidden";
       document.getElementById("add").style.visibility = "visible";
    }
  },
  computed: {}

  }
  
</script>




<style scoped>
#release {
  position: absolute;
  width: 520px;
  margin-top: 50px;
  margin-left: 50%;
  left: -260px;

}
.requirements {
  display: flex;
  margin: 15px auto;
}
  #add {
    position: fixed;
    right: 8%;
    bottom: 8%;
  }

</style>