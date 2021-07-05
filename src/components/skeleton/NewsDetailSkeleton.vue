	
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
      <rect x="0" y="0" rx="5" ry="0" width="360" height="25"></rect>
      <rect x="20" y="35" rx="5" ry="0" width="300" height="10"></rect>
      <circle cx="5" cy="40" r="6"></circle>
      <!-- 分割线 -->
      <rect x="0" y="60" rx="0" ry="0" width="360" height="1"></rect>

      <rect x="30" y="90" rx="5" ry="0" width="345" height="20"></rect>
      <rect x="0" y="120" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="150" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="180" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="210" rx="5" ry="0" width="275" height="20"></rect>
      <rect x="0" y="240" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="270" rx="5" ry="0" width="145" height="20"></rect>

      <rect x="30" y="300" rx="5" ry="0" width="345" height="20"></rect>
      <rect x="0" y="330" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="360" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="390" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="420" rx="5" ry="0" width="175" height="20"></rect>

      <rect x="0" y="450" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="480" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="30" y="510" rx="5" ry="0" width="345" height="20"></rect>
      <rect x="0" y="540" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="570" rx="5" ry="0" width="375" height="20"></rect>
      <rect x="0" y="600" rx="5" ry="0" width="365" height="20"></rect>
    </content-loader>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'NewsDetailSkeleton',
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