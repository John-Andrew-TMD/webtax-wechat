<template>
  <div class="user-bind-wrapper">
    <div class="input-style-box">
      <span @click="showPicker = true" class="areaCode">
        +{{ form.phoneNationCode }}
        <i class="icon-down-arrow icon iconfont icon-icon_down-arrow"></i>
      </span>
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
      placeholder="请输入验证码"
    >
      <span
        class="code-btn"
        :class="{ disbtn: sendCodeText != '｜ 获取验证码' }"
        slot="button"
        :disabled="sendCodeText != '｜ 获取验证码'"
        @click="sendCode"
        >{{ sendCodeText }}</span
      >
    </van-field>
    <van-button
      class="bind-btn"
      type="default"
      :disabled="isBind"
      @click="handleBind"
      >立即绑定</van-button
    >
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
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectCode: "86",
      sendCodeText: "｜ 获取验证码",
      columnsIndex: 0,
      columns: [],
      timer: 0,
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
  computed: {
    isBind() {
      return !this.form.phone || !this.form.credentials;
    }
  },
  components: {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      this.getAreaCode();
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
      if (this.sendCodeText != "｜ 获取验证码") {
        return false;
      }
      commonApi
        .sendCodeApi({
          phone: this.form.phone,
          type: 20,
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
                this.sendCodeText = "｜ 获取验证码";
              }
            }, 1000);
          } else {
            clearInterval(this.timer);
            this.sendCodeText = "｜ 获取验证码";
            this.$toast.fail(res.message);
          }
        });
    },
    onConfirm(obj) {
      this.form.phoneNationCode = obj.code;
      this.columnsIndex = obj.index;
      this.showPicker = false;
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
    handleBind() {
      let data = {
        phoneNationCode: this.form.phoneNationCode,
        // bindId: jsCookies.get("token"),
        // bindType: 0,
        phone: this.form.phone,
        credentials: this.form.credentials,
        bindSource:1
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

      authBind(data).then(res => {
        if (res && res.code == 200 && res.success) {
          jsCookies.remove("token");
          jsCookies.set("token", res.data.token);
          this.$toast("绑定成功");
          this.$emit("handle-dialog-closed");
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-bind-wrapper {
  .input-style-box {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #334266;
    border-radius: 4px;
    height: 44px;
    overflow: hidden;
  }
  /deep/ .van-field__control {
    height: 100%;
    color: #fff;
    line-height: 20px;
  }
  .input-style__inp {
    flex: 1;
    height: 44px;
    line-height: 44px;
    display: block;
    margin: 0 auto;
    font-size: 14px;
    font-family: PingFangSC;
    background: #334266;
    font-weight: 400;
    color: #333333;
    padding-left: 15px;
    position: relative;
    user-select: text;
    -webkit-user-select: text;
  }
  /deep/ input::-webkit-input-placeholder {
    color: #66718c;
  }
  .areaCode {
    min-width: 60px;
    text-align: center;
    // height: 44px;
    padding: 0px 6px;
    padding-right: 0;
    color: #fff;
    font-size: 14px;
  }
  .input-style {
    width: 100%;
    display: block;
    margin: 0 auto;
    background: #334266;
    border-radius: 4px;
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
  .code-btn {
    color: #ff5948;
  }
  /deep/ .van-button--default {
    border: none;
  }
  /deep/ .van-cell::after {
    border-bottom: none;
  }
  /deep/ .van-button--disabled {
    background: #53607e !important;
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
  .disbtn {
    color: #999999;
  }
  .bind-btn {
    width: 275px;
    height: 44px;
    line-height: 44px;
    margin: 0 auto;
    display: block;
    background: linear-gradient(132deg, #ffd07a 0%, #ffe5ae 100%);
    border-radius: 22px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: #2e3e62;
    line-height: 22px;
  }
}
</style>
