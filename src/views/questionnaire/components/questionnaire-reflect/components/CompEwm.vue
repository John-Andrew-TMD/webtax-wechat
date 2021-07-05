<template>
  <div>
    <div class="app-start-frame p3 app-start-frame1">
      <img id="image" alt="" :src="reflectInfo.extractRedpackQRCode" style="" />
    </div>
    <p class="p4">长按二维码关注公众号后，立即提现</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    reflectInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["examId"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.p4 {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 22px;
  margin-top: 10px;
}
.p3 {
  margin-top: 12%;
}
.app-start-frame1 {
  margin-top: 40px;
  border-radius: 4px;
  width: 255px;
  height: 255px;
  overflow: hidden;
}
</style>
