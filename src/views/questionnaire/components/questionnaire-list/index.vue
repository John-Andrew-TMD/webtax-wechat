<template>
  <div class="app-content-wrapper">
    <div class="app-qa-content" :style="{ minHeight: '230px' }">
      <dialog-result
        v-if="showDialog && !loading"
        :dialogKey="dialogKey"
        :dialog-confirm.sync="showDialog"
      ></dialog-result>
      <div
        class="dialog-content"
        v-if="(loading || nloading) && loadingTxt == '正在提交'"
      >
        <van-loading style="margin-top:40px" size="24px" vertical>{{
          loadingTxt
        }}</van-loading>
      </div>
      <div class="app-qa-tip">
        <div class="qa-btitle">
          正在闯关 {{ questionnaireInfoIndex + 1 }}/{{
            questionInfo.questionTotal || questionnaireInfoIndex + 1
          }}
        </div>
        <div class="qa-icon"></div>
      </div>
      <div class="app-qa-clock" v-if="!nloading">{{ startTime }}s</div>
      <van-skeleton title :row="4" :loading="loadingTxt == '' && nloading">
        <div class="qa-title-content" v-if="questionInfo.question">
          <span
            class="qa-title-type"
            :style="dictItem[questionInfo.questionType].style"
            >{{ dictItem[questionInfo.questionType].text }}</span
          >
          {{ questionInfo.question }}
        </div>
      </van-skeleton>
      <div class="qa-disable" v-if="isAnsdered"></div>

      <van-field
        name="checkboxGroup"
        class="list"
        v-if="!nloading || loadingTxt == '正在提交'"
      >
        <template #input>
          <van-checkbox-group
            v-if="+questionInfo.questionType == 1"
            icon-size="16px"
            v-model="result"
          >
            <van-checkbox
              shape="square"
              v-for="(item, index, key) in questionInfo.optionList"
              :key="key"
              :name="item.optionId"
              :checked-color="getAnsderTrue(item.isRight)"
              :disabled="isAnsdered"
            >
              <template
                v-if="getAnsderTrue() === '#FF5948' && !item.isRight"
                #icon="props"
              >
                <i
                  class="van-icon icon-close iconfont"
                  :style="{
                    borderColor: props.checked ? getAnsderTrue() : '#fff',
                    backgroundColor: props.checked
                      ? getAnsderTrue()
                      : 'transparent'
                  }"
                ></i>
              </template>
              <template v-else #icon="props">
                <i
                  class="van-icon van-icon-success"
                  :style="{
                    borderColor: props.checked
                      ? getAnsderTrue(item.isRight)
                      : '#fff',
                    backgroundColor: props.checked
                      ? getAnsderTrue(item.isRight)
                      : 'transparent'
                  }"
                ></i>
              </template>
              <template
                v-if="
                  questionInfo.optionIdList &&
                    questionInfo.optionIdList.indexOf(item.optionId) > -1
                "
              >
                <span
                  :style="{
                    color:
                      item.isRight == null
                        ? '#fff'
                        : getAnsderTrue(item.isRight)
                  }"
                  >{{ getCharCode(index) }}{{ item.optionContent }}</span
                >
              </template>
              <template v-else>
                <template v-if="+item.isRight">
                  <span
                    :style="{
                      color: getAnsderTrue(item.isRight)
                    }"
                    >{{ getCharCode(index) }}{{ item.optionContent }}</span
                  >
                  <!-- color: dialogKey ? getAnsderTrue(item.isRight) : '#fff' -->
                </template>
                <template v-else
                  >{{ getCharCode(index) }}{{ item.optionContent }}</template
                >
              </template>
            </van-checkbox>
          </van-checkbox-group>
          <van-radio-group v-else icon-size="16px" v-model="result">
            <van-radio
              v-for="(item, index, key) in questionInfo.optionList"
              :key="key"
              :name="item.optionId"
              :checked-color="getAnsderTrue(item.isRight)"
              :disabled="isAnsdered"
            >
              <template
                v-if="getAnsderTrue() === '#FF5948' && !item.isRight"
                #icon="props"
              >
                <i
                  class="van-icon icon-close iconfont"
                  :style="{
                    borderColor: props.checked ? getAnsderTrue() : '#fff',
                    backgroundColor: props.checked
                      ? getAnsderTrue()
                      : 'transparent'
                  }"
                ></i>
              </template>
              <template v-else #icon="props">
                <i
                  class="van-icon van-icon-success"
                  :style="{
                    borderColor: props.checked
                      ? getAnsderTrue(item.isRight)
                      : '#fff',
                    backgroundColor: props.checked
                      ? getAnsderTrue(item.isRight)
                      : 'transparent'
                  }"
                ></i>
              </template>
              <template
                v-if="
                  questionInfo.optionIdList &&
                    questionInfo.optionIdList.indexOf(item.optionId) > -1
                "
              >
                <span
                  :style="{
                    color: dialogKey
                      ? item.isRight == null
                        ? '#fff'
                        : getAnsderTrue(item.isRight)
                      : '#fff'
                  }"
                  >{{ getCharCode(index) }}{{ item.optionContent }}</span
                >
              </template>
              <template v-else>
                <template v-if="+item.isRight">
                  <span
                    :style="{
                      color: getAnsderTrue(item.isRight)
                    }"
                    >{{ getCharCode(index) }}{{ item.optionContent }}</span
                  >
                </template>
                <template v-else
                  >{{ getCharCode(index) }}{{ item.optionContent }}</template
                >
              </template>
            </van-radio>
          </van-radio-group>                                                                                                                                                                                                             
        </template>
      </van-field>
    </div>
    <div
      v-if="
        dialogKey == 'wrong' &&
          questionInfo.optionIdList.length &&
          +startTime != 0
      "
      class="app-qa-content mt-10"
    >
      <div class="qa-title-content">
        解析:{{ questionInfo.questionAnalyze }}
      </div>
    </div>
    <template v-if="isAnsdered">
      <template v-if="dialogKey == 'timeout' || dialogKey == 'wrong'">
        <template v-if="+questionnaireInfo.surplusNum > 1">
          <div class="app-qa-start mt-20">
            <div class="bg" @click="handleGetPriceClick">
              再次挑战
            </div>
          </div>
        </template>
        <template>
          <router-link
            :to="{
              path: '/questionnaire/mng',
              query: $route.query
            }"
            replace
            class="return-link"
            >返回首页</router-link
          >
        </template>
      </template>
      <template v-else>
        <div class="app-qa-start mt-20">
          <div class="bg" v-if="+isComleted" @click="handleGetPriceClick">
            查看奖励
          </div>
          <div v-else class="bg" @click="handleNextClick">
            下一题
          </div>
        </div>
        <template v-if="+isComleted">
          <a
            href="javascript:void(0)"
            v-if="+questionnaireInfo.surplusNum > 1"
            @click="handleClick"
            class="return-link"
          >
            再次挑战
          </a>
          <router-link
            v-else
            :to="{
              path: '/questionnaire/mng',
              query: $route.query
            }"
            replace
            class="return-link"
            >返回首页</router-link
          >
        </template>
      </template>
    </template>
    <div v-else class="app-qa-start mt-20">
      <div class="bg" @click="handleSubmitClick">
        {{ loadingTxt == "" ? "提 交" : loadingTxt }}
      </div>
    </div>
  </div>
