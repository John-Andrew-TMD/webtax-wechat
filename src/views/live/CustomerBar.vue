<template>
  <div class="customer-bar-wrapper">
    <div class="customer-bar-box d-flex a-center j-sb">
      <div class="d-flex a-center j-sb">
        <i class="wechat-icon"></i>
        <span class="webtax-txt ml-10">客服微信：webtax_01</span>
      </div>
      <div class="customer-bar-right-icon" @click="_handleWechatCode"></div>
    </div>
    <customer-weChat ref="dialog"></customer-weChat>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.customer-bar-wrapper {
  padding: 0 15px;
  background-color: #fff;
}
.customer-bar-box {
  background-color: #f5f5f5;
  border-right: 4px;
  padding: 10px 15px;
  overflow: hidden;
}
.wechat-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
  @include iconBg("wechat-icon-l@2x.png");
}
.webtax-txt {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #666666;
  line-height: 17px;
}
.customer-bar-right-icon {
  display: inline-block;
  width: 22px;
  height: 22px;
  @include iconBg('service-code@2x.png')
}
</style>
<script>
import CustomerWeChat from "./CustomerWeChat";
export default {
  name: "customer-bar",
  components: { CustomerWeChat },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    _handleWechatCode() {
      let dialog = this.$refs.dialog;
      dialog.show = true;
    }
  }
};
</script>
