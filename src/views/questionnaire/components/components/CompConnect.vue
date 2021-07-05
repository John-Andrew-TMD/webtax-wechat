<template>
  <com-app-bottom title="联系我们">
    <div class="app-rule">
      联系电话：4008123663<br />
      客服微信号：
      <span id="content">WebTax_01</span>
      <a href="javascript:void(0)" v-clipboard="clipOptions">复制</a><br />
      邮箱：service@webtax.com.cn
    </div>
  </com-app-bottom>
</template>

<script>
import ComAppBottom from "./ComAppBottom";
export default {
  inheritAttrs: false,
  components: {
    ComAppBottom
  },
  data() {
    return {};
  },
  destroyed(){
    this.$toast.clear()
  },
  computed: {
    clipOptions(e) {
      return {
        value: 'WebTax_01',
        success: e => {
          this.$toast({ type: 'success', message: '复制成功' });
        },
        error: () => {
          this.$toast({ type: 'danger', message: '复制失败' });
        }
      };
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.app-rule {
  padding-bottom: 15px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  a {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #fabf0c;
    line-height: 20px;
  }
}
</style>
