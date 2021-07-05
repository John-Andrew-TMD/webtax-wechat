	
<template>
  <div class="skeleton-zinde">
    <content-loader
      :height="800"
      :width="375"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
    <rect x="10" y="5" rx="8" ry="8" width="360" height="213" /> 
    <rect x="10" y="240" rx="8" ry="8" width="354" height="18" /> 
    <rect x="51" y="295" rx="13" ry="13" width="106" height="28" /> 
    <rect x="219" y="296" rx="13" ry="13" width="111" height="28" /> 
    <rect x="10" y="244" rx="8" ry="8" width="18" height="103" /> 
    <rect x="15" y="333" rx="8" ry="8" width="352" height="18" /> 
    <rect x="350" y="242" rx="8" ry="8" width="18" height="107" /> 
    <rect x="97" y="268" rx="0" ry="0" width="185" height="18" /> 
    <rect x="10" y="365" rx="8" ry="8" width="18" height="155" /> 
    <rect x="10" y="365" rx="8" ry="8" width="355" height="18" /> 
    <rect x="350" y="365" rx="8" ry="8" width="18" height="160" /> 
    <rect x="10" y="795" rx="0" ry="0" width="290" height="28" /> 
    <circle cx="95" cy="433" r="25" /> 
    <circle cx="195" cy="433" r="25" /> 
    <circle cx="290" cy="433" r="25" /> 
    <rect x="70" y="470" rx="0" ry="0" width="50" height="18" /> 
    <rect x="170" y="470" rx="0" ry="0" width="50" height="18" /> 
    <rect x="265" y="470" rx="0" ry="0" width="50" height="18" /> 
    <rect x="10" y="510" rx="8" ry="8" width="355" height="18" /> 
    <rect x="10" y="545" rx="8" ry="8" width="355" height="18" /> 
    <rect x="10" y="585" rx="8" ry="8" width="355" height="250" /> 
    <rect x="135" y="577" rx="8" ry="8" width="102" height="18" />
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