</template>

<script>
import {
  getExamNextInfo,
  getExamSaveResult
} from "@/api/questionnaire/api-questionnaire";
import { deepAssign } from "utils";
import { mapGetters } from "vuex";
export default {
  components: {
    dialogResult: () => import("./dialog-result")
  },
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadingTxt: "",
      result: [],
      clearTimer: "",
      showDialog: false,
      dialogKey: "",
      nloading: false,
      loading: false,
      startTime: 60,
      questionInfo: {},
      questionnaireInfoIndex: 0,
      optionIdList: [],
      dictItem: [
        {
          text: "单选题",
          style: {
            background: "#F0B803",
            color: "#51451D"
          }
        },
        {
          text: "多选题",
          style: {
            background: "#FC5A43",
            color: "#fff"
          }
        },
        {
          text: "判断题",
          style: {
            background: "#4F60FF",
            color: "#fff"
          }
        }
      ],
      setResultArray: ["wrong", "other", "timeout", "success", "success"]
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    isComleted() {
      return (
        this.questionnaireInfoIndex + 1 >=
        (+this.questionInfo.questionTotal || 0)
      );
    },
    isAnsdered() {
      return !(this.dialogKey == "");
    },
    questionnaireInfo() {
      let str = localStorage.getItem("questionnaireInfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    }
  },
  watch: {
    $route: function(to, from) {
      if (from.name == "mng" && to.name == "list") {
        this.handleStartClick();
      }
    },
    questionInfo: function(newObj) {
      localStorage.setItem(
        "questionInfo",
        JSON.stringify((newObj && newObj.result && newObj.result.result) || {})
      );
    }
  },
  mounted() {
    this.handleStartClick();
  },
  destroyed() {
    this.resetData();
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "mng",
        query: this.routeParams,
        params: {
          restart: 1
        }
      });
    },
    async initUI(index, showOption) {
      if (this.nloading) {
        return;
      }
      this.nloading = true;
      const questionnaireInfo = JSON.parse(
        localStorage.getItem("questionnaireInfo")
      );
      this.questionnaireInfoIndex = questionnaireInfo.index;
      await getExamNextInfo({
        examId: this.examId || "1",
        inviteUserId: this.$route.query.inviteUserId || "",
        index: questionnaireInfo.index,
        showOption: showOption || false
      }).then(res => {
        this.nloading = false;
        if (res.code === 200) {
          this.questionInfo = res.data;
          this.startTime = this.questionInfo.doTime;
          this.setTimeStart();
          if (res.data.result) {
            this.setExamSaveResult(res);
          }
          // this.startTime = +this.questionInfo.doTime || 60;
        } else if (res.code === 2310) {
          this.handleGetPriceClick(res.code);
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    setTimeStart() {
      this.clearTimer = setInterval(() => {
        if (this.startTime <= 0) {
          if (this.questionInfo.result && this.questionInfo.result.resultStatus)
            return;
          this.handleSubmitClick(true);
          // this.setResult("timeout");
          clearInterval(this.clearTimer);
        } else {
          this.startTime--;
        }
      }, 1000);
    },
    getCharCode(index) {
      if (+this.questionInfo.questionType == 2) {
        return "";
      }
      return `${String.fromCharCode(0x41 + index)}.`;
    },
    getAnsderTrue(isRight) {
      let color = "#1989fa";
      if (
        this.dialogKey == "wrong" ||
        this.dialogKey == "success" ||
        this.dialogKey == "timeout"
      ) {
        color = isRight ? "#52C41A" : "#FF5948";
      }
      return color;
    },
    resetData() {
      this.dialogKey = "";
      clearInterval(this.clearTimer);
      this.showDialog = false;
      this.result = [];
      this.startTime = 60;
    },
    handleNextClick() {
      this.loadingTxt = "";
      this.resetData();
      this.initUI(true);
      // this.setTimeStart();
    },
    setResult(dialogKey) {
      this.showDialog = true;
      this.dialogKey = dialogKey;
    },
    async handleStartClick() {
      if (this.questionInfo.result) {
        return;
      }
      await this.initUI(undefined, true);
      // console.log("questionInfo",this.questionInfo)
      // this.setTimeStart();
    },
    handleGetPriceClick(code) {
      if (+this.isComleted && this.dialogKey == "success") {
        this.$router.replace({
          name: "result",
          query: this.routeParams
          // params: {
          //   result: this.questionInfo.result
          // }
        });
      } else {
        if (code == 2310) {
          this.$router.push({
            name: "mng",
            query: this.routeParams,
            params: {
              msg: "做答已结束"
            }
          });
        } else {
          this.$router.push({
            name: "mng",
            query: this.routeParams,
            params: {
              restart: 1
            }
          });
        }
      }
    },
    handleSubmitClick(timeout = false) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let optionIdList = Array.from({
        ...deepAssign(this.result),
        length: Object.keys(this.result).length
      });
      if (typeof timeout == "object") {
        timeout = false;
      }
      if (Array.isArray(this.result)) {
        if (!this.result.length && !timeout) {
          this.loading = false;
          return this.$toast("请选择答题选项");
        }
      } else {
        if (!this.result && !timeout) {
          this.loading = false;
          return this.$toast("请选择答题选项");
        } else {
          optionIdList = [this.result];
        }
      }
      optionIdList = timeout && optionIdList.length == 0 ? [] : optionIdList;
      const params = {
        examId: this.examId || "1",
        inviteUserId: this.routeParams.inviteUserId || "",
        index: this.questionnaireInfoIndex,
        optionIdList
      };
      this.loadingTxt = "正在提交";
      clearInterval(this.clearTimer);
      getExamSaveResult(params).then(res => {
        if (res.code === 200) {
          this.setExamSaveResult(res);
        } else {
          this.$toast.fail(res.message);
        }
        this.loading = false;
      });
    },
    setExamSaveResult(res) {
      this.setResult(
        this.setResultArray[+res.data.result.resultStatus] || "other"
      );
      delete res.data.questionIndex;
      this.questionInfo = { ...this.questionInfo, ...res.data };
      const questionnaireInfo = JSON.parse(
        localStorage.getItem("questionnaireInfo")
      );
      questionnaireInfo.index++;
      localStorage.setItem(
        "questionnaireInfo",
        JSON.stringify(questionnaireInfo)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.return-link {
  display: table;
  margin: 0 auto;
  font-size: 18px;
  color: #fff;
  margin-top: 10px;
}
/deep/ .van-radio,
/deep/ .van-checkbox,
/deep/ .van-cell {
  overflow: visible !important;
}
/deep/ .van-radio__icon .van-icon,
/deep/ .van-checkbox__icon .van-icon {
  width: 0.45rem !important;
  height: 0.45rem !important;
  font-size: 16px !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
/deep/ .van-field__body span {
  line-height: 1.5 !important;
  font-size: 16px !important;
}
.app-content-wrapper {
  padding: 14% 20px 0;
  position: relative;
  font-size: 16px;
  color: #fff;
  .app-qa-clock {
    width: 80px;
    height: 72px;
    position: absolute;
    right: 3%;
    top: 0;
    transform: translateY(-50%);
    background: url("~@/assets/imgs/questionnaire/clock.png") no-repeat center
      center;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 15px;
    color: #ff5948;
    z-index: 3;
  }
  .app-qa-content {
    width: 100%;
    background: #1a2b53;
    border-radius: 8px;
    border: 1px solid #233d7b;
    padding: 15% 5% 7%;
    position: relative;
    /deep/ .van-cell {
      padding: 0;
      background-color: transparent !important ;
    }
    .list {
      width: 100%;
      // min-height: 200px;
      border-top: 1px dashed #2e3f93;
      position: relative;
      /deep/ .van-radio__icon--disabled.van-radio__icon--checked .van-icon,
      /deep/
        .van-checkbox__icon--disabled.van-checkbox__icon--checked
        .van-icon {
        color: #fff !important;
      }
      /deep/ .van-checkbox__label,
      /deep/ .van-radio__label {
        color: #fff;
      }
      /deep/ .van-checkbox__icon,
      /deep/ .van-radio__icon {
        align-self: baseline;
        margin-top: 3px;
      }
      /deep/ .van-checkbox,
      /deep/ .van-radio {
        margin-top: 10px;
      }
    }
    .qa-title-content {
      & > .qa-title-type {
        border-radius: 2px;
        font-size: 12px;
        padding: 2px 8px;
      }
      line-height: 1.7;
      padding-bottom: 15px;
    }
    .app-qa-tip {
      position: absolute;
      left: 1%;
      top: 0;
      transform: translateY(-50%);
      width: 191px;
      height: 42px;
      background: #5062fb;
      border-radius: 8px;
      padding-left: 19%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      z-index: 3;
      .qa-icon {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateX(-16%) translateY(-50%);
        width: 56px;
        height: 56px;
        background: url("~@/assets/imgs/questionnaire/answer.png") no-repeat
          center center;
        background-size: contain;
      }
      .qa-stitle {
        font-size: 12px;
      }
    }
  }
}
</style>
