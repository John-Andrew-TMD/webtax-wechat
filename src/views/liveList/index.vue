<template>
  <div class="roadWrapper" ref="roadWrapper" id="app">
    <!-- 列表 -->
    <div class="road">
      <van-sticky :container="roadWrapper">
        <search-dropdown @init="onDownRefresh"></search-dropdown>
        <com-result
          v-if="listParams.condition && listParams.condition.searchCondition"
        ></com-result>
      </van-sticky>
      <van-pull-refresh
        v-model="isDownLoading"
        @refresh="onDownRefresh"
        loading-text="加载中"
      >
        <van-list
          v-if="list.length > 0"
          v-model="isUpLoading"
          :finished="upFinished"
          finished-text="没有更多了"
          :offset="1"
          loading-text="加载中"
          @load="onLoadList"
          :immediate-check="false"
        >
          <div class="allcontent">
            <div v-for="item in list" :key="item" class="mb-20">
              <router-link
                :to="{
                  path: '/liveDetail',
                  query: {
                    id: item && item.id,
                  },
                }"
              >
                <com-card :info="item"></com-card>
              </router-link>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-empty
      v-if="list.length == 0 && !isUpLoading"
      class="custom-image"
      :image="empty"
      description="没有搜索到相关信息"
    />
  </div>
</template>
<style lang="scss" scoped>
.roadWrapper {
  background-color: #f5f5f5;
  .road {
    .allcontent {
      background: #fff;
      padding: 15px;
      border-radius: 8px;
    }
  }
  .custom-image {
    width: 100%;
    background: #fff;
  }
}
</style>
<script>
import jsCookies from "js-cookie";
import ComCard from "./components/ComCard.vue";
import ComResult from "./components/ComResult.vue";
import searchDropdown from "./components/search-dropdown/index.vue";
import { getList } from "@/api/liveList";
import { wxConfig } from "@/utils/wxConfig";
import { getEncrypted } from "@/utils/util";
import { wxChatShare } from "@/utils/wechat"; // 引入wechat.js
import { mapGetters } from "vuex";
export default {
  components: {
    ComCard,
    ComResult,
    searchDropdown,
  },
  provide() {
    return {
      reloadList: this.onDownRefresh,
    };
  },
  data() {
    return {
      roadWrapper: null,
      list: [],
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      upFinished: false,
      empty: require("@/assets/imgs/icon.png"),
    };
  },
  computed: {
    token() {
      return jsCookies.get("token");
    },
    ...mapGetters({
      listParams: "listParams",
      listResult: "listResult",
    }),
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next((vm) => {
      // 通过 `vm` 访问组件实例
      if(from.name!=null){
        if(to.name!=from.name){
           window.location.reload();
        }
      }
    });
  },
  activated() {
    this.init();
  },
  methods: {
    // goBack() {
    //   window.location.reload();
    // },
    init() {
      this.onLoad();
      this.$store.dispatch("getFilterlist");
      this.setShare(getEncrypted(window.location.href, wxConfig.appid));
      this.roadWrapper = this.$refs.roadWrapper;
    },
    setShare(mk) {
      wxChatShare({
        studentId: 1, // 个人项目而定
        activityId: 1, // 个人项目而定
        data: {
          url: window.location.href, // 当前页面url
          mk,
        },
        title: "财税课堂", // 标题
        desc: "您想要的财税课堂这里都有，快过来看看吧！每周三晚8点新课上线。", // 描述
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          "https://webtax-sz.oss-cn-shenzhen.aliyuncs.com/image/2021/03/30/livevx.png", // 分享数据配置  －－ 全路径
        type: "link", // 分享类型,music、video或link，不填默认为link
        dataUrl: " ", // 如果type是music或video，则要提供数据链接，默认为空
      });
    },
    onDownRefresh() {
      this.pageIndex = 1;
      this.upFinished = false; // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.onLoad(); // 加载数据
    },
    onLoadList() {
      // debugger
      this.pageIndex++;
      this.onLoad();
    },
    handleRoadDetail(activity) {
      this.$router.push({
        path: "/live",
        query: {
          id: activity && activity.id,
        },
      });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      this.isUpLoading = true;
      let condition = {
        taxIdList: this.listParams.condition.taxTags,
        teacherList: this.listParams.condition.livePlaybackTeachers,
        liveTypeIdList: this.listParams.condition.livePlaybackTypes,
        searchCondition: this.listParams.condition.searchCondition,
      };
      getList({
        searchCount: true,
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        orderField: [],
        condition: condition,
      })
        .then((res) => {
          this.isUpLoading = false;
          if (res.code == 200) {
            this.$store.commit("SET_LISTRESULT", res.data.total);
            let rows = res.data.records;
            if (rows == null || rows.length === 0) {
              // 加载结束
              this.list = rows;
              this.upFinished = true;
              return;
            }
            if (this.pageIndex == res.data.pages) {
              // 最后一页不足10条的情况、
              this.upFinished = true;
            }
            if (this.pageIndex == 1) {
              this.list = res.data.records;
            } else {
              this.list = this.list.concat(rows);
            }
          }
        })
        .finally(() => {
          this.isDownLoading = false;
        });
    },
  },
};
</script>