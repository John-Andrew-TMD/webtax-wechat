<template>
  <div class="head-bar-video-wrapper">
    <div class="head-bar-video-box d-flex a-center j-sb">
      <div class="d-flex a-center j-sb">
        <i class="webtax-icon "></i>
        <span class="webtax-txt ml-10">答税直播间</span>
        <span class="webtax-attion ml-10" @click="_handleShowAttent">+关注</span>
      </div>
      <div class="d-flex a-center head-bar-right">
        <span class="mr-5" v-clipboard="clipOptions">网页版</span>
        <span class="head-bar_right"></span>
        <span class="ml-5" @click="_handleCommonWord">常见问题</span>
      </div>
    </div>
    <attent-dialog ref="dialog"></attent-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.head-bar-video-wrapper {
  background-color: #fff;
}
.webtax-txt {
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #333333;
  line-height: 22px;

}
.webtax-attion {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #4c79fe;
  line-height: 16px;
  border-radius: 2px;
  padding: 2px 5px;
  background: #f5f5f5;
}
.head-bar-video-box {
  padding: 14px 15px;
}
.webtax-icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  @include iconBg("icon-ds@2x.png");
}
.head-bar-right {
  font-size: 12px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: right;
  color: #666666;
  line-height: 17px;
}
.head-bar_right {
  border-right: 1px solid #dddddd;
  height: 14px;
  display: inline-block;
}
</style>
<script>
import AttentDialog from "./AttentDialog";
import {WEBSITE_URL, WEBSITE_H5} from '@/config/config'
export default {
  name: "HeadBar",
  components: { AttentDialog },
  props: {
    id: {
      default: null
    }
  },
  data() {
    return {};
  },
  created() {
    
  },
  mounted() {},
  computed: {
    webSite() {
      let website = WEBSITE_URL + '/cloudclass/' + this.id
      return website
    },
    clipOptions(e) {
      return {
        value: this.webSite,
        success: e => {
          this.$toast({ type: 'success', message: '已经复制电脑端地址到剪切板' });
        },
        error: () => {
          this.$toast({ type: 'danger', message: '复制失败' });
        }
      };
    }
  },
  watch: {},
  methods: {
    _handleShowAttent() {
      let dialog = this.$refs.dialog;
      dialog.show = true;
    },
    _handleCommonWord() {
      let commonPage = WEBSITE_H5 + '/app/activity/599102bd86414f3386a016fed57f5996'
      // this.$router.push(commonPage)
      window.open(commonPage)
    }
  }
};
</script>
