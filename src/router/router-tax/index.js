const routerTax = [
  {
    path: '/tax/advisory/:id',
    name: 'advisoryDetail',
    component: () => import('@/views/tax/advisoryDetail.vue'),
    meta: { title: '咨询详情', isLogin: true,  keepAlive: false, sharePath: '/' }
  }
];
export { routerTax }