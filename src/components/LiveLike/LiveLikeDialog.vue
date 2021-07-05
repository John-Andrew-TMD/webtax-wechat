<template>
  <van-dialog
    v-model="show"
    title="打赏一下"
    :show-confirm-button="false"
    className="dialog-attent"
  >
    <van-image class="user-avator" width="95" height="95" :src="upvote" />
    <div class="attent-dialog-wrapper">
      <div class="attent-content d-flex a-center j-center flex-column">
        <p class="attent-tips mt-10">我们将推出更多精品课程哦～</p>
        <radio-box
          v-if="!isOther"
          :value="money"
          :options="options"
          :showCount="false"
          :onlyCode="true"
          :check-box-value.sync="money"
        >
        </radio-box>
        <template v-else>
          <van-field
            label-width="9.2em"
            class="mt-10"
            v-model="money"
            label="金额（元）："
            type="number"
            placeholder="可填写1-2000"
          />
            <!-- :formatter="formatter" -->
        </template>
        <a
          class="like-link mt-10"
          href="javascript:void(0)"
          @click="handleClickisOther"
          >{{ isOther ? "固定金额" : "其他金额" }}</a
        >
      </div>
      <van-button
        block
        @click="handleSubmit"
        class="my-button mt-10"
        color="#FF5948"
        >打赏</van-button
      >
    </div>
    <div class="icon-close-dialog" @click="show = false"></div>
  </van-dialog>
</template>

<script>
import radioBox from "@/components/common/formCreate/radioBox";
export default {
  name: "LiveLikeDialog",
  components: { radioBox },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      show: false,
      money: "",
      upvote: require("@/assets/imgs/Upvote.png"),
      isOther: false,
      options: [
        {
          label: "1元",
          code: 1,
        },
        {
          label: "2元",
          code: 2,
        },
        {
          label: "5元",
          code: 5,
        },
        {
          label: "8元",
          code: 8,
        },
        {
          label: "10元",
          code: 10,
        },
        {
          label: "18元",
          code: 18,
        },
      ],
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    formatter(value) {
      if (value != "") {
        if (+value > 2000) {
          return 2000;
        } else if (value < 1) {
          return 1;
        }
      }
      return value;
    },
    handleSubmit() {
      if (!this.money) return this.$toast.fail("请输入金额");
      this.$router.push({
        name: "resultPay",
        query: {
          money: this.money * 100,
          id: this.info.id,
        },
      });
    },
    handleClickisOther() {
      this.options = this.options.map((el) => ({ ...el, checked: false }));
      this.isOther = !this.isOther;
      this.money = "";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/scss/base";
/deep/ .van-field {
  background: #f5f5f5;
  border-radius: 4px;
  width: 100%;
}
.user-avator {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-45%, -70%);
}
.my-button {
  height: 32px;
  border-radius: 4px;
}
.like-link {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  color: #fdbc49;
}
.attent-dialog-wrapper {
  background-color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 20px;
  padding-bottom: 20px;
  overflow: hidden;
  position: relative;
  font-size: 14px;
  top: -2px;
}
.dialog-attent {
  background: transparent;
  top: 52% !important;
  overflow: visible !important;
  /deep/ .van-dialog__header {
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    line-height: 28px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 45px;
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
  @include iconBg("icon-close-dialog@2x.png");
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>