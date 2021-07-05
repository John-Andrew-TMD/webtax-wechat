<template>
  <div>
    <div class="search">
      <!-- <input v-model="keyword" class="search-input" type="text" placeholder="输入城市名或拼音" /> -->
      <van-field class="search-input" v-model="keyword" placeholder="输入城市名或拼音" />
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          class="search-item border-bottom"
          v-for="item of list"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >{{item.name}}</li>
        <li class="search-item border-bottom" v-show="hasNoData">没有找到匹配数据</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { mapMutations } from 'vuex';
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data() {
    return {
      keyword: '',
      list: [],
      timer: null
    };
  },
  computed: {
    hasNoData() {
      return !this.list.length;
    }
  },
  watch: {
    keyword() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (!this.keyword) {
        this.list = [];
        return;
      }
      this.timer = setTimeout(() => {
        const result = [];
        for (let i in this.cities) {
          this.cities[i].forEach(value => {
            if (
              value.spell.indexOf(this.keyword) > -1 ||
              value.name.indexOf(this.keyword) > -1
            ) {
              result.push(value);
            }
          });
        }
        this.list = result;
      }, 100);
    }
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city);
      // this.$router.push('/');
      this.$router.go(-1)
    },
    ...mapMutations(['changeCity'])
  },
  mounted() {
    // this.scroll = new Bscroll(this.$refs.wrapper,{click: true, tap: true });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/base";
.search {
  height: 44px;
  padding: 6px 12px;
  background: #ddd;
  z-index: 3;
}
.search-input {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 20px;
  color: #666;
  font-size: 14px;
  padding: 0 16px;
  /deep/ .van-field__body{
    height: 100%;
    .van-field__control{
      height: 100%;
    }
  }
}
.search-content {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  top: 88px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  .search-item {
    line-height: 30px;
    padding-left: 10px;
    background: #fff;
    color: #666;
    font-size: 18px;
  }
}
</style>
