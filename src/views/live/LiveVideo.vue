<template>
  <div class="video-wrapper">
    <div class="cover-box" v-if="liveCountDown > 0">
      <img
        class="cover-image"
        :src="info.liveCoverImage"
        :alt="info.liveTitle"
      />
      <div
        class="cover-bg d-flex a-center j-center"
        v-if="liveCountDown > oneDayTime"
      >
        <div>
          <p class="p1 mb-10">还未开播，敬请期待</p>
          <p>直播时间：{{ info.liveTime || '--:--:--' }}</p>
        </div>
      </div>
      <div v-else class="cover-bg d-flex a-center j-center">
        <div>
          <p class="p1 mb-10">距离开播时间</p>
          <p>倒计时：{{ liveCountDown | secondsFormat }}</p>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="cover-box" v-if="liveCountDown == -1">
        <img
          class="cover-image"
          :src="info.liveCoverImage"
          :alt="info.liveTitle"
        />
        <div class="download-app d-flex a-center j-center flex-column">
          <p>如需观看回放，请前往答税APP</p>
          <button class="mt-20" @click="toDownLoad">下载或打开App观看</button>
        </div>
      </div>
      <div class="video-box" v-else>
        <div class="v-box clr">
          <video-player :info="info" v-if="info && info.liveUrl"></video-player>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import CallApp from 'callapp-lib';
import { getAppUrl } from '@/api/common'
import VideoPlayer from './VideoPlayer.vue'
export default {
  name: "LiveVideo",
  components: { VideoPlayer },
  props: {
    playerOptions: {
      type: Object,
      default: () => {}
    },
    info: {
      type: Object,
      default: () => {}
    },
    isPaid: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      oneDayTime: 86400,
      playNum: 0,
      clearInterval: "",
      liveCountDown: 0,
      iphoneScreenShow: false,
      videoPlayer: null
    };
  },
  watch: {
    liveCountDownComputed: {
      handler(val) {
        // this.setAnnexMoney(0)
        if (+val != 0) {
          this.init();
        }
      },
      deep: true
    }
  },
  filters: {
    secondsFormat(times) {
      let hou = "00";
      let min = "00";
      let sec = "00";
      // 获取时、分、秒,毫秒
      hou =
        parseInt((times % (60 * 60 * 24)) / 3600) < 10
          ? "0" + parseInt((times % (60 * 60 * 24)) / 3600)
          : parseInt((times % (60 * 60 * 24)) / 3600);
      min =
        parseInt(((times % (60 * 60 * 24)) % 3600) / 60) < 10
          ? "0" + parseInt(((times % (60 * 60 * 24)) % 3600) / 60)
          : parseInt(((times % (60 * 60 * 24)) % 3600) / 60);
      sec =
        parseInt(((times % (60 * 60 * 24)) % 3600) % 60) < 10
          ? "0" + parseInt(((times % (60 * 60 * 24)) % 3600) % 60)
          : parseInt(((times % (60 * 60 * 24)) % 3600) % 60);
      return hou + ":" + min + ":" + sec;
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    }
  },
  computed: {
    liveCountDownComputed() {
      return (this.info && this.info.liveCountDown) || 0;
    }
  },
  mounted() {
    this.init();
    let vm = this
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        clearInterval(this.clearInterval);
      } else {
        this.$emit("init", "");
      }
    });
  },
  destroyed() {
    clearInterval(this.clearInterval);
  },
  methods: {
    toDownLoad() {
      this.$dialog
        .confirm({
          // title: '',
          confirmButtonColor: "#FF5948",
          cancelButtonColor: "#999999",
          confirmButtonText: "打开",
          message: "在“答税”打开链接吗"
        })
        .then(() => {
          this.download();
        })
        .catch(() => {
          // on cancel
        });
    },
    download() {
      let vm = this;
      getAppUrl().then(res => {
        if (res.code === 200) {
          vm.showPage = true;
          let appurl = res.data;
          // 微信浏览器并且是IOS
          if (vm.$utils.isTxBrowser() && vm.$utils.isIos) {
            appurl = 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.webtax';
          }
          // 尝试启动App
          vm.openApp(appurl);
        } else {
          vm.$toast.fail(res.message);
        }
      }).catch(error =>{
        vm.$router.push('/download')
      })
    },
    openApp(appurl) {
      const option = {
        // 用来配置 URL Scheme 所必须的那些v字段。
        scheme: {
          protocol: 'webtax' // APP 协议，URL Scheme 的 scheme 字段，就是你要打开的 APP 的标识
        },
        intent: {
          package: 'cn.com.webtax',
          scheme: 'webtax'
        },
        appstore: appurl, //APP 的 App Store 地址
        yingyongbao: appurl, //APP 的应用宝地址
        fallback: 'http://h5.webtax.com.cn/mp/download', // 唤端失败后跳转的地址。
        timeout: 4000 // 等待唤端的时间（单位: ms），超时则判断为唤端失败。
      };
      const callApp = new CallApp(option);
      // 需要打开的页面对应的值，URL Scheme 中的 path 部分,只想要直接打开 app ，不需要打开特定页面，path 传空字符串 '' 就可以。
      let ret = callApp.open({
        path: '/'
      });
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
    init() {
      this.liveCountDown = this.info.liveCountDown || 0;
      if (this.liveCountDown > 0) {
        this.clearInterval = setInterval(() => {
          if (this.liveCountDown == 0) {
            clearInterval(this.clearInterval);
            this.$emit("init", "");
          } else {
            this.liveCountDown--;
          }
        }, 1000);
      } else {
        clearInterval(this.clearInterval);
      }
    },
    getdiscountAmount(info) {
      let discountAmount = this.filterMoney(info.discountAmount);
      let amount = this.filterMoney(info.amount);
      return info.isPromote ? discountAmount : amount;
    },
    screenWidth() {
      let w = window.screen.width;
      let h = window.screen.height;
      return w + "x" + h;
    },
    onPlayerPlay(player) {
      this.playNum++;
      let isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      if (isiOS) {
        if (!player.isFullscreen()) {
          player.requestFullscreen();
          player.isFullscreen(true);
        } else {
          player.exitFullscreen();
          player.isFullscreen(false);
        }
      }
      if (this.playNum > 1) return;
    },
    onPlayerPause(e) {}
  }
};
</script>
<style lang="scss" scoped>
// ／*视频旋转*/
.video_box_rotate{
  transform: rotate(90deg)
}
.open-btn {
  width: 165px;
  height: 33px;
  line-height: 33px;
  background: #ff5948;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin: 0 auto;
  display: block;
  border: none;
}
.cover-box {
  width: 100%;
  position: relative;
  .cover-image {
    width: 100%;
  }
  .cover-bg {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    p {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 100%;
      text-align: center;
    }
    .p1 {
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 100%;
    }
    .p2 {
      font-size: 14px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 100%;
    }
  }
}
.download-app {
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  > p {
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }
  > button {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
    width: 165px;
    height: 32px;
    border: none;
    background: #ff5948;
    border-radius: 4px;
    overflow: hidden;
  }
}
.video-wrapper /deep/ .video-js .vjs-big-play-button {
  width: 50px !important;
  height: 50px !important;
  line-height: 50px !important;
  border-radius: 50%;
  margin-left: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto !important;
}
</style>