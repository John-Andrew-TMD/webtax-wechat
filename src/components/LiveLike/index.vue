<template>
  <div class="like-wrapper">
    <div>
      <i
        class="icon-like"
        :class="info.like ? 'icon-clicked' : 'icon-click'"
        @click="handleLikeClick"
      ></i>
      <i
        class="icon-like icon-zan"
        v-if="!isExpert"
        @click="handleZanClick"
      ></i>
    </div>
    <div class="like-num">- {{ info.likeOrRewardNum || 0 }} 人已点赞 -</div>
    <div class="user-avator-list">
      <img
        class="user-avator-img"
        :src="item.avatar ? item.avatar : defaultAvator"
        alt
        v-for="(item, index) in likeAvatarList"
        :key="index"
      />
      <i
        class="more-like-icon"
        v-if="
          info.likeOrRewardAvatarList && info.likeOrRewardAvatarList.length > 7
        "
      ></i>
    </div>
    <live-like-dialog ref="dialog" :info="info"></live-like-dialog>
  </div>
</template>

<script>
import { handleLike } from "@/api/liveList";
import jsCookies from "js-cookie";
import LiveLikeDialog from "./LiveLikeDialog.vue";
export default {
  name: "LiveLike",
  components: { LiveLikeDialog },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isLogin() {
      let userInfo = jsCookies.get("userinfo")
        ? JSON.parse(jsCookies.get("userinfo"))
        : null;
      if (userInfo) {
        userInfo["avatar"] =
          userInfo.userTypeCode == 1
            ? userInfo.expertInfo.avatar
            : userInfo.memberInfo.avatar;
        userInfo["level"] =
          userInfo.userTypeCode == 0 ? userInfo.memberInfo.memberLevelCode : "";
      }
      return userInfo;
    },
    // 专家
    isExpert() {
      return this.isLogin && this.isLogin.userTypeCode == 1; // 0:member,1:expert
    },
    likeAvatarList() {
      return this.likeAvatarFilter();
    },
  },
  data() {
    return {
      isIos: null, // 机型 IOS，安卓
      exportInfo: {},
      likeInfo: {},
      id: this.$route.params.id,
      likeAvatar: [],
      commentList: [],
      showMark: false, // 遮罩层
      disableddl: false,
      defaultAvator: require("@/assets/imgs/avatar.png"),
    };
  },
  mounted() {
    this.isIos = this.$utils.isIos();
  },
  methods: {
    _handleShowAttent() {
      if (!this.isLogin) {
        this.$router.push({
          name: "auth",
          query: {
            path: "/live",
          },
        });
        return;
      }
      let dialog = this.$refs.dialog;
      dialog.show = true;
    },
    likeAvatarFilter() {
      let ls =
        (this.info.likeOrRewardAvatarList &&
          this.info.likeOrRewardAvatarList) ||
        [];
      return ls.filter((v, i) => i < 8);
    },
    handleLikeClick() {
      if (!this.isLogin) {
        // dsBridge.call('toLogin', 'login')
        this.$router.push({
          name: "auth",
          query: {
            path: "/live",
          },
        });
        return;
      } else {
        this.$toast.loading();
        handleLike(this.info.id).then((res) => {
          this.$toast.clear();
          if (res.success) {
            this.$emit("init");
          } else {
            this.$toast.fail(res.message);
          }
        });
      }
    },
    handleZanClick() {
      this._handleShowAttent();
      // dsBridge.call("handleZanClick", {
      //   goodsId: this.info.id,
      //   rewardRecordType: 1,
      //   rewardRecordSource: this.info.id,
      //   expertName:this.info.teacher,
      //   expertAvatar:this.info.expertAvatar
      // });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./detail.scss";
</style>