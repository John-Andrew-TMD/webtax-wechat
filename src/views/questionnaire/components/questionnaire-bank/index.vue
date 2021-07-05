<template>
  <div class="app-content-wrapper" style="padding-bottom: 0px">
    <div class="app-top"></div>
    <div class="app-bottom">
      <comp-ewm
        :manStyle="{ left: '10px', transform: 'scale(-1,1)' }"
      ></comp-ewm>
      <comp-frames :options="{ title: '活动方式' }">
        <van-skeleton title :row="4" :loading="loading">
          用户可通过“深圳市注册会计师协会”“深圳税协”和“答税”微信公众号，参与在线答题闯关活动。
        </van-skeleton>
      </comp-frames>
      <comp-frames :options="{ title: '活动内容' }">
        <van-skeleton title :row="4" :loading="loading">
          本次活动以会计和所有税种知识为内容，题目包括判断题、单选题和多选题，题目主要是由行业协会专家、财税行业资深人士与高校教授联合出题，题库总量高达6500多道题。
        </van-skeleton>
      </comp-frames>
      <comp-frames
        :options="{ title: '活动规则', contentStyle: { textIndent: '0em' } }"
      >
        <van-skeleton title :row="4" :loading="loading">
          <ol>
            <li>
              <span style="font-family: 微软雅黑;">竞赛分</span
              >&ldquo;普通版&rdquo;与&ldquo;挑战版&rdquo;两种模式，<span
                style="font-family: 微软雅黑;"
                >每种模式各有</span
              >30<span style="font-family: 微软雅黑;"
                >级，用户可自选模式；</span
              >
            </li>
            <li>
              <span style="font-family: 微软雅黑;">每级有</span
              >6道题，每题答题时间根据题目难易度分别限时30秒、45秒、60秒等等，<span
                style="font-family: 微软雅黑;"
                >单次全部答对</span
              >6道题，则<span style="font-family: 微软雅黑;"
                >可成功晋升下一级</span
              ><span style="font-family: 微软雅黑;">；</span>
            </li>
            <li>
              <span style="font-family: 微软雅黑;">每人每天共有</span>3次<span
                style="font-family: 微软雅黑;"
                >答题</span
              ><span style="font-family: 微软雅黑;">闯关</span
              ><span style="font-family: 微软雅黑;">升级</span
              ><span style="font-family: 微软雅黑;">机会</span
              ><span style="font-family: 微软雅黑;"
                >，每晋升一级，即可获得晋级红包奖励；</span
              >
            </li>
            <li>
              <span style="font-family: 微软雅黑;"
                >活动晋级红包可直接提现，红包总量</span
              ><span style="font-family: 微软雅黑;"
                >有限，先到先得，送完即止。<br /><br
              /></span>
            </li>
          </ol>
        </van-skeleton>
      </comp-frames>
      <comp-frames
        :options="{ title: '活动奖励', contentStyle: { textIndent: '0em' } }"
      >
        <van-skeleton title :row="4" :loading="loading">
          <ol>
            <li>
              <span style="font-family: 微软雅黑;">晋级</span
              ><span style="font-family: 微软雅黑;">奖励：每晋</span
              ><span style="font-family: 微软雅黑;">升一级，</span
              ><span style="font-family: 微软雅黑;">即可</span
              ><span style="font-family: 微软雅黑;"
                >获得一次晋级红包奖励，晋级越多，红包奖励越多</span
              ><span style="font-family: 微软雅黑;">；</span>
            </li>
            <li>
              学时奖励：在活动结束后，按晋级总级数进行排名（普通版与挑战版合计），晋级总级数排名前100名用户，可以同时抵扣深圳注协和深圳税协的继续教育32个学时（2021年度），同时可获得主办单位颁发的认证证书一份；
            </li>
            <li>
              ACCA
              CPD学时奖励：在活动结束后，按晋级总级数（普通模式与挑战模式合计）乘以0.5个学时，作为2021年的CPD学时，最高不超过10个CPD学时；&nbsp;
            </li>
            <li>
              软件使用权奖励：在活动结束后，按晋级总级数进行排名（普通版与挑战版合计），晋级总级数排名前100名用户，可以获得深圳股交&middot;政策通软件使用权（使用期一年），以及金蝶精斗云V3.0财税通/用友畅捷通软件使用权（使用期一年）（总价值2800元）；
            </li>
            <li>
              排行榜奖励：活动结束后，按晋级总级数进行排名（普通模式与挑战模式合计），晋级总级数排名前20名的用户可获得如下奖励：<br/>
              （注：在晋级总级数相同情况下，以挑战版通关级数多者排名，若两种模式晋级级数相同，则按时间先后进行排名）&nbsp;<span
                style="font-family: 微软雅黑;"
                ><br /><br
              /></span>
            </li>
          </ol>
          <div class="app-price">
            <img
              src="~@/assets/imgs/questionnaire/price.png"
              alt=""
              srcset=""
            />
          </div>
        </van-skeleton>
      </comp-frames>
      <comp-ewm :manStyle="{ right: '10px' }"></comp-ewm>

      <div class="wrap">
        <div>注：本次活动最终解释权归主办方所有</div>
      </div>
      <!-- <div class="con">
        <div></div>
        <p>注：本次活动最终解释权归主办方所有</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import CompEwm from "./components/CompEwm";
