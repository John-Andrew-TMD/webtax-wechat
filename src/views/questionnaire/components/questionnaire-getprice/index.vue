<template>
  <div class="app-bottom">
    <div class="app-bottom-wrapper">
      <div class="app-content-title"></div>
      <h3 class="mt-5">本次大赛获得第{{ rankingNum }}名</h3>
      <p class="mt-5">恭喜您，将获得以下奖励（点击领取）：</p>
      <router-link
        :to="{
          path: item.link,
          query: {
            code: item.code
          }
        }"
        class="app-flex mt-15"
        v-for="(item, index) in newList"
        :key="index"
      >
        <van-image
          width="2.5rem"
          height="2.5rem"
          fit="contain"
          :src="item.img"
        />
        <div class="app-desc">
          <div>
            <h3>{{ item.title }}</h3>
            <p v-html="item.desc" class="mt-5"></p>
          </div>
        </div>
        <van-icon class="van-icon" name="arrow" color="#DFE1E7" size="22px" />
      </router-link>
      <p class="mt-20">兑换有效期：2020年2月11日24:00前</p>
    </div>
    <comp-connect class="mt-30"></comp-connect>
    <dialog-comp
      v-if="dialogStatus"
      :options="options"
      :dialog-status.sync="dialogStatus"
    ></dialog-comp>
  </div>
</template>

<script>
import CompConnect from "compQuestionnaire/CompConnect";
import { mapGetters, mapMutations } from "vuex";
import priceMixin from "@/views/questionnaire/components/mixins/price";
export default {
  components: {
    CompConnect
  },
  props: {},
  mixins: [priceMixin],
  data() {
    return {
      
      newList: []
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    linkList() {
      return [
        {
          code: "A001",
          title: `${this.getText("A001")}排行榜奖励`,
          desc: `恭喜您，将获得：<br/>${this.getprice}`,
          img: require("assets/imgs/questionnaire/price1.png"),
          link: "/questionnaire/connect"
        },
        {
          code: "A002",
          title: `${this.getText("A002")}软件奖励`,
          desc: "企业政策匹配软件-政策通<br/>金蝶财税软件-财税通",
          img: require("assets/imgs/questionnaire/price2.png"),
          link: "/questionnaire/connect"
        },
        {
           code: "A003",
          title: `${this.getText("A003")}继续教育学时`,
          desc: "深圳注协和深圳税协的继续教育32个学时（2021年度）",
          img: require("assets/imgs/questionnaire/price3.png"),
          link: "/questionnaire/connect"
        }
      ];
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
          this.linkList[0] = {
            code: "A001",
            title: `${this.getText("A001")}排行榜奖励`,
            desc: `恭喜您，将获得：<br/>${this.prices[rankingNum - 2]}`,
            img: require(`assets/imgs/questionnaire/rank${rankingNum}.png`),
            link: "/questionnaire/connect"
          };
        } else if(+rankingNum>20) {
          this.linkList.splice(0, 1);
        }
        this.newList = this.linkList;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-icon {
  display: flex;
  align-items: center;
}
.app-bottom {
  width: 92%;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 41px;
}
.app-bottom-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .app-content-title {
    width: 125px;
    height: 125px;
    background: url("~@/assets/imgs/questionnaire/contact-icon.png") no-repeat
      center center;
    background-size: contain;
    text-align: center;
  }
  .app-flex {
    width: 100%;
    background: #1a2b53;
    border-radius: 8px;
    border: 1px solid #233d7b;
    padding: 15px 20px;
    padding-right: 9px;
    display: flex;
    align-content: center;
    .van-icon {
      margin-left: auto;
    }
    .app-desc {
      flex: 1;
      padding-left: 15px;
      padding-right: 10px;
      display: flex;
      align-items: center;
    }
  }
}
h3 {
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffd07a;
  line-height: 28px;
}
p {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #818aa0;
  line-height: 17px;
}
</style>
