<!--评论模块-->
<template>
  <div class="tz_container">
    <div class="comment" v-for="item in comments" v-bind:key="item.index">
        <!-- 主评论 -->
      
      
      <div class="content">{{item.content}}</div>

      <div class="control">


        <div class="info">
            <span class="name">{{item.author}}</span>
            &nbsp;&nbsp;
            <span class="date">{{item.time}}</span>
        </div>

        <div class="ct_right">
          <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
            <span class="like-num">{{item.like > 0 ? item.like + '人赞' : '赞同'}}</span>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="comment-reply" @click="showCommentReply(item)">
            <span>全部评论</span>
          </span>
          <el-divider direction="vertical"></el-divider>
          <span class="comment-toReply" @click="toReply(item)">
          <span>回复</span>
          </span>
        </div>

      </div>



      <!-- 回复 -->
      <div class="reply" v-if="showReplyId === item.id">

        <div class="item" v-for="remark in item.remark" v-bind:key="remark.index">
          <div class="reply-content">
            <span class="from-name">{{remark.author}}</span><span>: </span>
            <span class="to-name">@{{remark.target}}</span>
            <span>{{remark.content}}</span>
          </div>
          
          <div class="reply-bottom">
            <span>{{remark.time}}</span>
            <span>&nbsp&nbsp&nbsp&nbsp</span>
            <!-- <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
              <span class="">{{remark.like > 0 ? remark.like + '人赞' : '赞同'}}</span>
            </span>
            <el-divider direction="vertical"></el-divider> -->
            <span class="reply-text" @click="toReply(item, remark)">
              <span>回复</span>
            </span>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <span class="reply-text-hide" @click="showCommentReply(item)">
              <span>收起</span>
            </span>
          </div>
        </div>
        
      </div>


      
      <!-- 评论/回复框 -->
      <div class="input-wrapper" v-if="showToReplyId === item.id">
        <el-input class="gray-bg-input"
                  v-model="inputComment"
                  type="textarea"
                  :rows="3"
                  autofocus
                  :autosize="{ minRows: 3}"
                  show-word-limit
                  minlength="5"
                  maxlength="140"
                  placeholder="写下你的评论">
        </el-input>
        <div class="btn-control">
          <el-button class="btn" type="danger" circle icon="el-icon-delete" size="mini" @click="toReply(item, remark)"></el-button>
          <el-button class="btn" type="success" circle icon="el-icon-check" size="mini" @click="commitComment"></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue'

  export default {
    props: {
      comments: {
        type: Array,
        required: true
      }
    },
    components: {},
    data() {
      return {
        inputComment: '',
        showReplyId: '',
        showToReplyId: ''
      }
    },
    computed: {},
    methods: {
      /**
       * 点赞
       */
      likeClick(item) {
        if (item.isLike === null) {
          Vue.$set(item, "isLike", true);
          item.like++
        } else {
          if (item.isLike) {  item.like-- } else { item.like++ }
          item.isLike = !item.isLike;
          let param = new URLSearchParams()
          param.append('id', this.item.id),
          this.$axios({
              method: 'post',
              url: '/like',
              data: param
          })
          .then(successResponse => {
             if(successResponse.data == 200){
                this.$message({
                  showClose: true,
                  message: '点赞+1'
                });
            }else{
              this.$message({
                      showClose: true,
                      message: '点赞失败',
                      type: 'error' 
                    });
            }
          })
        }
      },

      /**
       * 提交评论
       */
      commitComment() {
        console.log(this.inputComment);
        let param = new URLSearchParams()
          param.append('content', this.item.content),
          param.append('target', this.item.remark.target),//后端缺少
          param.append('rid', this.item.remark.rid),
          this.$axios({
              method: 'post',
              url: '/reply',
              data: param
          })
          .then(successResponse => {
             if(successResponse.data == 200){
                this.$message({
                  showClose: true,
                  message: '评论成功',
                  type: 'success' 
                });
                //刷新？
             }else {
                this.$message({
                  showClose: true,
                  message: '评论失败',
                  type: 'error' 
                });
             }
           
          })
      },

      /**
       * 点击评论按钮显示输入框
       * item: 当前大评论
       * reply: 当前回复的评论
       */
      showCommentReply(item) {
        if(this.showReplyId == item.id) this.showReplyId = ''
        else {
          this.showReplyId = item.id
        }
      },
      toReply(item, remark) {
        if(this.showToReplyId == item.id) this.showToReplyId = ''
        else {
          this.showToReplyId = item.id
          if (remark) {
          this.inputComment = "@" + remark.author + " "
          } else {
            this.inputComment = ''
            }
        }
      }
    },
    created() {
      console.log(this.comments)
    }
  }
</script>


<style>
/*
**
// style scoped lang="scss"
//   @import "../../public/scss/index.scss";
*/



 .tz_container {
  padding: 0 10px 10px 10px;
  margin-top: 10px;
  box-sizing: border-box;

  background-color: #F2F6FC;
  border-radius: 5px;
  width: 800px;
  position: absolute;
  left:50%;
  margin-left: -400px;

}
.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  
}

.info {
  display: flex;
  align-items: center;
}
 .name {
  font-size: 12px;
  /* color: #606266; */
  color: #909399;
  font-weight: 500;
}
 .date {
  font-size: 12px;
  font-weight: lighter;
  color: #909399;
}

.content {
  text-align: left;
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0 0px 0px;/*36+10*/ 
}
.control {
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #909399;
  margin-top: 6px; 
  user-select: none;
}
.ct_right {
  display: flex;
  flex-direction: row;
}
.like {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-size: 12px;
}
.like.active, 
.like:hover {
  color: #409EFF;
}
.iconfont {
  font-size: 14px;
  margin-right: 5px;
}
.comment-reply {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
}
.comment-reply:hover {
  color: #409EFF;
}
.comment-toReply {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
}
.comment-toReply:hover {
  color: #409EFF;
}


.reply {
  margin: 10px 0;
  border-left: 1px solid grey;
}
.reply .item {
  margin: 0 10px;
  padding: 10px 0;
}
.reply .item .reply-content {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #303133;
}
.reply .item .reply-content .from-name {
  margin-left: 5px;
  color: #409EFF;
  font-size: 12px;
}
.reply .item .reply-content .to-name {
  margin: 0 5px;
  color: #409EFF;
  font-size: 12px;
}
.reply .item .reply-bottom {
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-left: 5px;
  font-size: 12px;
  color: #909399;
  user-select: none;
}
.reply .item .reply-bottom .reply-text {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.reply .item .reply-bottom .reply-text:hover {
  color: #333;
}
.reply .item .reply-bottom .reply-text-hide {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.reply .item .reply-bottom .reply-text-hide:hover {
  color: #333;
}



.comment .input-wrapper {
  display: flex;
  padding: 10px 0px;
}
.comment .input-wrapper .btn-control {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-top: 10px;
}
.comment .input-wrapper .btn-control .btn {
  margin: 2px 0 2px 5px;
}

</style>