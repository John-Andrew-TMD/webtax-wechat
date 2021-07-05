<template>
  <div class="live-wrapper" :class="isPaid ? 'pb-0' : ''">
    <div class="live-wrapper-box">
      <live-video
        @init="init"
        ref="video"
        :playerOptions="playerOptions"
        :info="info"
        :isPaid="isPaid"
      ></live-video>
      <div class="detail-header">
        <h3 class="detail-title">{{ info.liveTitle }}</h3>
        <ul class="open-slide mt-10">
          <li class="d-flex">
            <!-- <p v-if="+info.liveStatus == 1">售价：限时免费</p> -->
            <p>
              <template v-if="getdiscountAmount(info)==0"> 售价：免费 </template>
              <template v-else>
              售价：{{ getdiscountAmount(info) }}元
              <template v-if="info.liveStatus !== 4">
                /{{ info.liveStatus == 3 ? "企业会员免费看" : "会员免费看" }}
              </template>
              </template>
            </p>
            <template v-if="info.teacher">
              <a
                style="margin-left: auto; color: #999"
                href="javascript:void(0)"
                v-if="info.expertId"
                >主讲嘉宾：{{ info.teacher }}</a
              >
              <span v-else style="margin-left: auto; color: #999">
                主讲嘉宾：{{ info.teacher }}
              </span>
            </template>
          </li>
          <li v-if="info.liveNo" class="d-flex">编号：{{ info.liveNo }}</li>
          <li class="d-flex">日期：{{ info.liveTime }}</li>
        </ul>
      </div>
      <live-like :info="info" @init="reloadLikeData"></live-like>
      <div class="line10"></div>
      <live-tab :list="list" :info="info"></live-tab>
      <live-fixed
        v-if="+info.liveStatus !== 5 && +info.liveStatus !== 1"
        :info="info"
        :isPaid="isPaid"
      ></live-fixed>
    </div>
  </div>
</template>

<script>
import LiveVideo from "./LiveVideo";
import { wxChatShare } from "@/utils/wechat"; // 引入wechat.js
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
import { getDetail } from "@/api/liveList";
import { getDetailV2 } from "@/api/live";
import { mapMutations } from "vuex";
import utils from "@/utils/utils2.js";
import * as config from "@/config/config.js";
import { getQueryString } from "@/utils/util";
import LiveFixed from "./LiveFixed";
import LiveLike from "@/components/LiveLike/";
import LiveTab from "./LiveTab";
import jsCookies from "js-cookie";
export default {
  name: "live",
  components: { LiveVideo, LiveTab, LiveFixed,LiveLike },
  filters: {
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      info: {},
    };
  },
  watch: {
    $route: {
      handler() {
        document.body.scrollTop = 0;
        // firefox
        document.documentElement.scrollTop = 0;
        // safari
        window.pageYOffset = 0;
        window.scrollTo(0, 0);
         this.handleDetail();
      },
    },
  },
  mounted(){
    console.log(config,"config")
     document.body.scrollTop = 0;
        // firefox
        document.documentElement.scrollTop = 0;
        // safari
        window.pageYOffset = 0;
        window.scrollTo(0, 0);
         this.handleDetail();
  },
  computed: {
    userInfo() {
      let userInfo = jsCookies.get("userinfo")
        ? JSON.parse(jsCookies.get("userinfo"))
        : null;
      if (userInfo) {
        userInfo["avatar"] =
          userInfo.userTypeCode == 1
            ? userInfo.expertInfo.avatar
            : userInfo.memberInfo.avatar;
        userInfo["level"] =
          userInfo.userTypeCode == 0 ? userInfo.memberInfo.memberLevelCode : "";
      }
      return userInfo;
    },
    isExpert() {
      return this.userInfo && this.userInfo.userTypeCode == 1; // 0:member,1:expert
    },
    isPaid() {
      // if (!this.userInfo) return false;
      if (this.userInfo && this.userInfo.userTypeCode == 1) return true; // 专家免费看
      // if (!this.info.id) return false;
      // 1：限时免费 ，2：VIP权限播放，3：SVIP权限播放，4：付费播放，5：免费播放
      if (
        (this.info && this.info.liveStatus == 1) ||
        (this.info && this.info.liveStatus == 5)
      )
        return true;
      // 是否是免费视频标记(false：收费,true：免费)
      // 未付费用户--->
      if (this.info && this.info.openAccessType == 0) return true; // 直播课程开放权限类型（0：普通会员，1：会员，2：企业会员）
      if (
        this.info &&
        this.info.payOption &&
        this.info &&
        this.info.payOption.isFreeForUser
      )
        return true; // 是否对用户免费（false：收费，true：免费）
      if (this.info && this.info.payOption && this.info.payOption.isPaid)
        return true; // 是否已付费（false：未付费,true：已付费）
      return false;
    },
  },
  methods: {
    ...mapMutations(["setShowLoad"]),
    reloadLikeData() {
      getDetailV2(this.id).then((res) => {
        let _ret = res.data;
        if (res.success) {
          this.info = _ret;
          this.info.likeOrRewardAvatarList = _ret.likeOrRewardAvatarList;
          this.info.likeOrRewardNum = _ret.likeOrRewardNum;
          this.info.like = _ret.like;
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    _handleShowAttent() {
      let dialog = this.$refs.dialog;
      dialog.show = true;
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
      getDetail({ id: getQueryString("id") })
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
    getdiscountAmount(info) {
      let discountAmount = this.filterMoney(info.discountAmount);
      let amount = this.filterMoney(info.amount);
      return info.isPromote ? discountAmount : amount;
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
  },
};
</script>
<style lang="scss" scoped>
.live-wrapper {
  width: 375px !important;
  margin: 0 auto !important;
  background: #dddddd;
  padding-bottom: 50px;
  .live-wrapper-box {
    background-color: #fff;
  }
}
.detail-header {
  padding: 15px;
}
.detail-title {
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
}
.open-slide {
  font-size: 12px;
  box-sizing: border-box;
  color: #999999;
  transition: all 0.5s;
  overflow: hidden;
  padding-bottom: 10px;
  // border-bottom: 1px solid #EEEEEE; 点赞
  li {
    line-height: 20px;
    span {
      color: #999999;
    }
  }
}
.live-attention {
  height: 44px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
  padding: 0 15px;
  .live-title {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
  }
  .live-attention-title {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4c79fe;
    line-height: 16px;
  }
}
.content-parse {
  padding: 15px;
  border-radius: 4px;
  overflow: hidden;
  img {
    max-width: 100% !important;
  }
}
</style>