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
        <h3
          class="mt-10"
          v-html="
            queryInfo.code == 'A003'
              ? `奖品为：<br/>${getCheckValue()}`
              : queryInfo.title
          "
        ></h3>
        <p class="mt-5" v-html = "queryInfo.desc ">
        </p>
        <div class="app-form mt-10">
          <div class="app-flex  mt-10 mb-10">
            <label for="">报名号码：</label>
            <div>
              {{
                questionnaireInfo.receivingInfo.rewardReceiveStatus[
                  queryInfo.code
                ].applyPhone
              }}
            </div>
          </div>
          <template v-for="(item, index) in queryInfo.formRules">
            <div
              class="app-flex mb-10"
              :key="index"
              v-if="
                questionnaireInfo.receivingInfo.rewardReceiveStatus[
                  queryInfo.code
                ][item.field]
              "
            >
              <label for="">{{ item.title }}</label>
              <div>
                {{
                  questionnaireInfo.receivingInfo.rewardReceiveStatus[
                    queryInfo.code
                  ][item.field]
                }}
              </div>
            </div>
            <template v-else>
              <div
                class="app-flex mb-10"
                :key="index"
                v-if="item.field == 'receivingAddress'"
              >
                <label for="">{{ item.title }}</label>
                <div>
                  未填写
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </com-app-bottom>
  </div>
</template>

<script>
import ComAppBottom from "compQuestionnaire/ComAppBottom";

export default {
  components: {
    ComAppBottom
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
    return {};
  },
  mounted() {
    console.log(this.queryInfo, this.questionnaireInfo, "query");
  },
  computed: {},
  methods: {
    getCheckValue() {
      let str = "";
      if (
        this.questionnaireInfo.receivingInfo.rewardReceiveStatus["A003"]
          .virtualRewardCode
      ) {
        this.questionnaireInfo.receivingInfo &&
          this.questionnaireInfo.receivingInfo.rewardReceiveStatus &&
          this.questionnaireInfo.receivingInfo.rewardReceiveStatus[
            "A003"
          ].virtualRewardCode.map(item => {
            str +=
              this.queryInfo.checkList.filter(el => el.value == item)[0].label +
              "<br/>";
          });
      }
      return str;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-form {
  width: 100%;
  border-top: 1px dashed #233d7b;
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
.user-bind-wrapper {
  & > * {
    display: table;
    margin: 0 auto;
  }
}
.app-flex {
  width: 100%;
  display: flex !important;
  align-items: flex-start;
  padding-left: 11px;
  padding-right: 10px;
  label {
    width: 90px;
    flex-basis: 90px;
    align-self: flex-start;
  }
  div {
    flex: 1;
    text-align: right;
  }
}
</style>
