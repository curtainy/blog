<template>
  <div class="blog_list">
    <div v-for="(item,index) in blogList" :key="index" class="list">
        <div class="test" v-show="!isShow">
          <img :src="item.avatorUrl" class="bl_headImg">
          <span class="bl_username">{{item.username}}</span>
        </div>
        <div class="list_item">
          <div class="bl_type">{{item.type}}</div>
        <div class="bl_title" @click="toDetail(item.username,item.title)">{{item.title}}</div>
        <div class="bl_text">{{item.content | articleText}}</div>
        <div class="bl_tag" v-for="(tag,index) in item.tag" :key="index">{{tag}}</div>
        <div class="bl_time">{{item.date | date}}</div> 
        <div class="bl_comment">
          <i class="el-icon-chat-line-round"></i>
          <span>{{getLength(item.comment)}}</span> 
        </div>
        <div class="bl_browse">
          <i class="el-icon-view"></i>
          <span>{{item.browse}}</span>
        </div> 
        <div class="action" v-show="isShow">
          <span  v-if="!item.publish" class="pub" @click="handlePublish(item.username,item.title)">发布</span>
          <span class="edit" @click="handleModify(item.title)">编辑</span>
          <span class="cancel" @click="handleCancel(item.title)">删除</span>
        </div>
        </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    blogList: {
      type: Array,
      default(){
        return []
      }
    }
  },
  computed: {
    getLength(){
       return function(arr){
        let count = arr.length
        arr.forEach(item => {
          item.response && (count += item.response.length)
        })
        return count
      }
    }
  },
  methods: {
    //编辑博客
    handleModify(title){
      this.$router.push('/modifyblog/'+ title)
    },
    //删除博客
    handleCancel(title){
      const bool = window.confirm('一旦删除不可恢复，确认删除吗？')
      if(bool){
        //告诉父组件要删除博客
         console.log(title)
        this.$emit('cancel',title)
      }
    },
    //发布博客
    handlePublish(username,title){
      this.$emit('publish',username,title)
    },
    //跳转到详情页面
    toDetail(username,title){
      this.$router.push({
        path: '/detailblog',
        query: {
          username,
          title
        }
      })
    }
  }
}
</script>

<style scoped>
.list{
  padding: 20px;
  border-bottom: 1px solid rgb(230,230,230);
}
.bl_username{
  position: relative;
  top: -10px;
  left: 10px;
  color: rgb(152,154,170);
}
.list_item>div:not(.bl_text){
  display: inline-block;
}
.list:hover{
   color: #409EFF;
   background: rgba(229,229,229,.5);
}
.bl_headImg{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.bl_type{
  width: 35px;
  height: 20px;
  font-size: 12px;
  background: rgba(0,122,204);
  opacity: 0.3;
  /* color: gainsboro; */
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height: 20px;
}
.bl_title{
  font-size: 18px;
  margin: 5px 0 10px 10px;
}
.bl_text{
  width: 100%;
  color: rgb(152,154,170);
  font-size: 14px;
  margin-bottom: 10px;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.bl_tag{
  background: rgb(230,230,230);
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  color: rgb(128,100,135);
  margin-right: 10px;
}
.bl_time{
  margin-left: 30px;
}
.bl_time,.bl_comment,.bl_browse{
  color: rgb(128,100,135);
  font-size: 15px;
}
.bl_comment>span,.bl_browse>span{
  padding: 0 10px 0 3px;
}
.bl_comment{
  margin-left: 30px;
}
.action{
  margin-right: 40px;
  font-size: 15px;
  float: right;
}
.action>span{
  float: left;
}
.edit,.pub{
  color: #409EFF;
  margin-right: 10px;
}
.cancel{
  color: red;
}

</style>