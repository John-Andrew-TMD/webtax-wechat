<template>
  <div class="live-wrapper">
    <head-bar :id="id"></head-bar>
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
          <li v-if="info.liveNo" class="d-flex j-sb">
            <span> 编号：{{ info.liveNo }} </span>
            <span> 主讲嘉宾：{{ info.teacher }} </span>
          </li>
          <li class="d-flex">日期：{{ info.liveTime }}</li>
        </ul>
      </div>
      <!-- <div class="live-attention d-flex a-center">
        <div class="d-flex a-center j-start flex-1">
          <span class="webtax-logo mr-10"></span>
          <span class="live-title">答税直播间</span>
        </div>
        <div class="j-end live-attention-title" @click="_handleShowAttent">
          立即关注>
        </div>
      </div> -->
       <live-like :info="info" @init="handleDetail"></live-like>
      <customer-bar></customer-bar>
      <div class="content-parse" v-html="$xss(info.liveDetail)"></div>
      <attent-dialog ref="dialog"></attent-dialog>
    </div>
  </div>
</template>

<script>
import AttentDialog from "./AttentDialog";
import HeadBar from "./HeadBar";
import CustomerBar from "./CustomerBar";
import LiveVideo from "./LiveVideo";
import { wxChatShare } from "@/utils/wechat"; // 引入wechat.js
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
import { getDetail } from "@/api/live";
import { mapMutations } from "vuex";
import LiveLike from "@/components/LiveLike/";
import utils from "@/utils/utils2.js";
import * as config from '@/config/config.js'
export default {
  name: "live",
  components: { LiveVideo, AttentDialog, HeadBar, CustomerBar,LiveLike },
  filters: {
    filterMoney(num) {
      return (num / 100).toFixed(2);
    }
  },
  data() {
    return {
      info: {
        id: 52,
        liveTitle: null,
        teacher: null,
        liveTime: null,
        liveCoverImage: null,
        liveDetail: null,
        liveUrl: null,
        openAccessType: null,
        attaches: [],
        isFree: false,
        liveNo: null,
        amount: null,
        isCountDown: false,
        liveTimeCompare: null,
        liveIsOnline: false,
        discountAmount: 0,
        isPromote: false,
        payOption: {
          isPaid: false,
          isFreeForUser: false
        },
        expertId: null,
        liveStatus: null,
        liveFreeIsEnable: true,
        liveFreeStartTime: null,
        liveFreeEndTime: null,
        livePlaybackRelList: []
      },
      isPaid: false,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        height: "166",
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "" //url地址
          }
        ],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    this.handleDetail();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(["setShowLoad"]),
    init() {
      this.handleDetail();
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
          mk
        },
        title: "财税课堂", // 标题
        desc: "您想要的财税课堂这里都有，快过来看看吧！每周三晚8点新课上线。", // 描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/image/2021/03/30/livevx.png", // 分享数据配置  －－ 全路径
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: " " // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    handleDetail() {
      this.setShowLoad(true);
      getDetail()
        .then(res => {
          let _ret = res.data;
          if (res.success) {
            this.info = _ret;
            this.id = _ret.id
            // js传值给原生，
            this.shareTitle = this.title;
            this.shareSubtitle = this.title;
            this.list = _ret.attaches;
            // this.playerOptions.sources[0].src = _ret.liveUrl;
            // this.playerOptions.poster = _ret.liveCoverImage;
            this.source = _ret.liveUrl;
            this.info.openAccessType = _ret.openAccessType
              ? _ret.openAccessType
              : 0;
            this.$utils.shareUrl({
              route: this.$route,
              shareTitle: this.shareTitle,
              shareSubtitle: this.shareSubtitle
            });

            // 如果是Pc浏览器打开
            if (!utils.isMoible()) {
              this.$dialog
                .confirm({
                  message: "去官网观看效果更佳哦！",
                  showCancelButton: true,
                  confirmButtonText: "去官网",
                  cancelButtonText: "取消"
                })
                .then(() => {
                  // on confirm
                  window.location.href = config.WEBSITE_URL + '/cloudclass/' + _ret.id;
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
    }
  }
};
</script>
<style lang="scss" scoped>
.live-wrapper {
  width: 375px !important;
  margin: 0 auto !important;
  background: #dddddd;
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