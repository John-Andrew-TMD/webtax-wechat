<template>
  <div class="invi-cart">
    <div class="line10"></div>
    <div class="invi-cart-box clearfix" ref="invicartbox">
      <van-form class="clearfix">
        <van-field
          class="d-flex a-center text-right"
          readonly
          clickable
          name="picker"
          :value="form.ascription"
          label="分所"
          placeholder="点击选择分所"
          @click="showPicker = true"
        />
        <!-- <van-field class="d-flex a-center" v-model="form.number" type="digit" label="座位序号:" placeholder="输入座位序号" /> -->
        <van-field
          class="d-flex a-center text-right"
          v-model="form.name"
          type="text"
          label="姓名"
          placeholder="输入嘉宾姓名"
        />
        <div style="margin: 16px" class="d-flex a-center j-center">
          <van-button
            class="operate-btn reset-btn mr-35"
            plain
            hairline
            @click="resetResult"
            >重置</van-button
          >
          <van-button
            class="operate-btn search-btn bg-white"
            plain
            hairline
            type="danger"
            @click="filterResult"
            >查找</van-button
          >
        </div>
      </van-form>
      <div class="line10"></div>
      <list :style="'top:' + top + 'px'" :list="columnsResult" :letter="letter" @checkItem="handleCheckItem"></list>
      <alphabet :list="columnsResult" @change="handleLetterChange"></alphabet>
    </div>
    <img src="" id="image" alt="" style="" v-show="hideimg" />
    <div class="page-share" v-show="showCanvas">
      <van-icon
        name="cross"
        @click="showCanvas = false"
        class="close-icon position-absolute"
      />
      <div class="content">
        <div id="qrcode"></div>
        <img class="poster" id="bg" src="~@/assets/imgs/invitor-bg.png" alt />
        <canvas id="myCanvas" class="poster"></canvas>
        <img :src="src" alt class="poster poster1" crossOrigin="anonymous" />
        <div class="tips">长按上方图片 发送给朋友</div>
      </div>
    </div>
    <!-- 部门弹窗 -->
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        :visible-item-count="8"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <div class="gen-btn">
      <van-button
      color="#FF5948"
      class="toCanvas"
      :disabled="!isSelect"
      @click="creatQRcode"
      >生成卡片</van-button>
    </div>
    
  </div>
