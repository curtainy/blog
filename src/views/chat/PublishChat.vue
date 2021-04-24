<template>
  <div class="publish-chat">
      <div class="input">
        <el-input
            type="textarea"
            class="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            v-if="showUploadPic"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div class="topic" v-show="topic">{{topic}}</div>
      </div>
      <div class="tag">
        <i class="el-icon-picture-outline pic-icon"></i>
        <span @click="showUploadPic=!showUploadPic">图片</span>
        <el-dropdown  @command="handleCommand">
            <span class="el-dropdown-link">#话题</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                    v-for="(topic, index) in topicList" 
                    :key="index"
                    :command="topic">
                    {{topic}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button type="primary" class="btn" size="medium" @click="publishTopic">发布</el-button>
  </div>
</template>

<script>

import { publishTopic } from 'network/topic.js'
 
export default {
    data() {
        return {
            textarea: '',
            showUploadPic: false,
            dialogImageUrl: '',
            dialogVisible: false,
            topic: ''
        }
    },
    props: {
        topicList: Array
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleCommand(command) {
            this.topic = command
        },
        publishTopic() {
            publishTopic({id: this.$store.state.token.id ,content: this.textarea, topic: this.topic}).then(res => {
                if(res.code == '0') {
                    this.$message.success('发表成功')
                    this.textarea = ''
                    this.topic = ''
                    this.showUploadPic = false
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.publish-chat {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: #fff;
    border-radius: 5px;

    /* height: 150px; */

    .input {
        border: 1px solid #DCDFE6;
    }
    .tag {
        display: inline-block;
        margin-top: 10px;
        color: #589ef8;
        &>span {
            margin-right: 15px;
            cursor: pointer;
        }
    }
    .topic {
        text-align: center;
        border-radius: 5px;
        border: 1px dashed #589ef8;
        font-size: 14px;
        color: #589ef8;
        width: 80px;
        height: 25px;
        line-height: 25px;
        margin-left: 10px;
        margin-bottom: 10px;
    }
}
.btn {
    margin-top: 10px;
    float: right;
}
.el-dropdown-link {
    cursor: pointer;
    color: #589ef8;
    font-size: 16px;
}

/deep/ .el-textarea__inner {
    border: 0;
    resize: none;
}

/deep/ .el-upload-list--picture-card .el-upload-list__item {
    transform: scale(0.7);
}

/deep/  .el-upload--picture-card {
    transform: scale(0.7);
}
</style>