<template>
    <div id="mainIndex">
      <div>hello!</div>
        <div class="container" v-for="item in tiezi" :key="item">

    
         
          <div class="remark" v-if="showRemarkId === item.id">
            <div class="rm_container" v-for="remark in item.remark" :key="remark">
              <div class="rm_content">@{{remark.target}}&nbsp;{{remark.content}}</div>
              <div class="rm_info">{{remark.author}}&nbsp;于&nbsp;{{remark.time}}</div>
              <div class="rm_control">
                <el-button type="text">赞同</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text">回复</el-button>
              </div>
            </div>
        </div>
        <div class="reply" v-if="showReplyId === item.id">
          <el-input class="rp_input"
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
              <el-button class="btn" type="danger" circle icon="el-icon-delete" size="mini"></el-button>
              <el-button class="btn" type="success" circle icon="el-icon-check" size="mini"></el-button>
            </div>
        </div>
        </div>
  </div>
</template>



<script>

export default {
    name: "Tiezi.vue",
    created(){
      this.recommendData = RecommendData.mock.data
      console.log(this.recommendData)
    },
    data(){
      return{
        inputComment: '',
        showRemarkId: '',
        showReplyId: ''
      }
    },
    methods: {

    },
}
</script>