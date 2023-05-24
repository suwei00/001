import { createRouter, createWebHistory } from 'vue-router';
import { useAppStore } from '@/store-pinia';
import { LogInAndRegister } from '@/utils/logIn';
import { gameStateStore } from '@/store-pinia/game';

const defaultLayout = () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ '@/layouts/default/index.vue');
const personalLayout = () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ '@/layouts/personal/index.vue');
const helpLayout = () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ '@/layouts/help/index.vue');

const Demo = {
  path: '/demo',
  name: 'Demo',
  component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/demo/index.vue`)
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defaultLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/home/index.vue`)
        },
        {
          path: '/hot',
          name: 'Hot',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/hot/index.vue`)
        },
        {
          path: '/venue/:id',
          name: 'Venue',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/venue/index.vue`)
        },
        {
          path: '/lottery',
          name: 'Lottery',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/lottery/index.vue`)
        },
        {
          path: '/subclass/:id',
          name: 'Subclass',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/subclass/index.vue`)
        },
        {
          path: '/cockfighting',
          name: 'Cockfighting',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/cockfighting/index.vue`)
        },
        // {
        //   path: '/lottery-game',
        //   name: 'LotteryGame',
        //   component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/lottery-game/index.vue`)
        // },
        {
          path: '/agent',
          name: 'Agent',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/agent/index.vue`)
        },
        {
          path: '/download',
          name: 'Download',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/download/index.vue`)
        },
        {
          path: '/promotion',
          name: 'Promotion',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/promotion/index.vue`)
        },
        {
          path: '/promotion-detail/:id/:flag',
          name: 'PromotionDetail',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/promotion/promotion-detail/index.vue`)
        },
        {
          path: '/find-password',
          name: 'FindPassword',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/find-password/index.vue`)
        }
      ],
      meta: {}
    },
    {
      path: '/personal',
      redirect: '/personal/user-info',
      name: 'Personal',
      component: personalLayout,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'user-info',
          name: 'UserInfo',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/user-info/index.vue`)
        },
        {
          path: 'deposit',
          name: 'Deposit',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/deposit/index.vue`)
        },
        {
          path: 'transfer',
          name: 'Transfer',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/transfer/index.vue`)
        },
        {
          path: 'withdraw',
          name: 'Withdraw',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/withdraw/index.vue`)
        },
        {
          path: '/withdraw/detail',
          name: 'WithdrawDetail',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/withdraw/detail.vue`)
        },
        {
          path: 'bet-record',
          name: 'BetRecord',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/bet-record/index.vue`)
        },
        {
          path: 'trade-record',
          name: 'TradeRecord',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/trade-record/index.vue`)
        },
        {
          path: 'banks',
          name: 'Banks',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/banks/index.vue`)
        },
        {
          path: 'agent-benefit',
          name: 'AgentBenefit',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/agent-benefit/index.vue`)
        },
        {
          path: 'agent-report',
          name: 'AgentReport',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/agent-report/index.vue`),
          children: [
            {
              path: 'sub',
              name: 'AgentReportSub',
              component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/agent-report/Subs.vue`)
            },
            {
              path: 'detail',
              name: 'AgentReportDetail',
              component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/agent-report/Subs_net_amount_plat.vue`)
            },
            {
              path: 'balance',
              name: 'AgentReportBalance',
              component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/agent-report/Subs_balance_total_balance.vue`)
            }
          ]
        },

        {
          path: 'subordinate-report',
          name: 'SubordinateReport',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/subordinate-report/index.vue`)
        },
        {
          path: 'member-list',
          name: 'MemberList',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/member-list/index.vue`)
        },
        {
          path: 'game-record',
          name: 'GameRecord',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/game-record/index.vue`)
        },
        {
          path: 'transaction-minutiae',
          name: 'TransactionMinutiae',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/transaction-minutiae/index.vue`)
        },
        {
          path: 'link',
          name: 'Link',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/link/index.vue`)
        },
        {
          path: 'link/add',
          name: 'LinkAdd',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/link/add.vue`)
        },
        {
          path: 'notice',
          name: 'Notice',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/notice/index.vue`)
        },
        {
          path: 'notice/detail',
          name: 'Notice/Detail',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/notice/detail.vue`)
        },
        {
          path: 'message',
          name: 'Message',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/message/index.vue`),
          children: [
            {
              path: '/message-detail',
              name: 'MessageDetail',
              component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/message/message-detail/index.vue`)
            }
          ]
        },
        {
          path: 'device',
          name: 'Device',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/personal/device/index.vue`)
        }
      ]
    },
    {
      path: '/help/:category/:subclass',
      redirect: '/help/:0/:0',
      name: 'Help',
      component: helpLayout,
      meta: {},
      children: [
        {
          path: '/help/:0/:0',
          // path: 'aaa',
          name: 'HelpContent',
          component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */ `@/views/${globalConfig.TEMPLATE}/help/index.vue`)
        }
      ]
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
  if (to.path === '/entry/register') {
    if (to.query.id) {
      sessionStorage.setItem('LINK_ID', to.query.id.toString());
    }
    next({
      path: '/',
      params: {
        linkId: to.query.id ? to.query.id.toString() : ''
      }
    });
    LogInAndRegister('Register');
  } else {
    if (to.matched.some(record => record.meta.requireAuth)) {
      const token = localStorage.getItem('TOKEN');
      if (!token) {
        next({
          path: '/'
        });

        LogInAndRegister('LogIn');
      } else {
        next();
      }
    } else {
      next();
    }
  }
});
if (globalConfig.ENVI === 'dev') {
  router.addRoute(Demo);
}
export default router;
