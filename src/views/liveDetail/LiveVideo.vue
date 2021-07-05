<template>
  <div>
    <div class="cover-box" v-if="liveCountDown > 0">
      <img
        class="cover-image"
        :src="info.liveCoverImage"
        :alt="info.liveTitle"
      />
      <div
        class="cover-bg d-flex a-center j-center"
        v-if="liveCountDown > 86400"
      >
        <div>
          <p class="p1 mb-10">还未开播，敬请期待</p>
          <p>直播时间：{{ info.liveTimeCompare }}</p>
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
      <div
        class="cover-box"
        v-if="!isPaid && info.liveStatus !== 1 && info.liveStatus !== 5"
      >
        <img
          class="cover-image"
          :src="info.liveCoverImage"
          :alt="info.liveTitle"
        />
        <div class="cover-bg d-flex a-center j-center">
          <div v-if="info.liveStatus == 2 || info.liveStatus == 3">
            <p class="p2 mb-10">
              {{ getdiscountAmount(info) }}元购买后可观看 /会员免费看
            </p>
          </div>
          <div v-if="info.liveStatus == 4">
            <p class="p2 mb-10">{{ getdiscountAmount(info) }}元购买后可观看</p>
          </div>
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
import VideoPlayer from "./VideoPlayer.vue";
export default {
  name: "LiveVideo",
  components: { VideoPlayer },
  props: {
    playerOptions: {
      type: Object,
      default: () => {},
    },
    info: {
      type: Object,
      default: () => {},
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: this.$route.params.id,
      playNum: 0,
      clearInterval: "",
      liveCountDown: 0,
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
      deep: true,
    },
    $route: {
      handler() {
        this.init();
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            clearInterval(this.clearInterval);
          } else {
            this.$emit("init", "");
          }
        });
      },
    },
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
    },
  },
  computed: {
    liveCountDownComputed() {
      return this.info.liveCountDown;
    },
  },
  mounted() {
    this.init();
    document.addEventListener("visibilitychange", this.visibilitychange);
  },
  destroyed() {
    clearInterval(this.clearInterval);
    if (!document.removeEventListener) return;
    document.removeEventListener("visibilitychange", this.visibilitychange);
  },
  methods: {
    visibilitychange() {
      if (document.hidden) {
        clearInterval(this.clearInterval);
      } else {
        this.$emit("init", "");
      }
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
    init() {
      this.liveCountDown = this.info.liveCountDown || 0;
      if (this.info.liveIsOnline && this.liveCountDown !== 0) {
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
    applyOpen() {
      let item = this.info.openAccessType <= 1 ? 0 : 1;
      this.$router.push({ path: "/member/center", query: { item } });
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>