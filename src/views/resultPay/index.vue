<template>
  <div class="resultPay">
    <template v-if="orderNo">
      <div class="banner1 van-cell">订单编号：{{ orderNo }}</div>
      <van-cell :value="`￥ ${(money / 100).toFixed(2)}`">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="d-flex">
            <van-image
              style="flex-basic: 50px"
              width="50px"
              height="50px"
              fit="cover"
              :src="image"
            />
            <b class="flex-1 ml-10">{{ lessoName }} </b>
          </div>
        </template>
      </van-cell>
      <van-cell
        value-class="valueClass"
        :title="`实付款`"
        :value="`￥ ${(money / 100).toFixed(2)}`"
      />
    </template>
    <template v-else>
      <div class="d-flex a-center van-cell">
        <van-image
          style="flex-basic: 50px"
          width="50px"
          height="50px"
          fit="cover"
          :src="image"
        />
        <span class="flex-1 ml-10">
          <b class="liveTitle mb-10">{{ lessoName }}</b>
          <div class="liveMoney">￥ {{ money | filterMoney }}</div>
        </span>
      </div>
    </template>
    <live-fixed :info="info" :value="orderNo"></live-fixed>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import LiveFixed from "./LiveFixed";
import { getDetail, getPayInfo } from "@/api/liveList";
import { wxChatShare } from "@/utils/wechat"; // 引入wechat.js
import utils from "@/utils/utils2.js";
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
import { Dialog } from "vant";
export default {
  components: { LiveFixed },
  data() {
    return {
      id: this.$route.query.id,
      moneyData: this.$route.query.money,
      image: require("@/assets/imgs/avatar1.png"),
      info: {},
    };
  },
  computed: {
    lessoName() {
      return this.moneyData ? "打赏" : "付费课程";
    },
    money() {
      if (this.$route.query.money) return this.$route.query.money;
      return this.info.isPromote ? this.info.discountAmount : this.info.amount;
    },
    orderNo() {
      return this.$route.query.orderNo;
    },
  },
  watch: {
    $route: {
      handler() {
        this.init();
      },
    },
  },
  mounted() {
    this.init();
  },
  // beforeRouteLeave(to, from, next) {
  //   console.log(to,from)
  //   if (this.orderNo) {
  //     Dialog.confirm({
  //       title: "提示",
  //       message: "确定不支付吗",
  //     })
  //       .then(() => {
  //         // on confirm
  //         next();
  //       })
  //       .catch(() => {
  //         // on cancel
  //       });
  //   }
  // },
  methods: {
    ...mapMutations(["setShowLoad"]),
    async init() {
      if (this.id) {
        await this.handleDetail();
      } else if (this.moneyData) {
        this.info.money = this.moneyData;
      } else {
        history.go(-1);
      }
      if (this.orderNo) {
        document.title = "订单支付";
        let res = await getPayInfo({
          orderNo: this.orderNo,
        });
        if (res.code == 200) {
          this.info = { ...this.info, ...res.data, money: this.moneyData };
        }
      }
    },
    setShare(mk) {
      wxChatShare({
        studentId: 1, // 个人项目而定
        activityId: 1, // 个人项目而定
        data: {
          url: window.location.href, // 当前页面url
          mk,
        },
        title: "财税课堂", // 标题
        desc: "您想要的财税课堂这里都有，快过来看看吧！每周三晚8点新课上线。", // 描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/image/2021/03/30/livevx.png", // 分享数据配置  －－ 全路径
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: " ", // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    handleDetail() {
      this.setShowLoad(true);
      getDetail({ id: this.id })
        .then((res) => {
          let _ret = res.data;
          if (res.success) {
            this.info = _ret;
            this.id = _ret.id;
            // 如果是Pc浏览器打开
            if (!utils.isMoible()) {
              this.$dialog
                .confirm({
                  message: "去官网观看效果更佳哦！",
                  showCancelButton: true,
                  confirmButtonText: "去官网",
                  cancelButtonText: "取消",
                })
                .then(() => {
                  // on confirm
                  window.location.href =
                    config.WEBSITE_URL + "/cloudclass/" + _ret.id;
                })
                .catch(() => {
                  // on cancel
                });
            }
          } else {
            this.$toast.fail(res.message);
          }
          this.setShowLoad(false);
        })
        .then(() => {
          this.setShare(getEncrypted(window.location.href, wxConfig.appid));
        });
    },
    async toBuy() {},
  },
};
</script>

<style lang="scss" scoped>
.valueClass {
  color: #ff5948;
}
.liveTitle {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  line-height: 22px;
}
.liveMoney {
  font-size: 14px;
  color: #666666;
  line-height: 20px;
}
.banner1 {
  width: 100%;
  color: #666666;
  background: #fff;
  font-size: 16px;
  padding-top: 20px;
  padding-left: 20px;
}
.resultPay {
  padding-top: 10px;
  height: 100%;
  background: #f5f5f5;
}
</style>