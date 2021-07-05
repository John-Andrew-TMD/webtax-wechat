<template>
  <div class="guide-wrapper" v-if="showPage">
    <template v-if="isTXBrowser">
      <div class="line10"></div>
      <guide-bar :mobileModel="mobileModel"></guide-bar>
    </template>
    <div class="line10" v-if="isTXBrowser"></div>
    <div class="guide-content">
      <img class="guide-logo" src="~@/assets/imgs/guide-bgc.png" alt />
      <van-button class="nowload" :disabled="disabled" type="default" @click="downloadImmediately">立即下载</van-button>
    </div>
    <fade-animation>
      <guide-mark v-if="showMark" @close="handleClose"></guide-mark>
    </fade-animation>
  </div>
</template>
<style lang="scss" scoped>
@import "./guide.scss";
</style>
<script>
import GuideBar from './comp/GuideBar';
import GuideMark from './comp/GuideMark';
import FadeAnimation from '@/components/fade/FadeAnimation';
export default {
  components: { GuideBar, GuideMark, FadeAnimation },
  data() {
    return {
      showPage: false,
      isTXBrowser: '',
      mobileModel: null,
      showMark: false,
      disabled: false
    };
  },
  beforeCreate() {
    this.showPage = false;
  },
  mounted() {
    this.isTXBrowser = this.$utils.isWeChat() || this.$utils.isQQ();
    this.mobileModel = this.$utils.isIos();
    
    // 是微信浏览器并且是IOS
    if (this.isTXBrowser && this.mobileModel) {
      this.$toast.loading({ message: '正在打开...', mask: true });
      window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.webtax';
    }
    // 不是微信浏览器或者QQ浏览器打开时
    else if (!this.isTXBrowser) {
      this.toLoad();
    } else {
      this.showPage = true;
    }
  },
  methods: {
    downloadImmediately() {
      // 微信或者QQ打开
      if (this.isTXBrowser) {
        this.showMark = true;
      } else {
        this.toLoad();
      }
    },
    handleClose() {
      this.showMark = false;
    },
    toLoad() {
      this.disabled = true;
      this.$get('/app/new/version').then(res => {
        if (res.code === 200) {
          this.disabled = false;
          this.showPage = true;
          window.location.href = res.data;
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>

