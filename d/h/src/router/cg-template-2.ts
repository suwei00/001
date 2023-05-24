import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { storeToRefs } from 'pinia';

const defaultLayout = () =>
  import(/* webpackPrefetch: true */ /* webpackPreload: true */ '@/layouts/default/index.vue');
const withHeaderLayout = () =>
  import(
    /* webpackPrefetch: true */ /* webpackPreload: true */ '@/layouts/with-header.vue/index.vue'
  );

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      redirect: '/home',
      component: defaultLayout,
      children: [
        // 首页
        {
          path: '/home',
          name: 'Home',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/home/index.vue`
            ),
          meta: {
            keepAlive: true
          }
        },
        // 活动列表
        {
          path: '/promotion',
          name: 'Promotion',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/promotion/index.vue`
            ),
          meta: {
            keepAlive: true
          }
        },
        // 代理
        {
          path: '/agent',
          name: 'Agent',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent/index.vue`
            ),
          meta: {
            keepAlive: true
          }
        },
        // 个人中心
        {
          path: '/personal',
          name: 'Personal',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/index.vue`
            ),
          meta: {
            requireAuth: true,
            keepAlive: true
          }
        }
      ],
      meta: {}
    },
    // 登录注册
    {
      path: '/entry/:type',
      name: 'Entry',
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/entry/index.vue`
        ),
      meta: {}
    },
    // 启动场馆
    {
      path: '/launch-game',
      name: 'LaunchGame',
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/launch-game/index.vue`
        ),
      meta: {
        requireAuth: true
      }
    },
    // 充值页面
    {
      path: '/deposit',
      name: 'Deposit',
      redirect: '/deposit/index',
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/index.vue`
        ),
      meta: {},
      children: [
        // 充值
        {
          path: '/deposit/index',
          name: 'DepositIndex',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/deposit.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // 充值教程
        {
          path: '/deposit/tutorial',
          name: 'DepositTutorial',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/deposit-tutorial.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // CGPay支付详情
        {
          path: '/deposit/cgpay-info',
          name: 'CGPayInfo',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/cgpay-info.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // 线下支付详情
        {
          path: '/deposit/offline-info',
          name: 'OfflineInfo',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/offline-info.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // 第三方支付
        {
          path: '/deposit/threeparty-info',
          name: 'ThreepartyInfo',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/deposit/threeparty-info.vue`
            ),
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '',
      component: withHeaderLayout,
      children: [
        // 子类游戏场馆
        {
          path: '/subclass/:type',
          name: 'Subclass',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/subclass/index.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // 活动明细
        {
          path: '/promotion-detail/:id/:flag',
          name: 'PromotionDetail',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/promotion/promotion-detail/index.vue`
            )
        },
        // 转账
        {
          path: '/transfer',
          name: 'Transfer',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/transfer/index.vue`
            ),
          meta: {
            requireAuth: true
          }
        },
        // 提现
        {
          path: '/withdraw',
          name: 'Withdraw',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/withdraw/index.vue`
            ),
          meta: { requireAuth: true },
        },
        // 流水详情
        {
          path: '/withdraw/detail',
          name: 'withdrawDetail',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/withdraw/detail.vue`
            ),
          meta: { requireAuth: true }
        },
        // 我的钱包
        {
          path: '/my-wallet',
          name: 'MyWallet',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/my-wallet/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 投注记录
        {
          path: '/bet',
          name: 'Bet',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/bet/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 交易记录
        {
          path: '/transaction',
          name: 'Transaction',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/transaction/index.vue`
            ),
          meta: { requireAuth: true },
          children: [
            {
              path: 'detail',
              name: 'TransactionDetail',
              component: () =>
                import(
                  /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/transaction/detail.vue`
                ),
              meta: { requireAuth: true }
            }
          ]
        },

        // 代理报表
        {
          path: '/agent_report',
          name: 'AgentReport',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent_report/index.vue`
            ),
          meta: { requireAuth: true },
          children: [
            // 代理报表二级页面
            {
              path: 'sub/:type',
              name: 'AgentReportSub',
              component: () =>
                import(
                  /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent_report/sub.vue`
                ),
              meta: { requireAuth: true },
              children: [
                // 代理报表团队余额三级页面
                {
                  path: 'total-balance',
                  name: 'AgentReportSubTotalBalance',
                  component: () =>
                    import(
                      /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent_report/Subs_balance_total_balance.vue`
                    ),
                  meta: { requireAuth: true }
                },
                // 代理报表输赢三级页面
                {
                  path: 'net_mount_plat',
                  name: 'AgentReportSubNetMountPlat',
                  component: () =>
                    import(
                      /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent_report/Subs_net_amount_plat.vue`
                    ),
                  meta: { requireAuth: true }
                }
              ]
            }
          ]
        },

        // 下级报表
        {
          path: '/subordinate-report',
          name: 'SubordinateReport',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/subordinate-report/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 下级交易记录
        {
          path: '/trade-record',
          name: 'TradeRecord',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/trade-record/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 会员列表
        {
          path: '/member-list',
          name: 'MemberList',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/member-list/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 会员列表返点详情
        {
          path: '/member-list/detail',
          name: 'MemberListDetail',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/member-list/detail.vue`
            ),
          meta: { requireAuth: true }
        },
        // 游戏记录
        {
          path: '/game-record',
          name: 'GameRecord',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/game-record/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 返水记录
        {
          path: '/rebate',
          name: 'Rebate',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/rebate/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 推广链接
        {
          path: '/link',
          name: 'Link',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/link/index.vue`
            ),
          meta: { requireAuth: true }
        },
        {
          path: '/link/add',
          name: 'LinkAdd',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/link/add.vue`
            ),
          meta: { requireAuth: true }
        },
        // 返点
        {
          path: '/rate',
          name: 'Rate',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/rate/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 帮助中心
        {
          path: '/help',
          name: 'Help',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/help/index.vue`
            ),
          meta: {}
        },
        // 站内信
        {
          path: '/letter',
          name: 'Letter',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/letter/index.vue`
            ),
            meta: { requireAuth: true },
            children: [
              {
                path: 'detail',
                name: 'LetterDetail',
                component: () =>
                  import(
                    /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/letter/detail.vue`
                  ),
                meta: { requireAuth: true }
              },
            ]
        },
        // VIP福利页面
        {
          path: '/agent-benefit',
          name: 'AgentBenefit',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent-benefit/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 添加银行卡
        {
          path: '/banks',
          name: 'Banks',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/banks/index.vue`
            ),
          meta: { requireAuth: true }
        },
        {
          path: '/banks/add',
          name: 'BanksAdd',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/banks/add.vue`
            ),
          meta: { requireAuth: true }
        },
        {
          path: '/banks/add-usdt',
          name: 'BanksAddUsdt',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/banks/add-usdt.vue`
            ),
          meta: { requireAuth: true }
        },
        {
          path: '/vip-progress',
          name: 'VipProgress',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/vip-progress/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 设置
        {
          path: '/set',
          name: 'Set',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/set/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 客服
        {
          path: '/customer-service',
          name: 'Service',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/service/index.vue`
            ),
          meta: {}
        },
        // 设备信息
        {
          path: '/device',
          name: 'Device',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/device/index.vue`
            ),
          meta: {}
        },
        // 修改登录密码
        {
          path: '/change-password',
          name: 'ChangePassword',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/change-password/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 忘记密码
        {
          path: '/forget-password',
          name: 'ForgetPassword',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/forget-password/index.vue`
            ),
          meta: {}
        },
        // 个人信息
        {
          path: '/user-info',
          name: 'UserInfo',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/user-info/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // 编辑头像
        {
          path: '/edit-avatar',
          name: 'EditAvatar',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/edit-avatar/index.vue`
            ),
          meta: { requireAuth: true }
        },
        // zalo
        {
          path: '/bind-zalo',
          name: 'BindZalo',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/user-info/zalo.vue`
            ),
          meta: { requireAuth: true }
        },
        // email
        {
          path: '/bind-email',
          name: 'BindEmail',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/user-info/email.vue`
            ),
          meta: { requireAuth: true }
        },
        // address
        {
          path: '/bind-address',
          name: 'BindAddress',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/user-info/address.vue`
            ),
          meta: { requireAuth: true }
        },
        {
          path: '/bind-phone',
          name: 'BindPhone',
          component: () =>
            import(
              /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/user-info/phone.vue`
            ),
          meta: { requireAuth: true }
        }
      ]
    },
    // 下载app
    {
      path: '/app-download',
      name: 'AppDownload',
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/app-download/index.vue`
        ),
      meta: {}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  const appStore = useAppStore();
  const userStore = userInfoStateStore();
  const { isLogin } = storeToRefs(appStore);

  // app访问
  if (to.query.source === 'app') {
    appStore.isApp = true;
    if (to.query.token) {
      appStore.setToken(`${to.query.token}`);
      userStore.getUserInfo();
    } else if (!to.query.token) {
      appStore.removeToken();
    }
  }

  // 已登录状态拦截不再进入登录页面
  if (to.path === '/entry/login' && isLogin.value) {
    next({
      path: '/'
    });
  }

  if (to.matched.some(record => record.meta.requireAuth)) {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      next({
        path: '/entry/login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

if (globalConfig.ENVI === 'dev') {
  router.addRoute({
    path: '/demo',
    name: 'DemoIcon',
    component: () =>
      import(
        /* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/demo/index.vue`
      )
  });
}
export default router;
