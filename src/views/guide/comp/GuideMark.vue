<template>
  <div class="guide-mark" @click="handleClose" id="guideMark">
    <div class="icon-curve-arrow"></div>
    <div class="guide-step-box">
      <div class="guide-step">1.点击右上角</div>
      <div class="icon-ddd icon-model"></div>
    </div>
    <div class="guide-step-box">
      <div class="guide-step w160">2.在菜单中点击(在{{!mobileModel?'浏览器':'Safari'}}中打开)</div>
      <div class="icon-model" :class="!mobileModel?'adr-icon':'ios-icon'"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.guide-mark {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
}
.guide-step-box{
  display: flex;
  align-items: center;
  margin-top: 40px;
  margin-right: 10px;
}
.w160{
  width: 156px;
}
.guide-step {
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 25px;
  margin-right: 20px;
}
.icon-curve-arrow {
  width: 96px;
  height: 120px;
  background-image: url("~@/assets/icons/icon-arrow@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 2;
  margin-right: 10px;
}
.icon-ddd {
  background-image: url("~@/assets/icons/icon-ddd@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.icon-model {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}
.adr-icon {
  background-image: url("~@/assets/icons/icon-adr@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.ios-icon {
  background-image: url("~@/assets/icons/icon-ios1@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<script>
export default {
  name: 'GuideMark',
  data() {
    return {
      mobileModel: null
    };
  },
  created() {
    this.mobileModel = this.$utils.isIos();
  },
  mounted() {
    console.log('gur');
    
    let stop = document.querySelector('#guideMark');  
    stop.addEventListener('touchmove', (event) => {  
        event.preventDefault();  //阻止默认行为                 
        event.stopPropagation(); //阻止冒泡  
    }, false)   
  },
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
};
</script>
