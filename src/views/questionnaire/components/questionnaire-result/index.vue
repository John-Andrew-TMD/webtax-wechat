<template>
  <div class="app-content-wrapper" style="padding-bottom:0;">
    <div class="redbag-frame mt-10" v-if="!tiyan">
      <div class="redbag-content">
        <div class="redbag-grade">
          恭喜您，通过了第{{ questionInfo.gradeName }}关
        </div>
        <div class="redbag-title ">
          恭喜获得<span
            >¥{{ questionInfo.redpack | filterMoneyValue(2, 2, 0) }}</span
          >元现金奖励
        </div>
        <router-link
          :to="{
            path: '/questionnaire/reflect',
            query: this.$route.query
          }"
          class="link-tixian"
          >点击提现 ＞</router-link
        >
        <div class="app-bottom-end">
          <div class="app-bottom-detail">
            贴心小提示：<a
              href="http://h5.webtax.com.cn/app/article/share/43647"
              >查看相关法规</a
            ><br />
            红包属于个人偶然所得，需按20%税率缴纳个人所得税哟~
          </div>
          <div class="app-start-frame">
            <div class="app-qa-start ">
              <div class="bg" @click="handleDialogClick">分享成就</div>
            </div>
          </div>
          <div
            v-if="!+questionnaireInfo.surplusNum"
            @click="handleInviteClick"
            class="link-dati"
          >
            回到首页 ＞
          </div>
          <div v-else @click="handleSubmitClick" class="link-dati">
            {{ +questionnaireInfo.surplusNum >= 1 ? "再次挑战" : "回到首页" }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class=" tiyan mt-10 app-content-wrapper app-padding padding20">
      <com-app-bottom class="redbag-content ">
        <div class="redbag-grade">
          恭喜您，通过了第<span>{{ questionInfo.gradeName }}</span
          >关
        </div>
        <div class="app-qa-start " style="margin-top:28px">
          <div class="bg" @click="handleSubmitClick">
            {{ +questionnaireInfo.surplusNum >= 1 ? "再次挑战" : "回到首页" }}
          </div>
        </div>
      </com-app-bottom>
    </div>
    <div class="app-padding mt-20">
      <comp-connect></comp-connect>
      <div class="app-bottom" v-if="tableData">
        <com-app-bottom ref="appBottom" title="累计排行榜">
          <comp-list
            :limit="10"
            :options="{
              requestParams: {
                url: '/rank/page',
                data: {
                  searchCount: true,
                  pageNo: 1,
                  pageSize: 11,
                  condition: {
                    examId: examId || ''
                  }
                }
              },
              showFixed: false,
              showPagination: false,
              showNodata: '排行榜暂无记录'
            }"
            :headData="headData"
            ref="compList"
          ></comp-list>
        </com-app-bottom>
      </div>
      <!-- <a
        class="return-link"
        :href="
          `http://${host}/mp/questionnaire/mng?examId=${localStorage.getItem("examId")}&inviteUserId=${this.$route.query.inviteUserId}`
        "
        >返回首页</a
      > -->
      <router-link
        :to="{
          path: '/questionnaire/mng',
          query: this.$route.query
        }"
        replace                                                                                                                                                                            
        class="return-link"
        >返回首页</router-link
      >
    </div>
    <a href="https://www.wjx.cn/m/101514313.aspx" class="app-fixed"></a>
    <comp-invite-card                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
      v-if="dialogStatus"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      :dialog-status.sync="dialogStatus"
      :card-option="cardOption"
      @dialog-confirm="handleDialogConfirm"
    ></comp-invite-card>
    <van-overlay :show="showDialog">
      <div class="overlay-content" @click.self="showDialog = false">
        <div class="overlay-frame">
          <comp-get-time
            v-if="questionnaireInfo.taskList"
            :taskList="questionnaireInfo.taskList"
          ></comp-get-time>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getExamInit } from "@/api/questionnaire/api-questionnaire";
