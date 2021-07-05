<template>
  <van-popup
    v-model="dialogVisible"
    :close-on-click-overlay = "false"
    class="app-box"
    close-icon="close"
    close-icon-position="top-right"
  >
    <div class=" dialog-box">
      <div class="dialog-icon">
        <img :src="options.img" alt="" srcset="" />
      </div>
      <div class="dialog-title">{{ options.title }}</div>
      <div class="dialog-content" :style = "options.style">{{ options.content }}</div>
      <div class="app-qa-start " style = "margin-top:30px">
        <div class="bg" @click="handleDialogClosed">
          我知道了
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  mounted() {
    this.dialogVisible = true;
  },
  methods: {
    handleDialogClosed() {
      this.options.callback()
      this.dialogVisible = false;
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.app-box {
  width: 78.67%;
  /* min-height: 6.24rem; */
  background: #1c2d55;
  border-radius: 8px;
  // opacity: 0.1;
  padding: 66px 15px 30px;
  border: 1px solid #233d7b;
  font-size: 14px;
  color: #fff;
  line-height: 20px;
  overflow: visible;
  .dialog-title {
    text-align: center;
    font-size: 22px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffd07a;
    line-height: 30px;
  }
  .dialog-content {
    width: 234px;
    display: table;
    margin: 0 auto;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 20px;
  }
  .dialog-icon {
    width: 95px;
    position: absolute;
    left: 50%;
    text-align: center;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
    img {
      width: 100%;
    }
  }
}
.app-qa-start {
  width: 100%;
  height: 48px;
  background: rgba(255, 210, 127, 0.5);
  border-radius: 24px;
  position: relative;
  cursor: pointer;
  .bg {
    width: 100%;
    height: 48px;
    position: absolute;
    left: 0;
    top: -5px;
    font-size: 20px;
    color: #011440;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      132deg,
      rgba(255, 208, 122, 1) 0%,
      rgba(255, 229, 174, 1) 100%
    );
    border-radius: 24px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
}
 
</style>
