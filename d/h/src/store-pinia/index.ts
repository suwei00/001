import { defineStore, createPinia } from 'pinia';
import APIs from '@/http/blue-apis';
import { find, toNumber, cloneDeep } from 'lodash';
import router from '@/router';
import { getBrowser } from '@/utils/helpers';
import type { PromotionList, BankTree } from './types';
import { useI18n } from 'vue-i18n';
import { useDownloadApp } from '@/hooks/useDownloadApp';
const { downloadUrlClick } = useDownloadApp();

interface State {
  promotionList: PromotionList[];
  token: string;
  captchaId: string;
  isLogin: boolean;
  customerServices: any[];
  bankTree: BankTree[];
  appDownloadUrl: string;
  marquee: any[];
  copyMarquee: any[];
  isApp: boolean;
  tradeChannel: any[];
}
let id = 100;

export const useAppStore = defineStore('app', {
  state: (): State => {
    return {
      promotionList: [],
      token: localStorage.getItem('TOKEN') ?? '',
      captchaId: '',
      isLogin: Boolean(localStorage.getItem('TOKEN')),
      customerServices: [],
      bankTree: [],
      appDownloadUrl: '',
      marquee: [],
      copyMarquee: [],
      isApp: false, // 是否app访问
      tradeChannel: [], // 充值方式
    };
  },
  actions: {
    setToken(t: string) {
      localStorage.setItem('TOKEN', t);
      this.token = t;
      this.isLogin = true;
    },
    removeToken() {
      localStorage.removeItem('AdClose');
      localStorage.removeItem('TOKEN');
      this.token = '';
      this.isLogin = false;
    },
    // 登出
    logout() {
      APIs.logout().then(() => {
        this.removeToken();
        router.push('/entry/login');
      });
    },
    setCaptchaId(id: string) {
      this.captchaId = id;
    },
    // 获取活动列表
    getPromotionList() {
      return new Promise((resolve, reject) => {
        APIs.getPromotionList()
          .then(res => {
            this.promotionList = res;
            resolve(res);
          })
          .catch((err: Error) => {
            reject(err);
          });
      });
    },
    // 客服地址
    getCSKH() {
      APIs.getBannerByFlags({ flags: 4 }).then((res: any) => {
        res.banner.forEach((item: any) => {
          if (item.url.indexOf(',') !== -1) {
            const arr = item.url.split(',');
            item.url = arr[Math.floor(Math.random() * arr.length)];
            if (+item.kf_type === 3) {
              localStorage.setItem('serviceUrl', item.url);
            }
          } else {
            item.url = item.url;
            if (item.url !== '' && +item.kf_type === 3) {
              localStorage.setItem('serviceUrl', item.url);
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
      return (
        find(this.bankTree, (o: any) => toNumber(id) === o.id)?.name ?? t('withdraw.other_bank')
      );
    },
    // 根据银行ID获取银行logo
    getBankLogoByBankId(id: string) {
      return find(this.bankTree, (o: any) => toNumber(id) === o.id)?.logo ?? '';
    },
    // 获取app下载地址
    getAppDownloadUrl() {
      const { isIos } = getBrowser();
      APIs.getAppDownloadUrl({ dv: isIos ? 36 : 35 }).then(res => {
        this.appDownloadUrl = res.url;
      });
    },
    downloadApp() {
      // location.href = this.appDownloadUrl || '';
      downloadUrlClick(this.appDownloadUrl || '');
    },
    getHomeData() {
      APIs.getMarqueeCount().then((res: any) => {
        this.marquee = res.map((item: string, index: number) => {
          return { even: index % 2 === 0, list: item.split('|'), id: index };
        });
        this.copyMarquee = cloneDeep(this.marquee);
      });
    },
    setHomeData({ m }: any) {
      const marquee = cloneDeep(this.marquee);
      const current = marquee[0];
      if (m !== current.list.join('|')) {
        marquee.unshift({ even: !current.even, list: m.split('|'), id: id });
        marquee.pop();
        this.marquee = cloneDeep(marquee);
        id++;
      }
    },
    copyHomeData() {
      this.copyMarquee = cloneDeep(this.marquee);
    },
    getTradeChannel() {
      APIs.getTradeChannel().then(res => {
        const arr = res.map((k: any) => {
          return { label: k.name, value: k.id + '' };
        });
        arr.unshift({ label: 'Toàn Bộ', value: '0' });
        this.tradeChannel = arr;
      })
    },
    // 初始化
    init() {
      this.getPromotionList();
      this.getCSKH();
      this.getAppDownloadUrl();
    }
  }
});

const pinia = createPinia();
export default pinia;
