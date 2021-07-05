
const routerLive = [
  {
    path: '/live',
    name: 'live',
    component: () => import('@/views/live/index.vue'),
    meta: { 
      title: '财税课堂', 
      isLogin: false, 
      keepAlive: false, 
      sharePath: '/',
      pcUrl: ''
    }
  },
  {
    path: '/liveList',
    name: 'liveList',
    component: () => import('@/views/liveList/index.vue'),
    meta: { 
      title: '财税课堂', 
      isLogin: true, 
      keepAlive: true, 
      sharePath: '/',
      pcUrl: ''
    },
  },
  {
    path: '/liveDetail',
    name: 'liveDetail',
    component: () => import('@/views/liveDetail/index.vue'),
    meta: { 
      title: '财税课堂', 
      isLogin: true, 
      keepAlive: false, 
      sharePath: '/',
      pcUrl: ''
    }
  },
  {
    path: '/resultPay/pay',
    name: 'resultPay',
    component: () => import('@/views/resultPay/index.vue'),
    meta: { 
      title: '订单确认', 
      isLogin: true, 
      keepAlive: false, 
      sharePath: '/',
      pcUrl: ''
    }
  },
];
export { routerLive }