<template>
  <div>{{showTime}}</div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  name: 'timeExpend',
  components: {},
  props: {
    row: Object
  },
  data() {
    return {
      time: 0,
      showTime: 0,
      statusCode: 0,
      order: 0,
      timer: 0,
      isOver: false
    };
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    row(v) {
      if (Object.keys(v).length > 0) {
        this.time = JSON.parse(JSON.stringify(this.row.overTime));
        this.timeCalc(this.time);
        this.showTimess();
      }
    },
    time(v) {
      this.timeCalc(v);
    }
  },
  methods: {
    swithType(statusCode) {
      // 12478已结束
      // 9待响应
      // 56服务中
      switch (statusCode) {
        case 0:
        case 1:
        case 2:
        case 4:
        case 7:
        case 8:
          this.time = 0;
          this.order = 0;
          break;
        case 5:
          this.time = 0;
          this.order = 0;
          break;
        case 6:
          this.time = JSON.parse(JSON.stringify(this.row.remainTime));
          this.order = 1; // 表示咨询中状态
          if (this.time >= 0) {
            this.isOver = false; // 表示咨询服务还没超时
          } else {
            this.isOver = true; // 表示咨询服务已经超时
          }
          break;
        case 9:
          if (this.row.remainTime > 0) {
            this.order = 2; // 未超时
            this.time = JSON.parse(JSON.stringify(this.row.remainTime));
          } else {
            this.order = 3; // 超时状态
            this.time = JSON.parse(JSON.stringify(this.row.overTime));
          }
          break;
        default:
          this.time = 0;
          this.order = 0;
      }
    },
    timeCalc(time) {
      this.showTime = this.formatSeconds(time);
    },
    showTimess() {
      this.timer = setInterval(() => {
        this.time = this.time + 1;
        // 订单类似是未响应并且超时了
        if (this.order === 2 && this.time <= 0) {
          this.order = 3; // 由响应时间变为响应超时状态
        }
        // 表示服务中的剩余时间变为超过服务时间，获取当前时间未结束服务时间
        if (this.order === 1 && this.time <= 0) {
          this.isOver = true;
        }
      }, 1000);
      
    },
    formatSeconds(value) {
      let theTime = Math.abs(value); // 取绝对值：秒
      let middle = 0; // 分
      let hour = 0; // 小时
      let d = 0; // 天
      let result = '';
      if (theTime > 60) {
        middle = parseInt(theTime / 60);

        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
          if (hour > 24) {
            d = parseInt(hour / 24);
            hour = hour % 24;
          }
        }
      }
      result =
        (d > 0 ? d + '天 ' : '') +
        (hour < 10 ? '0' + hour : hour) +
        ':' +
        (middle < 10 ? '0' + middle : middle) +
        ':' +
        (theTime < 10 ? '0' + theTime : theTime);

      let statusCode = this.row.statusCode;
      let txt = '';
      txt = value > 0 ? ('响应时间超时：' + result) : (txt = '剩余响应时间：' + result)
      return txt;
    }
  }
};
</script>
