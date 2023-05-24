import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';
import { useLoading } from '@cg-template-1-components/loading';
import UserModule from '@/store/modules/user/UserModule';
const loading = useLoading();


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/home/index.vue`),
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: '/agent',
      name: 'agent',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/agent/index.vue`)
    },
    {
      path: '/agent_report',
      name: 'agent_report',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/agent_report/index.vue`),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my/deposit/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/deposit-detail',
      name: 'deposit-detail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/deposit-detail/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/deposit-usdt',
      name: 'deposit-usdt',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/deposit-usdt/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/valet',
      name: 'valet',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/valet/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/tutorials',
      name: 'tutorials',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/tutorials/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/egame',
      name: 'egame',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/egame/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/chat/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/launch-game',
      name: 'LaunchGame',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/launch-game/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/member-list',
      name: 'member-list',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/member/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/member-add',
      name: 'member-add',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/member-add/index2.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/game-record',
      name: 'game-record',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/game-record/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/link',
      name: 'link',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/link/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/link-add',
      name: 'link-add',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/link-add/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/rate',
      name: 'rate',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/rate/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/commission',
      name: 'commission',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/commission/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/commission-record',
      name: 'commission-record',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/commission-record/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/withdraw/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/account/red/sd8_index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/phone',
      name: 'phone',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/phone/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/email',
      name: 'email',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/email/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/address',
      name: 'address',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/address/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },

    {
      path: '/account/zalo',
      name: 'zalo',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/zalo/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/bankcard',
      name: 'bankcard',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/bankcard/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/addbank',
      name: 'addbank',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/addbank/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/addcoin',
      name: 'addcoin',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/addcoin/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/userInfo',
      name: 'userInfo',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/userInfo/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/changeAvatar',
      name: 'changeAvatar',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my/change-avatar/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/verification',
      name: 'verification',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/verification/index2.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/account/password',
      name: 'password',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/password/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/commission-password',
      name: 'commission-password',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/commission-password/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/help',
      name: 'help',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/server',
      name: 'help-server',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/server/index.vue`)
    },
    {
      path: '/help-menu',
      name: 'help-menu',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/help-menu/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/open-account',
      name: 'open-account',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/open-account/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/sport-qsquestion',
      name: 'sport-qsquestion',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/sport-qsquestion/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/sport-question',
      name: 'sport-question',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/sport-question/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/lottery-question',
      name: 'lottery-question',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/lottery-question/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/egame-question',
      name: 'egame-question',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/egame-question/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/other-question',
      name: 'other-question',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/other-question/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/reality-question',
      name: 'reality-question',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/reality-question/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/deposit',
      name: 'help-deposit',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/deposit/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/withdrawals',
      name: 'help-withdrawals',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/withdrawals/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/transfer',
      name: 'help-transfer',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/transfer/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/preferential-rules',
      name: 'preferential-rules',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/preferential-rules/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/browser',
      name: 'help-browser',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/browser/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/sports',
      name: 'help-sports',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/sports/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/anti-hijacking',
      name: 'anti-hijacking',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/anti-hijacking/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/forgot-password',
      name: 'forgot-password',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/forgot-password/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/wallet-transfer',
      name: 'wallet-transfer',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/wallet-transfer/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/browser',
      name: 'help-browser',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/browser/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/technical',
      name: 'help-technical',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/technical/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/quiz',
      name: 'help-quiz',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/quiz/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/about',
      name: 'help-about',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/about/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/terms',
      name: 'help-terms',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/terms/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/joint-venture',
      name: 'joint-venture',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/joint-venture/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/help/privacy-rules',
      name: 'privacy-rules',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/privacy-rules/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/course',
      name: 'course',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/help/course/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/my-wallet',
      name: 'my-wallet',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my-wallet/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/message/detail',
      name: 'messageDetail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/message-detail/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/transaction/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true,
        keepAlive: false
      }
    },
    {
      path: '/transaction/detail',
      name: 'transactionDetail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/transaction/detail/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/set',
      name: 'set',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/set/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/device',
      name: 'device',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/device/index.vue`),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/feedback/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/feedback-list',
      name: 'feedback-list',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/feedback/list/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/feedback-detail',
      name: 'feedback-detail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/feedback/detail/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/about/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/virtual-currency',
      name: 'virtual-currency',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/virtual-currency/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/protocol',
      name: 'protocol',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/protocol/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/signin/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/signin-bonus',
      name: 'signin-bonus',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/signin-bonus/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/bet',
      name: 'bet',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/bet/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/entry/:type',
      name: 'entry',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/entry/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/abnormal',
      name: 'abnormal',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/abnormal/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/promotion/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/reset-password/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/personal/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/customer-service',
      name: 'customer-service',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/customer-service/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/promotion-detail/:components',
      name: 'promotion-detail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/promotion-detail/index.vue`),
      meta: {
        index: 1
      }
    },
    {
      path: '/transfer',
      name: 'transfer',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/transfer/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/cs',
      name: 'cs',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/cs/index.vue`),
      meta: {
        keepAlive: false,
        index: 1
      }
    },
    {
      path: '/gaming',
      name: 'gaming',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/gaming/index.vue`),
      meta: {
        keepAlive: false,
        index: 1
      }
    },
    {
      path: '',
      redirect: '/home',
      component: () => import(/* webpackPrefetch: true */ /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/home/index.vue`),
      children: [],
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: '/:w+',
      name: 'home',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/home/index.vue`),
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: '/letter',
      name: 'letter',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my/letter/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/transactionMinutiae',
      name: 'transactionMinutiae',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/transaction-minutiae/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/rebate',
      name: 'Rebate',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/rebate/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/subordinateReport',
      name: 'subordinateReport',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/subordinate-report/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/agencyReportDetailsList',
      name: 'agencyReportDetailsList',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/agent_report/agency-report-details-list/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/agencyReportDetailsListDetail',
      name: 'AgencyReportDetailsListDetail',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/agent_report/agency-report-details-list-detail/index.vue`),
      meta: {
        index: 1,
        requiresAuth: true
      }
    },
    {
      path: '/pThreePay',
      name: 'pThreePay',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my/deposit/p-three-pay/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/cg-pay',
      name: 'CGPay',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/my/deposit/cg-pay/index.vue`),
      meta: {
        index: 1,
        keepAlive: true,
        requiresAuth: true
      }
    },
    {
      path: '/403',
      name: '403',
      component: () => import(/* webpackPrefetch: true */
      /* webpackPreload: true */`@/views/${globalConfig.TEMPLATE}/403/index.vue`),
      meta: {
        keepAlive: true
      }
    }
  ]
});

let timer: any = null;

router.beforeEach((to, from, next) => {
  if (to.query.token) {
    UserModule.setLogin(true);
    store.commit('app/setToken', to.query.token);
    UserModule.getUserInfo();
  }
  if (to.meta && to.meta.requiresAuth && !store.state.user.login) {
    next('/entry/login');
  } else {
    next();
  }
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    if (to.name !== globalConfig.THEME + '_home') {
      loading.open();
    }
  }, 200);
});

router.afterEach((to, from) => {
  clearTimeout(timer);
  loading.close();
  // timer = setTimeout(() => {
  //
  // }, 1000);
});

export default router;
