<template>
  <div class="roadWrapper">
    <div class="road">
      <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
        <van-list
          v-model="isUpLoading"
          :finished="upFinished"
          :immediate-check="false"
          :offset="10"
          finished-text="我是有底线的"
          @load="onLoadList"
        >
          <div v-if="dtWinNumberInfos.length > 0" class="allcontent">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in dtWinNumberInfos"
                :key="index"
                :hide-timestamp="true"
                color="#0bbd87"
              >
                <div class="timeWrapper" >
                  <div class="titleText">{{ activity.title }}</div>
                  <div>{{ activity.createtime.substring(0, 10) }}</div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-if="+dtWinNumberInfos.length == 0" >暂无数据</div>
  </div>
</template>

<script>
import { getRankPage } from "@/api/questionnaire/api-questionnaire";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      dtWinNumberInfos: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
    };
  },
  components: {},
  mounted() {
    this.initUI();
  },
  computed:{
    ...mapGetters(['examId'])
  },
  methods: {
    initUI() {
      this.getTableData()
    },
    onDownRefresh() {
      this.pageIndex = 1
      this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getTableData() // 加载数据
    },
    // 上拉加载请求方法
    onLoadList() {
      this.pageIndex++
      this.getTableData()
    },
    getTableData() {
      getRankPage({
        searchCount: true,
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
        sort: [],
        orderField: [],
        condition: {
          examId: this.examId || "",
        }
      }).then(res => {
        if (res.code === 200) {
          this.dtWinNumberInfos = res.data.records;
        } else {
          this.$toast.fail(res.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.roadWrapper {
  /deep/ .el-timeline-item__tail {
    border-left: 2px solid #1bc375;
    padding: 0px 0;
  }
  .road {
    padding: 20px;
    .allcontent {
      padding: 15px 10px;
      border: 1px solid #fff;
      border-radius: 8px;
      .roadContent {
        padding-top: 10px;
        padding-bottom: 25px;
        padding-left: 15px;
        padding-right: 15px;
        display: flex;
        justify-content: space-between;
        .dataText {
          color: #fff;
          font-size: 14px;
        }
      }
      .timeWrapper {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #fff;
        padding: 15px 0;
        .titleText {
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
