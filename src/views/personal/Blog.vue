<template>
  <div class="blog">
      <el-collapse>
        <el-collapse-item :name="item" v-for="(item, index) in getTagList" :key="index" class="tag">
            <template slot="title">
                <img src="~assets/img/folder.png"/>
                <span>{{item}}</span>
            </template>
            <BlogList :blogList="blog[item]" :tagName="item"/>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>

import BlogList from 'components/blog/BlogList'

export default {
    data() {
        return {
            // activeNames: []
        }
    },
    props: {
        blog: {}
    },
    components: {
        BlogList
    },
    computed: {
        getTagList() {
            return this.blog ? Object.keys(this.blog) : []
        }
    },
    methods: {
        handleChange(val) {
            console.log(val)
        }
    }
}
</script>

<style scoped lang="less">
.blog {
    width: 100%;
    .tag {
        img {
            margin-left: 10px;
        }
        & > span {
            margin-left: 10px;
        }
    }
}

/deep/ .el-collapse-item__header {
    height: 70px !important;
    font-size: 18px;
}
/deep/ .el-collapse-item__content {
    padding-bottom: 0;
}
</style>