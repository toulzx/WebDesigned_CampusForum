<template>
        <!-- <div class="block">
          <el-timeline>
            <el-timeline-item :timestamp="tiezi.created" placement="top" v-for="tiezi in tiezis" v-bind:key="tiezi.id">
              <el-card>
                <h4>
                  <router-link :to="{name: 'Tiezi', params: {tzId: tiezi.id}}">
                      {{tiezi.title}}
                  </router-link>
                </h4>
                <p>{{tiezi.content}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
          <el-pagination
            layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change=page
                    >
          </el-pagination>
        </div> -->
        <comment :comments="commentData"></comment>
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

      tiezi: {   },
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  methods: {
    page(currentPage) {
      const _this = this
      _this.$axios.get("/tiezi?currentPage=" + currentPage).then(res => {
        console.log(res)
        _this.tiezi = res.data.data.records
        _this.currentPage = res.data.data.currentPage
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.size
      })
    },
    created(){
      this.page(1)
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
    margin: auto;/*去你大爷，没这个不居中*/ 
    padding: 20px;
  }
</style>