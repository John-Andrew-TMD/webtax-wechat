<template>
  <div class="flex-lr">
    <div class="tax-export">
      <img class="tax-export__avator" :src="info.avatar?info.avatar : defaultAvator" alt />
      <span class="tax-export__name">{{info.name?info.name:'匿名'}}</span>
      <span class="border-lpx" v-if="info.num"></span>
      <span class="tax-export__num" v-if="info.num">专家编号：{{info.num}}</span>
    </div>
    <div class="r-item">
      <slot name="timeItem"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/scss/base';
.tax-export {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.tax-export__avator {
  width: 20px;
  height: 20px;
  border-radius:2px;
  overflow: hidden;
  margin-right: 10px;
}
.tax-export__name {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.border-lpx {
  @include bd1px();
  height: 12px;
  margin: 0 5px;
}
.tax-export__num {
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
.r-item{
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}
</style>
<script>
export default {
  name: 'UserTag',
  components: {},
  props: {
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultAvator: require('@/assets/img/avatar.png'),
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {}
};
</script>
