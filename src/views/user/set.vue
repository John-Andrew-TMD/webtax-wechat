<template>
  <div class="user-center-wrapper">
    <div class="user d-flex a-center">
      <div class="user-avator">
        <van-image
          cover
          round
          :src="userInfo && userInfo.avatar ? userInfo.avatar : avatar"
          alt="用户"
        />
      </div>
      <div class="user-info flex-1 d-flex flex-column j-center" v-if="userInfo&&userInfo.userTypeCode && userInfo.userTypeCode == 1">
        <div class="d-flex a-center flex-wrap"><span class="user-name expert-name">{{userInfo && userInfo.userName}}</span> <span class="user-num" v-if="userInfo && userInfo.expertInfo.expertNo">专家编号：{{userInfo && userInfo.expertInfo.expertNo}}</span> </div>
        <div class="">
          <span class="m1-icon expert-icon"></span>
        </div>
      </div>
      <div class="user-info flex-1 d-flex flex-column j-center" v-else>
        <div class="user-name">{{userInfo && userInfo.userName}}</div>
        <div>
          <span class="m1-icon svip-icon" v-if="userInfo.level && userInfo.level == 2"></span>
          <span class="m1-icon svip1-icon" v-else-if="userInfo.level && userInfo.level == 3"></span>
          <span class="m1-icon svip2-icon" v-else-if="userInfo.level && userInfo.level == 4"></span>
          <span class="m1-icon vip-icon" v-else-if="userInfo.level && userInfo.level== 1"></span>
          <span class="m1-icon pt-icon" v-else></span>
        </div>
      </div>
      <span class="set-arrow-right-l" v-if="userInfo && userInfo.userTypeCode && userInfo.userTypeCode == 1" @click="toExpertDetail(userInfo.expertInfo.expertId)"></span>
    </div>
    <!-- 专家 -->
    <div v-if="userInfo && userInfo.userTypeCode && userInfo.userTypeCode == 1">
      <div class="set d-flex a-center" @click="toNotic">
        <div class="flex-1 d-flex a-center">
          <span class="ms-icon ding-icon"></span>
          <span class="set-txt">消息设置</span>
        </div>
        <span class="set-arrow-right"></span>
      </div>
      <div class="set d-flex a-center" @click="handleBook('expert')">
        <div class="flex-1 d-flex a-center">
          <span class="ms-icon book-icon"></span>
          <span class="set-txt">专家使用手册</span>
        </div>
        <span class="set-arrow-right"></span>
      </div>
    </div>
    <div v-else>
      <!-- 用户会员 -->
      <div class="set d-flex a-center" @click="toExChange">
        <div class="flex-1 d-flex a-center">
          <span class="ms-icon gif-icon"></span>
          <span class="set-txt">兑换权益</span>
        </div>
        <span class="set-arrow-right"></span>
      </div>

      <div class="set d-flex a-center" @click="handleBook('member')">
        <div class="flex-1 d-flex a-center">
          <span class="ms-icon book-icon"></span>
          <span class="set-txt">用户使用手册</span>
        </div>
        <span class="set-arrow-right"></span>
      </div>
    </div>
    <van-button class="unbind" @click="unbind">解除绑定</van-button>
  </div>
</template>

<script>
import { handleUnbind } from '@/api/user'
import jsCookies from 'js-cookie'
export default {
  name: 'set',
  components: {},
  data() {
    return {
      avatar: require('@/assets/icons/avatar.png'),
      user: {}
    };
  },
  created() {},
  mounted() {},
  computed: {
    userInfo(){
      let userInfo = JSON.parse(jsCookies.get('userinfo')) || ''
      if (userInfo) {
        userInfo['avatar'] = userInfo.userTypeCode == 1 ? userInfo.expertInfo.avatar : userInfo.memberInfo.avatar
        userInfo['level'] = userInfo.userTypeCode == 0 ? userInfo.memberInfo.memberLevelCode : ''
      }
      return userInfo
    }
  },
  watch: {},
  methods: {
    unbind() {
      this.$dialog
      .confirm({
        // title: '',
        confirmButtonColor: '#FF5948',
        cancelButtonColor: '#999999',
        confirmButtonText: '确的',
        message: '确定解除绑定吗'
      })
      .then(() => {
        handleUnbind().then(res => {
          if (res.success) {
            jsCookies.remove('token');
            jsCookies.remove('userinfo');
            location.href = '/'
          } else {
            this.$toast(res.message)
          }
        })
      })
      .catch(() => {
        // on cancel
      });
    },
    toNotic() {
      this.$router.push('/notic')
    },
    toExChange() {
      this.$router.push('/exchange')
    },
    handleBook(f) {
      location.href = `http://docs.webtax.com.cn/app/${f}/manual`
    },
    toExpertDetail(id) {
      this.$router.push(`/expert/${id}`)
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~@/scss/base";
.user-center-wrapper {
  display: block;
  margin: 0 auto;
  max-width: 768px;
  min-width: 320px;
  overflow: auto;
  height: 100vh;
  background: rgba(245, 245, 245, 1);
  padding: 20px;
  .user {
    // width: 335px;
    height: 114px;
    display: flex;
    box-sizing: border-box;
    padding: 20px;
    @include imgBg("user-info-bg@2x.png");
    .user-avator {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
    }
    .user-name {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 26px;
      letter-spacing: 1px;
    }
    .user-num{
      font-size: 14px;
      color: #eeeeee;
    }
    .expert-name{

    }
  }
}

.user-tag{
  color: #ffffff;
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 4px;
  background-color: #FFC910;
}
.set-arrow-right-l{
  display: inline-block;
  width: 22px;
  height: 22px;
  @include iconBg("right-l-icon.png");
}
.m1-icon {
  width: 48px;
  height: 16px;
  display: inline-block;
}
.pt-icon {
  @include iconBg("no-vip-icon@2x.png", contain);
}
.svip-icon {
  @include iconBg("svip-icon@2x.png", contain);
}
.svip1-icon {
  @include iconBg("svip1-icon@2x.png", contain);
}
.svip2-icon {
  @include iconBg("svip2-icon@2x.png", contain);
}
.vip-icon {
  @include iconBg("new-vip-icon@2x.png", contain);
}
.expert-icon{
  @include iconBg("expert-icon@2x.png", contain);
}
.set {
  margin-top: 20px;
  height: 80px;
  box-sizing: border-box;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  .ms-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .ding-icon{
    @include iconBg("ding-icon@2x.png");
  }
  .gif-icon {
    @include iconBg("gif-icon@2x.png");
  }
  .book-icon {
    @include iconBg("book-icon@2x.png");
  }
  .set-txt {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }

  .set-arrow-right {
    display: inline-block;
    width: 22px;
    height: 22px;
    @include iconBg("right-icon.png");
  }
}
.unbind{
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:20px;
  position: absolute;
  bottom: 30px;
  border: none;
  background:rgba(245,245,245,1);
  left: 50%;
  transform: translateX(-50%);
}
</style>