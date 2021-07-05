	
<template>
  <div class="skeleton-zinde">
    <content-loader
      :height="667"
      :width="400"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="16" y="5" rx="5" ry="0" width="340" height="16" />
      <rect x="16" y="30" rx="5" ry="0" width="86.97" height="14" />
      <rect x="16" y="50" rx="5" ry="0" width="86.97" height="14" />
      <rect x="116" y="50" rx="5" ry="0" width="120" height="14" />
      <rect x="16" y="70" rx="5" ry="0" width="86.97" height="14" />
      <rect x="116" y="70" rx="5" ry="0" width="160" height="14" />
      <rect x="16" y="100" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="130" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="160" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="190" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="220" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="250" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="280" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="310" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="340" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="370" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="400" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="430" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="460" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="490" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="520" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="550" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="580" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="610" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="640" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="670" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="700" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="730" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="760" rx="5" ry="0" width="365" height="14" />
      <rect x="16" y="790" rx="5" ry="0" width="365" height="14" />
    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'articleSkeleton',
  components: {
    ContentLoader
  }
};
</script>