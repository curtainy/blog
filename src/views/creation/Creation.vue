<template>
  <div id="creation">
    <no-load v-if="!$store.state.isLoad"/>
    <div v-else>
      <div class="head">
        <el-select v-model="blog.type" placeholder="类型" class="choose">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <input type="text" placeholder="标题" v-model="blog.title">
      </div>
      <div class="art_content">
        <mavon-editor  ref="editor" v-model="blog.content" class="content"/>
        <!-- <quill-editor v-model="content" class="content"/> -->
      </div>
      <div class="other_msg">
        <div class="tag">标签</div>
        <el-select v-model="blog.tag" multiple placeholder="标签" class="more_choose">
          <el-option
            v-for="(item,index) in tagList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div class="category">分类</div>
        <el-select v-model="blog.category" placeholder="分类" class="more_choose">
          <el-option
            v-for="(item,index) in categoryList"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-dialog title="请输入新增的分类" :visible.sync="dialogFormVisible" width="30%">
          <el-input v-model="newCategory" placeholder="请输入"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCategory">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="publish" @click="handlePublish">发布文章</div>
      <!-- <div class="save" @click="handleSave">保存草稿</div> -->
    </div>
  </div>
</template>

<script>

import { publishBlog, getBlogCategory, blogDetail } from 'network/blog'
// import { addBlogCategory } from 'network/user'
 
import NoLoad from 'components/noload/NoLoad'

import { mavonEditor } from 'mavon-editor'
import "mavon-editor/dist/css/index.css"

export default {
  name: 'Creation',
  data(){
    return {
      typeList: ['原创','转载'],
      tagList: ['数据库','前端','后端','Android','IOS','人工智能','开发工具','其他'],
      categoryList: [],
      dialogFormVisible: false,
      newCategory: '',
      blog: {
        type: '',
        title: '',
        category: '',
        tag: [],
        content: ''
      },
    }
  },
  components: {
    mavonEditor,
    NoLoad
  },
  async mounted() {
    // 获取当前用户的博客分类
    await getBlogCategory({_id: this.$store.state.token._id}).then(res => {
      if(res.code === '0') {
        this.categoryList = [...res.data.categoryList,'新增']
      }
    })
    // 用户对已发布博客进行编辑
    if(this.$route.query.blogId) {
      blogDetail({blogId: this.$route.query.blogId}).then(res => {
        if(res.code == '0') {
          this.blog = res.data
        }
      })
    }
  },
  watch: {
        'blog.category'(val) {
            if(val === '新增'){
                this.dialogFormVisible = true
            }
        }
  },
  methods: {
    handlePublish(){
      publishBlog(Object.assign(this.blog, {
        _id: this.$store.state.token._id,
        thumbs: 0,
        comment: [],
        browse: 0,
        date: new Date().getTime()
      })).then(res => {
        if(res.code === '0') {
          this.$message.success('发布成功')
          this.$router.push('/blogdetail/' + this.$route.query.blogId)
        }
      })
    },
    addCategory() {
      this.dialogFormVisible = false
      this.blog.category = this.newCategory
      this.categoryList.splice(this.categoryList.length-1,0,this.newCategory)
      this.$message.success('添加成功')
    }
  }
}
</script>

<style scoped>
#creation{
  width: 70%;
  margin-left: 15%;
  padding-top: 30px;
}
.choose{
  width: 10%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 0;
}

.head>input{
  width: 88%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid gainsboro;
  margin-left: 6px;
  padding-left: 5px;

  position: relative;
  top: 2px;
}
input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: gainsboro;
    font-size: 16px;
}
.art_content{
  margin-top: 20px;
  width: 100%;
}
.content{
  height: 400px;
}
.tag,.category{
  height: 38px;
  width: 7%;
  border-radius: 5px;
  /* border: 1px solid rgba(102,154,58); */
  background: #409EFF;
  color: white;
  display: inline-block;
  text-align: center;
  line-height: 35px;
  margin-right: 2px;
  margin-top: 20px;
}
.category{
  margin-left: 15.5%;
}
.more_choose{
  width: 35%;
}
.save,.publish{
  width: 80px;
  height: 35px;
  margin-top: 20px;
  float: right;
  border-radius: 5px;

  text-align: center;
  line-height: 35px;
  background: #409EFF;
  color: white;
}
.save{
  margin-right: 3%;
}
.publish{
  position: relative;
  left: -3px;
  cursor: pointer;
}

</style>