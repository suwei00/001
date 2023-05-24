import { defineStore, createPinia } from 'pinia';
import APIs from '@/http/blue-apis';
import Local from '@/utils/storage';
import router from '@/router';
import { userInfoStateStore } from './userInfo';
import { cloneDeep, find, toNumber } from 'lodash';
import { useI18n } from 'vue-i18n';

interface State {
  token: string;
  captchaId: string;
  isLogin: boolean;
  customerServices: any[];
  bankTree: any[];
  marquee: any[];
  copyMarquee: any[];
  onlineCount: string;
  awardCount: string;
}
let id = 100;
export const useAppStore = defineStore('app', {
  state: (): State => {
    return {
      token: localStorage.getItem('TOKEN') ?? '',
      captchaId: '',
      isLogin: Boolean(localStorage.getItem('TOKEN')),
      customerServices: [],
      bankTree: [],
      marquee: [],
      copyMarquee: [],
      onlineCount: '0',
      awardCount: '0'
    };
  },
  actions: {
    setToken(t: string) {
      localStorage.setItem('TOKEN', t);
      this.token = t;
      this.isLogin = true;
    },
    removeToken() {
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('preferentialClosed');
      this.token = '';
      this.isLogin = false;
      const userInfoStore = userInfoStateStore();
      userInfoStore.clearUserInfo();
    },
    // 登出
    logout() {
      APIs.logout().then(() => {
        this.removeToken();
        router.push('/');
      });
    },
    setCaptchaId(id: string) {
      this.captchaId = id;
    },
    // 客服地址
    getCSKH() {
      APIs.getBannerByFlags({ flags: 4 }).then((res: any) => {
        res.banner.forEach((item: any) => {
          if (item.url.indexOf(',') !== -1) {
            const arr = item.url.split(',');
            item.url = arr[Math.floor(Math.random() * arr.length)];
            if (+item.kf_type === 3) {
              Local.set('serviceUrl', item.url);
            }
          } else {
            item.url = item.url;
            if (item.url !== '' && +item.kf_type === 3) {
              Local.set('serviceUrl', item.url);
            }
          }
        });
        this.customerServices = res.banner;
      });
    },
    // 银行卡列表
    getBankTree() {
      APIs.getMemberTree().then(res => {
        this.bankTree = res;
      });
    },
    // 根据银行ID获取银行的越南文名称
    getBankNameById(id: string) {
      const { t } = useI18n();
      return find(this.bankTree, (o: any) => toNumber(id) === o.id)?.name ?? t('other_bank');
    },
    // 根据银行ID获取银行logo
    getBankLogoByBankId(id: string) {
      return find(this.bankTree, (o: any) => toNumber(id) === o.id)?.logo ?? '';
    },
    setHomeDataLength(list: any) {
      let _res = cloneDeep(list);
      for (let i = 0; i < 100; i++) {
        if (_res.length < 100) {
          _res = _res.concat(_res);
        } else {
          return _res.slice(0, 100);
        }
      }
    },
    getHomeData() {
      APIs.getMarqueeCount().then((res: any) => {
        this.marquee = res.map((item: string, index: number) => {
          return { even: index % 2 === 0, list: item.split('|'), id: index };
        });
        this.copyMarquee = this.setHomeDataLength(this.marquee);
      });
      APIs.getOnlineCount().then((res: any) => {
        this.onlineCount = res.c;
      });
      APIs.getAwardCount().then((res: any) => {
        this.awardCount = res.amount;
      });
    },
    setHomeData({ c, a, m }: any) {
      const _marquee = cloneDeep(this.marquee);
      const current = _marquee[0];
      if (m !== current.list.join('|')) {
        _marquee.unshift({ even: !current.even, list: m.split('|'), id: id });
        _marquee.pop();
        this.marquee = cloneDeep(_marquee);
        id++;
      }
      this.onlineCount = c;
      this.awardCount = a;
    },
    copyHomeData() {
      this.copyMarquee = this.setHomeDataLength(this.marquee);
    },
    // 初始化
    init() {
      this.getCSKH();
      this.getBankTree();
    }
  }
});

const pinia = createPinia();
export default pinia;
