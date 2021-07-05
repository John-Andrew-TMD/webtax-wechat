<template>
  <div class="empty-detail">
    <div class="empty-bg">
      <h1>页面不存在</h1>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.empty-detail {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .empty-bg {
    width: 275px;
    height: 275px;
    @include iconBg("empty-bgicon@2x.png");
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
      position: absolute;
      left: 0px;
      right: 0px;
      bottom: 35px;
      text-align: center;
      padding: 0 28px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
}
</style>
<script>
export default {
  name: 'error404',
  components: {},
  data() {
    return {
      textNo: ''
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
