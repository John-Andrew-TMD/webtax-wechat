<template>
  <div class="app-content-redbag app-content-redbag1">
    <div v-if="reflectInfo" class="app-content-detail">
      <p class="p1">待提现金额(元)</p>
      <p class="p2">
        ¥{{ reflectInfo.withdrawAmount | filterMoneyValue(2, 2, 0) }}
      </p>
      <div class="app-start-frame p3" style="margin-top:15%">
        <div class="app-qa-start ">
          <!-- :class="
            +reflectInfo.withdrawAmount < 100 ||
            +reflectInfo.todayWithdrawCount <= 0
              ? 'app-qa-disabled'
              : ''
          " -->
          <button class="bg button " v-if = "reflectInfo.isCanWithdraw&&reflectInfo.withdrawAmount>0" @click="handleReflectClick">
             <!-- @click="handleReflectClick" -->
            点击提现
          </button>
          <div v-else class="bg" @click="handleIndexClick">
            不满足提现条件，返回首页
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="dialog-content">
        <van-loading  size="24px" vertical>加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
import { getRedpackWithdraw } from "@/api/questionnaire/api-questionnaire";
import { mapGetters } from "vuex";
export default {
  props: {
    reflectInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["examId"])
  },
  methods: {
    handleReflectClick() {
       this.$toast.loading({
        message: "",
        forbidClick: true,
        mask: true
      });
      getRedpackWithdraw({ examId: this.examId }).then(res => {
        this.$toast.clear()
        if (res.code == 200) {
          this.$toast.success("提现成功");
          this.reflectInfo.withdrawAmount = 0;
          this.$emit("initUI", "");
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    handleIndexClick() {
      this.$router.push({
        path: "/questionnaire/mng",
        query: this.$route.query
      });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-loading__text{
  color: #fff!important;
}
img {
  width: 100%;
}
.app-start-frame {
  min-width: 76%;
}
.app-content {
  .button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent; //自定义边框
    outline: none; //消除默认点击蓝色边框效果
  }
  .app-content-detail {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    & > * {
      display: table;
      margin: 0 auto;
    }
    .p1 {
      color: #ff5948;
      font-size: 14px;
      margin-top: 10%;
    }
    .p2 {
      color: #fd2c38;
      font-size: 34px;
      margin-top: 3%;
    }
    .p3 {
      margin-top: 12%;
    }
    .p4 {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 22px;
      margin-top: 10px;
    }
  }
  .tip-content {
    height: 40px;
    width: 100%;
    font-size: 14px;
    color: #ffd280;
    background: #1a2b53;
    border-radius: 8px;
    border: 1px solid #233d7b;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .app-qa-disabled {
    background: #a9a9a9 !important;
  }
  .app-qa-disabled .bg {
    color: #999999 !important;
    background: linear-gradient(132deg, #d4d4d4 0%, #e5e5e5 100%) !important;
  }

  .app-content-redbag1 {
    background: url("~@/assets/imgs/questionnaire/reflect1.png") center center
      no-repeat;
    background-size: contain;
    padding-top: 63.79%;
    position: relative;
    .dialog-content {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .app-start-frame1 {
    width: 255px;
    height: 255px;
  }
  .app-content-list {
    margin-top: 36px;
  }
}
</style>
