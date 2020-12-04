<template>

    <div id="mainIndex">

        <nav-menu></nav-menu>

        <el-row id="sideBar">
            <el-col :span="4">
                <el-menu
                    :default-active="$route.path"
                    router>
                        <el-menu-item v-for="(item,i) in tagList" :key="i" :index="item.name">
                            <i class="el-icon-menu"></i>
                            <span>{{item.tagItem}}</span>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>

        <el-button id="releaseBtn" type="text" circle @click="toRelease()"><i class="el-icon-circle-plus"></i></el-button>

        <el-form id="releaseForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="visibility:hidden">
            <el-form-item label="话题" prop="tags">
                <el-select v-model="ruleForm.tags" placeholder="请选择话题">
                <el-option v-for="item in tagList" :key="item.key" :label="item.tagItem" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="content" style="width:360px;">
                <el-input type="textarea" v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-button type="primary">提交(未添加methods)</el-button>
            <el-button type="plain" @click="toDetail()">取消</el-button>
        </el-form>

        <router-view/>

    </div>

</template>



<script>
import NavMenu from '../common/NavMenu'
import Tag1 from '../common/Tag1'
import Tag2 from '../common/Tag2'
import Tag3 from '../common/Tag3'
export default {
    components: {
        NavMenu,
    },
    created() {
        // document.getElementById("sideBar").style.left = document.getElementById("mainIndex").offsetLeft - document.getElementById("sideBar").clientWidth + "px";
    },
    data() {    
        return{
            tagList: [
                {key: 1, name: '/tag1', tagItem: '生活好物推荐'},
                {key: 2, name: '/tag2', tagItem: '开学考试风暴'},
                {key: 3, name: '/tag3', tagItem: '有用的表白墙'},
            ],
            ruleForm: {
                content: '',
                tags: '',
            },
            rules: {
                tags: [
                    { type: 'array', required: true, message: '请选择一个话题', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '别忘了填写内容呀~', trigger: 'blur' },
                    { min: 5, max: 300, message: '长度在 5 到 300 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
    toRelease() {
       document.getElementById("mainIndex").style.visibility = "hidden";
       document.getElementById("releaseForm").style.visibility = "visible";
       document.getElementById("releaseBtn").style.visibility = "hidden";
    },
    toDetail() {
      document.getElementById("mainIndex").style.visibility = "visible";
       document.getElementById("releaseForm").style.visibility = "hidden";
       document.getElementById("ReleaseBtn").style.visibility = "visible";
    }
    },
    computed: {}
}
</script>



<style scoped>
#sideBar {
    position: absolute;
    margin-left: 50%;
    left: -700px;
    top: 100px;
    width: 300px;
}
#releaseBtn {
    padding: 0;
    margin: 0;
    position: fixed;
    right:30px;
    bottom:30px;
    font-size: 50px;
}
#releaseForm {
    margin: 0;
    padding: 0;
    position: fixed;
    width: 400px;
    left: 50%;
    margin-left: -200px;
    margin-top: 50px;
}
</style>