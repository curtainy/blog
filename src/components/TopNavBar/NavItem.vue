<template>
  <div class="nav-item"> 
    <div v-for="(item,index) in navList" :key="index"
         class="item" @click="itemClick(index)"         
    >
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
        case 1: this.$router.push('/request'); break;
        case 2: this.$router.push('/creation'); break;
        case 3: this.$router.push('/member'); break;
        default:
      }
    }
  }
}
</script>

<style>
.nav-item{
  width: 400px;
  height: 100%;

  display: flex;
  align-items: center;
}
.item{
  flex: 1;
  line-height: 100%;
  text-align: center;
}
.actived{
  border-bottom: 2px solid gray;
}
.item span{
  padding: 10px;
}

</style>