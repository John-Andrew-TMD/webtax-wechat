<template>
  <van-dialog
    v-model="show"
    title="答税微信客服"
    :show-confirm-button="false"
    className="dialog-attent"
  >
    <div class="attent-dialog-wrapper">
      <div class="attent-content d-flex a-center j-center flex-column">
        <img
          width="195"
          height="195"
          src="~@/assets/imgs/customer-qr.jpg"
          alt=""
        />
        <p class="attent-tips">长按识别二维码，添加答税客服微信</p>
      </div>
    </div>
    <div class="icon-close-dialog" @click="show = false"></div>
  </van-dialog>
</template>
<style lang="scss" scoped>
@import '~@/scss/base';
.attent-dialog-wrapper {
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 30px;
  overflow: hidden;
  position: relative;
  top: -2px;
}
.dialog-attent {
  background: transparent;
  /deep/ .van-dialog__header {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 28px;
    background-color: #fff;
  }
  .attent-tips {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 18px;
    text-align: center;
  }
}
.icon-close-dialog {
  margin-top: 26px;
  display: inline-block;
  width: 32px;
  height: 32px;
  @include iconBg('icon-close-dialog@2x.png');
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
<script>
export default {
  name: "CustomerWeChat",
  components: { },
  data() {
    return {
      show: false
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
