<template>
  <div class="shadow-start">
    <div>
      <div class="shadow-top" v-html="questionnaireBtnInfo.tip"></div>
      <div class="shadow-bottom">
        <div
          :style="{ 'pointer-events': loading ? 'none' : 'auto' }"
          v-for="(item, index) in questionnaireBtnInfo.btnList"
          :key="index"
          :class="item.className"
          class="shadow-btn"
          @click="handleStartClick(item.id,index)"
        >
          <div>
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
    <dialog-comp
      v-transfer-dom="'body'"
      v-if="dialogStatus"
      :options="options"
      :dialog-status.sync="dialogStatus"
    ></dialog-comp>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import DialogComp from "compQuestionnaire/DialogComp.vue";
import { setExamBegin } from "@/api/questionnaire/api-questionnaire";
import { mapGetters } from "vuex";
export default {
  components: {
    DialogComp
  },
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: true
    },
    questionnaireInfo: {
      type: Object,
      default: () => null
    }
  },
  watch: {
    questionnaireInfo: {
      handler(val, oldval) {
        if (!val) {
          return;
        }
        this.initUI();
        if (this.$route.params.restart) {
          this.handleStartClick(this.examId);
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      fontStyle: "font-size: 16px;font-weight: 500;color: #ffc000;",
      options: {},
      isClick: false,
      dialogStatus: false,
      questionnaireBtnInfo: {
        tip: `今日剩余<font style = "font-size: 16px;font-weight: 500;color: #ffc000;">0</font>次答题机会`,
        btnList: [
          {
            id: "1",
            className: "nomal",
            text: "普通版"
          },
          {
            id: "2",
            className: "difficult",
            text: "挑战版"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    userInfo() {
      let str = localStorage.getItem("userinfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.questionnaireInfo) {
        return;
      }
    });
  },
  methods: {
    handleStartClick(id,index) {
      if (
        id == "0" ||
        (this.questionnaireBtnInfo.btnList[index] &&
          this.questionnaireBtnInfo.btnList[index].className == "end") ||
        (this.questionnaireBtnInfo.btnList[index] &&
          this.questionnaireBtnInfo.btnList[index].className == "end2")
      ) {
        return;
      }
      if (+this.questionnaireInfo.status == 0) {
        if (+this.questionnaireInfo.surplusNum < 1) {
          this.options = {
            img: require("@/assets/imgs/questionnaire/more.png"),
            title: "哎呀 ，太勤快啦！",
            content: "今日答题次数已用完，明天再来吧～"
          };
          this.dialogStatus = true;
          return;
          // this.$toast.fail("答题次数已用完");
        }
      }
      if (+this.questionnaireInfo.status == 1 && id != this.examId) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "是否放弃原来答题进度"
          })
          .then(() => {
            // on close
            const questionnaireInfo = JSON.parse(
              localStorage.getItem("questionnaireInfo")
            );
            questionnaireInfo.index = 0;
            localStorage.setItem(
              "questionnaireInfo",
              JSON.stringify(questionnaireInfo)
            );
            this.setExamBegin(id);
          });
      } else {
        this.setExamBegin(id);
      }
    },
    setExamBegin(id) {
      if (id != "3" && id != "4") {
        if (!this.isClick) {
          this.isClick = true;
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            mask: true,
            duration: 0
          });
          setExamBegin({
            examId: id,
            inviteUserId: this.routeParams.inviteUserId || "",
            index: this.questionnaireInfo.index
          }).then(res => {
            this.$toast.clear();
            this.$emit("update:aloading", false);
            if (res.code == 200) {
              this.$emit("update:showDialog", true);
              this.$store.commit("setExamId", id);
            } else {
              this.$emit("getQuestionnaireInfo", "");
              this.$toast.fail(res.message);
            }
          });
        }
      } else {
        if (this.questionnaireInfo.status == "2") {
          this.$router.push({
            path: "/questionnaire/getprice"
          });
        }
      }
    },
    initUI() {
      let examId = this.examId;
      let hasQuestionnaireBtnInfo = {
        tip: `今日剩余<font style = "${this.fontStyle}">${this.questionnaireInfo
          .surplusNum || 0}</font>次答题机会`,
        btnList: [
          {
            id: "1",
            className: "nomal",
            text: "普通版"
          },
          {
            id: "2",
            className: "difficult",
            text: "挑战版"
          }
        ]
      };
      let overPass = {
        className: "end2",
        text: "已通关"
      };
      switch (this.questionnaireInfo.status) {
        case 0:
        case 1:
          this.questionnaireBtnInfo = hasQuestionnaireBtnInfo;
          if (this.questionnaireInfo.status == 1) {
            this.questionnaireBtnInfo.btnList.filter(
              el => el.id == this.questionnaireInfo.continueExamId
            )[0].text = "继续答题";
          }
          if (this.questionnaireInfo.isPassSimple) {
            this.questionnaireBtnInfo.btnList[0] = {
              ...this.questionnaireBtnInfo.btnList[0],
              ...overPass
            };
          }
          if (this.questionnaireInfo.isPassDifficult) {
            this.questionnaireBtnInfo.btnList[1] = {
              ...this.questionnaireBtnInfo.btnList[1],
              ...overPass
            };
          }
          break;
        case 2:
          if (this.questionnaireInfo.isRankingReward) {
            if (this.questionnaireInfo.receivingInfo.isFillin) {
              this.questionnaireBtnInfo = {
                tip: "活动已结束，恭喜您获奖了～",
                btnList: [
                  {
                    id: "3",
                    className: "link",
                    text: "查看领奖信息"
                  }
                ]
              };
            } else {
              this.questionnaireBtnInfo = {
                tip: "活动已结束，恭喜您获奖了～",
                btnList: [
                  {
                    id: "4",
                    className: "link",
                    text: "领奖入口"
                  }
                ]
              };
            }
          } else {
            this.questionnaireBtnInfo = {
              tip: "活动已结束，谢谢您的参与～",
              btnList: [
                {
                  id: "0",
                  className: "end",
                  text: "活动已结束"
                }
              ]
            };
          }
          break;
        case 3:
          this.questionnaireBtnInfo = {
            tip: "活动未开始",
            btnList: [
              {
                id: "0",
                className: "end",
                text: "敬请期待"
              }
            ]
          };
          break;

        default:
          break;
      }
      this.$emit("update:tip", this.questionnaireBtnInfo.tip);
    }
  }
};
</script>
<style lang="scss" scoped>
.shadow-start {
  background: url("~@/assets/imgs/questionnaire/game-start.png") no-repeat
    center center;
  padding-top: 44%;
  position: relative;
  background-size: contain;
  padding-top: 44%;
  margin-bottom: 10px;
  & > div {
    position: absolute;
    width: 92%;
    left: 50%;
    top: 50%;
    -webkit-transform: translateY(-26%);
    transform: translate(-50%, -26%);
  }
  .shadow-top {
    font-size: 13px;
    color: #fff;
    text-align: center;
    width: 100%;
    font {
      font-size: 16px;
      font-weight: 500;
      color: #ffc000;
    }
  }

  .shadow-bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    .nomal {
      flex: 1;
      background: url("~@/assets/imgs/questionnaire/nomal.png") no-repeat center
        center;
      background-size: contain;
      color: #ab2d20;
      & > div {
        margin-top: -5px;
      }
    }
    .end2 {
      flex: 1;
      background: url("~@/assets/imgs/questionnaire/dis-btn2.png") no-repeat
        center center;
      background-size: 100% 100%;
      color: #555555;
      & > div {
        margin-top: -5px;
      }
    }
    .end {
      flex: 1;
      background: url("~@/assets/imgs/questionnaire/end.png") no-repeat center
        center;
      background-size: 100% 100%;
      color: #555555;
      & > div {
        margin-top: -5px;
      }
    }
    .link {
      flex: 1;
      background: url("~@/assets/imgs/questionnaire/link.png") no-repeat center
        center;
      background-size: contain;
      color: #ab2d20;
      & > div {
        margin-top: -5px;
      }
    }
    .difficult {
      flex: 1;
      background: url("~@/assets/imgs/questionnaire/difficult.png") no-repeat
        center center;
      background-size: contain;
      color: #fff;
      & > div {
        margin-top: -5px;
        margin-right: -5px;
      }
    }
    .shadow-btn {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      font-weight: 600;
    }
  }
}
</style>
