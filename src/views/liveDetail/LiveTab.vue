<template>
  <div>
    <keep-alive>
      <van-tabs v-model="active" @change="onChange" swipeable>
        <van-tab name="0" title="直播详情">
          <template v-if="list.length > 0">
            <live-doc-list v-model="isPaid" :list="list"></live-doc-list>
            <div class="line10"></div>
          </template>
          <div class="content-parse" v-html="info.liveDetail"></div>
        </van-tab>
        <van-tab name="1" title="相关课程">
          <live-playback :info="info"></live-playback>
        </van-tab>
      </van-tabs>
    </keep-alive>
  </div>
</template>

<script>
import LiveDocList from "@/components/live/doclist";
import LivePlayback from "./LivePlayback";
export default {
  name: "LiveTab",
  components: { LiveDocList, LivePlayback },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isPaid: false, // 是否已付费 ： true已付
      active: 0,
    };
  },
  mounted() {
    // document.querySelector(".content-parse").querySelectorAll("img").setAttribute("height","auto")
  },
  methods: {
    onChange(event) {},
  },
};
</script>

<style lang="scss" scoped>
.content-parse {
  padding: 0.4rem;
}
.content-parse /deep/ img {
  max-width: 100%;
  height: auto !important;
}
/deep/ .van-tabs__wrap {
  border-bottom: 1px solid #eee;
}
</style>