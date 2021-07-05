<template>
  <div class="user-bind-wrapper">
    <div class="bg-box">
      <img
        class="user-bind-bg"
        src="~@/assets/imgs/change-bg@2x.png"
        alt="绑定用户"
      />
      <img
        class="user-bind-bg-avatar"
        src="~@/assets/imgs/user-bind-bg-avatar@2x.png"
        alt="绑定用户"
      />
    </div>
    <div class="bind-box">
      <h2 class="bind-title">绑定用户</h2>
      <div class="input-style-box">
        <span @click="showPicker = true" class="areaCode">
          +{{ form.phoneNationCode }}
          <i class="icon-down-arrow icon iconfont icon-icon_down-arrow"></i>
        </span>
        <span class="line1"></span>
        <van-field
          v-model="form.phone"
          class="input-style__inp"
          type="tel"
          pattern="\d*"
          clearable
          placeholder="请输入手机号"
        />
      </div>
      <van-field
        v-model="form.credentials"
        class="input-style"
        type="number"
        pattern="\d*"
        :maxlength="6"
        placeholder="请输入验证码"
      >
        <span
          class="code-btn"
          :class="{ disbtn: sendCodeText != '获取验证码' }"
          slot="button"
          :disabled="sendCodeText != '获取验证码'"
          @click="sendCode"
          >{{ sendCodeText }}</span
        >
      </van-field>
      <van-button
        class="bind-btn"
        type="default"
        :disabled="isBind || isLoading"
        :loading="isLoading"
        @click="handleBind"
        >立即绑定</van-button
      >
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        :default-index="columnsIndex"
        @cancel="showPicker = false"
        @confirm="onConfirm($event)"
      />
    </van-popup>
  </div>