</template>
<style lang="scss" scoped>
body,
html {
  height: 100%;
  background-color: #f5f5f5;
}
.invi-cart {
  font-size: 20px;
  max-width: 375px !important;
  height: 100vh;
  margin: 0 auto;
  background-color: #fff;
}
.invi-cart /deep/ {
  .van-picker__toolbar {
    height: 44px !important;
  }
  .van-picker__cancel,
  .van-picker__confirm,
  .van-ellipsis {
    font-size: 24px;
  }
  .van-field__label,
  .van-button__text,
  .van-field__control {
    font-size: 18px;
    font-weight: bold;
  }
  .van-field__control {
    text-align: right;
  }
}
.mr-35 {
  margin-right: 35px;
}
.operate-btn {
  width: 165px !important;
  height: 33px;
  line-height: 33px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #666666;
}
.bg-white {
  background-color: #fff;
}
.page-share {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    // background: url(../../assets/images/income/sharebg1.jpg) no-repeat center
    //   center;
    background-size: 100% 100%;
    position: relative;
    #qrcode {
      display: none;
    }
    #head-img {
      display: none;
    }
    .poster {
      display: none;
      position: absolute;
      width: 300px;
      height: 500px;
      top: 50px;
      left: 50%;
      transform: translate(-50%, 0);
      background: #fff; /*  */
      border-radius: 4px;
      overflow: hidden;
      display: none;
    }
    img {
      border: 0;
    }
    #bg {
      display: none;
    }
    canvas {
      display: none;
    }
    .poster1 {
      display: block;
      z-index: 3;
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
.result-num {
  font-size: 14px;
  padding: 0px 15px 10px 15px;
  color: #999999;
}
.gen-btn {
  position: fixed;
  bottom: 0;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 0;
}
.toCanvas {
  height: 35px;
  line-height: 35px;
  width: 90%;
  background: #ff5948;
  border-radius: 4px;
  font-size: 14px;
}
.close-icon {
  right: 10px;
  top: 10px;
  z-index: 100;
  color: rgb(226, 49, 17) !important;
}
</style>
<script>
import QRCode from "qrcode";
import { pdata, dept } from "./taxParner";
import List from "@/components/indexBar/components/List";
import Alphabet from "@/components/indexBar/components/Alphabet";
import cnchar from "cnchar";
export default {
  name: "InvitationCard",
  components: { Alphabet, List },
  data() {
    return {
      top: 172,
      timerInterval: null,
      letter: "",
      src: "",
      init: true,
      hideimg: false,
      showCanvas: false,
      columns: dept,
      showPicker: false,
      result: null,
      name: null,
      isSelect: false,
      form: {
        ascription: null,
        name: null,
        number: null
      },
      // 查找结果
      columnsResult: {},
      showPicker1: false
    };
  },
  created() {},
  mounted() {
    this.columns = dept.sort(
      function compareFunction(param1, param2) {
        return param1.localeCompare(param2,"zh");
      }
    )
    let tempArr = [];
    let afterData = [];
    for (let i = 0; i < pdata.length; i++) {
      pdata[i].cnname = pdata[i].name.spell();
      if (tempArr.indexOf(pdata[i].ascription) === -1) {
        afterData.push({
          ascription: pdata[i].ascription,
          origin: [pdata[i]]
        });
        tempArr.push(pdata[i].ascription);
      } else {
        for (let j = 0; j < afterData.length; j++) {
          if (afterData[j].ascription == pdata[i].ascription) {
            afterData[j].origin.push(pdata[i]);
            break;
          }
        }
      }
    }
    this.top = this.$refs.invicartbox.clientHeight + 10
    this.init && this.filterResult()
  },
  computed: {},
  watch: {},
  methods: {
    handleCheckItem(item) {
      this.result = item;
      this.isSelect = true
    },
    handleLetterChange(letter) {
      this.letter = letter;
    },
    resetResult() {
      this.name = null;
      this.result = null;
      this.form.ascription = null;
      this.form.name = null;
      this.form.number = null;
      this.isSelect = false
      this.filterResult()
    },
    filterResult() {
      this.name = null;
      this.result = null;
      if (this.init) {
        this.filterData();
      } else {
        this.$toast.loading({
          message: "查找中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0
        });
        setTimeout(() => {
          this.filterData();
          this.$toast.clear();
        }, 100);
      }
    },
    filterData() {
      let filterlist = JSON.parse(JSON.stringify(pdata));
      let list = filterlist.filter(v => {
        v.checked = false;
        // 查找全部
        if (!this.form.ascription && !this.form.name) {
          return v;
        }
        // 全匹配查找
        if (this.form.ascription && this.form.name) {
          return (
            v.ascription == this.form.ascription &&
            v.name.indexOf(this.form.name) > -1
          );
        }
        // 部门，非序号，非姓名
        if (this.form.ascription  && !this.form.name) {
          return v.ascription == this.form.ascription;
        }
        // 部门，序号，非姓名
        if (this.form.ascription && !this.form.name) {
          return (
            v.ascription == this.form.ascription 
          );
        }
        // 部门，非序号，姓名
        if (this.form.ascription && this.form.name) {
          return (
            v.ascription == this.form.ascription && v.name == this.form.name
          );
        }
        // 非部门，序号，姓名
        if (!this.form.ascription && this.form.name) {
          return v.name == this.form.name;
        }
      });

      let arr = [];
      if (!this.form.ascription && this.form.name) {
        let len = filterlist.length;
        for (let i = 0; i < len; i++) {
          //如果字符串中不包含目标字符会返回-1
          if (filterlist[i].name.indexOf(this.form.name) >= 0) {
            arr.push(filterlist[i]);
          }
        }
      } else {
        arr = list;
      }
      arr.map(v => {
        v.cnname = v.name.spell();
        return v
      })

      if (arr.length) {
        this.columnsResult = this.LetterSort(arr, "cnname");
      }
      this.init = false
    },
    LetterSort(data, field) {
      let letter_reg = /^[A-Z]$/;
      let list = [];
      for (let i = 0; i < data.length; i++) {
        // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
        list["#"] = [];
        // 首字母 转 大写英文
        let letter = data[i][field].substr(0, 1).toUpperCase();
        // 是否 大写 英文 字母
        if (!letter_reg.test(letter)) {
          letter = "#";
        }
        // 创建 字母 分组
        if (!(letter in list)) {
          list[letter] = [];
        }
        // 字母 分组 添加 数据
        list[letter].push(data[i]);
      }

      // 转换 格式 进行 排序；
      let resault = [];
      for (let key in list) {
        if (typeof list[key] != "function") {
          resault.push({
            letter: key,
            list: list[key]
          });
        }
      }
      resault.sort(function(x, y) {
        return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
      });
      // # 号分组 放最后
      let last_arr = resault[0];
      resault.splice(0, 1);
      resault.push(last_arr);

      // 转换 数据 格式
      let json_sort = {};
      for (let i = 0; i < resault.length; i++) {
        json_sort[resault[i].letter] = resault[i].list;
      }
      return json_sort;
    },
    onConfirm(value) {
      if (value) {
        this.form.ascription = value;
      }
      // this.columnsResult = {};
      this.showPicker = false;
    },
    onSubmit() {},
    // 生成二维码
    creatQRcode() {
      this.$toast.loading({
        message: "生成中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
      const env = process.env.NODE_ENV;

      let url =
        env == "development"
          ? `https://test.h5.webtax.com.cn/app/exchange/by/mobile?code=${this.result.cd_key}`
          : `https://h5.webtax.com.cn/app/exchange/by/mobile?code=${this.result.cd_key}`;
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
            that.creatPoster();
          }, 1000);
        });
      }
    },
    // 生成海报
    creatPoster() {
      let qrcode = document.getElementById("image");
      let img2 = document.getElementById("head-img");
      let img1 = document.getElementById("bg");
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
      can.width = 375 * ratio;
      can.height = 667 * ratio;
      // 背景图片
      ctx.drawImage(img1, 0, 0, 375 * ratio, 667 * ratio);
      // 二维码
      let sx = 0; // sx 可选。开始剪切的 x 坐标位置。
      let sy = 0; // sy 可选。开始剪切的 y 坐标位置。
      let swidth = 210; // 可选。被剪切图像的宽度。
      let sheight = 210; // 可选。被剪切图像的高度。
      let x = 42 * ratio; // 在画布上放置图像的 x 坐标位置。
      let y = 533 * ratio; // 在画布上放置图像的 y 坐标位置。
      let width = 100 * ratio; // 可选。要使用的图像的宽度。（伸展或缩小图像）
      let height = 100 * ratio; // 可选。要使用的图像的高度。（伸展或缩小图像）
      ctx.drawImage(qrcode, sx, sy, swidth, sheight, x, y, width, height);
      //画文字
      ctx.font = 34 * ratio + "" + "px PingFangSC-Regular";
      ctx.textAlign = "center";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(this.result.name, can.width / 2, 165 * ratio, 333 * ratio);
      this.src = can.toDataURL("image/png");
      this.$toast.clear();
      this.showCanvas = true;
    }
  }
};
</script>
