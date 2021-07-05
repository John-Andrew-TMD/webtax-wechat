<template>
  <div class="app-content-wrapper" style="padding-bottom: 0px">
    <div class="app-top-tip">
      温馨提示：竞赛于1月11日24点结束，敬请关注
      <router-link
      style = "color: #4c79fe; text-decoration: underline;"
        :to="{
          path: '/questionnaire/know'
        }"
      >
        领奖须知</router-link
      >。
    </div>
    <div class="app-top"></div>
    <div class="app-bottom">
      <comp-start
        :loading="loading"
        v-if="this.questionnaireInfo.status !== undefined"
        :questionnaireInfo="questionnaireInfo"
        :routeParams="routeParams"
        :showDialog.sync="showDialog"
        :tip.sync="tip"
        :aloading.sync="aloading"
        @getQuestionnaireInfo="getQuestionnaireInfo"
      ></comp-start>
      <comp-start v-else :loading="loading"></comp-start>
      <template v-if="tip != '活动未开始'">
        <div
          :style="{ 'pointer-events': loading ? 'none' : 'auto' }"
          class="shadow-detail"
        >
          <ul>
            <li>
              <router-link
                :to="{
                  path: '/questionnaire/rank',
                  query: this.$route.query
                }"
                class="questionnaire-img"
              >
                <img
                  src="~@/assets/imgs/questionnaire/ranking.png"
                  alt
                  srcset
                />
              </router-link>
              排行榜
            </li>
            <li>
              <router-link
                :to="{
                  path: '/questionnaire/reflect',
                  query: this.$route.query
                }"
              >
                <div class="questionnaire-img">
                  <img
                    src="~@/assets/imgs/questionnaire/redbagdetail.png"
                    alt
                    srcset
                  />
                </div>
                查看红包明细＞
              </router-link>
            </li>
            <li>
              <div class="questionnaire-img" @click="dialogStatus = true">
                <img src="~@/assets/imgs/questionnaire/invite.png" alt srcset />
              </div>
              邀请好友
            </li>
          </ul>
        </div>
        <div class="shadow-tip" v-if="isShowList">
          温馨提示：前1000名发起邀请者，每邀请一位好友参与，可获得基础版通关奖励一次。每人仅限{{
            questionnaireInfo.inviteRewardLimit
          }}次。
        </div>
        <div class="shadow-tip" v-else @click="isShowList = true">
          邀请奖励名额已满，查看邀请好友记录＞
        </div>
        <com-app-bottom v-if="isShowList" ref="appBottom" title="邀请好友记录">
          <comp-list
            ref="compList"
            :options="{
              requestParams: {
                url: '/invite/record',
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
              showNodata: '暂无邀请好友记录～'
            }"
            :headData="headData"
          >
            <template v-slot:generalNum="{ scope }">
              <div
                @click="handleGetClick(scope)"
                v-if="scope.claimStatus == 0"
                class="right-btn "
              >
                <div class="complete">
                  领 取
                </div>
              </div>
              <div class="right-btn " v-else-if="scope.claimStatus == 1">
                <div class="completed">
                  已领取
                </div>
              </div>
              <div v-else>
                已达上限
              </div>
            </template>
          </comp-list>
        </com-app-bottom>
        <comp-connect class="mt-40"></comp-connect>
      </template>
    </div>

    <router-link
      :to="{
        path: '/questionnaire/rules',
        query: this.$route.query
      }"
      class="app-fixed"
      >活动规则</router-link
    >
    <comp-invite-card
      v-if="dialogStatus"
      :card-option="cardOption"
      :dialog-status.sync="dialogStatus"
      @dialog-confirm="handleDialogConfirm"
    ></comp-invite-card>
    <dialog-timer
      :aloading="aloading"
      v-if="showDialog"
      :showDialog="showDialog"
      @setShowDialog="setShowDialog"
    ></dialog-timer>
    <a href="https://www.wjx.cn/m/101514313.aspx" class="app-fixed1"></a>
  </div>
