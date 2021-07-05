<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area" v-for="(item, key) of list" :key="key" :ref="key">
        <div class="title border-topbottom">{{key}}</div>
          <van-radio-group v-model="radio" class="item-list">
            <div
              class="border-bottom d-flex a-center j-sb"
              v-for="innerItem of item"
              :key="innerItem.number"
            >
              <div class="d-flex a-center pl-15">
                <van-radio :name="innerItem.number" checked-color="#ff5948" @click="onChange(innerItem)">
                  <span class="item-left">{{innerItem.name}}</span>
                </van-radio>
              </div>
              <span class="item-right">{{innerItem.ascription}}</span>
            </div>
          </van-radio-group>
      </div>
    </div>
    <div v-if="JSON.stringify(list) == '{}'" class="empty-box">
      <div class="empty-bg"></div>
      <div class="empty-result" >空空如也</div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
export default {
  name: 'CityList',
  props: {
    hot: Array,
    list: Object,
    letter: String
  },
  data() {
    return {
      checked: false,
      radio: null
    }
  },
  computed: {},
  methods: {
    onChange(item) {
      this.$emit('checkItem', item)
    },
    handleClick(item) {
      // this.changeCity(city);
      this.$emit('selectItem', item)
    }
  },
  watch: {
    letter() {
      if (this.letter) {
        this.$toast(this.letter)
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element);
      }
    },
    list(v) {
      this.radio = null
    }
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper,{click: true, tap: true });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/scss/base";
.empty-box {
  height: 300px;
}
.empty-result {
  text-align: center;
  color: #999999;
}
.empty-bg {
  width: 275px;
  height: 275px;
  margin: 50px auto 0 auto;
  @include iconBg('empty-bgicon@2x.png');
}
.border-topbottom::before {
  border-color: #ccc;
}
.border-topbottom::after {
  border-color: #ccc;
}
.border-bottom::before {
  border-color: #ccc;
}
.pl-15 {
  padding-left: 15px;
}
.list {
  max-width: 375px !important;
  background-color: #fff;
  overflow: hidden;
  position: absolute;
  top: 172px;
  left: 0;
  right: 0;
  bottom: 50px;
  margin: 0 auto;
  /deep/ {
    .van-radio__icon {
      font-size: 20px;
    }
  }
  .title {
    line-height: 30px;
    background: #eee;
    padding-left: 10px;
    color: #666;
    font-size: 14px;
  }
  .button-list {
    overflow: hidden;
    padding: 5px 30px 5px 5px;
    .button-wrapper {
      float: left;
      width: 33.33%;
      .button {
        margin: 5px;
        padding: 5px 0;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 3px;
        font-size: 12px;
      }
    }
  }
  .item-list {
    .item-left {
      line-height: 40px;
      font-size: 18px;
      color: #333333
    }
    .item-right {
      line-height: 40px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: right;
      padding-right: 30px;
      color: #999999;
    }
  }
}
</style>
