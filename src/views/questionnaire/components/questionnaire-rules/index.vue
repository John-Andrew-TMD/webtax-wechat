<template>
  <div class="app-content-wrapper">
    <div class="app-content-rules padding25">
      <router-link
        :to="{
          path: '/questionnaire/price',
          query: this.$route.query
        }"
      >
        查看奖励说明＞
      </router-link>
      <div class="rules-content">
        <div class="rules-fixed"></div>
        <p>
          <strong
            ><span style="font-family: 微软雅黑;">一、活动时间</span></strong
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          开始时间：2020<span style="font-family: 微软雅黑;">年</span>12<span
            style="font-family: 微软雅黑;"
            >月</span
          >11<span style="font-family: 微软雅黑;">日</span>17:00
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          结束时间：2021<span style="font-family: 微软雅黑;">年0</span
          >1月11<span style="font-family: 微软雅黑;">日</span>24:00<br /><br />
        </p>
        <p>
          <strong
            ><span style="font-family: 微软雅黑;">二、活动方式</span></strong
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          <span style="font-family: 微软雅黑;">用户可通过</span
          >&ldquo;答税&rdquo;、&ldquo;深圳市注册会计师协会&rdquo;和&ldquo;深圳税协&rdquo;微信公众号，参与在线答题闯关活动。<br /><br />
        </p>
        <p>
          <strong
            ><span style="font-family: 微软雅黑;">三、活动内容</span></strong
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          <span style="font-family: 微软雅黑;"
            >本次活动以会计和所有税种知识为内容，</span
          ><span style="font-family: 微软雅黑;"
            >题目包括判断题、单选题和多选题，题目主要是由行业协会专家、财税行业资深人士与高校教授联合出题，题库总量高达</span
          >6500<span style="font-family: 微软雅黑;">多道题。<br /><br /></span>
        </p>
        <p>
          <strong
            ><span style="font-family: 微软雅黑;">四、活动规则</span></strong
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          1.&nbsp;<span style="font-family: 微软雅黑;">竞赛分</span
          >&ldquo;普通版&rdquo;与&ldquo;挑战版&rdquo;两种模式，<span
            style="font-family: 微软雅黑;"
            >每种模式各有</span
          >30<span style="font-family: 微软雅黑;">级，用户可自选模式；</span>
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          2.&nbsp;<span style="font-family: 微软雅黑;">每级有</span
          >6道题，每题答题时间根据题目难易度分别限时30秒、45秒、60秒等等，<span
            style="font-family: 微软雅黑;"
            >单次全部答对</span
          >6道题，则<span style="font-family: 微软雅黑;">可成功晋升下一级</span
          ><span style="font-family: 微软雅黑;">；</span>
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          3.&nbsp;<span style="font-family: 微软雅黑;">每人每天共有</span
          >3次<span style="font-family: 微软雅黑;">答题</span
          ><span style="font-family: 微软雅黑;">闯关</span
          ><span style="font-family: 微软雅黑;">升级</span
          ><span style="font-family: 微软雅黑;">机会</span
          ><span style="font-family: 微软雅黑;"
            >，每晋升一级，即可获得晋级红包奖励；</span
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          4.
          <span style="font-family: 微软雅黑;"
            >活动晋级红包可直接提现，红包总量</span
          ><span style="font-family: 微软雅黑;"
            >有限，先到先得，送完即止。<br /><br
          /></span>
        </p>
        <p>
          <strong
            ><span style="font-family: 微软雅黑;">五、活动奖励</span></strong
          >
        </p>
        <p style="text-indent: 2em; line-height: 2;">
          1. <span style="font-family: 微软雅黑;">晋级</span
          ><span style="font-family: 微软雅黑;">奖励：每晋</span
          ><span style="font-family: 微软雅黑;">升一级，</span
          ><span style="font-family: 微软雅黑;">即可</span
          ><span style="font-family: 微软雅黑;"
            >获得一次晋级红包奖励，晋级越多，红包奖励越多</span
          ><span style="font-family: 微软雅黑;">；</span>
        </p>
        <p style="text-indent: 24pt; line-height: 2;">
          2.
          学时奖励：在活动结束后，按晋级总级数进行排名（普通版与挑战版合计），晋级总级数排名前100名用户，可以同时抵扣深圳注协和深圳税协的继续教育32个学时（2021年度），同时可获得主办单位颁发的认证证书一份；
        </p>
        <p style="text-indent: 24pt; line-height: 2;">
          3. ACCA
          CPD学时奖励：在活动结束后，按晋级总级数（普通模式与挑战模式合计）乘以0.5个学时，作为2021年的CPD学时，最高不超过10个CPD学时；&nbsp;
        </p>
        <p style="text-indent: 24pt; line-height: 2;">
          4.
          软件使用权奖励：在活动结束后，按晋级总级数进行排名（普通版与挑战版合计），晋级总级数排名前100名用户，可以获得深圳股交&middot;政策通软件使用权（使用期一年），以及金蝶精斗云V3.0财税通/用友畅捷通软件使用权（使用期一年）（总价值2800元）；
        </p>
        <p style="text-indent: 24pt; line-height: 2;">
          5.
          排行榜奖励：活动结束后，按晋级总级数进行排名（普通模式与挑战模式合计），晋级总级数排名前20名的用户可获得如下奖励：
        </p>
        <p style="text-indent: 24pt; line-height: 2;">
          （注：在晋级总级数相同情况下，以挑战版通关级数多者排名，若两种模式晋级级数相同，则按时间先后进行排名）&nbsp;<span
            style="font-family: 微软雅黑;"
            ><br /><br
          /></span>
        </p>
        <table
          style="border-collapse: collapse; width: 100%;"
          border="1"
          cellspacing="0"
        >
          <tbody>
            <tr>
              <td valign="top" width="178">
                <p align="center"><strong>排名</strong></p>
              </td>
              <td valign="top" width="178">
                <p align="center"><strong>奖励级别</strong></p>
              </td>
              <td valign="top" width="178">
                <p align="center"><strong>奖品</strong></p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第1名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">特等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">10,000元现金</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第2名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">一等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">1台MacBook Air</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第3名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">二等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">1台iphone 12手机</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第4名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">三等级</p>
              </td>
              <td valign="top" width="178">
                <p align="center">1台iPad 2020</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第5-7名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">四等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">2000元现金/人</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第8-10名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">五等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">1000元现金/人</p>
              </td>
            </tr>
            <tr>
              <td valign="top" width="178">
                <p align="center">第11-20名</p>
              </td>
              <td valign="top" width="178">
                <p align="center">六等奖</p>
              </td>
              <td valign="top" width="178">
                <p align="center">500元现金/人</p>
              </td>
            </tr>
          </tbody>
        </table>
        <p>&nbsp;</p>
        <p style="text-align: center;">
          <strong
            ><span style="font-family: 微软雅黑;">联系我们<br /><br /></span
          ></strong>
        </p>
        <p style="line-height: 2; text-align: center;">联系电话：4008123663</p>
        <p style="line-height: 2; text-align: center;">客服微信号：WebTax_01</p>
        <p style="line-height: 2; text-align: center;">
          邮箱：service@webtax.com.cn
        </p>
      </div>
    </div>
  </div>
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
      content: ""
    };
  },
  computed: {},
  components: {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      getRulesText({
        id: "7d1bb5efc29c4345b19fbd247aba6fc1"
      }).then(res => {
        this.content = res.data.content;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../css/rules-and-price.scss";
dd {
  text-indent: 2em;
}
</style>
