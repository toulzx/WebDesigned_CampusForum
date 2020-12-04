<template>
  <div id="mainIndex">
    <el-card class="cards" v-for="item in tagData" :key="item.index" shadow="hover">
        <p class="content">{{item.content}}</p>
        <div class="btns">
            <el-button class="likeBtn" type="text" @click="clickLike(item)" :disabled="item.haveClickLike"><i class="el-icon-caret-top"></i>{{item.like+"人"}}</el-button>
            <el-button class="dislikeBtn" type="text" @click="clickDislike(item)" :disabled="item.haveClickDislike"><i class="el-icon-caret-bottom"></i>{{item.dislike+"人"}}</el-button>
        </div>
    </el-card>
  </div>
</template>

<script>
import {mock} from '../common/Tag_mockdata'
export default {
    components: {

    },
    created() {
        this.tagData = mock.data3;
    },
    data() {
        return{
            tagData: [],
        }
    },
    methods: {
        clickLike(item) {
            if(item.haveClickDislike){
                item.like--;
                item.haveClickDislike = false;
            }else{
                item.like++;
                item.haveClickDislike = true;
            } 
        },
         clickDislike(item) {
            if(item.haveClickLike){
                item.dislike--;
                item.haveClickLike = false;
            }else{
                item.dislike++;
                item.haveClickLike = true;
            } 
        }
    },
    computed: {}
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
  p {
    text-align: center;
}
</style>