const routerPromote = [
  {
    path: '/promote/partner/:id',
    name: 'PromotePartner',
    component: () => import('@/views/promote/index.vue'),
    meta: { title: '', isLogin: false,  keepAlive: true, sharePath: '/' }
  }
];
export { routerPromote }