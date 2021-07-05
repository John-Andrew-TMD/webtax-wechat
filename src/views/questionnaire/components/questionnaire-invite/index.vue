<template>
  <div class="app-content">
    <div class="app-content-frame clearfix">
      <div class="app-content-detail">已获得 {{ tableData.length }} 次机会</div>
    </div>
    <div class="app-content-wrapper">
      <div class="app-qa-frame">
        <div class="app-qa-start">
          <div class="bg" @click="dialogStatus = true">立即邀请，拿奖励</div>
        </div>
      </div>
      <com-app-bottom
        ref="appBottom"
        title="邀请好友记录"
        v-if="tableData.length"
      >
        <div class="app-bottom-title">
          <div class="p1">邀请好友</div>
          <div class="p2">获得时间</div>
        </div>
        <comp-list :tableData="tableData"></comp-list>
      </com-app-bottom>
    </div>
    <comp-invite-card
      v-if="dialogStatus"
      :card-option="cardOption"
      :dialog-status.sync="dialogStatus"
      @dialog-confirm="handleDialogConfirm"
    ></comp-invite-card>
  </div>
</template>

<script>
import { getExamInviteRecord } from "@/api/questionnaire/api-questionnaire";
import jsCookies from "js-cookie";
import QRCode from "qrcode";
// import CompInviteCard from "views/questionnaire/components/components/CompInviteCard";
import CompList from "./components/CompList";
import { mapGetters } from "vuex";
export default {
  components: {
    CompList,
    ComAppBottom: () => import("compQuestionnaire/ComAppBottom"),
    CompInviteCard: () => import("compQuestionnaire/CompInviteCard")
  },
  props: {},
  data() {
    return {
      tableData: [],
      src: "",
      dialogStatus: false,
      count: 0
    };
  },
  computed: {
    ...mapGetters(["examId"]),
    userInfo() {
      return JSON.parse(localStorage.getItem("userinfo")) || null;
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
          // {
          //   img: require("assets/imgs/questionnaire/learn.png"),
          //   width: 375,
          //   height: 486.86,
          //   showTip:true,
          //   x: 0,
          //   y: 180.14
          // }
        ]
      };
    }
  },
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      // this.getInviteCount();
      this.getTableData();
    },
    getTableData() {
      getExamInviteRecord({
        examId: this.examId || "1"
      }).then(res => {
        if (res.code === 200) {
          // this.tableData = [
          //   {
          //     inviteMemberName: "四夕",
          //     inviteAvatar: "222",
          //     completeTime: "202-09-08 15:01:51"
          //   }
          // ];
          this.tableData = res.data;
        } else {
          this.$toast.fail(res.message);
        }
      });
    },
    handleDialogConfirm(dialogStatus) {
      this.dialogStatus = dialogStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-content {
  width: 100%;
  position: relative;
  /deep/ .app-bottom-wrapper {
    margin-top: 35px;
  }
  .app-qa-frame {
    padding-bottom: 25px;
    border-bottom: 1px dashed #233d7b;
  }
  .app-bottom-title {
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    border-bottom: 1px dashed #233d7b;
    margin-bottom: 20px;
    .p2 {
      margin-left: auto;
    }
  }
  .app-content-wrapper {
    width: 100%;
    padding: 0 25px;
    margin-top: 20px;
    padding-bottom: 1rem;
  }
  .app-content-frame {
    width: 100%;
    padding-top: 62.67%;
    background: url("~@/assets/imgs/questionnaire/invite-bg.png") no-repeat
      center center;
    background-size: cover;
    position: relative;
    .app-content-detail {
      position: absolute;
      background-color: #5062fb;
      z-index: 1;
      font-size: 14px;
      color: #fff;
      display: flex;
      justify-self: center;
      align-items: center;
      padding: 5px 10px;
      border-radius: 4px;
      left: 22px;
      top: 30px;
    }
    .app-content-detail::after {
      content: "";
      width: 0;
      height: 0;
      border: 10px solid transparent;
      border-top: 10px solid #5062fb;
      position: absolute;
      left: 10px;
      bottom: -15px;
    }
  }
  .app-content-list {
    margin-top: 60px;
  }
}
</style>
