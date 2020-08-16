<!--评论模块-->
<template>
  <div class="container">
    <div class="comment" v-for="item in comments" v-bind:key="item">
       <!-- <el-divider></el-divider> -->
        <!-- 主评论 -->
      <div class="info">
        <img class="avatar" :src="item.fromAvatar"/>
        <div class="right">
          <div class="name">{{item.fromName}}</div>
          <div class="date">{{item.date}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span>
        <span class="comment-reply" @click="showCommentReply(item)">
          <i class="iconfont icon-comment"></i>
          <span>全部评论</span>
        </span>
        <span class="comment-toReply" @click="toReply(item)">
          <i class="iconfont icon-reply"></i>
          <span>回复</span>
        </span>
      </div>
      <!-- 回复 -->
      <div class="reply" v-if="showReplyId === item.id">
        <div class="item" v-for="reply in item.reply" v-bind:key="reply">
          <div class="reply-content">
            <img class="avatar" :src="reply.fromAvatar"/>
            <span class="from-name">{{reply.fromName}}</span><span>: </span>
            <span class="to-name">@{{reply.toName}}</span>
            <span>{{reply.content}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{reply.date}}</span>
            <span class="reply-text" @click="toReply(item, reply)">
              <i class="iconfont icon-reply"></i>
              <span>回复</span>
            </span>
            <span class="reply-text-hide" @click="showCommentReply(item)">
              <i class="iconfont icon-comment"></i>
              <span>收起</span>
            </span>
          </div>
        </div>
        
      </div>
      <!-- 评论/回复框 -->
        <!-- <div class="write-reply" v-if="item.reply.length > 0" @click="showCommentInput(item)">
        </div> -->
        <transition name="fade">
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
              <el-button class="btn" type="danger" circle icon="el-icon-delete" size="mini" @click="toReply(item, reply)"></el-button>
              <el-button class="btn" type="success" circle icon="el-icon-check" size="mini" @click="commitComment"></el-button>
            </div>
          </div>
        </transition>
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
          item.likeNum++
        } else {
          if (item.isLike) {
            item.likeNum--
          } else {
            item.likeNum++
          }
          item.isLike = !item.isLike;
        }
      },

      /**
       * 提交评论
       */
      commitComment() {
        console.log(this.inputComment);
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
      toReply(item, reply) {
        if(this.showToReplyId == item.id) this.showToReplyId = ''
        else {
          this.showToReplyId = item.id
          if (reply) {
          this.inputComment = "@" + reply.fromName + " "
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


<style scoped>
/*
**
// style scoped lang="scss"
//   @import "../../public/scss/index.scss";
*/
 .container {
  padding: 0 10px;
  box-sizing: border-box;
}
.container .comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #F2F6FC;
}
.container .comment .info {
  display: flex;
  align-items: center;
}
.container .comment .info .avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.container .comment .info .right {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}
.container .comment .info .right .name {
  text-align: left;
  font-size: 16px;
  color: #606266;
  margin-bottom: 5px;
  font-weight: 500;
}
.container .comment .info .right .date {
  font-size: 12px;
  font-weight: lighter;
  color: #909399;
}
.container .comment .content {
  text-align: left;
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0 10px 46px;/*36+10*/ 
}
.container .comment .control {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #909399;
  padding: 0 0 0 46px;
}
.container .comment .control .like {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}
.container .comment .control .like.active, 
.container .comment .control .like:hover {
  color: #409EFF;
}
.container .comment .control .like .iconfont {
  font-size: 14px;
  margin-right: 5px;
}
.container .comment .control .comment-reply {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.container .comment .control .comment-reply:hover {
  color: #333;
}
.container .comment .control .comment-reply .iconfont {
  font-size: 16px;
  margin-right: 5px;
}
.container .comment .control .comment-toReply {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.container .comment .control .comment-toReply:hover {
  color: #333;
}
.container .comment .control .comment-toReply .iconfont {
  font-size: 16px;
  margin-right: 5px;
}
.container .comment .reply {
  margin: 10px 0;
  margin-left: 46px; /*36+10 */
}
.container .comment .reply .item {
  margin: 0 10px;
  padding: 10px 0;
  /* border-bottom: 1px dashed #EBEEF5; */
}
.container .comment .reply .item .reply-content {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #303133;
}
.container .comment .reply .item .avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
.container .comment .reply .item .reply-content .from-name {
  margin-left: 5px;
  color: #409EFF;
}
.container .comment .reply .item .reply-content .to-name {
  margin: 0 5px;
  color: #409EFF;
  margin-left: 5px;
  margin-right: 5px;
}
.container .comment .reply .item .reply-bottom {
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-left: 29px; /*24+5 */
  font-size: 12px;
  color: #909399;
}
.container .comment .reply .item .reply-bottom .reply-text {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.container .comment .reply .item .reply-bottom .reply-text:hover {
  color: #333;
}
.container .comment .reply .item .reply-bottom .reply-text .icon-comment {
  margin-right: 10px;
}
.container .comment .reply .item .reply-bottom .reply-text .icon-reply {
  margin-right: 10px;
}
.container .comment .reply .item .reply-bottom .reply-text-hide {
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
}
.container .comment .reply .item .reply-bottom .reply-text-hide:hover {
  color: #333;
}
.container .comment .reply .item .reply-bottom .reply-text-hide .icon-comment {
  margin-right: 10px;
}
.container .comment .reply .item .reply-bottom .reply-text-hide .icon-reply {
  margin-right: 10px;
}
.container .comment .write-reply {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;
  padding: 10px;
  cursor: pointer;
}
/* .container .comment .write-reply:hover {
  color: #303133;
}
.container .comment .write-reply .el-icon-edit {
  margin-right: 5px;
} */
.container .comment .reply .fade-enter-active, 
.container .comment .reply fade-leave-active {
  transition: opacity 0.5s;
}
.container .comment .reply .fade-enter, 
.container .comment .reply .fade-leave-to {
  opacity: 0;
}
.container .comment .input-wrapper {
  display: flex;

  padding: 10px;
  margin-left: 29px; /*24+5*/
}
.container .comment .input-wrapper .btn-control {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  padding-top: 10px;
}
/* .container .comment .input-wrapper .btn-control .cancel {
  color: #606266;
  margin-right: 20px;
  cursor: pointer;
}
.container .comment .input-wrapper .btn-control .cancel:hover {
  color: #333;
}
.container .comment .input-wrapper .btn-control .confirm {
  font-size: 16px;
} */
.container .comment .input-wrapper .btn-control .btn {
  margin: 2px 0 2px 5px;
}

/*# sourceMappingURL=css.css.map */

</style>