import ComAppBottom from "compQuestionnaire/ComAppBottom";
import { store } from "observable/store.js";
import CompList from "compQuestionnaire/CompList";
import { getRankPage } from "@/api/questionnaire/api-questionnaire";
import CompInviteCard from "compQuestionnaire/CompInviteCard";
import { mapGetters } from "vuex";
import CompConnect from "compQuestionnaire/CompConnect";
export default {
  provide() {
    return {
      getIsPassInvite: () => this.isPassInvite
    };
  },
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tiyan: false,
      listOptions: {
        showFixed: true
      },
      isPassInvite: false,
      dialogStatus: false,
      showDialog: false,
      tableData: {},
      headData: [
        {
          span: "3",
          name: "排行",
          prop: "rankingNum",
          filter: res => {
            if (+res.rankingNum <= 3) {
              return `<div  class="member-ser">
                <img
                  class="member-index-img"
                  src="${require(`assets/imgs/questionnaire/${res.rankingNum}@2x.png`)}"
                  alt=""
                  srcset=""
                />
              </div>`;
            } else {
              return `<div v-else class="member-ser" style = "font-size:18px">${res.rankingNum}</div>`;
            }
          }
        },
        {
          span: "9",
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
          span: "4",
          name: "普通关",
          prop: "generalNum",
          filter: res => {
            return res.generalNum + "关";
          }
        },
        {
          span: "4",
          name: "困难关",
          prop: "difficultNum",
          filter: res => {
            return res.difficultNum + "关";
          }
        },
        {
          span: "4",
          name: "总闯关",
          prop: "totalNum",
          filter: res => {
            return `<span style='font-size:18px'>${res.difficultNum +
              res.generalNum}</span>关`;
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    host() {
      return window.location.host;
    },
    questionInfo() {
      let str = localStorage.getItem("questionInfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    },
    questionnaireInfo() {
      let str = localStorage.getItem("questionnaireInfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    },
    userAvatar() {
      return localStorage.getItem("base64") || this.userInfo.headimgurl;
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
          y: 470
        },
        rectImg: [
          {
            img: require("assets/imgs/questionnaire/invite-bg2.png"),
            width: 375,
            height: 667,
            x: 0,
            y: 0
          }
          // {
          //   img: require("assets/imgs/questionnaire/learn.png"),
          //   width: 375,
          //   height: 486.86,
          //   showTip:true,
          //   x: 0,
          //   y: 180.14
          // }
        ],
        circleImg: [
          {
            img: this.userAvatar,
            width: 66,
            height: 66,
            x: 155,
            y: 48
          }
        ],
        text: [
          {
            content: `通过了第${this.questionInfo.gradeName}关`,
            x: 185,
            y: 313,
            fontSize: 18,
            color: "#B32212"
          }
        ]
      };
    }
  },
  components: {
    CompConnect,
    ComAppBottom,
    CompList,
    CompInviteCard,
    CompGetTime: () => import("compQuestionnaire/CompGetTime")
  },
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      this.$nextTick(() => {
        if (!this.questionInfo.gradeName) {
          this.$toast.fail("答题还未答完");
        }
        this.getTableData();
      });
    },
    getTableData() {
      getRankPage({
        searchCount: true,
        pageNo: 1,
        pageSize: 10,
        sort: [],
        orderField: [],
        condition: {
          examId: this.examId || ""
        }
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data;
          // if (!+this.tableData.overallRanking) {
          //   this.$route.meta.paddingHeight = 0;
          // }
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    handleDialogClick() {
      this.dialogStatus = true;
      this.isPassInvite = true;
    },
    handleInviteClick() {
      // await this.getQuestionnaireInfo();
      this.showDialog = true;
    },
    handleDialogConfirm(dialogStatus) {
      this.isPassInvite = false;
      this.dialogStatus = dialogStatus;
    },
    handleSubmitClick() {
      this.$router.push({
        name: "mng",
        query: this.routeParams,
        params: {
          restart: 1
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./css/index.scss";
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
.tiyan {
  width: 100%;
  position: relative;
  .redbag-content {
    min-height: 100%;
    width: 100%;
    border-radius: 8px;
    a {
      display: inline-block;
    }
    .redbag-grade {
      width: 83%;
      height: 40px;
      margin: 0 auto;
      color: #fff;
      border-radius: 8px;
      background: #334266;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 15px;
      font-size: 16px;
      span {
        color: #ff5948;
        font-size: 18px;
      }
      &::before {
        content: "";
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
    }
    .redbag-title {
      color: #666666;
      font-size: 16px;
      width: 100%;
      text-align: center;
      margin-top: 13%;
      span {
        color: #fd2c38;
        font-size: 34px;
      }
    }
    .link-tixian {
      color: #fd2c38;
      font-size: 14px;
      width: 100%;
      text-align: center;
    }
    .link-dati {
      font-size: 18px;
      color: #fff;
      margin-top: 10px;
    }
    .app-bottom-end {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 10%;
    }
  }
}

.return-link {
  display: table;
  margin: 0 auto;
  font-size: 14px;
  color: #fff;
  margin-top: 10px;
}
</style>
