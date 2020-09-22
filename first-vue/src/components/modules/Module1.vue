<template>
    <comment :comments="commentData"></comment>
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
      }
    },
    methods: {

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
</style>
