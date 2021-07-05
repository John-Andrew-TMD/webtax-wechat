<template>
  <div style="width: 100%" id="xg"></div>
</template>
<style lang="scss" scoped></style>
<script>
import HlsJsPlayer from "xgplayer-hls.js";
export default {
  name: "VideoPlayer",
  components: {},
  props: {
    info: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      videoPlayer: null
    };
  },
  watch: {
    $route: {
      handler() {
        this.getVideo();
      },
    },
  },
  beforeRouteLeave (to, from, next) {
    this.videoPlayer = null
    delete this.videoPlayer
  },
  created() {},
  mounted() {
    this.getVideo();
  },
  computed: {},
  watch: {},
  methods: {
    getVideo() {
      setTimeout(() => {
        this.videoPlayer = new HlsJsPlayer({
          el: document.querySelector("#xg"), // 选择demo
          // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
          url: this.info.liveUrl,
          width: "100%",
          height: "240px",
          volume: 1, // 初始音量
          autoplay: true, // 自动播放
          playsinline: true,
          isLive: false, // 是否直播
          // rotate: {   //视频旋转按钮配置项
          //     innerRotate: true, //只旋转内部video
          //     clockwise: false // 旋转方向是否为顺时针
          // },
          controls: true, // 播放器控制
          memoryPlay: true,
          playbackRate: [0.5, 1, 1.5, 2],
          controlsList: ["nodownload"], // 关闭控制器相关配置 ['nodownload','nofullscreen','noremoteplayback'] 只对原生video有效 对自定义UI请使用ignores选项
          ignores: ["volume"], // 控制条忽略相关配置项 ['time', 'definition', 'error', 'fullscreen', 'i18n', 'loading', 'mobile', 'pc', 'play', 'poster', 'progress', 'replay', 'volume']
          lang: "zh-cn", // 语言支持 'zh-cn' | 'en' | 'jp' 中文、英文、日文
          rotateFullscreen: false, // 样式全屏，不旋转=>视频会随着手机横竖屏进行切换
          closeVideoClick: true, // video触发click事件后视频切换播放/暂停状态 关闭
          closeVideoTouch: true, // h5端触发touchend事件后视频切换播放/暂停状态 关闭
          videoInit: true,
          poster: this.info.liveCoverImage, // 封面图
          cors: true, // 请求是否跨域
        });
      }, 150);
    },
  },
};
</script>
