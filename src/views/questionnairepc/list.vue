<template>
  <div class="body">
    <div class="time">答题倒计时：{{ minute }}:{{ second }}</div>
    <div class="app-ewm">
      <div class="ewm-detail">扫描二维码 开始游戏＞</div>
      <div class="ewm-img">
        <img src="~@/assets/imgs/q-ewm.png" alt="" srcset="" />
      </div>
    </div>
    <div class="app-frame">
      <ul class="fake-list clearfix" ref="elememt">
        <li
          class="fake-list-item"
          v-for="(item, index) in tableData &&
            tableData.overallRanking &&
            tableData.overallRanking.records.slice(0, 20)"
          :key="index"
        >
          <div class="app-list-item">
            <div v-if="item.rankingNum <= 3" class="member-ser">
              <img
                class="member-index-img"
                :src="getImg(item)"
                alt=""
                srcset=""
              />
            </div>
            <div v-else class="member-ser" style="text-indent: 20px;">
              {{ item.rankingNum }}
            </div>

            <div class="menber-avatar mr-5">
              <img :src="item.avatar" alt="" srcset="" />
            </div>
            <div class="member-name">{{ item.memberName || "用户名" }}</div>
          </div>
          <div class="member-detail">
            普通{{ item.generalNum }}关/困难{{ item.difficultNum }}关/共{{
              item.generalNum + item.difficultNum
            }}关
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jsCookies from "js-cookie";
import { getRankPage } from "@/api/questionnaire/api-questionnaire";
export default {
  props: {},
  data() {
    return {
      mpToken: false,
      tableData: []
    };
  },
  watch: {
    // 监听数值变化
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  mounted() {
    this.initUI();
  },
  beforeDestroy() {
    document.querySelector(".app").classList.remove("container");
  },
  computed: {
    ...mapGetters(["examId", "minutes", "seconds"]),
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
  },
  methods: {
    getWidth() {
      //获取高度值
      var height = this.$refs.element.offsetHeight; //100
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    add: function() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.minutes !== 0 && _this.seconds === 0) {
          _this.$store.commit("setMinutes");
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          // _this.$store.commit("setSeconds", 0);
          window.clearInterval(time);
        } else {
          _this.$store.commit("setSecondsmins");
        }
        if (_this.seconds % 20 == 0) {
          _this.getTableData();
        }
      }, 1000);
    },
    getImg(item) {
      return require(`assets/imgs/questionnaire/${item.rankingNum}@2x.png`);
    },
    initUI() {
      this.$nextTick(() => {
        document.querySelector(".app").classList.add("container");
        this.getTableData();
        this.add();
      });
    },
    getTableData() {
      getRankPage({
        searchCount: true,
        pageNo: 1,
        pageSize: 50,
        sort: [],
        orderField: [],
        condition: {
          examId: this.examId || ""
        }
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.container {
  height: auto;
  background: #052862;
}
</style>
<style lang="scss" scoped>
.member-ser {
  width: 20%;
  text-align: left;
  font-size: 36px;
  font-family: PingFangHK-Regular, PingFangHK;
  font-weight: 400;
  color: #ffffff;
  line-height: 48px;
}
.clearfix {
  &:after {
    display: block;
    visibility: hidden;
    clear: both;
    height: 0;
    font-size: 0;
    content: " ";
  }
}
img {
  width: 100%;
}

.body {
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
  min-width: 1500px;
  height: 100%;
  min-height: 900px;
  background: url("~@/assets/imgs/q-bg2.png") center top no-repeat;
  background-size: 100% 100%;
  background-color: #031642;
  position: relative;
  padding-top: 175px;

  .app-ewm {
    position: absolute;
    right: 50px;
    top: 50px;
    display: flex;
    align-items: center;
    width: 376px;

    .ewm-img {
      width: 205px;
      margin-left: auto;
    }

    .ewm-detail {
      width: 135px;
      font-size: 27px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 38px;
    }
  }

  .time,
  .fake-list {
    margin: 0 auto;
  }

  .app-frame {
    width: 100%;

    margin-top: 60px;
    padding: 0 1.6%;
  }

  .fake-list {
    .fake-list-item {
      width: 350px;
      height: 168px;
      border-radius: 4px;
      border: 2px solid #51a3b8;
      padding: 24px;
      margin: 9px;
      float: left;

      .app-list-item {
        display: flex;
        align-items: center;
      }

      .member-index-img {
        width: 56px;
        height: 56px;
        margin-top: 5px;
      }

      .menber-avatar {
        width: 56px;
        height: 56px;
        background-color: #fff;
        border-radius: 100%;
        overflow: hidden;
        margin-left: 5px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .member-ser {
        width: 20%;
        text-align: center;
        font-size: 36px;
        font-family: PingFangHK-Regular, PingFangHK;
        font-weight: 400;
        color: #ffffff;
        line-height: 48px;
      }

      .member-ser-others {
        width: 19%;
        font-size: 18pt;
        text-align: center;
        color: #ffffff;
      }

      .member-name {
        flex: 1;
        font-size: 26px;
        font-family: PingFangHK-Regular, PingFangHK;
        font-weight: 400;
        color: #eeeeee;
        line-height: 37px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .member-detail {
        width: 100%;
        margin-top: 19px;
        font-size: 24px;
        font-family: PingFangHK-Regular, PingFangHK;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.65);
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .time {
    display: table;
    font-size: 64px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fea952;
    line-height: 64px;
  }
}

@media screen and (max-width: 1901px) {
  .fake-list {
    width: 91%;
  }
}
@media screen and (max-width: 1670px) {
  .fake-list {
    width: 76%;
  }
}
@media screen and (max-width: 1500px) {
  .fake-list {
    width: 61%;
  }
}
</style>
