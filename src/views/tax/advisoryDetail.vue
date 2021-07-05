<template>
  <div class="tax-wrapper">
    <div class="tax-box">
      <div class="line10"></div>
      <div class="position-relative p-15" v-if="info">
        <div class="qa-desc">
          <span class="text-icon tax-icon" v-if="info.consultTypeCode == 'TEST'"></span>
          <span class="qa-icon tax-icon" v-if="info.consultTypeCode == 'QA'"></span>
          <span class="ji-icon" v-if="info.isUrgent"></span>
          <span class>{{info.consultDesc}}</span>
        </div>
        <div class="imagsList" v-if="info.consultImageList && info.consultImageList.length">
          <van-image
            class="consultImage"
            v-for="(img, idx) in info.consultImageList"
            :key="idx"
            lazy-load
            :src="img"
            @click="previewImg(idx)"
          />
        </div>
        <div class="item-tax-list" v-if="info.consultTaxList && info.consultTaxList.length">
          <span class="item-tax" v-for="(item,index) in info.consultTaxList" :key="index">{{item}}</span>
        </div>
      </div>
      <van-divider />
      <div class="user-info d-flex j-sb a-center" v-if="info">
        <div class="d-flex a-center">
          <img :src="info.avatar" class="member-ava" alt />
          <span class="member-name lineNum1">{{info.memberName}}</span>
          <span class="m1-icon svip-icon" v-if="info.levelCode && info.levelCode == 2"></span>
          <span class="m1-icon svip1-icon" v-else-if="info.levelCode && info.levelCode == 3"></span>
          <span class="m1-icon svip2-icon" v-else-if="info.levelCode && info.levelCode == 4"></span>
          <span class="m1-icon vip-icon" v-else-if="info.levelCode && info.levelCode== 1"></span>
          <span class="m1-icon pt-icon" v-else></span>
        </div>
        <div class="con-time">{{info.consultTime}}</div>
      </div>
      <div class="line10"></div>
      <div class="be-claim" v-if="info.isClaim && info.statusCode !=0">
        <div class="be-claim-tip d-flex a-center pb-10">
          <span class="be-claim-ava"></span>
          <span class="be-claim-name">税务小助手</span>
        </div>
        <div class="renl">
          <div class="renl-tip" v-if="info.isMy">该订单已被认领了～</div>
          <div class="renl-tip" v-if="!info.isMy">你来晚了哦，该订单已被认领了～</div>
          <van-divider />
          <div v-for="item in info.personnelInfoList" :key="item.id">
            <div class="d-flex a-center renl-expert" v-if="item.expert">
              <img :src="item.avatar" class="renl-expert-ava" alt />
              <div class="flex-1 d-flex flex-column">
                <h2 class="expert-name lineNum1">{{item.name}}</h2>
                <p class="expert-num">专家编号：{{item.expertNo}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="b-toapp position-absolute">
      
      <wx-open-launch-app
        id="launch-btn"
        appid="wx93e7e880c100e87a"
        extinfo=""
      >
      <van-button class="toApp-btn" @click="toDownLoad">请下载或者打开App查看</van-button>
      </wx-open-launch-app>
      <div class="overtime" v-if="!info.isClaim">
        <time-expend :row="info"></time-expend>
      </div>
    </div>
    <loading v-show="showLoad" class="loadding-icon" :tips="tips"></loading>
  </div>
</template>
<script>

import { getDetail } from '@/api/tax';
import { ImagePreview } from 'vant';
import { getAppUrl } from '@/api/common'
import { Loading } from '@/components/loading';
import timeExpend from '@/components/timeExpend';
export default {
  name: 'advisoryDetail',
  components: { timeExpend, Loading },
  data() {
    return {
      info: {},
      tips: '',
      showLoad: true,
      previewImages: []
    };
  },
  created() {
    this.getTaxDetail();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    toDownLoad() {
      this.$Dialog
        .confirm({
          // title: '',
          confirmButtonColor: '#FF5948',
          cancelButtonColor: '#999999',
          confirmButtonText: '打开',
          message: '在“答税”打开链接吗'
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
    getTaxDetail() {
      let orderNo = this.$route.params.id;
      getDetail(orderNo).then(res => {
        if (res.success) {
          this.showLoad = false
          let info = res.data;
          let ls = [];
          info['consultTaxList'] = info.consultTax.split(',');
          info['consultImageList'] = info.consultImage
            ? info.consultImage.split(',')
            : [];
          this.previewImages = this.info.consultImageList;
          this.info = info;
        } else {
          this.$notify({ type: 'warning', message: res.message, duration: 0 });
        }
      });
    },
    previewImg(idx) {
      ImagePreview({
        images: this.previewImages,
        startPosition: idx,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/base";
.tax-wrapper {
  font-size: 14px;
  max-width: 768px !important;
  min-width: 320px !important;
  background: rgba(245, 245, 245, 1);
  height: 100vh;
}
.tax-box {
  background-color: #fff;
  // padding-bottom: 15px;
}
.tax-icon {
  position: relative;
  top: 2px;
  width: 18px;
  height: 16px;
  display: inline-block;
  margin-right: 10px;
}
.qa-icon {
  @include iconBg("qa-order-icon@2x.png");
}
.text-icon {
  @include iconBg("text-tax-icon@2x.png");
}
.qa-desc {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 24px;
}
.ji-icon {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  display: inline-block;
  @include iconBg("ji-icon@2x.png");
}
.item-tax-list {
  margin-top: 20px;
  .item-tax {
    background: rgba(245, 245, 245, 1);
    padding: 4px 10px;
    text-align: center;
    margin-right: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  .item-tax:last-child {
    margin-right: 0;
  }
}
.user-info {
  padding: 0 15px 15px 15px;
}
.member-ava {
  width: 22px;
  height: 22px;
  margin-right: 5px;
}
.member-name {
  margin-right: 5px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.m1-icon {
  width: 48px;
  height: 16px;
  display: inline-block;
}
.pt-icon {
  @include iconBg("no-vip-icon@2x.png", contain);
}
.svip-icon {
  @include iconBg("svip-icon@2x.png", contain);
}
.svip1-icon {
  @include iconBg("svip1-icon@2x.png", contain);
}
.svip2-icon {
  @include iconBg("svip2-icon@2x.png", contain);
}
.vip-icon {
  @include iconBg("new-vip-icon@2x.png", contain);
}
.expert-icon {
  @include iconBg("expert-icon@2x.png", contain);
}
.con-time {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  min-width: 120px;
  text-align: right;
}
.b-toapp {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  bottom: 60px;
  text-align: center;
}
.b-toapp {
  .toApp-btn {
    width: 80%;
    border: none;
    height: 44px;
    background: rgba(255, 89, 72, 1);
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
  }
  .overtime {
    margin-top: 15px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
  }
}
.imagsList {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}
.consultImage {
  width: 90px;
  height: 90px;
  margin-right: 10px;
}
.be-claim {
  padding: 15px;
  background-color: #fff;
  .be-claim-ava {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    display: inline-block;
    @include iconBg('tax-help-icon@2x.png', contain)
  }
  .be-claim-tip {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
  }
}
.renl {
  margin-left: 35px;
  background: rgba(245, 245, 245, 1);
  border-radius: 0px 4px 4px 4px;
  padding: 15px;
  .renl-tip {
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 18px;
  }
  .renl-expert-ava {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
  }
  .expert-name {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    margin-bottom: 5px;
  }
  .expert-num {
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
  .renl-expert{
    margin-bottom: 10px;
  }
}
</style>