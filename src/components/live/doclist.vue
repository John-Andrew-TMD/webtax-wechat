<template>
  <div class="detail-box" v-if="list.length > 0">
    <div class="l-tags tags" v-if="isPaid || isExpert">课件</div>
    <div class="l-tags tags" v-else>
      课件
      <span class="class-tip">(仅提供给会员或已付费用户下载)</span>
    </div>
    <div class="annex">
      <div
        class="flex-center docitem"
        v-for="(item, index) in list"
        :key="index"
      >
        <a
          href="javascript:void(0)"
          @click="handleDownLoad(item)"
          class="flex-start_center animated fadeIn flex__it"
          :class="{ 'border-b--none': list.length - 1 === index }"
          rel="noopener noreferrer"
          v-if="isPaid || isExpert"
        >
          <i
            class="type-icon type-icon--word"
            v-if="
              _handleToLowerCase(item.attachSuffix) === 'doc' ||
              _handleToLowerCase(item.attachSuffix) === 'docx'
            "
          ></i>
          <i
            class="type-icon type-icon--rar"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'rar'"
          ></i>
          <i
            class="type-icon type-icon--pdf"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'pdf'"
          ></i>
          <i
            class="type-icon type-icon--xls"
            v-else-if="
              _handleToLowerCase(item.attachSuffix) === 'xls' ||
              _handleToLowerCase(item.attachSuffix) === 'xlsx'
            "
          ></i>
          <i
            class="type-icon type-icon--ppt"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'ppt'"
          ></i>
          <p class="doc_tit">{{ item.attachName }}</p>
        </a>
        <!-- 非会员 -->
        <div
          class="flex-start_center animated fadeIn flex__it"
          :class="{ 'border-b--none': list.length - 1 === index }"
          rel="noopener noreferrer"
          @click="handleDownLoad(item)"
          v-else
        >
          <i
            class="type-icon type-icon--word"
            v-if="
              _handleToLowerCase(item.attachSuffix) === 'doc' ||
              _handleToLowerCase(item.attachSuffix) === 'docx'
            "
          ></i>
          <i
            class="type-icon type-icon--rar"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'rar'"
          ></i>
          <i
            class="type-icon type-icon--pdf"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'pdf'"
          ></i>
          <i
            class="type-icon type-icon--xls"
            v-else-if="
              _handleToLowerCase(item.attachSuffix) === 'xls' ||
              _handleToLowerCase(item.attachSuffix) === 'xlsx'
            "
          ></i>
          <i
            class="type-icon type-icon--ppt"
            v-else-if="_handleToLowerCase(item.attachSuffix) === 'ppt'"
          ></i>
          <p class="doc_tit">{{ item.attachName }}</p>
        </div>
        <van-button
          class="copy-link-btn"
          v-clipboard="clipOptions"
          @click.stop="handleCopy(item.attachUrl)"
          v-if="isPaid || isExpert"
          >复制链接</van-button
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.tags {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  padding: 10px 0;
}
.l-tags::before {
  width: 2px;
  height: 16px;
  position: relative;
  top: 2px;
}
.detail-box {
  padding: 0 15px;
}
.detail-title {
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
  line-height: 28px;
}
.copy-link-btn {
  display: inline-block;
  padding: 5px;
  border: none;
  height: 24px;
  line-height: 14px;
  text-decoration: underline;
}
.detail-auth {
  background-image: linear-gradient(to right, #ff8351, #ff5948);
  color: #fff;
  padding: 16px;
  margin: 0 0 15px 0;
  // height:80px;
  align-items: center;
  .copy-btn {
    padding: 0px 15px;
    height: 28px;
    line-height: 28px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 89, 72, 1);
  }
}
.icon-lock {
  width: 22px;
  height: 22px;
  margin-right: 6px;
  @include norepBg("icon-lock@2x.png");
}
.icon-gold {
  width: 22px;
  height: 22px;
  margin-right: 6px;
  @include norepBg("icon-gold-vip@2x.png");
}
.live-access {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.mt10b15 {
  margin: 10px 0 15px 0;
}
.detail-content {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  /deep/ img {
    max-width: 100% !important;
    height: auto;
  }
}
.annex {
  border-radius: 4px;
  // padding: 0px 15px 0 15px;
  box-sizing: border-box;
}
.docitem {
  padding: 15px 0;
  @include border1px(bottom);
  position: relative;
}
.docitem:last-child::after {
  border-bottom: none;
}
.close-icon {
  position: absolute;
  right: -16px;
  top: 0px;
  font-size: 18px;
  color: $mainColor;
}
.type-icon {
  width: 22px;
  height: 22px;
  margin-right: 10px;
}
.type-icon--word {
  @include norepBg("wordicon@2x.png", contain);
}
.type-icon--rar {
  @include norepBg("zpicon@2x.png", contain);
}
.type-icon--pdf {
  @include norepBg("pdf-icon@2x.png", contain);
}
.type-icon--xls {
  @include norepBg("exelicon@2x.png", contain);
}
.type-icon--ppt {
  @include norepBg("ppticon@2x.png", contain);
}
.type-icon--other {
  @include norepBg("orthericon@2x.png", contain);
}
.doc_tit {
  flex: 1;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  @include lineNum(1);
}
</style>
<script>
import { mapGetters } from 'vuex';
import ClipboardJS from 'clipboard';
export default {
  name: "live-doc-list",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      copyTxt: '',
      isPaid: this.value
    };
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo'
    }),
    // 专家
    isExpert() {
      return this.userInfo && this.userInfo.userTypeCode == 1; // 0:member,1:expert
    },
    clipOptions(e) {
      return {
        value: this.copyTxt,
        success: e => {
          this.$Notify({ type: 'success', message: '已复制到粘贴板' });
        },
        error: () => {
          this.$Notify({ type: 'danger', message: '复制失败' });
        }
      };
    }
  },
  watch: {
    value(v) {
      this.isPaid = v
    }
  },
  methods: {
    handleDownLoad(item){
      console.log(item.attachUrl,"item.attachUrl")
      window.open(item.attachUrl)
    },
    handleCopy(url) {
      this.copyTxt = url;
    },
    copyUrlToClipboard(title, url) {
      let copyObject, agent, body;
      // 创建超链接<a id="target" herf=url target="_blank">title</a>
      copyObject = document.createElement('a');
      copyObject.setAttribute('id', 'target');
      copyObject.setAttribute('target', '_blank');
      copyObject.setAttribute('href', url);
      copyObject.innerHTML = title;
      // 创建按钮
      agent = document.createElement('button');
      // 获取body
      body = document.getElementsByTagName('body')[0];
      // body增加超链接
      body.appendChild(copyObject);
      // body增加按钮
      body.appendChild(agent); // 采用Clipboard.js方案 // trouble：没有可以传入的HTML元素，但我们可以动态创建一个DOM对象作为代理，复制超链接
      let clipboard = new ClipboardJS(agent, {
        target: function() {
          return document.querySelector('#target');
        }
      });

      clipboard.on('success', () => {
        this.$Notify({ type: 'success', message: '已复制到粘贴板' });
      });

      clipboard.on('error', () => {
        this.$Notify({ type: 'danger', message: '复制失败' });
      });
      // 点击按钮
      agent.click();
      // copyObject.focus();
      // copyObject.select();  // 问题所在 无法对copyObject对象使用select()方法
      // document.execCommand('copy'); // copy动态创建的<a>失败
      // 移除创建的元素
      body.removeChild(copyObject);
      body.removeChild(agent);
    },
    getUrl(url) {
      return `webtax://attachUrl=${url}`;
    },
    _handleToLowerCase(str) {
      // console.log(str);
      if (str) {
        return str.toLowerCase();
      }
    }
  }
};
</script>
