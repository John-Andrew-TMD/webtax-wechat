<template>
  <ul class=" mt-10">
    <li
      class="app-list-item mb-10"
      v-for="(item, index, key) in tableData"
      :key="key"
    >
      <div class="menber-avatar mr-5">
        <img :src="item.inviteAvatar" alt="" srcset="">
      </div>
      <div class="member-name">{{ item.inviteMemberName || "用户名" }}</div>
      <div class="member-recordIndex">
        {{item.completeTime}}
      </div>
    </li>
  </ul>
</template>

<script>
// import { getExamInviteRecord } from "@/api/questionnaire/api-questionnaire";
export default {
  props:{
    tableData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data() {
    return {
    };
  },
  components: {},
  mounted() {
    this.initUI();
  },
  methods: {
    initUI() {
      // getExamInviteRecord({
      //    examId: 1
      // }).then(res => {
      //   if (res.code === 200) {
      //     this.tableData = res.data;
      //   } else {
      //     this.$toast.fail(res.message);
      //   }
      // });
    }
  }
};
</script>
<style lang="scss" scoped>

.app-list-item:not(:last-child){
    padding-bottom: 4%;
    border-bottom: 1px dashed #233d7b;
}
.app-list-item {
  color: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: no-wrap;
  .menber-avatar {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }

  .member-name {
    font-size: 14px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    .p1 {
      font-size: 14px;
    }
    .p2 {
      font-size: 12px;
      margin-top: 3%;
    }
  }
  .member-recordIndex {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
