<template>
  <div class="app-ewm">
    <div class="app-start-frame p3 app-start-frame1">
      <img alt="" src="~@/assets/imgs/questionnaire/acitveEwm.png" style="" />
    </div>
    <p class="p4">扫码参加活动</p>
    <div class="app-man" :style="manStyle">
      <img src="~@/assets/imgs/questionnaire/man.png" alt="" srcset="" />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    manStyle: {
      type: Object,
      default: () => {
        return {
        };
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-ewm {
  width: 100%;
  height: 225px;
  background: #3a2bac;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
img {
  width: 100%;
}
.p4 {
  font-size: 20px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
  margin-top: 3.87%;
}
.app-man {
  position: absolute;
  bottom: 0;
  width: 77px;
}
.app-start-frame1 {
  margin-top: 10.11%;
  border-radius: 4px;
  width: 145px;
  height: 145px;
}
</style>
