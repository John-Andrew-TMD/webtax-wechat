<style lang="scss" scoped>
  .app-tip {
    font-size: 16px;
    font-weight: 400;
    color: #eeeeee;
    width: 100%;
    text-align: center;
    margin-top: 15px;
  }
</style>

<template>
  <div class="app-tip">{{startTime}}s 后自动进入回答页面</div>
</template>

<script>
  export default {
    components: {},
    props: {
      questionInfo: {
        type: Object,
        default() {
          return {
            readTime: 60
          }
        }
      }
    },
    data() {
      return {
        startTime: this.questionInfo.readTime || 10,
        clearTimer: ""
      };
    },
    mounted() {
      this.startTime = this.questionInfo.readTime;
      // if (this.startTime <= 0) {
      //   // 初始情况就存在计时器小于零，直接返回
      //   this.$emit("handle-start-click");
      //   return;
      // }
      this.clearTimer = setInterval(() => {
        if (this.startTime <= 0) {
          this.startTime = 0
          this.$emit("handle-start-click")
          clearInterval(this.clearTimer);
        }else{
           this.startTime--;
        }
      }, 1000);
    },
    destroyed() {
      clearInterval(this.clearTimer);
    },
    methods: {}
  };
</script>
