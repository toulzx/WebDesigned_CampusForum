<template>
    <div>
        <!--点击上传的图标，支持拖拽上传-->
        <!--action是上传请求的服务器地址-->
        <el-upload
        class="upload-demo"
        action=""
        drag
        :auto-upload="false"
        :show-file-list="false" 
        :on-change='changeUpload'
        >
        <i slot="default" class="el-icon-plus"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
        </el-upload>
        <!--编辑图片的弹出层-->
        <!--裁剪区域-->
        <el-dialog title="图片编辑" :visible.sync="dialogVisible" append-to-body>
        <div class="cropper-content">
        <div class="cropper" style="text-align:center">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            
            @realTime="realTime"
            @imgLoad="imgLoad"
          ></vueCropper>
        </div>
        <!--预览-->
      <div class="show-preview" :style="{'width': 500 + 'px', 'height': 500 + 'px',  'overflow': 'hidden', 'margin-left': '150px'}">
          <h2>预览</h2>
      <div :style="previews.div" class="preview">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
      </div>
      <!--工具栏-->
      <div slot="footer" class="dialog-footer" >
       <el-upload action="" style="margin-right:10px"><el-button type="primary">更换图片</el-button></el-upload>
       <el-button type="primary" @click="rotateLeft">↺</el-button>
       <el-button type="primary" @click="rotateRight">↻</el-button>
       <el-button round type="danger" @click="finish(blob)">上传</el-button>
      </div>
      
        </el-dialog>

    </div>
</template>

<script>
export default {
    data(){
        return {
            dialogVisible:false,

             option: {
        img: '../../static/megumi.jpg', // 裁剪图片的地址，会从后端获取数据，先随便用一个代替。
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      previews:{},

        }
    },
    methods:{
        realTime(data){
             this.previews = data;
        },
        changeUpload(file,fileList){
            const maxSize5M = file.size/1024/1024<5
            if(!maxSize5M)
            {
                this.$message.error('文件大小不能超过5M')
                return false
            }
            this.fileinfo = file
            this.$nextTick(()=>{
                //this.option.img = file.url
                this.dialogVisible = true
                //console.log(file.name)
            })
            
        },
        imgLoad(msg){
          console.log(msg)
        },
        rotateLeft(){this.$refs.cropper.rotateLeft()},
        rotateRight(){this.$refs.cropper.rotateRight()},

         // 上传图片（点击上传按钮）,没有测试过我不确定这样对不对，到时再改。
      finish(type) {
        let formData = new FormData();
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            let img = window.URL.createObjectURL(data);
            formData.append('images', data);
            this.$axios.post('',formData)
            .then(successResponse=>{})
            .catch(failResponse=>{})
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            formData.append('images', data);
            formData.append('images', data);
            this.$axios.post('',formData)
            .then(successResponse=>{})
            .catch(failResponse=>{})
          })
        }
      },

    }
}
</script>

<style scoped>
.cropper-content
{
    display: flex;
}
.cropper
{
    width: 260px;
    height: 260px;
}
.dialog-footer
{
    display: flex;
    flex-direction: row;
}
.show-preview
{
    display: flex;
}
.preview{
      overflow: hidden;
      border-radius: 50%;
      border:1px solid #cccccc;
      background: #cccccc;
      
    }

</style>