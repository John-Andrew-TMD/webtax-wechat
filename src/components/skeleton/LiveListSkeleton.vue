	
<template>
  <div class="skeleton-zinde">
    <content-loader
      :height="1000"
      :width="375"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="265" :y="0 + index * 185" rx="5" ry="5" width="110" height="110" v-for="(it,index) in list1" :key="it"></rect>
      <rect x="0" :y="0 + index * 185" rx="0" ry="0" width="240" height="20" v-for="(it,index) in list2" :key="it"></rect>
      <rect x="0" :y="45 + index * 185" rx="0" ry="0" width="200" height="20" v-for="(it,index) in list5" :key="it"></rect>
      <rect x="0" :y="70 + index * 185" rx="0" ry="0" width="140" height="10" v-for="(it,index) in list6" :key="it"></rect>
      <rect x="0" :y="85 + index * 185" rx="0" ry="0" width="140" height="10" v-for="(it,index) in list8" :key="it"></rect>
      <rect x="0" :y="100 + index * 185" rx="0" ry="0" width="140" height="10" v-for="(it,index) in list9" :key="it"></rect>
      <rect x="0" :y="125 + index * 185" rx="0" ry="0" width="375" height="25" v-for="(it,index) in list4" :key="it"></rect>
      <!-- 分割线 -->
      <rect x="0" :y="165 + index * 185"  rx="0" ry="0" width="375" height="1" v-for="(it,index) in list7" :key="it"></rect>
    </content-loader>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'LiveListSkeleton',
  components: { ContentLoader },
  data() {
    return {
      list0: [6, 7, 8, 9, 10],
      list1: [1, 2, 3, 4, 5],
      list2: [11, 12, 23, 14, 15],
      list3: [21, 22, 33, 24, 25],
      list4: [31, 32, 43, 34, 35],
      list5: [41, 42, 53, 44, 45],
      list6: [51, 52, 63, 54, 55],
      list7: [61, 62, 73, 64, 65],
      list8: [71, 72, 83, 74, 75],
      list9: [81, 82, 93, 84, 85],
      list10: [91, 92, 103, 94, 95]
    }
  }
};
</script>