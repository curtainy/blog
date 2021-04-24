<template>
  <div class="chat-detail">
      <div class="top">
          <img :src="chat.avatorUrl" class="img"/>
          <div class="info">
              <div class="username">{{chat.username}}</div>
              <div class="date">{{chat.date}}</div>
          </div>
      </div>
      <div class="content">{{chat.content}}</div>
      <span class="topic">{{chat.topic}}</span>
      <div class="operate">
          <div @click="handleThumb" :class="{'thumbed': thumbed}">
              <i class="el-icon-thumb"></i>
              {{chat.thumb}}</div>
          <div @click.stop="handleComment"><i class="el-icon-chat-line-round"></i> {{chat.comment.length}}</div>
          <div @click="dialogVisible=true"><i class="el-icon-warning-outline"></i> 举报</div>
      </div>
      <div class="show-comment" v-if="showComment">
          <div class="comment">
              <!-- img应该为user的头像 -->
              <img :src="$store.state.token.avatorUrl" class="user-img"/>
              <el-input v-model="content" placeholder="输入评论..." class="input-comment"></el-input>
              <el-button type="primary" 
              class="btn-comment" 
              :disabled="content === ''"
               @click="publishComment">评论</el-button>
          </div>
          <div class="comment-detail"  v-for="(comment, index) in chat.comment" :key="index">
              <img :src="comment.avatorUrl" class="user-img" style="vertical-align: middle;margin-right: 10px"/>
              <span>{{comment.username}}</span>
              <div class="comment-context">
                <div>{{comment.content}}</div>
                <div class="bottom">
                    <span>{{comment.date}}</span>
                    <span @click="toResponse(index,comment.username,comment.id)"><i class="el-icon-chat-line-round"></i> 回复</span>
                </div>
                <div v-for="(response, index1) in comment.response" :key="index1" class="response">
                     <img :src="response.avatorUrl" class="user-img" style="vertical-align: middle;margin-right: 10px"/>
                    <span>{{response.username}}</span>
                    <div class="response-context">
                        <div>{{response.content}}</div>
                        <div class="response-bottom bottom">
                            <span>{{response.date}}</span>
                            <span @click="toResponse(index, response.username,response.id)"><i class="el-icon-chat-line-round"></i> 回复</span>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div> 
      <el-dialog
        title="请输入举报原因"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="reportReason" placeholder="请输入"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleReoprt" :disabled="reportReason.length == 0">确 定</el-button>
        </div>
    </el-dialog> 
  </div>
</template>

<script>

import { topicComment, report, thumb } from 'network/topic.js'

export default {
    data() {
       return {
           showComment: false,
           dialogVisible: false,
           thumbed: false,
           flag: 1,
           reportReason: '',
           content: '',
           tolderId: '',
           commentIndex: -1,
           type: 0 // 0 评论  1 回复
       }
    },
    props: {
        chat: Object
    },
    methods: {
        handleComment() {
            this.showComment = !this.showComment
        },
        // 评论
        publishComment() {
            const data = Object.assign(this.$store.state.token, {
                content: this.content,
                date: new Date().getTime(),
                type: this.type,
                index: this.commentIndex,
                tolderId: this.type === 0 ? this.chat.id : this.tolderId,
                response: []
            })
            topicComment(data).then(res => {
                if(res.code === '0') {
                    this.$message.success('评论成功')
                    if(this.commentIndex === -1) this.chat.comment.push(data)
                    else this.chat.comment[this.commentIndex].response.push(data)
                    this.content = ''
                    this.commentIndex = -1
                }
            })
        },
        // 回复评论
       toResponse(index, username, id) {
           this.content = '@' + username
           this.commentIndex = index
           this.tolderId = id
           this.type = 1
       },
       // 举报
       handleReoprt() {
           report({
               id: this.$store.state.token.id,
               reportReason: this.reportReason,
               date: new Date().getTime(),
               type: 'topic',
            //    id: 话题对应的id
               reportedId: this.chat.id // 被举报人的id
           }).then(res => {
               if(res.code === '0') {
                    this.$message.success('已提交举报')
                    this.dialogVisible = false
                    this.reportReason = ''
               }
           })
       },
       // 点赞
       handleThumb() {
           thumb({
            //    id: 话题对应id
            id: 1,
            type: 'topic',
            thumbFlag: this.thumbed
            }).then(res => {
                
                if(res.code === '0') {
                    this.chat.thumb += this.flag
                    this.flag = -this.flag
                    this.thumbed = !this.thumbed
                }
            })
       }
    }

}
</script>

<style scoped>
.chat-detail {
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 5px;
    margin-top: 20px;
}
.top {
    padding: 20px;
}
.img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
}
.info {
    margin-left: 20px;
    display: inline-block;
}
.username {
    font-weight: bold;
    position: relative;
    font-size: 16px;
    top: -15px;
}
.date {
    color: silver;
}
.content {
    padding: 0 20px 10px 110px;
    /* border-bottom: 1px solid red; */
}
.topic {
   margin-left: 110px;
   margin-bottom: 10px;
   display: inline-block;
   padding: 5px 10px;
   border-radius: 3px;
   font-size: 12px;
   border: 1px solid #589ef8;
   color: #589ef8;
}
.operate {
    display: flex;
    border: 1px solid rgb(238, 237, 237);
}
.operate>div {
    padding: 10px 0;
    flex: 1;
    text-align: center;
    border-left: 1px solid rgb(238, 237, 237);
    font-size: 14px;
    cursor: pointer;
    color: #8a8c98;
}
.thumbed {
    color: #589ef8 !important;
}
.operate>div:hover, .bottom>span:last-child:hover {
    color: #589ef8;
}
.operate>div>i {
    transform: scale(1.3);
    margin-right: 5px;
    opacity: 0.7;
}
.show-comment {
    padding: 20px;
    background: #fff;
}
.comment {
    padding: 10px 10px 5px 10px;
    background: rgb(246, 245, 245);
}
.input-comment {
    width: 80%;
    margin: 0 10px;
    position: relative;
    top: -12px;
}
.user-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
}
.btn-comment {
    position: relative;
    top: -12px;
}
.comment-context {
    margin-left: 50px;
    border-bottom: 1px solid rgb(238, 237, 237);
    padding-bottom: 10px;
}
.comment-context>div {
    margin-top: 10px;
}
.comment-detail {
    padding-top: 10px;
}
.bottom>span {
    color: silver;
}
.bottom>span:last-child {
    float: right;
    cursor: pointer;
}
.response {
    background: rgb(253, 251, 251);
    padding: 5px;
}
.response-context {
    margin-left: 50px;
    padding-bottom: 10px;
}
.response-bottom {
    margin-top: 5px;
}

</style>