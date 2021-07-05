	
<template>
  <div class="skeleton-zinde">
    <content-loader
      :height="667"
      :width="400"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <!-- 投稿时间 + 发布状态 -->
      <rect x="16" y="20" rx="5" ry="0" width="86.97" height="20" />
      <rect x="116" y="20" rx="5" ry="0" width="220" height="20" />
      <rect x="16" y="50" rx="5" ry="0" width="86.97" height="20" />
      <rect x="116" y="50" rx="5" ry="0" width="120" height="20" />
      <!-- 预览 -->
      <rect x="16" y="100" rx="5" ry="0" width="370" height="20" />
      <!-- 标题 -->
      <rect x="16" y="140" rx="5" ry="0" width="370" height="20" />
      <rect x="16" y="170" rx="5" ry="0" width="170" height="20" />
      <!-- 内容 -->
      <rect x="16" y="220" rx="5" ry="0" width="370" height="14" />
      <rect x="16" y="240" rx="5" ry="0" width="370" height="14" />
      <rect x="16" y="260" rx="5" ry="0" width="370" height="14" />
      <rect x="16" y="280" rx="5" ry="0" width="370" height="14" />
      <rect x="16" y="300" rx="5" ry="0" width="370" height="14" />
      <rect x="16" y="320" rx="5" ry="0" width="270" height="14" />

      <!-- 附件 -->
      <rect x="16" y="360" rx="5" ry="0" width="170" height="20" />
      
      <circle cx="25" cy="410" r="10" />
      <rect x="45" y="400" rx="5" ry="0" width="320" height="20" />
      <circle cx="25" cy="440" r="10" />
      <rect x="45" y="430" rx="5" ry="0" width="320" height="20" />
      <circle cx="25" cy="470" r="10" />
      <rect x="45" y="460" rx="5" ry="0" width="320" height="20" />
      <circle cx="25" cy="500" r="10" />
      <rect x="45" y="490" rx="5" ry="0" width="320" height="20" />
    </content-loader>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader';
export default {
  name: 'ContributeSkeleton',
  components: {
    ContentLoader
  }
};
</script>