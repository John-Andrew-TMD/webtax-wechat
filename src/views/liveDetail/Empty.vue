<template>
  <div class="empty-wrapper">
    <div class="empty-box">
      <div class="empty-tip">
        <p class="text-center tit">暂无相关课程</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.empty-wrapper {
  background-color: #fff;
}
.empty-box {
  position: relative;
  width: 100%;
  height: 275px;
  @include norepBg("empty-contribute-img@2x.png");
}
.empty-tip{
  position: absolute;
  bottom: 40px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.tit{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:24px;
}
</style>
<script>
export default {
  name: 'EmptyContribute',
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    fnAdd() {
      this.$router.push({name: 'ContributeAdd'})
    }
  }
};
</script>