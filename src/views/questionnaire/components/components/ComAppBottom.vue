<template>
  <div class="app-bottom-wrapper">
    <div v-if = "title" class="app-content-title">
      <span>{{ title || appJson[componentName] }}</span>
    </div>
    <div class="app-box">
      <component v-if="!isSlots" :is="componentName" v-bind="$attrsAll" />
      <slot v-else :value="value"></slot>
    </div>
  </div>
</template>

<script>
import CompInviteList from "../questionnaire-invite/components/CompList";
import CompList from "./CompList";
import Compfile from "../questionnaire-result/components/Compfile";
import CompReflectList from "../questionnaire-reflect/components/CompList";
export default {
  inheritAttrs: false,
  components: {
    CompInviteList,
    CompList,
    Compfile,
    CompReflectList
  },
  computed: {
    $attrsAll() {
      return {
        ...this.$attrs
      };
    },
    isSlots() {
      return this.$scopedSlots.hasOwnProperty("default");
    }
  },
  props: {
    value: {
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    componentName: {
      type: String,
      default: "Compfile"
    },
    taskList: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      appJson: {
        CompInviteList: "邀请好友记录",
        CompList: "排行榜",
        Compfile: "税务小提示",
        CompReflectList: "红包明细",
        CompPriceRed: "答题赢红包",
        CompPriceRank: "总榜大奖"
      }
    };
  },
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {},
    handleStartClick() {}
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
.app-bottom-wrapper {
  width: 100%;
  position: relative;
  .app-content-title {
    width: 53.65%;
    background: url("~@/assets/imgs/questionnaire/icon.png") no-repeat center
      center;
    background-size: contain;
    position: absolute;
    left: 50%;
    text-align: center;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
      height: 32px;
      line-height: 32px;
      color: #fff;
    }
  }
  .app-box {
    width: 100%;
    /* min-height: 6.24rem; */
    background: #1c2d55;
    border-radius: 8px;
    // opacity: 0.1;
    padding: 37px 15px 0px;
    border: 1px solid #233d7b;
    font-size: 14px;
    color: #fff;
    line-height: 20px;
  }
}
</style>
