<template>
   <div class="change-bg">
      <div class="lamp-cord"></div>
      <div class="lamp-shade"></div>
      <div class="lamp" @click="changeBg" :class="{lamp_day:isDay,lamp_dark:!isDay}"></div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      isDay: true
    }
  },
  methods: {
    changeBg(){
      this.isDay = !this.isDay
      this.$emit('changeBg')
    }
  }
}
</script>

<style>
.change-bg{
  height: 160px;
  width: 70px;
  background-color: transparent;

  position: fixed;
  left: 45px;
  top: 50px;

  animation: lamp 3s linear infinite;
  transform-origin: 50% 0%;
}
.lamp-cord{
  height: 40px;
  width: 2px;
  background-color: rgb(60,60,60,.5);

  position: absolute;
  left: 33.5px;
  top: 0;
}
.lamp-shade{
  height: 0;
  width: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid rgb(60,60,60,.5);

  position: absolute;
  left: 30px;
  top: 41px;
}
.lamp{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  
  position: absolute;
  left: 10px;
  top: 52px;
}
.lamp_day{
  background-color: rgb(230,230,230);
  box-shadow: 3px 3px 10px 3px ghostwhite;
}
.lamp_dark{
  background-color: rgb(255,206,69);
  box-shadow: 3px 3px 10px 3px rgb(248,232,134);
}

@keyframes lamp {
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(-10deg);
  }
  50%{
    transform: rotate(0deg);
  }
  75%{
    transform: rotate(10deg);
  }
  100%{
    transform: rotate(0deg);
  }
}

</style>