</template>
<script>
import * as commonApi from "@/api/common";
import { authLogin, authBind, getUserInfo } from "@/api/user";
import jsCookies from "js-cookie";
import {
  getQueryString,
  checkMobilePhone,
  getRegisterStatus,
  getQueryStringHash,
  getUrlParams
} from "@/utils/util";
export default {
  name: "userBind",
  components: {},
  data() {
    return {
      selectCode: "86",
      sendCodeText: "获取验证码",
      columnsIndex: 0,
      columns: [],
      timer: 0,
      isLoading: false,
      showPicker: false,
      form: {
        phoneNationCode: "86",
        bindId: "",
        bindType: 0,
        phone: "",
        credentials: ""
      }
    };
  },
  created() {
    // this.form.bindId = this.$route.query.bindId || ''
    this.getAreaCode();
  },
  mounted() {
    window.addEventListener("resize", function() {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        window.setTimeout(function() {
          if ("scrollIntoView" in document.activeElement) {
            document.activeElement.scrollIntoView();
          } else {
            document.activeElement.scrollIntoViewIfNeeded();
          }
        }, 0);
      }
    });
  },
  computed: {
    isBind() {
      return !this.form.phone || !this.form.credentials;
    }
  },
  watch: {},
  methods: {
    handleBind() {
      let data = {
        phoneNationCode: this.form.phoneNationCode,
        // bindId: jsCookies.get('token'),
        // bindType: 0,
        phone: this.form.phone,
        credentials: this.form.credentials,
        bindSource: 0
      };
      if (!checkMobilePhone(data.phone) && data.phoneNationCode === "86") {
        this.$toast("请输入正确手机号");
        return false;
      }
      if (data.credentials === "") {
        this.$toast("请输入验证码");
        return false;
      }
      if (data.credentials && data.credentials.length < 6) {
        this.$toast("请输入正确的验证码");
        return false;
      }
      this.isLoading = true
      authBind(data).then(res => {
        if (res && res.code == 200 && res.success) {
          jsCookies.remove("token");
          jsCookies.set("token", res.data.token);
          this.getUserInfoData();
        } else {
          this.$toast.fail(res.message);
        }
        this.isLoading = false
      });
    },
    getUserInfoData() {
      getUserInfo().then(ret => {
        if (ret.code == 200 && ret.success) {
          jsCookies.set("userinfo", JSON.stringify(ret.data));
          let query = this.$route.query;
          if (query.path) {
            this.$router.push(query.path);
          } else {
            this.$router.push("/user/set");
          }
        } else {
          jsCookies.remove("token");
          jsCookies.remove("userinfo");
        }
      });
    },
    sendCode() {
      if (
        !checkMobilePhone(this.form.phone) &&
        this.form.phoneNationCode === "86"
      ) {
        this.$toast.fail("请输入正确手机号");
        return false;
      }
      if (this.form.phone.trim() === "") {
        this.$toast.fail("请输入注册手机号");
        return false;
      }
      if (this.sendCodeText != "获取验证码") {
        return false;
      }
      commonApi
        .sendCodeApi({
          phone: this.form.phone,
          type: 18,
          phoneNationCode: this.form.phoneNationCode
        })
        .then(res => {
          if (res.code == 200) {
            let second = 60;
            this.sendCodeText = second + "秒后重试";
            this.timer = setInterval(() => {
              second--;
              if (second) {
                this.disabledcode = true;
                this.sendCodeText = second + "秒后重试";
              } else {
                clearInterval(this.timer);
                this.sendCodeText = "获取验证码";
              }
            }, 1000);
          } else {
            clearInterval(this.timer);
            this.sendCodeText = "获取验证码";
            this.$toast.fail(res.message);
          }
        });
    },
    getAreaCode() {
      commonApi.getAreaCodeList().then(res => {
        if (res.success) {
          let list = res.data ? res.data : [];
          list.map((v, i) => {
            v["index"] = i;
            if (this.form.phoneNationCode === v.code) {
              this.columnsIndex = i;
            }
            return v;
          });
          this.columns = list;
        } else {
          this.$toast(res.message);
        }
      });
    },
    onConfirm(obj) {
      this.form.phoneNationCode = obj.code;
      this.columnsIndex = obj.index;
      this.showPicker = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/base";
.user-bind-wrapper {
  display: block;
  margin: 0 auto;
  max-width: 768px;
  min-width: 320px;
  overflow: auto;
  height: 100vh;
  background-color: #ff5948;
  z-index: 10000;
  .bg-box {
    width: 100%;
    background-color: #ff5948;
    position: relative;
    // height: 204px;
  }
  .user-bind-bg {
    width: 100%;
    display: block;
  }
  .user-bind-bg-avatar {
    position: absolute;
    top: 30px;
    width: 316px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }
  .bind-box {
    margin: 0 19px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    transform: translateY(-10px);
    padding-top: 20px;
    overflow: hidden;
    .bind-title {
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      text-align: center;
      margin-bottom: 30px;
    }
    .input-style-box {
      width: 285px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      background: rgba(245, 245, 245, 1);
      border-radius: 8px;
      height: 44px;
      overflow: hidden;
    }
    .input-style__inp {
      flex: 1;
      height: 44px;
      line-height: 44px;
      display: block;
      margin: 0 auto;
      font-size: 14px;
      font-family: PingFangSC;
      background: rgba(245, 245, 245, 1);
      font-weight: 400;
      color: #333333;
      padding-left: 15px;
      position: relative;
      user-select: text;
      -webkit-user-select: text;
      /deep/ .van-field__control {
        height: 100%;
        line-height: 20px;
      }
    }
  }
  .areaCode {
    min-width: 60px;
    text-align: center;
    // height: 44px;
    padding: 0px 6px;
    padding-right: 0;
    color: #333333;
    font-size: 14px;
  }
  .input-style__inp /deep/ .van-cell__value,
  .van-cell__value {
    height: 100%;
    .van-field__body {
      height: 100%;
    }
    .van-field__control {
      height: 100%;
      line-height: 20px;
    }
  }

  .input-style {
    width: 285px;

    display: block;
    margin: 0 auto;
    background: rgba(245, 245, 245, 1);
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #333333;
    padding-left: 15px;
    position: relative;
    user-select: text;
    -webkit-user-select: text;
  }
  .input-style /deep/ .van-cell__value,
  .van-cell__value {
    height: 100%;
    .van-field__body {
      height: 100%;
    }
  }
  .code-btn {
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #ff5948;
    line-height: 20px;
    border: none;
    background: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .disbtn {
    color: #999999;
  }
  .bind-btn {
    width: 275px;
    height: 44px;
    line-height: 44px;
    margin: 0 auto;
    display: block;
    background: rgba(255, 89, 72, 1);
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    margin-bottom: 20px;
  }
}
.line1 {
  display: inline-block;
  width: 1px;
  height: 20px;
  @include vantbd1px(left, #999999);
}
</style>
