<template>
  <div class="detail_blog">
    <div class="db_title">{{blog.title}}</div>
    <div class="db_msg">
      <div class="db_type">{{blog.type}}</div>
      <span>{{blog.username}}</span>
      <span class="db_date">{{blog.date | date}}</span>
      <i class="el-icon-chat-line-round"></i>
      <span class="number">{{getLength}}</span>
      <i class="el-icon-view"></i>
      <span class="number">{{blog.browse}}</span>
    </div>
    <div v-highlight v-html="content"></div> 
    <div class="operate">
      <div @click="handleThumb" :class="{'checked': thumbed}"><i class="el-icon-thumb"></i> 点赞</div>
      <div @click.stop="handleCollect" :class="{'checked': collected}"><i class="el-icon-star-off"></i> 收藏</div>
      <div @click="dialogVisible=true" :class="{'checked': reported}"><i class="el-icon-warning-outline"></i> 举报</div>
    </div>
    <div class="db_comment">
      <img v-if="this.$store.state.isLoad" :src="blog.avatorUrl">
      <img v-else src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=145692761,4091651670&fm=26&gp=0.jpg">
      <el-input v-model="commentContent" placeholder="请留下你的评论吧~" style="width: 80%;"></el-input>
      <div @click="sendComment" style="cursor: pointer;" :disabled="commentContent.length">发表评论</div>
    </div>
    <comment-list :commentList="blog.comment" @resComment="resComment"/>
    <el-dialog title="请输入举报原因"  :visible.sync="dialogVisible" width="30%">
      <el-input v-model="reportReason" placeholder="请输入"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleReoprt" :disabled="reportReason.length == 0">确 定</el-button>
      </div>
    </el-dialog> 
  </div>
</template>

<script>

import marked from 'marked'
import CommentList from 'components/comment/CommentList'
import { blogDetail, publishComment, collectBlog } from 'network/blog'
import { report, thumb } from 'network/topic.js'

export default {
  name: 'DetailBlog',
  data(){
    return {
      dialogVisible: false,
      thumbed: false,
      collected: false,
      reported: false,
      reportReason: '',
      blog: {},
      content: '',
      commentContent: '',
      type: 0,   //0 发表   1 评论
      tolderId: '', // 被回复的人
      resIndex: ''//被回复评论的索引
    }
  },
  components:{
    CommentList
  },
  async mounted() {
    await blogDetail({blogId: this.$route.params.blogId}).then(res => {
      if(res.code === '0') this.blog = res.data
    })
    this.content = marked(this.blog.content)
  },
  computed: {
    getLength(){
      if(!this.blog.comment) return 0
      let count = this.blog.comment.length
      this.blog.comment.forEach(item => {
        item.response && (count += item.response.length)
      })
      return count
    }
  },
  methods: {
    //发表评论
    sendComment(){
      if(!this.$store.state.isLoad){//还未登录
        this.$message.error('登录后才能进行评论哦')
      }else{ 
        // 评论主要内容
        const data = Object.assign(this.$store.state.token, {
          content: this.commentContent,  // 评论内容
          date: new Date().getTime(), // 时间
          index: this.resIndex, // 被回复的索引
          type: this.type, // 类型
          tolder: this.type === 0 ? this.blog._id : this.tolderId // 被回复人的id
        })
        publishComment(data).then(res => {
          if(res.code === '0') {
            this.$message.success('评论成功')
            if(this.type == 0) this.blog.comment.push(data)
            else this.blog.comment[this.resIndex].response.push(data)
            this.commentContent = ''
            this.type = 0
          }
        })
      }
    },
    //回复评论
    resComment(index,username,id){
      this.commentContent = '@'+ username
      this.resIndex = index
      this.type = 1
      this.tolderId = id
    },
    // 举报
    handleReoprt() {
      report({
         _id: this.$store.state.token._id,
        reportReason: this.reportReason,
        date: new Date().getTime(),
        type: 'blog',
        //    id: 话题对应的id
        reportedId: this.blog._id // 被举报人的id
      }).then(res => {
        if(res.code === '0') {
          this.$message.success('已提交举报')
          this.dialogVisible = false
          this.reportReason = ''
          this.reported = true
        }
      })
    },
    // 点赞
    handleThumb() {
      thumb({
        //    id: 话题对应id
        id: 1,
        type: 'blog',
        thumbFlag: this.thumbed
        }).then(res => { 
          if(res.code === '0') {
            this.thumbed = !this.thumbed
          }
        })
    },
    // 收藏
    handleCollect() {
      collectBlog({
        _id: this.$store.state.token._id,
        blogId: this.blog.blogId,
        collectFlag: this.collected
      }).then(res => {
        if(res.code === '0') {
          this.collected = !this.collected
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.detail_blog{
  width: 70%;
  margin-left: 15%;
  margin-top: 20px;
  background: white;
  border-radius: 5px;
  padding: 10px;
  min-height: calc(100vh - 90px);
  position: relative;
}
.db_title{
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
}
.db_msg{
  height: 30px;
  width: 100%;
  background: rgb(247,247,252);
  font-size: 14px;
  color: rgb(152,154,170);
}
.db_type{
  padding: 5px;
  display: inline-block;
  font-size: 14px;
  background: #a3ccf5;
  /* color: #409EFF; */
  color: #fff;
  border-radius: 2px;
  margin: 2px 10px 0 1px;
}
.db_date{
  margin: 0 50px;
}
.number{
  margin: 0 15px 0 5px;
}

.db_comment>img{
  margin-top: 80px;
  margin-right: 0px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
.db_comment>textarea{
  width: 82%;
}
textarea::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: gainsboro;
    font-size: 14px;
}
.db_comment>div{
  display: inline-block;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #409EFF;
  color: white;
  position: relative;
  top: -10px;
  margin-left: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.operate {
  position: absolute;
  right: 0;
  &  i {
    transform: scale(1.5);
  }
  & > div {
    display: inline-block;
    padding: 20px;
    font-size: 14px;
  }
  & > div:hover {
    cursor: pointer;
    color: #589ef8; 
  }
  .checked {
    color: #589ef8; 
  }
}
</style>