<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  .dialog-frame {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 225px;
    height: 225px;
  }
  .success {
    background: url("~@/assets/imgs/questionnaire/state2.png") no-repeat center
      center;
    background-size: contain;
  }
  .wrong {
    background: url("~@/assets/imgs/questionnaire/state1.png") no-repeat center
      center;
    background-size: contain;
  }
  .timeout {
    background: url("~@/assets/imgs/questionnaire/state3.png") no-repeat center
      center;
    background-size: contain;
  }
}
</style>
<template>
  <div class="dialog-content">
    <div class="dialog-frame" :class="dialogKey"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    dialogKey: {
      type: String,
      default: "success"
    }
  },
  data() {
    return {
      clearTimer: "",
      startTime: 3
    };
  },
  mounted() {
    this.clearTimer = setInterval(() => {
      if (this.startTime <= 0) {
        this.$emit("update:dialog-confirm", false);
        clearInterval(this.clearTimer);
      }else{
        this.startTime--;
      }
    }, 500);
  },
  destroyed() {
    clearInterval(this.clearTimer);
  },
  methods: {}
};
</script>

