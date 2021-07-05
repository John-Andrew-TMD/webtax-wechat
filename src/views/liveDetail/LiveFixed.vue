<template>
  <div class="fixed-bottom d-flex align-center j-sa pay-bottom" v-if="!isPaid">
    <van-button
      class="buy-btn d-flex a-center j-center"
      v-if="info.isPromote"
      @click="toBuy"
      >购买:{{ info.discountAmount | filterMoney }}{{ utils }}</van-button
    >
    <van-button
      class="buy-btn d-flex a-center j-center"
      v-if="!info.isPromote"
      @click="toBuy"
      >购买:{{ info.amount | filterMoney }}{{ utils }}</van-button
    >
  </div>
</template>

<script>
import { orderCreate, orderValid } from "@/api/liveList";
import { wxChatPay } from "@/utils/wechatPay";
export default {
  name: "LiveFixed",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
  },
  computed: {
    utils() {
      return "元";
    },
    money() {
      return info.isPromote ? info.discountAmount : info.amount;
    },
  },
  data() {
    return {
      id: this.$route.query.id,
      showTxt: ["会员", "会员免费看", "企业会员免费看"],
    };
  },
  methods: {
    toApply() {
      let item = this.info.openAccessType <= 1 ? 0 : 1;
      this.$router.push({ path: "/member/center", query: { item } });
    },
    async toBuy() {
      this.$router.push({ path: "/resultPay/pay", query: { id:this.info.id } } )
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./detail.scss";
.detail-wrapper .videofullscreen /deep/ .vjs-fullscreen-control {
  display: none !important;
}
.color999 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 20px;
}
.pay-bottom {
  padding: 0 3%;
  z-index: 999 !important;
}
.buy-btn {
  // flex-basis: 80%;
  flex: 1;
}
</style>