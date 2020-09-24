<template>
<div>
    <comment :comments="commentData" class="under" v-bind:style="under_sty"></comment>
     <!-- 窗体 -->
    <div id="release" class="under" v-bind:style="release_sty">
        <span>昵称：</span><input type="text" class="basic_content" id="person" name="username" placeholder="用户名/昵称" value="">
        <span>口令：</span><input type="password" class="basic_content" id="password" name="userpassword" placeholder="记住您的口令以便下次发布">
        <span>评论：</span><textarea id="text_content" name="textcontent" placeholder="你的所见所闻很有意义"></textarea>
        <input type="button" value="确认发布" id="btn_release" v-on:click="btn_release()" />
    </div>
    <!-- +按钮 -->
    <svg id="add_svg" v-on:click="showit()" v-bind:style="svg_sty" t="1587611924463" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11816"><path d="M512 23.272727c269.917091 0 488.727273 218.810182 488.727273 488.727273a486.632727 486.632727 0 0 1-84.945455 275.409455 46.545455 46.545455 0 0 1-76.846545-52.526546A393.541818 393.541818 0 0 0 907.636364 512c0-218.507636-177.128727-395.636364-395.636364-395.636364S116.363636 293.492364 116.363636 512s177.128727 395.636364 395.636364 395.636364a395.170909 395.170909 0 0 0 125.44-20.293819 46.545455 46.545455 0 0 1 29.486545 88.296728A488.261818 488.261818 0 0 1 512 1000.727273C242.082909 1000.727273 23.272727 781.917091 23.272727 512S242.082909 23.272727 512 23.272727z m0 232.727273a46.545455 46.545455 0 0 1 46.545455 46.545455v162.90909h162.90909a46.545455 46.545455 0 1 1 0 93.09091h-162.90909v162.90909a46.545455 46.545455 0 1 1-93.09091 0v-162.90909h-162.90909a46.545455 46.545455 0 1 1 0-93.09091h162.90909v-162.90909a46.545455 46.545455 0 0 1 46.545455-46.545455z" p-id="11817"></path></svg>
</div>
</template>

<script>
  import {mock} from '../common/Tiezi_mockdata'
  import comment from '@/components/common/Tiezi'

  export default {
    components: {//评论
      comment
    },
    created(){
      this.commentData = mock.data;
      console.log(this.commentData)
    },
    data () {
      return{
      commentData: [],//评论
      check: 0,
      rotatenum: 180,
      under_sty: {},
      release_sty: {},
      svg_sty:{},
      }
    },
    methods: {
      btn_release(){
        var person = document.getElementById("person");
        var password = document.getElementById("password");
        var text_content = document.getElementById("text_content");
        var btn_release = document.getElementById("btn_release");
        if(person.value==""||person.value==null){
            alert("发布人不允许为空！");
            return false;
        }
        if(password.value==""||password.value==null){
            alert("口令不允许为空！");
            return false;
        }
        if(text_content.value==""||text_content.value==null){
            alert("内容不允许为空！");
            return false;
        }
      },
      showup(){
        var width = document.getElementById("release").offsetHeight;
        console.log("showup！！！")
        this.check++;
        //隐藏窗体后面内容
        this.under_sty = {
          visibility: 'hidden'
        };
        this.release_sty = {
          right: 0.5*document.documentElement.clientWidth + "px",
          marginRight: (-0.5*width) + "px",
        };
      },
      showdown(){
        var width = document.getElementById("release").offsetWidth;
        console.log("showdown！！！")
        this.check++;
        this.release_sty = {
          right: (-width) + "px",
        }
        //显示背景
        var that = this;//否则settimeout里面找不到data中变量！！！
        setTimeout(function(){
          that.release_sty={visibility: 'hidden',};
        },500);
        setTimeout(function(){
          that.under_sty={visibility: 'visible'};
        },1000);
      },
      showit(){
        if(this.check%2) this.showdown();
        else this.showup();
        this.svg_sty={
          transform: 'rotate('+this.rotatenum+'deg)',
        };
        this.rotatenum = this.rotatenum + 180;
      },


    },
    
  }
      
</script>

<style scoped>
#mainIndex {
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;/*去你大爷，没这个不居中*/ 
    padding: 20px;
  }

  #add_svg{
    width: 48px;
    height: 48px;
    position: fixed;
    right: 10px;
    bottom: 10px;
    transition: 0.5s;
}
#add_svg:hover{
    width: 45px;
    height: 45px;
    position: fixed;
    right: 13px;
    bottom: 13px;
    cursor: pointer;
}
#release{
    position: fixed;
    top: 50%;
    right: -400px;
    padding: 20px; 
    margin-top: -110px;
    display: grid;  
    grid-template-columns: [c1] 50px [c2] 300px [c3];
    grid-template-rows: [r1] 40px [r2] 40px [r3] 100px [r4] 40px [r5];
    row-gap: 10px;
    justify-items: right;
    /*为了确保右对齐效果，对单元格内的input标签
    再设置了固定宽度（见下），更改时注意*/
    transition: 1s;
}
#release span{
    text-align: right;
    padding-top: 10px;
    font-weight: bold;
}
#btn_release{
    grid-column: 2 / 3;
    border-radius:  5px;
    width: 150px;   
    height: 40px;    
}
hr{
    width: 800px;
}
#_svg {
    width: 800px;
    margin: 0 auto;
}
.basic_content{
    box-sizing: border-box;
    width: 300px;
    padding: 0 5px;
    border-radius:  5px;
}
#text_content{
    box-sizing: border-box;
    width: 300px;
    resize: none;
    padding: 10px 5px;
    border-radius: 5px;

}
</style>
