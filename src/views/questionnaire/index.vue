<template>
  <div class="app-content" :style="{ paddingBottom: `${paddingHeight}px` }">
    <!-- <img class="poster" id="coopCachetImg" alt crossOrigin="anonymous" /> -->
    <template v-if="$route.name == 'mng'">
      <router-view :mpToken="mpToken" :routeParams="routeParams"></router-view>
    </template>
    <template v-else>
      <router-view :routeParams="routeParams"></router-view>
    </template>
    <!-- <div style = "width:100%;max-width:720px;height:30px;background:#fff"></div> -->
    <!-- <component :is="componentName" @handleRoutesClick="handleRoutesClick" /> -->
  </div>
</template>
<style lang="scss" scoped>
@import "./css/common.scss";
.app-content {
  /* position: absolute;
   top: 0;
  left: 0; */
  height: 100%;
  width: 100%;
  margin: 0 auto;
  max-width: 19.2rem;
  /* width: 320px; */
  overflow-y: auto;
  background-color: #031642; //背景色为白色
  .poster {
    display: none;
  }
  /deep/ .app-content-wrapper {
    padding-bottom: 1rem;
  }
  // background: url("./images/bg.png") no-repeat center center
}
</style>
<script>
import { authLogin } from "@/api/questionnaire/api-questionnaire";
import jsCookies from "js-cookie";
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
import { getUserInfo } from "@/api/user";
import { watcher } from "utils";
import { wxChatShare } from "@/utils/wechat";
import { mapGetters } from "vuex";
let getDataFlag = true;
export default {
  components: {},
  watch: {
    $route: {
      handler(val, oldval) {
        if (!jsCookies.get("token")) {
          this.$router.push({
            path: "/questionnaire/mng",
            query: this.$route.query
          });
        } else {
          this.mpToken = true;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["examId"]),
    questionnaireInfo() {
      let str = localStorage.getItem("questionnaireInfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    }
  },
  created() {
    watcher(this.$route.meta, "paddingHeight", this.callback);
  },
  mounted() {
    this.initUI();
  },
  data() {
    return {
      paddingHeight: 0,
      mpToken: false,
      restart: 0,
      routeParams: {},
      isUserRouter:["rank","result","reflect","connect"],
      isOtherRouter:["bank"]
    };
  },
  methods: {
    initUI() {
      if (
        +document
          .getElementsByTagName("html")[0]
          .style.fontSize.replace("px", "") >= 70.4
      ) {
        document.getElementsByTagName("html")[0].style.fontSize = "70.4px";
      }
      window.addEventListener(
        "resize",
        function() {
          if (
            +document
              .getElementsByTagName("html")[0]
              .style.fontSize.replace("px", "") >= 70.4
          ) {
            document.getElementsByTagName("html")[0].style.fontSize = "70.4px";
          }
        },
        false
      );
      document.getElementsByTagName("body")[0].style.maxWidth = "720px";
      document.getElementsByTagName("body")[0].style.background = "#031642";

      this.paddingHeight = this.$route.meta.paddingHeight;
      if (!+this.$route.meta.isLogin) {
        return;
      }
      let credentials = "";
      let query = this.$route.query;
      credentials = this.$route.query && this.$route.query.code;
      if (this.$route.query.code instanceof Array) {
        credentials = this.$route.query.code[this.$route.query.code.length - 1];
      }
      this.routeParams = {
        examId: this.examId || "1",
        inviteUserId: this.$route.query.inviteUserId || "",
        credentials: credentials
      };
      if (!jsCookies.get("token")) {
        // alert(JSON.stringify(this.$route.query))
        if (query && query.code) {
          this.getAuth(getEncrypted(query.code, wxConfig.appid));
        } else {
          // alert(JSON.stringify(location))
          
          window.location.href =
            "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
            wxConfig.appid +
            "&redirect_uri=" +
            encodeURIComponent(window.location.href) +
            "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
        }
      } else {
        this.mpToken = true;
        if(this.isUserRouter.includes(this.$route.name)){
          this.getUserInfoData();
        }
      }
      if (getDataFlag) {
        getDataFlag = false;
        this.setShare(getEncrypted(window.location.href, wxConfig.appid));
      }
    },
    callback(value) {
      this.paddingHeight = value;
    },
    setShare(mk) {
      wxChatShare({
        studentId: 1, // 个人项目而定
        activityId: 1, // 个人项目而定
        data: {
          url: window.location.href, // 当前页面url
          mk
        },
        title: "粤港澳大湾区财税知识竞赛", // 标题
        desc: "财税知识简单答，现金红包马上拿！~~~", // 描述
        link: `http://${window.location.host}/mp/questionnaire/mng`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/webtax/image/quiz.png", // 分享数据配置  －－ 全路径
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: " " // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    getUserInfoData() {
      getUserInfo({ outB64: false }).then(ret => {
        if (ret.code == 200) {
          localStorage.setItem("userinfo", JSON.stringify(ret.data));
          // localStorage.setItem("base64", ret.data.headimgBase64);
          this.getBase64Image(ret.data.headimgurl);
        } else {
          localStorage.removeItem("userinfo");
          jsCookies.remove("token");
        }
      });
    },
    urlToBase64(url) {
      return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = function() {
          let canvas = document.createElement("canvas");
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;
          // 将图片插入画布并开始绘制
          canvas.getContext("2d").drawImage(image, 0, 0);
          // result
          let result = canvas.toDataURL("image/png");
          resolve(result);
        };
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        image.setAttribute("crossOrigin", "Anonymous");
        image.src = url + "?v=" + Math.random();
        // 图片加载失败的错误处理
        image.onerror = () => {
          reject(new Error("图片流异常"));
        };
      });
    },
    async getBase64Image(imgSrc) {
      this.urlToBase64(imgSrc).then(base64 => {
        localStorage.setItem("base64", base64);
        var imgSrc = document.getElementById("coopCachetImg");
      });
    },
    async getAuth(mk) {
      await authLogin({
        inviteUserId: this.routeParams.inviteUserId,
        credentials: this.routeParams.credentials,
        mk: mk,
        inviteActivityCode: this.routeParams.inviteActivityCode
      }).then(res => {
        if (res.code === 200) {
          this.mpToken = true;
          jsCookies.set("token", res.data.token);
          this.getUserInfoData();
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>