import CompFrames from "./components/CompFrames";
import { wxChatShare } from "@/utils/wechat";
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
export default {
  components: {
    CompEwm,
    CompFrames
  },
  props: {},
  data() {
    return {
      loading: false
    };
  },
  computed: {},
  created() {
    this.setShare(getEncrypted(window.location.href, wxConfig.appid));
  },
  mounted() {
    document.onreadystatechange = function() {
      if (document.readyState == "complete") {
        // 页面加载完毕
        this.loading = true;
      }
    };
  },
  destroyed() {},
  methods: {
    setShare(mk) {
      wxChatShare({
        studentId: 1, // 个人项目而定
        activityId: 1, // 个人项目而定
        data: {
          url: window.location.href, // 当前页面url
          mk
        },
        title: "粤港澳大湾区财税知识竞赛", // 标题
        desc: "财税知识简单答，现金红包马上拿！~~~", // 描述
        link: `http://${window.location.host}/mp/questionnaire/bank`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/webtax/image/quiz.png", // 分享数据配置  －－ 全路径
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: " " // 如果type是music或video，则要提供数据链接，默认为空
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14px;
}
.wrap div {
  display: inline-block;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b1accb;
  line-height: 14px;
}
/*CSS伪类用法*/
.wrap div:after,
.wrap div:before {
  position: absolute;
  top: 50%;
  background: #b1accb;
  content: "";
  height: 1px;
  width: 21%;
}
/*调整背景横线的左右距离*/
.wrap div:before {
  left: 0;
}
.wrap div:after {
  right: 0;
}
/* 
.con {
  position: relative;
  width: 100%;
  height: 14px;
  line-height: 14px;
  text-align: center;
}
.con div {
  display: block;
  height: 1px;
  background: #b1accb;
  position: absolute;
  top: 7px;
  width: 100%;
}
.con p {
  display: inline-block;
  font-size: 10px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b1accb;
  line-height: 14px;
  background: rgb(3, 22, 66);
  text-align: center;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding: 0 10px;
} */

/deep/ ol {
  list-style: decimal !important;
  padding-left: 6%;
}
.app-price {
  width: 100%;
  margin-top: 20px;
}
.app-content-wrapper {
  height: 100%;
  img {
    width: 100%;
  }
  .app-top {
    background: url("~@/assets/imgs/questionnaire/bankBg.png") no-repeat center
      center;
    background-size: contain;
    padding: 0 20px;
    position: relative;
    background-position-y: bottom;
    padding-top: 126.133%;
  }
  .app-bottom {
    width: 86.67%;
    margin: 0 auto;
    & > div {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}
</style>
