<template>
        <p><img src="https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/image/2020/12/14/16079100421909.png" width="100%" /></p>

<!-- <div v-html = "content"></div> -->
  <!-- <div class="app-content-wrapper price-content">
    <div class="price-bg"></div>
    <div class="price-wrapper padding20">
      <com-app-bottom componentName="CompPriceRed">
        <template slot-scope="">
          每次闯关，每答对一题，都可获得与答对题目数相对应权重的随机红包。全部答对，即有机会领取最高千元现金红包。
        </template>
      </com-app-bottom>
      <com-app-bottom class="com-app-bottom" componentName="CompPriceRank">
        <div class="slot-content">
          <div class="slot-tip">
            每次闯关成功，通关次数计入总榜，参与排名。
            在活动结束以后，总榜前三名可获得实物大奖。
          </div>
          <ul class="slot-ranks">
            <li>
              <div class="slot-frame">
                <div class="slot-img" >
                  <img src="~@/assets/imgs/questionnaire/r2.png" alt="" srcset="">
                </div>
              </div>
              <div class="slot-grade">第二名</div>
              <div class="slot-detail">DJI 大疆 御 Mavic Mini</div>
            </li>
            <li class="img-one">
              <div class="slot-frame ">
                <div class="slot-img ">
                  <img src="~@/assets/imgs/questionnaire/r1.png" alt="" srcset="">
                </div>
              </div>
              <div class="slot-grade">第一名</div>
              <div class="slot-detail">华为Mate30 Pro 5G</div>
            </li>
            <li>
              <div class="slot-frame">
                <div class="slot-img">
                  <img src="~@/assets/imgs/questionnaire/r3.png" alt="" srcset="">
                </div>
              </div>
              <div class="slot-grade">第三名</div>
              <div class="slot-detail">Kindle Paperwhite</div>
            </li>
          </ul>
        </div>
      </com-app-bottom>
    </div>
  </div> -->
</template>

<script>
import { getRulesText } from "@/api/questionnaire/api-questionnaire";
export default {
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      content:""
    };
  },
  computed: {},
  components: {
    // ComAppBottom: () => import("compQuestionnaire/ComAppBottom")
  },
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
       getRulesText({
        id:"c67bea0c1bce42b08e937ac9df105c25"
      }).then(res=>{
        this.content = res.data.content
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.price-bg {
  width: 100%;
  padding-top: 80%;
  background: url("~@/assets/imgs/questionnaire/price-bg.png") no-repeat center
    center;
  background-size: contain;
}
.price-wrapper > * {
  margin-top: 50px;
}
.com-app-bottom /deep/ {
  .slot-ranks {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    margin-top: 24px;

    li {
      width: 71px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      min-height: 3.3rem;

      .slot-grade {
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        position: relative;
        width: 65px;
        height: 12px;
        background: #5062fb;
        border-radius: 6px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .slot-frame {
        flex: 1;
        .slot-img {
          width: 57px;
          /* height: 57px; */
          border-radius: 100%;
          /* overflow: hidden; */
          /* background-color: #fff; */
        }
      }

      .slot-detail {
        color: #eeeeee;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        margin-top: 6px;
      }
    }
    .img-one {
      min-height: 3.7rem;
      .slot-img {
        width: 71px !important;
        height: 71px !important;
      }
    }
  }
}
</style>
