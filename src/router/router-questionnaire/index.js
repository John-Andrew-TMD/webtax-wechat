const routerQuestionnaire = [
  {
    path: '/questionnaire',
    name: 'questionnaire',
    component: () => import('@/views/questionnaire/'),
    redirect: '/questionnaire/mng/',
    meta: { title: '财税知识网络竞赛', isLogin: true, keepAlive: false, sharePath: '/' },
    children: [
      {
        path: 'mng',
        name: 'mng',
        component: () => import('@/views/questionnaire/components/questionnaire-mng'),
        meta: { title: '财税知识网络竞赛', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/questionnaire/components/questionnaire-list'),
        meta: { title: '答题挑战赛', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'result',
        name: 'result',
        component: () => import('@/views/questionnaire/components/questionnaire-result'),
        meta: { title: '闯关结束', isLogin: true, keepAlive: false, sharePath: '/',paddingHeight:20  }
      },
      {
        path: 'invite',
        name: 'invite',
        component: () => import('@/views/questionnaire/components/questionnaire-invite'),
        meta: { title: '邀请好友', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'reflect',
        name: 'reflect',
        component: () => import('@/views/questionnaire/components/questionnaire-reflect'),
        meta: { title: '红包明细', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'rules',
        name: 'rules',
        component: () => import('@/views/questionnaire/components/questionnaire-rules'),
        meta: { title: '活动规则', isLogin: false, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'price',
        name: 'price',
        component: () => import('@/views/questionnaire/components/questionnaire-price'),
        meta: { title: '总榜大奖', isLogin: false, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'rank',
        name: 'rank',
        component: () => import('@/views/questionnaire/components/questionnaire-rank'),
        meta: { title: '排行榜', isLogin: true, keepAlive: false, sharePath: '/',paddingHeight:60 }
      },
      {
        path: 'connect',
        name: 'connect',
        component: () => import('@/views/questionnaire/components/questionnaire-connect'),
        meta: { title: '填写联系方式', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'getprice',
        name: 'getprice',
        component: () => import('@/views/questionnaire/components/questionnaire-getprice'),
        meta: { title: '领取奖励', isLogin: true, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'bank',
        name: 'bank',
        component: () => import('@/views/questionnaire/components/questionnaire-bank'),
        meta: { title: '财税知识网络竞赛', isLogin: false, keepAlive: false, sharePath: '/' }
      },
      {
        path: 'know',
        name: 'know',
        component: () => import('@/views/questionnaire/components/questionnaire-know'),
        meta: { title: '领奖须知', isLogin: false, keepAlive: false, sharePath: '/' }
      }
      
    ]
  }
];
export { routerQuestionnaire }