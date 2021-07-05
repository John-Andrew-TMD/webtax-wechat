<template>
  <div class="body">
    <div class="app-content" v-if="!isStart">
      <a href="javascript:void(0)" class="game-start" @click="handleStartClick">
        <span>开始</span>
      </a>
    </div>
    <div class="app-content" v-else>
      <div class="app-ewm">
        <img src="~@/assets/imgs/q-ewm.png" alt="" srcset="" />
      </div>
      <div class="app-time">答题倒计时：{{ minute }}:{{ second }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {},
  data() {
    return {
      isStart: false
    };
  },
  watch: {
    // 监听数值变化
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  mounted() {},
  computed: {
    // 初始化数据
    ...mapGetters(["minutes", "seconds"]),
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  },
  methods: {
    // 防止数值小于10时，出现一位数
    handleStartClick() {
      this.isStart = true;
      this.add();
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    // 倒计时函数
    add: function() {
      var _this = this;
      let minutes = this.minutes;
      var time = window.setInterval(function() {
        if (_this.minutes !== 0 && _this.seconds === 0) {
          if (_this.minutes <= 10) {
            window.clearInterval(time);
            _this.$router.push("/questionnairepc/list");
          } else {
            _this.$store.commit("setMinutes");
          }
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          // _this.$store.commit("setSeconds", 0);
          window.clearInterval(time);
          _this.$router.push("/questionnairepc/list");
        } else {
          _this.$store.commit("setSecondsmins");
        }
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.body {
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 900Px;
  background: url("~@/assets/imgs/q-bg.png") center top no-repeat;
  background-size: cover;
  background-color: #031642;
  .app-content {
    padding-top: 465Px;
    & > * {
      margin: 0 auto;
    }
    .app-ewm {
      width: 350Px;
    }
    .app-time {
      width: 100%;
      text-align: center;
      font-size: 48Px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 64Px;
      margin-top: 20Px;
    }
    .game-start {
      width: 374Px;
      height: 100Px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("~@/assets/imgs/q-btn.png") center top no-repeat;
      background-size: contain;
      font-size: 44Px;
      color: #ab2d20;
      span {
        margin-top: -18Px;
      }
    }
  }
}
</style>
