<template>
  <div id="mainIndex">
      <span id="tip">让我看看，这次发布点啥好呢</span>
    <el-input id="input_content"
                      v-model="input_content"
                      type="textarea"
                      :rows="8"
                      autofocus
                      :autosize="{ minRows: 3}"
                      show-word-limit
                      minlength="5"
                      maxlength="500"
                      placeholder="请输入内容">
    </el-input>
    <div id="control">
        <el-select v-model="tag" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" @click="onSubmit">发布</el-button>
        <el-popconfirm
            confirmButtonText='没错'
            cancelButtonText='我再想想'
            title="这是一段内容确定删除吗？"
            hideIcon=true
            @onConfirm = "onCancel"
            >
            <el-button slot="reference">取消</el-button>
        </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return{
            input_content: '我已经准备好了',
            options: [{
                value: '选项1',
                label: '学习互助'
                }, {
                value: '选项2',
                label: '项目对接'
                }, {
                value: '选项3',
                label: '选课咨询'
                }],
            tag: ''
            }
    },
    methods: {
        onSubmit(){
          let param = new URLSearchParams()
          param.append('content', this.input_content)
          param.append('tag', this.tag)
          this.$axios({
              method: 'post',
              url: '/add',
              data: param
          })
          .then(successResponse => {
            if(successResponse.data == 200){
                this.$message({
                showClose: true,
                message: '成功发布',
                type: 'success' 
                });
              this.$router.replace({path: '/recommend'})
            } 
            else 
            this.$message({
                showClose: true,
                message: '发布失败',
                type: 'error' 
            });
          })
        },
        onCancel(){
              this.$router.replace({path: '/recommend'})
        }
    }
}
</script>

<style scoped>
  #mainIndex {
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding: 20px;
    margin-top:200px
  }
  #tip {
      margin: 20px;
  }
  #control {
      margin:20px 0px;
      display: flex;
      justify-content: flex-end;
  }
  #control button{
      margin-left: 10px;
  }
</style>
