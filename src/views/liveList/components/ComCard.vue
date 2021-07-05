<template>
  <div class="mb-10">
    <div class="content-postion">
      <van-image height="5rem" fit="cover" :src="info.liveCoverImage" />
      <div class="tagTip" :class="liveClass[info.liveStatus - 1]">
        {{ getliveStatusFilter(info)[info.liveStatus - 1] }}
      </div>
      <div class="tip" v-if="info.liveIsOnline">即将上线：{{info.liveTime}}</div>
    </div>

    <div class="flex-1 pd-10">
      <h3 class="content-h3">{{ info.liveTitle }}</h3>
      <div class="d-flex a-center j-center mt-10">
        <span class="flex-1 d-flex a-center content-detail" v-if="info.teacher">
          主讲嘉宾：{{ info.teacher }}
          <!--  -->
        </span>
        <span v-if="info.liveNo" class="content-detail"
          >编号：{{ info.liveNo }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      monIcon: require("@/assets/imgs/mon.png"),
      dismonIcon: require("@/assets/imgs/dismon.png"),
      vipIcon: require("@/assets/imgs/svip.png"),
      liveClass: [
        "orangeFont",
        "goldFont",
        "goldFont",
        `redFont`,
        "orangeFont",
      ],
    };
  },
  methods: {
    getliveStatusFilter(el) {
      return ["限时免费", "VIP", "SVIP", `付费观看`, "免费观看"];
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
    getdiscountAmount(info) {
      let discountAmount = this.filterMoney(info.discountAmount);
      let amount = this.filterMoney(info.amount);
      return (info.isPromote ? discountAmount : amount) || amount;
    },
    getliveImgFilter(el) {
      return [
        this.dismonIcon,
        this.vipIcon,
        this.vipIcon,
        this.monIcon,
        this.dismonIcon,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.tagTip {
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
  display: inline-block;
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
}
.content-list {
  padding: 0 0.4rem;
}
.content-h3 {
  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  overflow: hidden;

  /*! autoprefixer: off */

  -webkit-box-orient: vertical;
}
.content-detail {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 16px;
  margin-left: auto;
}
.orangeFont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background-color: #ff9148;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.goldFont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background-color: #ebb30b;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.redFont {
  display: none;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background-color: #ff5948;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.content-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  background-color: #333333;
  line-height: 22px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.content-gray {
  cursor: pointer;
  /* height: 72px; */
  background: #f5f5f5;
}
.content-badius {
  border-radius: 2px;
  overflow: hidden;
}
.pd-10 {
  padding: 10px;
}
.content-postion {
  position: relative;

  /deep/ .van-image {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .tip {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 18px;
    height: 18px;
    width: 100%;
    background: #8d4848;
    color: #fff;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
}
.content-tip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 20px;
  margin-left: auto;
}
.content-h3 {
  font-size: 18px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 500;
  text-align: left;
  color: #000000;
  line-height: 25px;
}
</style>