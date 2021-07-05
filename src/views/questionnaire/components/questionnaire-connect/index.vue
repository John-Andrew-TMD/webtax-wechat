<template>
  <div class="app-bottom">
    <template
      v-if="
        questionnaireInfo.receivingInfo &&
          questionnaireInfo.receivingInfo.rewardReceiveStatus
      "
    >
      <connect-form
        v-if="
          !questionnaireInfo.receivingInfo.rewardReceiveStatus[queryInfo.code]
            .isFillin
        "
        :queryInfo="queryInfo"
        :questionnaireInfo="questionnaireInfo"
      ></connect-form>
      <connect-view
        v-else
        :queryInfo="queryInfo"
        :questionnaireInfo="questionnaireInfo"
      ></connect-view>
    </template>

    <comp-connect
      v-if="
        questionnaireInfo.receivingInfo &&
          questionnaireInfo.receivingInfo.rewardReceiveStatus &&
          questionnaireInfo.receivingInfo.rewardReceiveStatus[queryInfo.code]
            .isFillin
      "
      style="margin-top: 50px"
    ></comp-connect>
  </div>
</template>

<script>
import CompConnect from "compQuestionnaire/CompConnect";
import connectForm from "./components/connectForm";
import connectView from "./components/connectView";
import { mapGetters, mapMutations } from "vuex";
import priceMixin from "@/views/questionnaire/components/mixins/price";
export default {
  components: {
    CompConnect,
    connectForm,
    connectView
  },
  mixins: [priceMixin],
  data() {
    return {
      rule1: [
        {
          type: "text",
          title: "收 件 人：",
          field: "receivingName",
          placeholder: "请输入姓名",
          validate: this.formValidate({ required: true })
        },
        {
          type: "textarea",
          title: "收货地址：",
          field: "receivingAddress",
          placeholder: "请输入收货地址",
          validate: this.formValidate({ required: true })
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    dataList() {
      return [
        {
          headtext: `${this.getText("A001")}排行榜奖励`,
          title: `奖品为：${this.getprice}`,
          desc: "我们客服将会在7～15工作日内联系您<br/>请耐心等候～",
          img: require("assets/imgs/questionnaire/price1.png"),
          code: "A001",
          formRules: [
            {
              type: "text",
              title: "收 款 人：",
              field: "receivingName",
              placeholder: "请输入姓名",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "银行账户：",
              field: "receivingBankAccount",
              placeholder: "请输入银行账户",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "开 户 行：",
              field: "receivingBankOpeningAddress",
              placeholder: "请输入开户银行",
              validate: this.formValidate({ required: true })
            }
          ]
        },
        {
          headtext: `${this.getText("A002")}软件奖励`,
          title:
            "奖品为：<br/>政策通一年会员（企业政策匹配软件）<br/>财税通一年会员（金蝶财税软件）",
          desc: "根据您提交的报名号码开通会员账号<br/>开通成功后会通过邮件发送通知，请耐心等候～",
          code: "A002",
          img: require("assets/imgs/questionnaire/price2.png"),
          tip: " * 根据您提交的报名号码开通会员账号",
          formRules: [
            {
              type: "text",
              title: "姓      名：",
              field: "receivingName",
              placeholder: "请输入姓名",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "企业名称：",
              field: "receivingBusinessName",
              placeholder: "请输入企业名称",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "邮      箱：",
              field: "receivingEmail",
              placeholder: "请输入电子邮箱",
              validate: this.formValidate({ type: "email", required: true })
            }
          ]
        },
        {
          headtext: `${this.getText("A003")}继续教育学时`,
          title: "请选择需要领取的学时：<p class='mikasa'>（可多选）</p>",
          desc: "我们将会在7～30工作日内发放，请耐心等候～",
          code: "A003",
          img: require("assets/imgs/questionnaire/price3.png"),
          checkList: [
            {
              label: "深圳市注册会计师协会2021年度继续教育学时",
              value: "VR001"
            },
            {
              label: "深圳市注册税务师协会2021年度继续教育学时",
              value: "VR002"
            },
            {
              label: "特许公认会计师公会（ACCA）2021年度继续教育学时",
              value: "VR003"
            }
          ],
          formRules: [
            {
              type: "text",
              title: "姓      名：",
              field: "receivingName",
              placeholder: "请输入姓名",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "身份证号：",
              field: "receivingIdCard",
              placeholder: "请输入身份证号",
              validate: this.formValidate({ type: "idCard", required: true })
            },
            {
              type: "text",
              title: "ACCA账号：",
              field: "receivingAccaAccountNumber",
              placeholder: "请输入ACCA账号",
              validate: this.formValidate({ required: true })
            },
            {
              type: "text",
              title: "证书编号：",
              field: "receivingCertificateCode",
              placeholder: "会计师执业/非执业证书编号",
              validate: this.formValidate({ required: true })
            }
          ]
        }
      ];
    },
    queryInfo() {
      if (this.dataList.filter(el => el.code == this.$route.query.code).length) {
        return this.dataList.filter(el => el.code == this.$route.query.code)[0];
      } else {
        history.go(-1);
        return {};
      }
    }
  },
  mounted() {
    this.initUI();
  },
  destroyed() {},
  methods: {
    initUI() {
      this.getQuestionnaireInfo(rankingNum => {
        if (+rankingNum <= 4 && +rankingNum >= 2) {
          this.dataList[0] = {
            id: rankingNum + 2,
            code: "A001",
            headtext: `${this.getText("A001")}排行榜奖励`,
            title: `奖品为：${this.prices[rankingNum - 2]}`,
            desc: "我们客服将会在7～15工作日内联系您<br/>请耐心等候～",
            img: require(`assets/imgs/questionnaire/rank${rankingNum}.png`),
            tip: " * 根据您提交的报名号码默认为收件人手机号",
            formRules: this.rule1
          };
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-bottom {
  width: 92%;
  margin: 0 auto;
  margin-top: 45px;
  padding-bottom: 41px;
}
</style>