</template>
<script>
import {
  getExamInit,
  getRankPage
} from "@/api/questionnaire/api-questionnaire";
import {
  getExamInviteRecord,
  getTaskReward
} from "@/api/questionnaire/api-questionnaire";
import jsCookies from "js-cookie";
import CompList from "compQuestionnaire/CompList";
import ComAppBottom from "compQuestionnaire/ComAppBottom";
import CompInviteCard from "compQuestionnaire/CompInviteCard";
import CompConnect from "compQuestionnaire/CompConnect";
import CompStart from "./components/CompStart";
import DialogTimer from "./components/DialogTimer";
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    restart: {
      type: Number,
      default: 0
    },
    mpToken: {
      type: Boolean,
      default: false
    },
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowList: false,
      pageNo: 1,
      aloading: true,
      loading: true,
      tip: "活动未开始",
      isGet: false,
      endBtn: require("assets/imgs/questionnaire/end-btn.png"),
      startBtn: require("assets/imgs/questionnaire/start-btn.png"),
      showDialog: false,
      dialogStatus: false,
      tableData: [],
      headData: [
        {
          span: "8",
          name: "用户",
          prop: "memberName",
          style: {
            textAlign: "left"
          },
          filter: res => {
            return `
            <div class = "app-list-item">
            <div class="menber-avatar mr-5">
                    <img src="${res.avatar}" alt="" srcset="" />
                  </div>
            <div class="member-name">${res.memberName || "用户名"}</div>
            </div>
            `;
          }
        },
        {
          span: "11",
          name: "参与时间",
          prop: "completeTime"
        },
        {
          span: "5",
          name: "领取奖励",
          prop: "generalNum",
          slot: true
        }
      ],
      questionnaireInfo: {}
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    btnImg() {
      return +this.questionnaireInfo.status == 2 ? this.endBtn : this.startBtn;
    },
    cardOption() {
      return {
        width: 375,
        height: 667,
        qrcode: {
          swidth: 200,
          sheight: 200,
          sx: 0,
          sy: 0,
          width: 100,
          height: 100,
          x: 137,
          y: 502
        },
        rectImg: [
          {
            img: require("assets/imgs/questionnaire/invite-alert.png"),
            width: 375,
            height: 667,
            x: 0,
            y: 0
          }
        ]
      };
    }
  },
  watch: {
    mpToken: {
      handler(val, oldval) {
        if (!val) {
          return false;
        }

        this.initUI();
      },
      immediate: false
    }
  },
  mounted() {},
  created() {
    for (var i = 1; i < 1000; i++) {
      clearInterval(i);
    }
    this.setShowLoad(true);
  },
  components: {
    CompList,
    CompConnect,
    ComAppBottom,
    CompInviteCard,
    CompStart,
    DialogTimer
  },
  methods: {
    ...mapMutations(["setShowLoad"]),
    initUI() {
      // console.log(`${window.location.host}/questionnaire/mng?examId=1`)
      if (this.$route.params.msg) {
        this.$toast.fail(this.$route.params.msg);
      }
      this.getQuestionnaireInfo();
      history.pushState(null, null, document.URL);
      window.onpopstate = this.goBack;
    },
    // goBack() {
    //   if (this.$route.name == "mng") {
    //       history.go(-1);
    //   }
    // },
    handleRankClick() {
      this.$router.push({
        path: "/questionnaire/rank"
      });
    },
    async getQuestionnaireInfo() {
      await getExamInit({
        examId: this.examId,
        inviteUserId: this.routeParams.inviteUserId || ""
      }).then(res => {
        this.isGet = true;
        this.loading = false;
        if (res.code === 200) {
          this.questionnaireInfo = res.data;
          localStorage.setItem("questionnaireInfo", JSON.stringify(res.data));
          this.setShowLoad(false);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    handleDialogConfirm(dialogStatus) {
      this.dialogStatus = dialogStatus;
    },
    handleGetClick(scope) {
      this.$toast.loading({
        message: "",
        forbidClick: true,
        mask: true
      });
      getTaskReward({
        examId: 1,
        taskCode: "invite_user",
        mpUserId: scope.mpUserId
      }).then(res => {
        this.$toast.clear();
        if (res.code == 200) {
          this.$toast.success("领取成功");
          scope.claimStatus = 1;
          this.getQuestionnaireInfo();
          // this.$refs.compList.refreshList(true);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    setShowDialog(showDialog) {
      this.showDialog = showDialog;
      if (!this.aloading) {
        this.$router.push({
          path: "/questionnaire/list",
          query: this.$router.query
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-top-tip {
  width: 100%;
  height: 38px;
  background: linear-gradient(132deg, #ffd07a 0%, #ffe5ae 100%);
  box-shadow: 0px -1px 0px 0px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  line-height: 18px;
  a{
    color:#4C79FE;
  }
}
.app-fixed1 {
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
.app-content-wrapper {
  height: 100%;
  .right-btn {
    cursor: pointer;
    /* width: 85px;
    height: 30px; */
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      border-radius: 12px;
      text-align: center;
      width: 68px;
      height: 24px;
      padding: 2% 0;
      float: right;
    }
  }
  .right-btn .done {
    border: 1px solid #ffd68a;
    color: #ffd68a;
  }
  .right-btn .complete {
    background: linear-gradient(132deg, #ffd07a 0%, #ffe5ae 100%);
    border: 1px solid rgba(255, 214, 138, 1);
    color: #333333;
  }
  .right-btn .completed {
    border: 1px solid #66676f;
    color: #66676f;
  }
  .app-fixed {
    display: inline-block;
    position: fixed;
    right: 0;
    top: 20%;
    width: 20px;
    height: 62px;
    background: rgba(255, 89, 72, 1);
    border-radius: 2px 0px 0px 2px;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    line-height: 13px;
    text-align: center;
    padding-top: 1%;
  }
  img {
    width: 100%;
  }
  .app-top {
    background: url("~@/assets/imgs/questionnaire/bg.png") no-repeat center
      center;
    background-size: contain;
    padding: 0 20px;
    position: relative;
    background-position-y: bottom;
    padding-top: 128%;
  }

  .app-bottom {
    width: 92%;
    margin: 0 auto;
    margin-top: -90px;
    padding-bottom: 41px;
    & > div {
      width: 100%;
    }
    .shadow-detail {
      width: 100%;
      background: url("~@/assets/imgs/questionnaire/index-detail.png") no-repeat
        center center;
      background-size: cover;
      padding-top: 35%;
      position: relative;
      ul {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 50%;
        padding: 0 16px;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          a {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: #ffc000;
          }
        }
      }

      .questionnaire-img {
        width: 56px;
      }
    }
    .shadow-tip {
      cursor: pointer;
      background: url("~@/assets/imgs/questionnaire/tip.png") no-repeat center
        center;
      background-size: 100% 100%;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffd280;
      line-height: 17px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 15px;
      padding-top: 10px;
      margin-top: 10px;
      margin-bottom: 35px;
      height: 42px;
      width: 100%;
    }
  }
}
</style>
