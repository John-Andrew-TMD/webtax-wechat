<template>
  <div class="fixed-bottom d-flex align-center j-sa pay-bottom">
    <div class="color999">
      {{ value ? "支付" : "应付" }}:
      <span style="color: #ff5948"> {{ money | filterMoney }}{{ utils }}</span>
    </div>
    <van-button class="buy-btn d-flex a-center j-center" @click="toBuy">
      {{ value ? "立即支付" : "订单确认" }}</van-button
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
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    utils() {
      return "元";
    },
    money() {
      if (this.$route.query.money) return this.$route.query.money;
      if (this.info.orderAmount != undefined) {
        return this.info.orderAmount;
      }
      return this.info.isPromote ? this.info.discountAmount : this.info.amount;
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
      if (this.value) {
        // if (res2.prePaymentMethod == "non_zero") return;
        wxChatPay({ data: { ...this.info, orderNo: this.value }, id: this.id });
      } else {
        let options = {
          orderType: this.$route.query.money ? 6 : 8,
          couponEachCode: null,
          goodsId: +this.id,
          rewardAmount: this.money,
          useRight: true,
          rewardRecordType: 1,
          rewardRecordSource: this.id,
        };
        let res1 = await orderValid(options);
        if (res1.code == 200) {
          let res2 = await orderCreate(options);
          if (res1.code == 200 && res2.code == 200) {
            this.$router.push({
              path: "/resultPay/pay",
              query: {
                id: this.info.id,
                orderNo: res2.data.orderNo,
                money: this.$route.query.money,
              },
            });
          } else {
            this.$toast.fail(res2.message);
          }
        } else {
          this.$toast.fail(res1.message);
        }
      }
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
  width: 50%;
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