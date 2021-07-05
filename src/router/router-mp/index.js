const routerMp = [
  {
    path: '/user/bind',
    name: 'userBind',
    component: () => import('@/views/user/bind.vue'),
    meta: { title: '绑定答税', isLogin: false, keepAlive: true, sharePath: '/' }
  },
  {
    path: '/user/set',
    name: 'userSet',
    component: () => import('@/views/user/set.vue'),
    meta: { title: '用户中心', isLogin: true, keepAlive: false, sharePath: '/' }
  },
  {
    path: '/notic',
    name: 'notic',
    component: () => import('@/views/set/notic.vue'),
    meta: { title: '消息设置', isLogin: true, keepAlive: true, sharePath: '/' }
  },
  {
    path: '/exchange',
    name: 'exchange',
    component: () => import('@/views/activity/ExchangeCode.vue'),
    meta: { title: '兑换码', isLogin: true, keepAlive: true, sharePath: '/' }
  },
  {
    path: '/invitation',
    component: () => import('@/views/activity/InvitationCard.vue'),
    meta: { title: '答税会员卡', isLogin: false, keepAlive:true }
  },
  {
    path: '/expert/:id',
    name: 'expert',
    component: () => import('@/views/expert/index.vue'),
    meta: { title: '专家信息', isLogin: true, keepAlive: true, sharePath: '/' }
  }
];
export { routerMp }