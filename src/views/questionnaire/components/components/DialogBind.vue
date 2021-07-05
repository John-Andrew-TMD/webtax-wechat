<template>
  <van-overlay :show="dialogVisible">
    <div class="overlay-content" @click.self="handleDialogClosed">
      <div class="overlay-frame">
        <com-app-bottom title="授权绑定手机" >
          <comp-user-bind @handle-dialog-closed = "handleDialogClosed"></comp-user-bind>
        </com-app-bottom>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import ComAppBottom from "./ComAppBottom";
import CompUserBind from "./CompUserBind";
export default {
  inheritAttrs: false,
  components: {
    ComAppBottom,
    CompUserBind
  },
  data() {
    return {
      formApi: null,
      dialogVisible: false
    };
  },
  mounted() {
    this.initUI();
  },
  methods: {
    // 确定
    initUI() {
      this.dialogVisible = true;
    },
    handleDialogClosed() {
      this.$emit("initUI")
      this.$emit("update:dialogStatus", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.overlay-content {
  padding: 1rem 0;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay-frame {
    width: calc(100% - 60px);
    margin: 0 auto;
    position: relative;
  }
}
</style>
