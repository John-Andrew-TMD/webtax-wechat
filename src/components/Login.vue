<template>
  <div class="login-wrap">
    <header class="login-header">
      <i class="close-icon"></i>
    </header>
    <main class="main-box">
      <div class="login-title">注册/登录</div>
      <div class="input-box">
        <van-field
          type="number"
          maxlength="11"
          class="login-inp"
          v-model="form.mobile"
          placeholder="请输入您的手机号"
          @input="inputChange"
        />
        <van-field
          v-model="form.code"
          class="login-inp"
          type="number"
          pattern="\d*"
          placeholder="请输入验证码"
          maxlength="6"
        >
          <span
            class
            :class="codeStatus"
            slot="button"
            :disabled="codeDisable"
            @click="getCode"
          >{{ sendCodeText }}</span>
        </van-field>
      </div>
      <div class="login-tips">未注册的手机号验证后自动创建答税账户</div>
      <van-button
        class="loginbtn"
        :class="loginStatus"
        :disabled="disabled"
        plain
        hairline
        @click="login"
      >登录</van-button>
    </main>
  </div>
</template>
<style lang="scss" scoped>
@import "~@/scss/base";
.login-wrap {
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  z-index: 10000;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
.login-header {
  padding: 0 15px;
  height: 44px;
  line-height: 44px;
  position: relative;
}
.close-icon {
  @include iconBg("close-icon@2x.png");
  width: 22px;
  height: 22px;
  position: absolute;
  right: 15px;
  top: 25%;
}
.main-box {
  padding: 0 50px;
}
.login-title {
  padding: 50px 0;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 40px;
}
.login-inp {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(204, 204, 204, 1);
  line-height: 22px;
}
.input-box {
  @include border1px(bottom);
}
.login-tips {
  margin: 10px 0 30px 0;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 13px;
}
.loginbtn {
  width: 100%;
}
.enactive {
  background: rgb(175, 174, 174);
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}
.active {
  background: rgba(255, 89, 72, 1);
  border-radius: 8px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}
.codeenactive {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgb(175, 174, 174);
  line-height: 20px;
  border: none;
  background: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.codeactive {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  border: none;
  background: none;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
<script>
import * as util from '@/utils/util.js';
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      disabled: true,
      disabledcode: true,
      sendCodeText: '获取验证码',
      form: {
        mobile: '',
        code: ''
      },
      timer: 0
    };
  },
  created() {},
  mounted() {},
  computed: {
    loginStatus() {
      return {
        active: !this.disabled,
        enactive: this.disabled
      };
    },
    codeStatus() {
      return {
        codeactive: !this.disabledcode || this.sendCodeText != '获取验证码',
        codeenactive: this.disabled
      };
    },
    codeDisable() {
      return this.disabledcode && this.sendCodeText != '获取验证码';
    }
  },
  watch: {},
  methods: {
    inputChange(e) {
      this.form.mobile = e;
      
      if (util.checkMobilePhone(e)) {
        this.disabledcode = false
        if(util.checkMobilePhone(e)&&this.form.code){
          this.disabled = false;
        }else{
          this.disabled = true;
        }
      } else {
        this.disabled = true;
      }
    },
    getCode() {
      if (this.sendCodeText != '获取验证码') {
        return false;
      }
      if (!util.checkMobilePhone(this.form.mobile)) {
        this.$toast.fail('请输入正确手机号');
        return false;
      }
        let second = 60;
        this.sendCodeText = second + '秒后重试';
        this.timer = setInterval(() => {
          second--;
          if (second) {
            this.disabledcode = true;
            this.sendCodeText = second + '秒后重试';
          } else {
            this.disabledcode = false;
            clearInterval(this.timer);
            this.sendCodeText = '获取验证码';
          }
        }, 1000);

        return

      this.$post('/sms/send', { phone: this.form.mobile, type: 2 }).then(
        res => {
          if (res.code == 200) {
            let second = 60;
            this.sendCodeText = second + '秒后重试';
            this.timer = setInterval(() => {
              second--;
              if (second) {
                this.disabledcode = true;
                this.sendCodeText = second + '秒后重试';
              } else {
                this.disabledcode = false;
                clearInterval(this.timer);
                this.sendCodeText = '获取验证码';
              }
            }, 1000);
          } else {
            this.disabledcode = false;
            this.$toast.fail(res.msg);
          }
        }
      );
    },
    login() {}
  }
};
</script>
