<template>
  <div class="app-content">
    <img id="image" alt="" style="" v-show="false" />
    <van-overlay :show="dialogVisible" style="z-index:999">
      <div class="overlay-content" @click.self="handleDialogClosed">
        <div
          id="overlay-frame"
          class="overlay-frame"
          @click.self="handleDialogClosed"
        >
          <div id="qrcode"></div>
          <img
            class="poster-avatar"
            id="avatar"
            :src="cardOption.circleImg && circleImg[0].img"
            crossOrigin="anonymous"
            alt
          />
          <!-- <img
            class="poster bg"
            :src="cardOption.rectImg && rectImg[0].img"
            alt
          /> -->
          <canvas id="myCanvas" class="poster"></canvas>
          <img :src="src" alt class="poster poster1" crossOrigin="anonymous" />
          <!-- <div class="tips">长按上方图片 发送给朋友</div> -->
          <div class="overlay-bottom" v-if="loadImg && showDialog">
            <div class="overlay-bgImg">
              <div class="overlay-bottom-btn" @click="handleDialogClick">
                我知道了
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getExamInviteRecord } from "@/api/questionnaire/api-questionnaire";
import jsCookies from "js-cookie";
import QRCode from "qrcode";
import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    cardOption: {
      options: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  },
  data() {
    return {
      loadImg: false,
      src: "",
      showCanvas: false,
      dialogVisible: false,
      showDialog: true
    };
  },
  computed: {
    ...mapGetters(['examId']),
    userInfo() {
      let str = localStorage.getItem("userinfo");
      return typeof str == "string" ? JSON.parse(str) : {};
    },
    rectImg() {
      return this.cardOption.rectImg || [];
    },
    showTip() {
      return this.rectImg.some(function(item) {
        return item.showTip == true;
      });
    },
    canvasText() {
      return this.cardOption.text || [];
    },
    circleImg() {
      return this.cardOption.circleImg || [];
    }
  },
  created() {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.rectImg.map(item => {
          document.getElementById("overlay-frame").insertAdjacentHTML(
            "beforeend",
            ` <img
              style = "display:none"
              class="poster canvasebgImg"
              src="${item.img}"
              alt
            />`
          );
        });
        this.creatQRcode();
      });
      // this.getInviteCount();
    },
    handleDialogClosed() {
      this.dialogVisible = false;
      this.$emit("update:dialogStatus", false);
    },
    creatQRcode() {
      this.$toast.loading({
        message: "生成中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
      let url = `http://${window.location.host}/mp/questionnaire/mng?examId=${this.examId}&inviteUserId=${this.userInfo.mpUserId}`;
      let opts = {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        quality: 0.3,
        width: 200,
        height: 200,
        margin: 0,
        color: {
          dark: "#000000",
          light: "#ffffff"
        }
      };
      QRCode.toDataURL(url, opts, function(err, iurl) {
        if (err) throw err;
        let img = document.getElementById("image");
        img.src = iurl;
      });
      let qrcode = document.getElementById("image");
      if (qrcode) {
        let that = this;
        this.$nextTick(() => {
          setTimeout(function() {
            var bgImg = new Image();
            bgImg.src = that.cardOption.rectImg[0].img;
            bgImg.onload = function() {
              that.creatPoster();
            };
          }, 1000);
        });
      }
    },
    // 生成海报
    async creatPoster(showOver = true) {
      let can = document.getElementById("myCanvas");
      let ctx = can.getContext("2d");
      // polyfill 提供了这个方法用来获取设备的 pixel ratio
      let getPixelRatio = function(context) {
        let backingStore =
          context.backingStorePixelRatio ||
          context.webkitBackingStorePixelRatio ||
          context.mozBackingStorePixelRatio ||
          context.msBackingStorePixelRatio ||
          context.oBackingStorePixelRatio ||
          context.backingStorePixelRatio ||
          1;
        return (window.devicePixelRatio || 1) / backingStore;
      };
      let ratio = getPixelRatio(ctx);
      can.width = this.cardOption.width * ratio;
      can.height = this.cardOption.height * ratio;
      // 背景图片
      this.renderRectBg(ctx, ratio, this.rectImg[0]);
      this.rectImg.map((item, index) => {
        if (index != 0) {
          if (!item.showTip) {
            this.renderRect(ctx, ratio, item, index);
          }
        }
      });
      //画头像
      this.circleImg.map(item => {
        this.renderAvatar(ctx, ratio, item);
      });
      // 二维码
      this.renderEwm(ctx, ratio);
      //画文字
      this.canvasText.map(item => {
        this.renderText(ctx, ratio, item);
      });
      //画遮罩
      if (showOver) {
        this.rectImg.map((item, index) => {
          if (index != 0) {
            if (item.showTip) {
              this.renderRect(ctx, ratio, item, index);
            }
          }
        });
      }

      this.src = can.toDataURL("image/png");
      this.$toast.clear();
      this.showCanvas = true;
      this.loadImg = true;
    },
    renderRectBg(ctx, ratio, item) {
      let img1 = document.querySelectorAll(".canvasebgImg");
      //注册所有操作完成后的执行方法
      ctx.drawImage(
        img1[0],
        item.x,
        item.y,
        item.width * ratio,
        item.height * ratio
      );
    },
    renderRect(ctx, ratio, item, index) {
      let img1 = document.querySelectorAll(".canvasebgImg");

      //注册所有操作完成后的执行方法
      ctx.drawImage(
        img1[index],
        item.x,
        item.y,
        item.width * ratio,
        item.height * ratio
      );
    },
    renderText(ctx, ratio, item) {
      let text = this.cardOption.text;
      ctx.font = item.fontSize * ratio + "" + "px PingFangSC-Regular";
      ctx.textAlign = "center";
      ctx.fillStyle = item.color;
      ctx.fillText(item.content, item.x * ratio, item.y * ratio);
    },
    renderEwm(ctx, ratio) {
      let qrcodeOption = this.cardOption.qrcode;
      if (!qrcodeOption) {
        return;
      }
      let qrcode = document.getElementById("image");
      let sx = qrcodeOption.sx; // sx 可选。开始剪切的 x 坐标位置。
      let sy = qrcodeOption.sy; // sy 可选。开始剪切的 y 坐标位置。
      let swidth = qrcodeOption.swidth; // 可选。被剪切图像的宽度。
      let sheight = qrcodeOption.sheight; // 可选。被剪切图像的高度。
      let x = qrcodeOption.x * ratio; // 在画布上放置图像的 x 坐标位置。
      let y = qrcodeOption.y * ratio; // 在画布上放置图像的 y 坐标位置。
      let width = qrcodeOption.width * ratio; // 可选。要使用的图像的宽度。（伸展或缩小图像）
      let height = qrcodeOption.height * ratio; // 可选。要使用的图像的高度。（伸展或缩小图像）
      ctx.drawImage(qrcode, sx, sy, swidth, sheight, x, y, width, height);
    },
    renderAvatar(ctx, ratio, item) {
      let circleImg = this.cardOption.circleImg;
      let avatar = document.getElementById("avatar");
      var avatarurl_width = item.width * ratio; //绘制的头像宽度
      var avatarurl_heigth = item.height * ratio; //绘制的头像高度
      var avatarurl_x = item.x * ratio; //绘制的头像在画布上的位置
      var avatarurl_y = item.y * ratio; //绘制的头像在画布上的位置
      ctx.save();
      ctx.beginPath(); //开始绘制
      //先画个圆  前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      ctx.arc(
        avatarurl_width / 2 + avatarurl_x,
        avatarurl_heigth / 2 + avatarurl_y,
        avatarurl_width / 2,
        0,
        Math.PI * 2,
        false
      );
      ctx.clip(); //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
      ctx.drawImage(
        avatar,
        avatarurl_x,
        avatarurl_y,
        avatarurl_width,
        avatarurl_heigth
      ); // 推进去图片，必须是https图片
      ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
    },
    handleDialogClick() {
      // this.creatPoster(false);
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-content {
  width: 100%;
  position: relative;
  .app-bottom-title {
    width: 100%;
    height: 50px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    .p2 {
      margin-left: auto;
    }
  }
  /deep/ .van-overlay {
    overflow: auto !important;
  }
  .overlay-content {
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    .overlay-frame {
      width: 100%;
      margin: 0 auto;
      position: relative;
      overflow-y: auto;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .dialog-close {
        font-size: 24px;
        color: #fff;
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(-50%, 50%);
      }
      #qrcode {
        display: none;
      }
      #head-img {
        display: none;
      }
      .poster {
        display: none;
        width: 300px;
        height: 500px;
        background: #fff; /*  */
        border-radius: 4px;
        overflow: hidden;
      }
      .poster-avatar {
        display: none;
        position: absolute;
        width: 50px;
        height: 50px;
        left: 50%;
        transform: translate(-50%, 0);
        background: #fff; /*  */
        border-radius: 100%;
        overflow: hidden;
        top: 6.5%;
      }
      img {
        border: 0;
      }
      canvas {
        display: none;
      }
      .poster1 {
        display: block;
      }
      .img {
        width: 0.71rem;
        height: 0.71rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        display: none;
      }
      .tips {
        width: 100%;
        height: 1.33rem;
        line-height: 1.33rem;
        font-size: 0.33rem;
        color: #6e6e6e;
        background: #fff;
        text-align: center;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 2;
      }
    }
  }
  .overlay-bg {
    width: 100%;
    padding-top: 178.09%;
    background: url("~@/assets/imgs/questionnaire/invite-alert.png") no-repeat
      center center;
    background-size: contain;
  }
  .overlay-bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 300px;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.65);
    /* filter: alpha(opacity=65%); */
    transform: translate(-50%, 0);
    .overlay-bgImg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 300px;
      height: 78%;
      background: url("~@/assets/imgs/questionnaire/learn.png") no-repeat center
        center;
      background-size: contain;
    }
    .overlay-bottom-btn {
      position: absolute;
      bottom: 15px;
      left: 50%;
      width: 185px;
      height: 40px;
      font-weight: 400;
      color: #333333;
      font-size: 16px;
      background: linear-gradient(132deg, #ffd07a 0%, #ffe5ae 100%);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50%, 0);
    }
  }

  .overlay-btn {
    width: 295px;
    height: 44px;
    background: linear-gradient(132deg, #ffd07a 0%, #ffe5ae 100%);
    border-radius: 24px;
    color: #011440;
    line-height: 28px;
    font-size: 20px;
    margin: 0 auto;
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
