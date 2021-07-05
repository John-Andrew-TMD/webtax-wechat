<template>
  <div>
    <Empty v-if="info.livePlaybackRelList.length == 0"> </Empty>
    <template v-else>
      <div
        class="content-list"
        v-for="item in info.livePlaybackRelList"
        :key="item.id"
      >
        <div class="d-flex mb-10 mt-10" v-if="item.livePlaybackLists.length">
          <div class="content-title flex-1">
            {{ item && item.liveTypeName }}
          </div>
          <div class="content-tip a-center j-end">共 {{ item.liveNum }} 节</div>
        </div>
        <ul class="pb-10" v-if="item.livePlaybackLists.length">
          <li
            class="d-flex content-badius mb-10 content-gray"
            v-for="el in item.livePlaybackLists"
            :key="el.id"
            @click="handleClickPush(el.id)"
          >
            <div class="content-postion">
              <van-image height="100%" fit="cover" :src="el.liveCoverImage" />
              <div class="tip" v-if="el.liveIsOnline">即将上线</div>
            </div>

            <div class="flex-1 pd-10">
              <span class="content-h3">{{ el.liveTitle }}</span>
              <div class="d-flex a-center j-center mt-10">
                <span
                  class="flex-1 d-flex a-center"
                  :class="liveClass[el.liveStatus - 1]"
                >
                  <van-image
                    width="14"
                    height="14"
                    fit="contain"
                    :src="getliveImgFilter(el)[el.liveStatus - 1]"
                    class="mr-5"
                  />
                  {{ getliveStatusFilter(el)[el.liveStatus - 1] }}
                </span>
                <span v-if="el.liveNo" class="content-detail"
                  >编号：{{ el.liveNo }}</span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import Empty from "./Empty";
export default {
  name: "LivePlayback",
  components: { Empty },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
  },
  data() {
    return {
      active: 0,
      monIcon: require("@/assets/imgs/mon.png"),
      dismonIcon: require("@/assets/imgs/dismon.png"),
      vipIcon: require("@/assets/imgs/svip.png"),
      liveClass: ["orangeFont", "redFont", "redFont", `redFont`, "orangeFont"],
    };
  },
  methods: {
    getliveStatusFilter(el) {
      return [
        "限时免费",
        ` ${this.getdiscountAmount(el)}元`,
        ` ${this.getdiscountAmount(el)}元`,
        ` ${this.getdiscountAmount(el)}元`,
        "免费",
      ];
    },
    getliveImgFilter(el) {
      return [
        this.dismonIcon,
        this.monIcon,
        this.monIcon,
        this.monIcon,
        this.dismonIcon,
      ];
    },
    filterMoney(num) {
      return (num / 100).toFixed(2);
    },
    getdiscountAmount(info) {
      let discountAmount = this.filterMoney(info.discountAmount);
      let amount = this.filterMoney(info.amount);
      return (info.isPromote ? discountAmount : amount) || amount;
    },
    onChange(event) {},
    handleClickPush(id) {
      this.$router.push({ path: `/liveDetail?id=${id}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-list {
  padding: 0 0.4rem;
}
.content-h3 {
  height: 0.74rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*限制在一个块元素显示的文本的行数*/
  -webkit-box-orient: vertical;
  word-break: break-all;
  white-space:normal;
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
  color: #ff9148;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.goldFont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ebb30b;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.redFont {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ff5948;
  line-height: 16px;
  overflow: hidden; //超出的隐藏
  text-overflow: ellipsis; //省略号
  white-space: nowrap; //强制一行显示
}
.content-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
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
    width: 134px;
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
  font-weight: normal;
  font-size: 13px;
}
</style>