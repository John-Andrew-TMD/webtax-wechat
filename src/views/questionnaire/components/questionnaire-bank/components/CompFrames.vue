<template>
  <div class="app-frame">
    <div class="app-title">{{ options.title }}</div>
    <div class="app-content" :style = "options.contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
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
.app-frame {
  width: 100%;
  min-height: 125px;
  background: #3a2bac;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 15px;
  padding-bottom:20px ;
  .app-title {
    width: 171px;
    height: 64px;
    background: url("~@/assets/imgs/questionnaire/btnBg.png") no-repeat center
      center;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
    color: #ab2d20;
    line-height: 27px;
  }
}
.app-content {
  width: 100%;
  font-size: 13px;
  font-family: SourceHanSansCN-Regular, SourceHanSansCN;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  text-indent: 2em;
  margin-top: 10px;
}
img {
  width: 100%;
}
</style>
