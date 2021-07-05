<template>
  <div class="ExchangeCode">
    <van-nav-bar
      title="兑换码"
      left-text
      right-text
      left-arrow
      fixed
      @click-left="onClickLeft"
    />
    <div class="exchange-box">
      <div class="place-block">
        <img class="exchange-bg" src="~@/assets/imgs/change-bg@2x.png" alt="兑换码" />
        <img class="exchange-bg-avatar" src="~@/assets/imgs/change-bg-avatar@2x.png" alt="兑换码" />
      </div>
      <div class="exchange-item">
        <p class="ex-title">兑换码兑换</p>
        <van-field class="ex-input" clearable v-model="value" placeholder="输入兑换码" />
        <van-button :disabled="disabled || btnloading" class="ex-btn" @click="handleExchange">立即兑换</van-button>
      </div>
    </div>
    <div class="popup-box" v-if="showResult">
      <div class="success-box" v-if="isSuccess">
        <span class="success-icon icon"></span>
        <div class="tip-title">兑换结果</div>
        <div class="tit-result" v-for="(item, index) in result" :key="index">
          <p v-if="item.isSuccess" class="flex-center">
            {{item.redeemName + item.redeemNum + unit[item.redeemUnit]}}
            <van-icon name="passed" color="#07C160" class="ml-5" />
          </p>
          <p v-if="!item.isSuccess" class="flex-center">
            {{item.redeemName + item.redeemNum + unit[item.redeemUnit]}}
            <van-icon name="close" color="#EE0A24" class="ml-5" />
          </p>
        </div>
        <van-button class="confim-btn" @click="confim">我知道了</van-button>
      </div>
      <div class="success-box" v-if="!isSuccess">
        <span class="fail-icon icon"></span>
        <div class="tip-title">兑换失败</div>
        <p class="tit-result">失败原因：{{result}}</p>
        <van-button class="confim-btn" @click="showResult = false">我知道了</van-button>
      </div>
    </div>
    <div class="mark" v-if="showResult" @click="showResult = false"></div>
  </div>
</template>

<script>
import { exchange } from '@/api/activity';
import { getAppUrl } from '@/api/common'
export default {
  name: 'ExchangeCode',
  components: {},
  data() {
    return {
      showResult: false,
      isSuccess: false,
      btnloading: false,
      unit: {
        day: '天',
        sheet: '张'
      },
      result: [],
      value: '',
      colorM: {
        color: '#333333'
      },
      opacityStyle: {
        background: '#ffffff'
      }
    };
  },
  created() {},
  mounted() {},
  computed: {
    disabled() {
      return this.value === '';
    }
  },
  watch: {},
  methods: {
    handleExchange() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
      this.btnloading = true
      exchange({ cdKey: this.value }).then(res => {
        try {
          if (res.code != 200) {
            this.isSuccess = false;
            this.result = res.message;
            this.btnloading = false
          } else {
            this.isSuccess = true;
            this.result = res.data;
          }
          this.$toast.clear();
          this.showResult = true;
        } catch (error) {
          console.log(error);
          this.btnloading = false
          this.$toast.fail(res.message);
        }
      });
    },
    confim() {
      this.showResult = false;
      this.toDownLoad()
    },
    toDownLoad() {
      this.$Dialog
        .confirm({
          // title: '',
          confirmButtonColor: '#FF5948',
          cancelButtonColor: '#999999',
          confirmButtonText: '确定',
          message: '下载/打开“答税App”'
        })
        .then(() => {
          this.download();
        })
        .catch(() => {
          // on cancel
        });
    },
    download() {
      let _this = this;
      getAppUrl().then(res => {
        if (res.code === 200) {
          this.showPage = true;
          let appurl = res.data;
          // 微信浏览器并且是IOS
          if (this.$utils.isTxBrowser() && this.$utils.isIos) {
            appurl = 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.webtax';
          }
          // 尝试启动App
          this.openApp(appurl);
        } else {
          this.$toast.fail(res.message);
        }
      }).catch(error =>{
        this.$router.push('/download')
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
    onClickLeft() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss" scoped>
.ml-5 {
  margin-left: 5px;
}
@import "~@/scss/base";
.ExchangeCode {
  display: block;
  margin: 0 auto;
  max-width: 768px;
  min-width: 320px;
  overflow: auto;
  height: 100vh;
  background-color: #ff5948;
  /deep/ {
    .van-nav-bar .van-icon-arrow-left {
      color: #333333;
    }
  }
}
.excode {
  font-size: 17px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
.place-block {
  background-color: #ff5948;
  position: relative;
  // height: 204px;
  .exchange-bg {
    display: block;
    // height: 100%;
    width: 100%;
  }
  .exchange-bg-avatar{
    position: absolute;
    top: 20px;
    padding: 0 40px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }
}
.exchange-box {
  margin: 0 auto;
}
.exchange-item {
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  background: rgba(255, 255, 255, 1);
  // border-bottom-left-radius: 16px;
  // border-bottom-right-radius: 16px;
  border-radius: 20px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ex-title {
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 30px;
}
.ex-input {
  margin-top: 30px;
  width: 275px;
  height: 44px;
  text-align: center;
  background: rgba(245, 245, 245, 1);
  border-radius: 4px;
  /deep/ .van-field__control {
    text-align: center;
  }
}
.ex-btn {
  margin-top: 30px;
  width: 275px;
  height: 44px;
  background: rgba(255, 89, 72, 1);
  border-radius: 22px;
  font-size: 16px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  border: none;
}
.fadeIn1 {
  animation-name: fadeIn1;
}
@keyframes fadeIn1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.45;
  }
}
.mark {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: #000000;
  opacity: 0.45 !important;
  z-index: 98;
}
.popup-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 285px;
  // height: 202px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  z-index: 99;
  text-align: center;
}
.icon {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
}
.success-icon {
  @include iconBg("success-icon@2x.png", contain);
}
.fail-icon {
  @include iconBg("fail-icon@2x.png", contain);
}
.tip-title {
  margin-top: 47px;
  font-size: 24px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 33px;
}
.tit-result {
  margin: 10px 30px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.confim-btn {
  margin: 16px auto;
  width: 245px;
  height: 32px;
  background: rgba(255, 89, 72, 1);
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
}
</style>