<template>
  <div class="expert-wrapper">
    <!-- <van-nav-bar title="专家信息" fixed left-text right-text left-arrow @click-left="onClickLeft" /> -->
    <div class="user d-flex">
      <div class="user-left a-self-start">
        <van-image
          class="user-avator"
          width="56"
          height="56"
          :src="info.avatar ? info.avatar : avatar"
        />
      </div>
      <div class="user-right flex-1 d-flex flex-column">
        <div class="d-flex a-center">
          <span class="user-name">{{info.expertName}}</span>
          <span class="user-dir"></span>
          <span class="user-num">专家编号：{{info.expertNo}}</span>
        </div>
        <div v-if="tagsList&&tagsList.length > 0" class=" d-flex a-center flex-wrap">
          <span class="user-tag" v-for="(item, index) in tagsList" :key="index">{{item}}</span>
        </div>
        <div class="user-info">{{info.synopsis}}</div>
      </div>
    </div>
    <div class="line10"></div>
    <div class="ability">
      <div class="ability-tag l-tags">能力评估</div>
      <div class="ml-15 d-flex a-center ability-sum">
        <span class="ability-title">综合能力</span>
        <van-rate
          v-model="info.comprehensiveAbility"
          allow-half
          readonly
          :size="25"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
          class="flex-1"
        />
        <span class="rate-score">{{info.comprehensiveAbility}}</span>
      </div>
      <van-divider />
      <div v-if="info && info.abilitys && info.abilitys.length >0">
        <div class="ml-15 d-flex a-center ability-analyze" v-for="(item,index) in info.abilitys" :key="index">
          <span class="ability-title">{{item.ability}}</span>
          <van-rate
            v-model="item.starLevel"
            allow-half
            readonly
            :size="25"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
      </div>
    </div>
    <div class="item-box mt-20" v-if="info.taxTags && info.taxTags.length>0">
      <div class="l-tags">擅长税种</div>
      <ul class="clr ul-box">
        <li class="item-li fl" v-for="item in info.taxTags" :key="item.code">{{item.text}}</li>
      </ul>
    </div>
    <div class="item-box mt-20" v-if="info.industrys&&info.industrys.length>0">
      <div class="l-tags">行业专长</div>
      <ul class="clr ul-box">
        <li class="item-li fl" v-for="item in info.industrys" :key="item">{{item}}</li>
      </ul>
    </div>
    <div class="item-box mt-20" v-if="info.serviceFields&&info.serviceFields.length>0">
      <div class="l-tags">服务领域</div>
      <ul class="clr ul-box">
        <li class="item-li fl" v-for="item in info.serviceFields" :key="item">{{item}}</li>
      </ul>
    </div>
    <div class="item-box mt-20" v-if="info.intro">
      <div class="l-tags">专家介绍</div>
      <p v-html="info.intro" class="user-info"></p>
    </div>
  </div>
</template>
<script>
import { detailById } from '@/api/expert'
export default {
  name: 'expert',
  components: {},
  data() {
    return {
      avatar: require('@/assets/icons/avatar.png'),
      id: this.$route.params.id,
      info: {},
      tagsList: []
    };
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    getDetail() {
      detailById(this.id).then(res=>{
        if (res.code == 200 && res.success) {
          this.info = res.data
          let gradeInfos = res.data.expertGroupInfo.gradeInfos
          let n = []
          gradeInfos.map(v=>{
            n.push(v.text)
          })
          let groupNames = res.data.expertGroupInfo.groupNames
          this.tagsList = [...n, ...groupNames]
        } else {
          this.$toast.fail(res.message);
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.expert-wrapper {
  /deep/ {
    .van-nav-bar .van-icon-arrow-left {
      color: #333333;
    }
  }
  .user {
    padding: 15px;
  }
  .user-left {
    margin-right: 15px;
  }
  .user-avator {
    border-radius: 4px;
    overflow: hidden;
  }
  .user-name {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .user-num {
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
  .user-info {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 17px;
    margin-top: 6px;
  }
  .user-dir {
    width: 1px;
    height: 14px;
    background-color: rgba(153, 153, 153, 1);
    margin: 0 6px;
  }
  .user-tag {
    font-size: 12px;
    background: rgba(226, 181, 137, 0.4);
    color: #cc9a6a;
    margin-right: 6px;
    border-radius: 4px;
    overflow: hidden;
    padding: 2px 4px;
    margin-bottom: 4px;
  }
  .ability-tag {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .ability {
    padding: 20px 15px;
  }
  .rate-score{
    font-size:28px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,89,72,1);
    line-height:40px;
  }
  .ability-tag {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  .l-tags::before {
    width: 3px;
    height: 15px;
    border-radius: 1px;
    position: relative;
    top: 2px;
  }
  .ability-sum {
    margin-top: 15px;
  }
  .ability-title {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-right: 15px;
  }

  .item-box {
    padding: 0px 15px 15px 15px;
    .l-tags {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .ul-box{
      padding-left: 14px;
    }
    .item-li {
      min-width: 66px;
      padding: 8px;
      background: rgba(255, 255, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(221, 221, 221, 1);
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-right: 10px;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>