<template>
  <div class="nav-item"> 
    <div v-for="(item,index) in navList" :key="index"
         class="item" @click="itemClick(index)">
     <span :class="{actived:currentIndex===index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  data(){
    return {
      currentIndex: 0
    }
  },
  props:{
    navList:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
      switch(index){
        case 0: this.$router.push('/article'); break;
        case 1: this.$router.push('/QA'); break;
        case 2: this.$router.push('/creation'); break;
        case 3: this.$router.push('/myblog'); break;
        case 4: this.$router.push('/profile');break;
        default:
      }
    }
  }
}
</script>

<style>
.nav-item{
  height: 100%;
}
.item{
  height: 100%;
  padding: 0 20px;
  line-height: 50px;
  display: inline-block;
  cursor: pointer;
}
.actived{
  border-bottom: 2px solid gainsboro;
}
.item span{
  padding: 10px;
}

</style>