<template>
  <div class="guide-head">
    <van-nav-bar :border="border" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <div class slot="title">答税</div>
      <van-icon class name="ellipsis" slot="right" />
    </van-nav-bar>
    <!-- <div class="head"> -->
    <!-- <span class="head-left"></span>
      <h2 class="head-center">答税</h2>
    <span class="head-right"></span>-->
    <!-- </div> -->
  </div>
</template>
<style lang="scss" scoped>
.guide-head .van-nav-bar .van-icon {
  color: #333333;
  font-size: 20px;
}
.head {
  height: 44px;
  line-height: 44px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 0.5);
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.head-left {
  width: 22px;
  height: 22px;
  margin: 0 15px;
  background-image: url("~@/assets/icons/left-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.head-center {
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
}
.head-right {
  width: 22px;
  height: 22px;
  margin: 0 15px;
  background-image: url("~@/assets/icons/more-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
<script>
export default {
  components: {},
  data() {
    return { border: true };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    onClickLeft() {
      this.$utils.returnPage();
    },
    onClickRight() {
      console.log('onClickRight');
    }
  }
};
</script>
