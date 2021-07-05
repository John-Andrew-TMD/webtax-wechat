<template>
  <div class="rank-frame">
    <div class="rank-content">
      <div class="rank-content-wrapper">
        <!-- <ul>
            <li
              v-for="(item, index, key) in rankType"
              :key="key"
              :class="{ active: currentIndex == index }"
              @click="handleTabClick(index)"
            >
              {{ item }}
            </li>
         
          </ul> -->
      </div>
      <div class="app-bottom">
        <div class="app-box">
          <comp-list
            :options="{
              requestParams: {
                url: '/rank/page',
                data: {
                  searchCount: true,
                  pageNo: 1,
                  pageSize: 100,
                  condition: {
                    examId: examId || ''
                  }
                }
              },
              showFixed: true,
              showPagination: false,
              showNodata: '排行榜暂无记录'
            }"
            :headData="headData"
            ref="compList"
          ></comp-list>
        </div>
        <!-- @get-table-data="getTableData" -->
      </div>
    </div>

    <router-link
      :to="{
        path: '/questionnaire/price',
        query: this.$route.query
      }"
      class="app-fixed"
      >奖励说明</router-link
    >
  </div>
</template>

<script>
import CompList from "compQuestionnaire/CompList";
import jsCookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  props: {
    routeParams: {
      type: Object,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["examId"])
  },
  data() {
    return {
      headData: [
        {
          span: "3",
          name: "排行",
          prop: "rankingNum",
          filter: res => {
            if (+res.rankingNum <= 3) {
              return `<div  class="member-ser">
                <img
                  class="member-index-img"
                  src="${require(`assets/imgs/questionnaire/${res.rankingNum}@2x.png`)}"
                  alt=""
                  srcset=""
                />
              </div>`;
            } else {
              return `<div v-else class="member-ser" style = "font-size:18px">${res.rankingNum}</div>`;
            }
          }
        },
        {
          span: "9",
          name: "用户",
          prop: "memberName",
          style: {
            textAlign: "left"
          },
          filter: res => {
            return `
            <div class = "app-list-item">
            <div class="menber-avatar mr-5">
                    <img src="${res.avatar}" alt="" srcset="" />
                  </div>
            <div class="member-name">${res.memberName || "用户名"}</div>
            </div>
            `;
          }
        },
        {
          span: "4",
          name: "普通版",
          prop: "generalNum",
          filter: res => {
            return res.generalNum + "关";
          }
        },
        {
          span: "4",
          name: "挑战版",
          prop: "difficultNum",
          filter: res => {
            return res.difficultNum + "关";
          }
        },
        {
          span: "4",
          name: "总闯关",
          prop: "totalNum",
          filter: res => {
            return `<span style='font-size:18px'>${res.difficultNum +
              res.generalNum}</span>关`;
          }
        }
      ],
      rankUserInfo: {
        sumRedpack: 0,
        recordIndex: 0
      }
    };
  },
  components: {
    CompList: CompList
  },
  mounted() {
  },
  methods: {
 
  }
};
</script>
<style lang="scss" scoped>
.app-bottom {
  width: 92%;
  margin: 0 auto;
  padding-bottom: 41px;
  margin-top: -49px;
  position: relative;
  & > div {
    width: 100%;
  }
  .app-box {
    width: 100%;
    /* min-height: 6.24rem; */
    background: #1c2d55;
    border-radius: 8px;
    // opacity: 0.1;
    padding: 15px 15px 30px;
    border: 1px solid #233d7b;
    font-size: 14px;
    color: #fff;
    line-height: 20px;
  }
}
.app-fixed {
  display: inline-block;
  position: fixed;
  right: 0;
  top: 20%;
  width: 20px;
  height: 62px;
  background: rgba(255, 89, 72, 1);
  border-radius: 2px 0px 0px 2px;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  line-height: 13px;
  text-align: center;
  padding-top: 1%;
}
.rank-frame {
  height: 100%;
  width: 100%;
}
.app-list-item:not(:last-child) {
  border-bottom: 1px dashed #233d7b;
}

.rank-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  .rank-content-wrapper {
    width: 100%;
    padding-top: 74.67%;
    background: url("~@/assets/imgs/questionnaire/rank_bg.png") no-repeat center
      center;
    background-size: cover;
    padding-bottom: 0px !important;
    position: relative;
    .rank-top-three {
      & > li {
        color: #fff;
        font-size: 14px;
        position: absolute;
        text-align: center;
        span {
          display: block;
          width: 70px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .s1 {
          font-size: 12px;
          color: #eee;
        }
        .li-img {
          display: inline-block;
          position: absolute;
          left: 0;
          top: -25%;
          width: 72px;
          height: 72px;
          border: 5px solid #8e92c4;
          background-color: #fff;
          border-radius: 100% !important;
          -webkit-appearance: none;
          transform: translateY(-100%);
          overflow: hidden !important;
          img {
            border-radius: 100% !important;
            -webkit-appearance: none;
            overflow: hidden !important;
            width: 100%;
          }
        }
      }
      .p2 {
        left: 13%;
        top: 43%;
      }
      .p1 {
        left: 40%;
        top: 36%;
      }
      .p3 {
        right: 11%;
        top: 49%;
      }
    }
    .app-content-bottom {
      position: absolute;
      bottom: 15px;
      left: 0;
      width: 100%;
      padding-top: 14.13%;
      background: url("~@/assets/imgs/questionnaire/rank-bg-bottom.png")
        no-repeat center center;
      background-size: cover;
      ul {
        width: 92%;
        height: 44px;
        background: #1c2d55;
        border-radius: 23px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;
        .active {
          background: #ffd07c;
          border-radius: 23px;
          color: #333333;
        }
        li {
          width: 50%;
          height: 100%;
          color: #fff;
          font-size: 18px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

    .app-content-rules {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding-top: 4.2rem;
      padding-bottom: 1rem;
      & > a {
        color: #fff;
        font-size: 14px;
        margin-top: 100px;
      }
    }
  }
}
</style>
