	
<template>
  <div class="skeleton-zinde">
    <content-loader
      :height="1000"
      :width="375"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <!-- 标题 -->
      <rect x="10" :y="10 + index * 155" rx="5" ry="0" width="320" height="25" v-for="(it,index) in list1" v-bind:key="it"></rect>
      <rect x="10" :y="50 + index * 155" rx="5" ry="0" width="360" height="15" v-for="(it,index) in list2" v-bind:key="it"></rect>
      <rect x="10" :y="70 + index * 155" rx="5" ry="0" width="140" height="15" v-for="(it,index) in list3" v-bind:key="it"></rect>
      <!-- 附件 -->
      <rect x="30" :y="100 + index * 155" rx="5" ry="0" width="300" height="10" v-for="(it,index) in list4" v-bind:key="it"></rect>
      <circle cx="15" :cy="105 + index * 155" r="6" v-for="(it,index) in list5" v-bind:key="it"></circle>
      <rect x="30" :y="115 + index * 155" rx="5" ry="0" width="300" height="10" v-for="(it,index) in list6" v-bind:key="it"></rect>
      <circle cx="15" :cy="120 + index * 155" r="6" v-for="(it,index) in list7" v-bind:key="it"></circle>
      <!-- 分割线 -->
      <rect x="10" :y="145 + index * 155" rx="0" ry="0" width="360" height="1" v-for="(it,index) in list8" v-bind:key="it"></rect>
    </content-loader>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'monthListSkeleton',
  components: { ContentLoader },
  data() {
    return {
      list1: [1, 2, 3, 4],
      list2: [11, 12, 23, 14],
      list3: [21, 22, 33, 24],
      list4: [31, 32, 43, 34],
      list5: [41, 42, 53, 44],
      list6: [51, 52, 63, 54],
      list7: [61, 62, 73, 64],
      list8: [71, 72, 83, 74]
    }
  }
};
</script>