<template>
  <div class="tax">
    <img class="tax__avator" :src="info.avatar?info.avatar : defaultAvator" alt />
    <span class="tax__name">{{info.name?info.name:'匿名'}}</span>
    <span class="icon-level icon-level-svip" v-if="info.level == 2 "></span>
    <span class="icon-level icon-level-svip1" v-if="info.level == 3 "></span>
    <span class="icon-level icon-level-svip2" v-if="info.level == 4 "></span>
    <span class="icon-level icon-level-vip" v-else-if="info.level == 1"></span>
    <span class="icon-level icon-no-vip" v-else></span>
  </div>
</template>
<style lang="scss" scoped>
@import '~@/scss/base';
.tax {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.tax__avator {
  width: 20px;
  height: 20px;
  border-radius:2px;
  overflow: hidden;
  margin-right: 10px;
}
.tax__name {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}

.tax__num {
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
}

.icon-level{
  width: 48px;
  height: 16px;
  margin-left: 5px;
}
// .icon-level-svip{
//   @include iconBg('icon-svip@2x.png');
// }

// .icon-level-vip{
//   @include iconBg('icon-vip@2x.png');
// }
.icon-level-svip{
  @include iconBg('svip-icon@2x.png', contain);
}
.icon-level-svip1{
  @include iconBg('svip1-icon@2x.png', contain);
}
.icon-level-svip2{
  @include iconBg('svip2-icon@2x.png', contain);
}
.icon-level-vip{
  @include iconBg('new-vip-icon@2x.png', contain);
}
.icon-no-vip{
  @include iconBg('no-vip-icon@2x.png', contain);
}
.micon-visitor{
  font-size: 18px;
  margin-left: 5px;
  color:  $mainColor
}
</style>
<script>
export default {
  name: 'MemberTag',
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
