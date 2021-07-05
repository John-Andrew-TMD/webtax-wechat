	
<template>
  <div class="skeleton-zinde">
    <!-- <svg class="w100p" height="667">
        <g v-for="(it,index) in 4" :key="index">
          <rect x="0" :y="0 + index * 160" rx="5" ry="5" class="w345" height="145" style="fill:rgb(235,235,235);"></rect> 
          <rect x="15" :y="17 + index * 160" rx="0" ry="5" class="w315" height="115" style="fill:rgb(255,255,255);"></rect> 
          <rect x="110" :y="32 + index * 160" rx="0" ry="0" class="w130" height="30" style="fill:rgb(235,235,235);" ></rect> 
          <rect x="30" :y="82 + index * 160" rx="0" ry="0" class="w285" height="15" style="fill:rgb(235,235,235);" ></rect> 
          <rect x="100" :y="107 + index * 160" rx="0" ry="0" class="w150" height="15" style="fill:rgb(235,235,235);" ></rect> 
        </g> 
    </svg>-->

    <content-loader
      :height="1000"
      :width="375"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <!-- <rect x="0" :y="0 + index * 170" rx="5" ry="5" width="375" height="155" v-for="(it,index) in 1" :key="index" style="fill:rgb(255,255,255);"></rect> -->
      <!-- 外框 -->
      <rect x="0" :y="0 + index * 170" rx="5" ry="5" width="20" height="155" v-for="(it,index) in list1" :key="it"></rect>
      <rect x="15" :y="0 + index * 170" rx="0" ry="0" width="345" height="20" v-for="(it,index) in list2" :key="it"></rect>
      <rect x="355" :y="0 + index * 170" rx="5" ry="5" width="20" height="155" v-for="(it,index) in list3" :key="it"></rect>
      <rect x="15" :y="135 + index * 170" rx="0" ry="0" width="345" height="20" v-for="(it,index) in list4" :key="it"></rect>
      <!-- 内框 -->
      <rect x="120" :y="35 + index * 170" rx="0" ry="0" width="130" height="30" v-for="(it,index) in list5" :key="it"></rect>
      <rect x="60" :y="75 + index * 170" rx="0" ry="0" width="260" height="20" v-for="(it,index) in list6" :key="it"></rect>
      <rect x="120" :y="105 + index * 170" rx="0" ry="0" width="130" height="20" v-for="(it,index) in list7" :key="it"></rect>
    </content-loader>
  </div>
</template>
<style lang="scss" scoped></style>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'monthSkeleton',
  components: { ContentLoader },
  data() {
    return {
      list1: [1, 2, 3, 4, 5],
      list2: [11, 12, 23, 14, 15],
      list3: [21, 22, 33, 24, 25],
      list4: [31, 32, 43, 34, 35],
      list5: [41, 42, 53, 44, 45],
      list6: [51, 52, 63, 54, 55],
      list7: [61, 62, 73, 64, 65],
    }
  }
};
</script>