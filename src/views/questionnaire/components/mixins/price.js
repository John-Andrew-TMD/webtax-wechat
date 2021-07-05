import { getExamInit } from "@/api/questionnaire/api-questionnaire";
export default {
  data() {
    return {
      prices: ["Macbook Air", "iphone 12 手机", "ipad 2020"],
      rankingNum: 0,
      questionnaireInfo: {
        receivingInfo: {
          rewardReceiveStatus: {
            A001: {
              isFillin: true
            },
            A002: {
              isFillin: true
            },
            A003: {
              isFillin: true
            }
          }
        }
      }
    };
  },
  computed: {
    getprice() {
      if (this.rankingNum == 1) {
        return "10,000元现金大奖";
      } else if (this.rankingNum >= 5 && this.rankingNum <= 7) {
        return "2,000元现金大奖";
      } else if (this.rankingNum >= 8 && this.rankingNum <= 10) {
        return "1,000元现金大奖";
      } else if (this.rankingNum >= 11 && this.rankingNum <= 20) {
        return "500元现金大奖";
      }else{
        return `${this.getText("A001")}排行榜奖励`
      }
    }
  },
  methods: {
    getText(code) {
      if (this.questionnaireInfo.receivingInfo.rewardReceiveStatus[code]) {
        return !this.questionnaireInfo.receivingInfo.rewardReceiveStatus[code]
          .isFillin
          ? "领取"
          : "查看";
      } else {
        return "查看";
      }
    },
    async getQuestionnaireInfo(callback = () => {}) {
      this.$toast.loading({
        message: "",
        forbidClick: true,
        mask: true
      });
      await getExamInit({
        examId: this.examId
      }).then(res => {
        this.$toast.clear();
        if (res.code === 200) {
          this.questionnaireInfo = res.data;
          localStorage.setItem("questionnaireInfo", JSON.stringify(res.data));
          let rankingNum = res.data.receivingInfo.rankingNum;
          this.rankingNum = rankingNum;

          callback(rankingNum);
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
