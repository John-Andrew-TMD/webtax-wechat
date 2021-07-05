<template>
  <div>
    <com-app-bottom :title="queryInfo.headtext">
      <div class="user-bind-wrapper">
        <van-image
          width="2.5rem"
          height="2.5rem"
          fit="contain"
          :src="queryInfo.img"
        />
        <h2
          v-if="queryInfo.code == 'A003'"
          class="mt-10"
          v-html="queryInfo.title"
        ></h2>
        <h3 v-else class="mt-10" v-html="queryInfo.title"></h3>
        <van-field
          v-if="queryInfo.code == 'A003'"
          name="checkboxGroup"
          style="background: transparent; padding-bottom: 0"
          class="list"
        >
          <template #input>
            <van-checkbox-group v-model="form.virtualRewardCode">
              <van-checkbox
                shape="square"
                v-for="item in queryInfo.checkList"
                :key="item.value"
                :name="item.value"
                :value="item.value"
                checked-color="#5062FB"
                class="mb-10"
              >
                <span style="color: #fff">{{ item.label }} </span>
              </van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <template v-if="formRules.length">
          <p class="mt-5">完善您的个人信息，方便客服联系您（保密）</p>
          <div class="app-form mt-10">
            <div
              class="input-style-box"
              v-for="(item, index) in formRules"
              :key="index"
            >
              <van-field
                :label="item.title"
                v-model="form[item.field]"
                class="input-style__inp"
                clearable
                :placeholder="item.placeholder"
                :type="item.type"
                :name="item.field"
                :rules="item.validate"
              />
            </div>
            <p
              class="form-tip "
              v-if="
                formRules.filter(
                  el => el.field == 'receivingBankOpeningAddress'
                ).length
              "
            >
              * 需精确到开户支行名称，推荐使用招商银行卡。
            </p>
          </div>
          <div class="app-flex">
            <label for="">报名号码：</label>
            <div>
              {{
                questionnaireInfo.receivingInfo.rewardReceiveStatus[
                  queryInfo.code
                ].applyPhone
              }}
            </div>
          </div>
          <div class="input-style-box">
            <van-field
              label="短信验证："
              v-model="form.credentials"
              placeholder="请输入验证码"
              pattern="\d*"
              type="number"
              maxlength="6"
              class="input-style__inp"
              style="padding-right: 5px"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
                :disabled="sendCodeText != '｜ 获取验证码'"
                @click="handleSendCode"
                >{{ sendCodeText }}</van-button
              ></van-field
            >
          </div>
        </template>
      </div>
      <p style="text-align: left" v-if="queryInfo.tip">{{ queryInfo.tip }}</p>
    </com-app-bottom>
    <van-button
      class="bind-btn"
      type="default"
      :class="{ 'bind-btn-disable': isBind }"
      :disabled="isBind"
      @click="handleBind"
      >确定提交</van-button
    >
    <dialog-comp
      v-if="dialogStatus"
      :options="options"
      :dialog-status.sync="dialogStatus"
    ></dialog-comp>
  </div>
</template>

