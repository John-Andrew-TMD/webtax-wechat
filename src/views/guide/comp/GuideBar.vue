<template>
  <div class="guide-bar">
    <div class="guide-bar__left">
      <span class="ds-icon"></span>
      <div class="guide-bar__down-tip">
        <div>下载应用，请点击右上角按钮</div>
        <div class="align-items">
          选择
          <div class="main-color inline-block">&lt;{{!mobileModel?"在浏览器中打开>":"在Safari中打开"}}&gt;</div>
          <div class="browser-icon inline-block" :class="!mobileModel?'android-icon':'ios-icon'"></div>
        </div>
      </div>
    </div>
    <div class="guide-bar_right"></div>
  </div>
</template>
<style lang="scss" scoped>
.guide-bar {
  // margin-top: 10px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  position: relative;
}
.guide-bar__left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.guide-bar__down-tip {
  width: 200px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.guide-bar_right {
  position: absolute;
  right: 24px;
  top: -6px;
  width: 88px;
  height: 56px;
  background: url("~@/assets/icons/icon-up-arrow@2x.png") no-repeat;
  background-size: contain;
}
.ds-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  background: url("~@/assets/icons/icon-ds@2x.png") no-repeat;
  background-size: contain;
}
.browser-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 4px;
}
.android-icon {
  background: url("~@/assets/icons/icon-android@2x.png") no-repeat;
  background-size: contain;
}
.ios-icon {
  background: url("~@/assets/icons/icon-ios@2x.png") no-repeat;
  background-size: contain;
}
</style>
<script>
export default {
  components: {},
  props: {
    mobileModel: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
