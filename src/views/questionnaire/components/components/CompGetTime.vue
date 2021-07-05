<template>
  <div class="app-content-wrapper">
    <ul class="app-box" style = "padding-top:0px">
      <div class="app-content-title">
      <span>做任务增加答题机会</span>
    </div>
      <li :class="taskList[0].taskCode">
        <div class="app-box-wrapper">
          <div class="app-left">
            <div class="list-title">
              邀请好友
            </div>
            <div class="list-content">
              每日限领{{ taskList[0].taskTarget }}次，已邀{{
                taskList[0].taskNum
              }}次
            </div>
          </div>
          <div class="app-right">
            <div class="right-btn " @click="handleInviteClick">
              <div class="done">
                邀 请
              </div>
            </div>
          </div>
        </div>
      </li>
      <li :class="taskList[1].taskCode">
        <div class="app-box-wrapper">
          <div class="app-left">
            <div class="list-title">授权绑定手机号</div>
            <div class="list-content">限领{{ taskList[1].taskTarget }}次</div>
          </div>
          <div class="app-right">
            <template v-if="taskList[1].taskTarget == taskList[1].taskNum">
              <div
                class="right-btn "
                @click="handleGetClick(taskList[1].taskCode)"
                v-if="taskList[1].taskNum > taskList[1].claimNum"
              >
                <div class="complete">
                  领 取
                </div>
              </div>
              <div class="right-btn " v-else>
                <div class="completed">
                  已完成
                </div>
              </div>
            </template>
            <div class="right-btn " @click="handleBindClick" v-else>
              <div class="done">绑 定</div>
            </div>
          </div>
        </div>
      </li>
      <li :class="taskList[2].taskCode">
        <div class="app-box-wrapper">
          <div class="app-left">
            <div class="list-title">登录答税APP</div>
            <div class="list-content">
              限领{{ taskList[2].taskTarget }}次，已领{{
                taskList[2].taskNum
              }}次
            </div>
          </div>
          <div class="app-right">
            <template v-if="taskList[2].taskTarget == taskList[2].taskNum">
              <div
                class="right-btn "
                @click="handleGetClick(taskList[2].taskCode)"
                v-if="taskList[2].taskNum > taskList[2].claimNum"
              >
                <div class="complete">
                  领 取
                </div>
              </div>
              <div class="right-btn " v-else>
                <div class="completed">
                  已完成
                </div>
              </div>
            </template>
            <div class="right-btn " v-else>
              <div class="done" @click="download">登 录</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <component
      :is="componentName"
      v-if="dialogStatus"
      :showTip = "true"
      :card-option="cardOption"
      :dialog-status.sync="dialogStatus"
      @initUI="initUI"
    />
      <!-- @dialog-confirm="handleDialogConfirm" -->
  </div>
</template>

<script>
import { getAppUrl } from "@/api/common";
import DialogBind from "./DialogBind.vue";
import CompInviteCard from "./CompInviteCard";
import { getTaskReward } from "@/api/questionnaire/api-questionnaire";
import mapGetters from 'vuex';
export default {
  props: {
    taskList: {
      type: Array,
      default() {
        return [
          { taskCode: "", taskTarget: "", taskNum: "", claimNum: "" },
          { taskCode: "", taskTarget: "", taskNum: "", claimNum: "" },
          { taskCode: "", taskTarget: "", taskNum: "", claimNum: "" }
        ];
      }
    }
  },
  computed: {
     ...mapGetters(['examId']),
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
          //  {
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
  components: {
    DialogBind,
    CompInviteCard
  },
  data() {
    return {
      componentName: "",
      dialogStatus: false
    };
  },
  mounted() {},
  methods: {
    initUI() {
      this.$emit("initUI");
    },
    download() {
      let _this = this;
      getAppUrl()
        .then(res => {
          if (res.code === 200) {
            this.showPage = true;
            let appurl = res.data;
            // 微信浏览器并且是IOS
            if (this.$utils.isTxBrowser() && this.$utils.isIos) {
              appurl = "https://a.app.qq.com/o/simple.jsp?pkgname=cn.com.webtax";
            }
            // 尝试启动App
            this.openApp(appurl);
          } else {
            this.$toast.fail(res.message);
          }
        })
        .catch(error => {
          this.$router.push("/download");
        });
    },
    openApp(appurl) {
      const option = {
        // 用来配置 URL Scheme 所必须的那些v字段。
        scheme: {
          protocol: "webtax" // APP 协议，URL Scheme 的 scheme 字段，就是你要打开的 APP 的标识
        },
        intent: {
          package: "cn.com.webtax",
          scheme: "webtax"
        },
        appstore: appurl, //APP 的 App Store 地址
        yingyongbao: appurl, //APP 的应用宝地址
        fallback: "http://h5.webtax.com.cn/mp/download", // 唤端失败后跳转的地址。
        timeout: 4000 // 等待唤端的时间（单位: ms），超时则判断为唤端失败。
      };
      const callApp = new CallApp(option);
      // 需要打开的页面对应的值，URL Scheme 中的 path 部分,只想要直接打开 app ，不需要打开特定页面，path 传空字符串 '' 就可以。
      let ret = callApp.open({
        path: "/"
      });
    },
    // handleDialogConfirm(dialogStatus) {
    //   this.dialogStatus = dialogStatus;
    // },
    handleInviteClick() {
      this.componentName = "CompInviteCard";
      this.dialogStatus = true;
    },
    handleBindClick() {
      this.componentName = "DialogBind";
      this.dialogStatus = true;
    },
    handleGetClick(taskCode) {
      getTaskReward({
        examId: this.examId || "1",
        taskCode
      }).then(res => {
        if (res.code == 200) {
          this.$toast.success("领取成功");
          this.$emit("initUI");
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/comp-get-time.scss";
</style>