<script>
import * as commonApi from "@/api/common";
import DialogComp from "compQuestionnaire/DialogComp.vue";
import ComAppBottom from "compQuestionnaire/ComAppBottom";
import { getRedpackReward } from "@/api/questionnaire/api-questionnaire";
import { checkMobilePhone } from "@/utils/util";
import { Dialog } from "vant";
import { getIspass } from "utils";
export default {
  components: {
    ComAppBottom,
    DialogComp
  },
  props: {
    queryInfo: {
      type: Object,
      default: () => {}
    },
    questionnaireInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        credentials: "",
        virtualRewardCode: []
      },
      newrule: [],
      getDataFlag: true,
      dialogStatus: false,
      sendCodeText: "｜ 获取验证码"
    };
  },
  computed: {
    isBind() {
      if (!this.formRules.length) {
        return true;
      }
      if (
        getIspass(false, this.formRules, this.form) &&
        (this.form.credentials !== "" && this.form.credentials.trim() !== "")
      ) {
        return false;
      } else {
        return true;
      }
    },
    formRules() {
      let formRules = this.queryInfo.formRules;
      if (this.queryInfo.code == "A003") {
        if (this.form.virtualRewardCode.length) {
          let newrule = this.newrule;
          if (this.form.virtualRewardCode.includes("VR003")) {
            newrule.push2(formRules[2]);
          } else if (!this.form.virtualRewardCode.includes("VR003")) {
            newrule = newrule.filter(
              el => el.field !== "receivingAccaAccountNumber"
            );
          }
          if (this.form.virtualRewardCode.includes("VR001")) {
            newrule.push2(formRules[3]);
          } else if (!this.form.virtualRewardCode.includes("VR001")) {
            newrule = newrule.filter(
              el => el.field !== "receivingCertificateCode"
            );
          }
          return newrule;
        } else {
          return [];
        }
      } else {
        return this.queryInfo.formRules;
      }
    }
  },
  mounted() {
    this.newrule = this.queryInfo.formRules.slice(0, 2);
  },
  methods: {
    handleSendCode() {
      if (this.sendCodeText != "｜ 获取验证码") {
        return false;
      }
      this.$toast.loading({
        message: "",
        forbidClick: true,
        mask: true
      });
      commonApi
        .sendCodeApi({
          type: 25,
          phoneNationCode: "86"
        })
        .then(res => {
          this.$toast.clear();
          if (res.code == 200) {
            let second = 60;
            this.sendCodeText = second + "秒后重试";
            if (this.getDataFlag) {
              this.getDataFlag = false;
              this.timer = setInterval(() => {
                second--;
                if (second) {
                  this.sendCodeText = second + "秒后重试";
                } else {
                  this.getDataFlag = true;
                  clearInterval(this.timer);
                  this.sendCodeText = "｜ 获取验证码";
                }
              }, 1000);
            }
          } else {
            clearInterval(this.timer);
            this.getDataFlag = true;
            this.sendCodeText = "｜ 获取验证码";
            this.$toast.fail(res.message);
          }
        });
    },
    handleBind() {
      if (!getIspass(true, this.formRules, this.form)) {
        return false;
      }
      Dialog.confirm({
        title: "确定提交",
        message: "确认提交后信息不可更改如有疑问可与联系客服"
      })
        .then(() => {
          this.$toast.loading({
            message: "",
            forbidClick: true,
            mask: true
          });
          getRedpackReward({
            examId: this.examId || "1",
            ...this.form,
            receivingRewardCode: this.queryInfo.code
          }).then(res => {
            this.$toast.clear();
            if (res.code == 200) {
              this.options = {
                img: require("@/assets/imgs/questionnaire/tick.png"),
                title: "联系方式已提交",
                content: "我们客服将会在72小时内联系您请耐心等候～",
                style: {
                  textAlign: "center"
                },
                callback: () => {
                  this.$router.push({
                    path: "/questionnaire/getprice"
                  });
                }
              };
              this.dialogStatus = true;
            } else {
              this.$toast.fail(res.message);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-tip {
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffd07a;
  line-height: 17px;
  margin-bottom: 15px;
}
/deep/ .mikasa {
  display: inline;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #818aa0;
  line-height: 17px;
}
/deep/ .van-field__button {
  display: flex;
  padding-left: 0px;
}
/deep/ .van-button--primary {
  height: auto !important;
  background-color: transparent;
  border: none;
  color: #ffd07a;
}
/deep/ .app-box {
  padding-bottom: 20px !important;
}
h2 {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffd07a;
  line-height: 28px;
  text-align: center;
}
h3 {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  text-align: center;
}
p {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #818aa0;
  line-height: 17px;
  text-align: center;
}

.app-bottom {
  width: 92%;
  margin: 0 auto;
  margin-top: 45px;
  padding-bottom: 41px;
}
.label-style {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  display: flex;
  margin-bottom: 15px;
  padding: 0 13%;
  label {
    width: 90px;
  }
}
.app-flex {
  width: 100%;
  display: flex !important;
  align-items: center;
  height: 50px;
  padding-left: 11px;
  padding-right: 10px;
  label {
    width: 90px;
  }
  div {
    flex: 1;
    text-align: right;
  }
}
.user-bind-wrapper {
  & > * {
    display: table;
    margin: 0 auto;
  }
  .app-form {
    width: 100%;
    padding-top: 14px;
    border-top: 1px dashed #233d7b;
    border-bottom: 1px dashed #233d7b;
  }
  .input-style-box {
    background: #031642;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 15px;
    width: 100%;
  }
  /deep/ .van-field__label {
    width: 90px;
  }
  /deep/ .van-field__label span,
  /deep/ .van-field__control {
    color: #eee;
    font-size: 14px;
  }
  .input-style__inp {
    font-size: 14px;
    font-family: PingFangSC;
    background: #031642;
    font-weight: 400;
    color: #333333;
    padding-left: 15px;
    position: relative;
    user-select: text;
    -webkit-user-select: text;
    position: relative;
  }
  /deep/ input::-webkit-input-placeholder {
    color: #666666;
  }
  /deep/ textarea::-webkit-input-placeholder {
    color: #666666;
  }

  .input-style {
    background: #031642;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #333333;
    padding-left: 15px;
    position: relative;
    user-select: text;
    -webkit-user-select: text;
  }
  .code-btn {
    color: #ff5948;
  }
  /deep/ .van-button--default {
    border: none;
  }
  /deep/ .van-cell::after {
    border-bottom: none;
  }

  .disbtn {
    color: #999999;
  }
}
.bind-btn {
  width: 295px;
  height: 44px;
  line-height: 44px;
  margin: 0 auto;
  display: block;
  background: url("~@/assets/imgs/questionnaire/contact-submit.png") no-repeat
    center center;
  background-size: contain;
  border-radius: 22px;
  font-size: 16px;
  font-family: PingFangSC;
  font-weight: 400;
  color: #000;
  line-height: 22px;
  margin-top: 30px;
  border: none !important;
}
.bind-btn-disable {
  background: url("~@/assets/imgs/questionnaire/contact-submit-disabled.png")
    no-repeat center center !important;
  background-size: contain !important;
}
</style>
