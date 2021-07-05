<template>
  <div class="app-content">
    <div class="padding6 mt-20" v-if="reflectInfo.withdrawList">
      <comp-old-button
        v-if="!reflectInfo.requireBindingUser"
        :reflectInfo="reflectInfo"
        @initUI="initUI"
      ></comp-old-button>
      <div v-else class="app-content-redbag">
        <div class="app-content-detail">
          <p class="p1">待提现金额(元)</p>
          <p class="p2">
            ¥{{ reflectInfo.withdrawAmount | filterMoneyValue(2, 2, 0) }}
          </p>
          <comp-form
            v-if="reflectInfo.requireBindingUser"
            :reflectInfo="reflectInfo"
          ></comp-form>
        </div>
      </div>
      <!-- <div class="padding20">
        <div class="tip-content">
          温馨提示：单次最低提现金额{{
            reflectInfo.extractLeastAmount | filterMoneyValue(2, 2, 0)
          }}元，每日可提现{{ reflectInfo.extractNumLimit }}次
        </div>
      </div> -->
    </div>
    <comp-old-button v-else></comp-old-button>
    <div class="app-content-wrapper app-content-list padding20">
      <com-app-bottom title="提现规则">
        <ul style="font-size:14px;     padding-bottom: 15px;">
          <li>1.每人每日仅限操作提现{{ reflectInfo.extractNumLimit }}次；</li>
          <li>
            2.提现金额需要大于{{
              reflectInfo.extractLeastAmount | filterMoneyValue(2, 2, 0)
            }}元；
          </li>
          <li>3.参赛人最少需要完成答题闯关成功1次。</li>
        </ul>
      </com-app-bottom>
    </div>
    <div
      class="app-content-wrapper app-content-list padding20"
      style="margin-top:0"
    >
      <com-app-bottom ref="appBottom" title="红包明细">
        <comp-list
          :options="{
            requestParams: {
              url: '/redpack/record',
              data: {
                pageNo: pageNo,
                pageSize: 10,
                condition: {
                  examId: examId || '1'
                }
              }
            },
            showFixed: false,
            showPagination: true,
            showHead: false,
            showNodata: '暂无红包明细～'
          }"
          :headData="headData"
          @request-complete="initUI"
        >
          <template v-slot:isWithdraw="{ scope }">
            <div class="member-name">
              <div class="p1">
                {{ scope.isWithdraw | filterIsWithdraw(scope.redpackType) }}
              </div>
              <div class="p2">{{ scope.beginTime }}</div>
            </div>
          </template>
          <template v-slot:redpackAmount="{ scope }">
            <div class="member-recordIndex">
              {{ scope.isWithdraw ? "-" : "+"
              }}{{ scope.redpackAmount | filterMoneyValue(2, 2, 0) }}
            </div>
          </template>
        </comp-list>
      </com-app-bottom>

      <!-- <com-app-bottom componentName="CompReflectList" ></com-app-bottom> -->
    </div>
    <a href="https://www.wjx.cn/m/101514313.aspx" class="app-fixed"></a>
  </div>
</template>

<script>
import {
  getRedpackRecord,
  getRedpackWithdraw
} from "@/api/questionnaire/api-questionnaire";
import CompList from "compQuestionnaire/CompList";
import CompOldButton from "./components/CompOldButton";
import CompEwm from "./components/CompEwm";
import CompForm from "./components/CompForm";
import { mapGetters } from "vuex";
import ComAppBottom from "compQuestionnaire/ComAppBottom";
export default {
  provide() {
    return {
      getTableData: () =>
        (this.reflectInfo && this.reflectInfo.withdrawList) || []
    };
  },
  data() {
    return {
      reflectInfo: {},
      pageNo: 1,
      headData: [
        {
          span: "19",
          prop: "isWithdraw",
          slot: true
        },
        {
          span: "5",
          prop: "redpackAmount",
          slot: true
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    tableData() {
      return (this.reflectInfo && this.reflectInfo.withdrawList) || [];
    },
    showOld() {
      return (
        +this.reflectInfo.withdrawAmount <=
          +this.reflectInfo.extractLeastAmount ||
        this.reflectInfo.code == 500 ||
        +this.reflectInfo.extractNumLimit <=
          +this.reflectInfo.todayWithdrawCount
      );
    },
    userInfo() {
      let str = localStorage.getItem("userinfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    }
  },
  destroyed() {
    this.$toast.clear();
  },
  components: {
    CompList,
    CompOldButton,
    ComAppBottom,
    // CompEwm,
    CompForm,
    ComAppBottom: () => import("compQuestionnaire/ComAppBottom")
  },
  mounted() {},
  methods: {
    initUI(res) {
      // getRedpackRecord({ examId: this.examId }).then(res => {
      if (res) {
        if (res.code == 200) {
          this.reflectInfo = res.data || 0;
        } else if (res.code == "500") {
          this.reflectInfo = res;
          this.$toast.fail(res.message);
        } else {
          this.$toast.fail(res.message);
        }
      }

      // });
    }
  }
};
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
.app-fixed {
  display: inline-block;
  position: fixed;
  right: 0;
  bottom: 20%;
  width: 56px;
  height: 60px;
  background: url("~@/assets/imgs/questionnaire/que.gif") no-repeat center
    center;
  background-size: contain;
}
.member-name {
  font-size: 14px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  text-align: left;                                                                                                                                                
  .p1 {
    font-size: 14px;
  }
  .p2 {
    font-size: 12px;
    margin-top: 3%;
  }
}
.member-recordIndex {
  font-size: 18px;
  margin-left: 10px;
}
.app-content {
  .button {
    margin: 0;
    padding: 0;
    border: 1px solid transparent; //自定义边框
    outline: none; //消除默认点击蓝色边框效果
  }
  .tip-content {
    height: 40px;
    width: 100%;
    font-size: 14px;
    color: #ffd280;
    background: #1a2b53;
    border-radius: 8px;
    border: 1px solid #233d7b;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
  .app-qa-disabled {
    background: #a9a9a9 !important;
  }
  .app-qa-disabled .bg {
    color: #999999 !important;
    background: linear-gradient(132deg, #d4d4d4 0%, #e5e5e5 100%) !important;
  }
  .app-content-redbag {
    width: 100%;
    padding-top: 131.14%;
    background: url("~@/assets/imgs/questionnaire/reflect.png") center center
      no-repeat;
    background-size: contain;
    .app-content-detail {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      & > * {
        display: table;
        margin: 0 auto;
      }
      .p1 {
        color: #ff5948;
        font-size: 14px;
        margin-top: 10%;
      }
      .p2 {
        color: #fd2c38;
        font-size: 34px;
        margin-top: 3%;
        margin-bottom: 2%;
      }
      .p3 {
        margin-top: 12%;
      }
      .p4 {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 22px;
        margin-top: 10px;
      }
    }
  }
  .app-content-redbag1 {
    background: url("~@/assets/imgs/questionnaire/reflect1.png") center center
      no-repeat;
    background-size: 101%;
    padding-top: 63.79%;
  }

  .app-content-list {
    margin-top: 36px;
  }
}
</style>
