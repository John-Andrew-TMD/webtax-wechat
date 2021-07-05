<template>
  <div>
    <van-overlay :show = "showDialog" >
      <div class="overlay-content">
        <div>
          答题赢现金，争当答税王 准备好了么？
          <div class="startime-font startime-active" v-if="!loading && startTime > 0 ">{{startTime}}</div>
          <van-loading style = "margin-top:10px" size="30px" vertical v-if="loading && startTime == 1"></van-loading>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>

export default {
  props:{
    showDialog:{
      type:Boolean,
      default:false
    },
    aloading:{
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      loading: false,
      startTime: 3,
      clearTimer:""
    };
  },
  mounted() {
    this.initUI();
  },
  destroyed(){
    clearInterval(this.clearTimer);
  },
  methods: {
    initUI() {
      this.loading = false
      this.clearTimer = setInterval(() => {
        this.startTime--;
        if (this.startTime <= 0) {
          if (!this.aloading) {
            clearInterval(this.clearTimer);
            this.$emit("setShowDialog",false)
          } else{
            this.startTime = 1
            this.loading = true
          }
        }
        
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.overlay-content {
  font-size: 24px;
  color: #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 13%;
  text-align: center;
}
.startime-active {
 animation:bounceActive 1s linear infinite;
}
.startime-font {
  color: #fff;
  font-size: 120px;
  // transition: all 1s ease-in;
}
@keyframes bounceActive {
  0% {
    transform: scale(1)
  }

  100% {
    transform: scale(0.5)
  }
}
</style>
