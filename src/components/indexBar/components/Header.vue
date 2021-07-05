<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <div class="header-back"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CityHeader'
}
</script>

<style lang="scss" scoped>
  @import '~@/scss/base';
  .header{
    position: relative;
    overflow: hidden;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    background: #ff5948;
    font-size: 14px;
    .header-back{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 10px;
      display: inline-block;
      width: 22px;
      height: 22px;
      @include norepBg('left-icon@2x.png');
    }
  }
    
    
      
</style>
