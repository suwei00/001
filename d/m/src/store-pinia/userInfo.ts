import { defineStore } from 'pinia';
import APIs from '@/http/blue-apis';
import { CloseDialog } from '@/utils/logIn';
import { merge, uniqBy } from 'lodash';
import emergency from '@/mixins/emergency';
import { PawErrorDialog } from '@/mixins/pawError';
import { Wallet } from '@/dto/common';
import router from '@/router';

interface State {
  userInfo: any;
  refreshLoading: boolean;
  homeAdBanner: []; // 首页弹窗广告
  noticeCount: number;
  menberCount: number;
  needcode: boolean;
  wallets: any[];
  usdtCardList: any[];
}

export const userInfoStateStore = defineStore('userInfo', {
  state: (): State => {
    return {
      userInfo: {},
      refreshLoading: false,
      homeAdBanner: [],
      noticeCount: 0,
      menberCount: 0,
      needcode: false,
      wallets: [],
      usdtCardList: []
    };
  },
  getters: {
    // 资料完整度
    dataIntegrity: state => {
      const { username = '0', phone = '0', real_name = '0', zalo = '0', email = '0', birth = '0' } = state.userInfo;
      // 统计长度不为0的变量数量
      let obj: any = { username, phone, real_name, zalo, email, birth };
      return (6 - Object.keys(obj).filter((k: any) => obj[k] === '0' || !obj[k]).length) / 6;
    },
    letterCount: state => {
      return state.menberCount + state.noticeCount;
    }
  },
  actions: {
    getUserInfo() {
      APIs.getToken().then((data: any) => {
        APIs.getMemberInfo().then((res: any) => {
          this.userInfo = { ...data, ...res };
          this.getHomeAdBanner();
        });
      });
    },
    handleLogInApi(params: any, storage: boolean) {
      APIs.login(params)
        .then(res => {
          if (res === '1000') {
            if (storage) {
              localStorage.setItem('USER_PAW', params.password);
            } else {
              localStorage.removeItem('USER_PAW');
            }
            localStorage.setItem('USER_NAME', params.username);
            CloseDialog();
            router.push('/');
            this.getUserInfo();
            const { getEmergency } = emergency(true);
            getEmergency();
          }
        })
        .catch(data => {
          PawErrorDialog(data);
        });
    },
    RefreshBalance() {
      this.refreshLoading = true;
      const _start = new Date().valueOf();
      APIs.refreshBalance().then(res => {
        this.userInfo = merge(this.userInfo, res);
        // 刷新按钮转动一圈最少一秒 根据数据请求时间是的刷新按钮转动是1的倍数
        const _end = new Date().valueOf();
        const _diff = _end - _start;
        const difference = Math.ceil(_diff / 1000) * 1000 - _diff;
        setTimeout(() => {
          this.refreshLoading = false;
        }, difference);
      });
    },
    // 公告未读数量
    runGetMemberNum() {
      APIs.getMemberNum().then((res: any) => {
        if (res >= 0) this.menberCount = res;
      });
      APIs.getNoticeNum().then((res: any) => {
        if (res >= 0) this.noticeCount = res;
      });
    },
    clearUserInfo() {
      this.userInfo = {};
    },
    getHomeAdBanner() {
      APIs.getMemBanner({ flags: 5 }).then((res: any) => {
        if (res && res.banner) this.homeAdBanner = res.banner.sort((a: any, b: any) => Number(a.sort) - Number(b.sort));
      });
    },
    setNeedcode(val: boolean) {
      this.needcode = val;
    },
    setWallets(val: any[]) {
      this.wallets = val;
    },
    async getPlatList() {
      const res = await APIs.getVenueWalletList();
      // 处理维护状态 共享钱包任意一个不是维护则为开启状态
      const arr = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].share_wallet === 0) {
          const enable = res[i].maintained === 1;
          arr.push({ ...res[i], enable });
        } else {
          const enable = res.filter(item => item.wallet_id === res[i].wallet_id).some(item => item.maintained === 1);
          arr.push({ ...res[i], enable });
        }
      }
      this.wallets = uniqBy(
        arr.map(w => ({ ...w, amount: '0' })),
        'wallet_id'
      ).filter((i: any) => i.flags === 3);

      const requestList = this.wallets.map(w => this.getBalanceByWallet(w));
      await Promise.allSettled(requestList);
    },
    async getBalanceByWallet(w: Wallet) {
      const res = await this.getBalanceByPlatId(w.wallet_id);
      for (let j = 0; j < this.wallets.length; j++) {
        if (this.wallets[j].wallet_id === w.wallet_id) {
          this.wallets[j].amount = res;
          break;
        }
      }
      return { ...w, amount: res };
    },
    async getBalanceByPlatId(id: string) {
      if (!id) return '0';
      let amount = '0';
      try {
        const res = await APIs.getBalanceByVenueId(id);
        amount = res;
      } catch (err) {
      }
      return amount;
    },
    async getUsdtCardList() {
      this.usdtCardList = [
        {
          bindname: 'Đây là địa chỉ ví của tiền ảoU',
          protocol: 'TRC20',
          address: '*TR3454',
          rate: 25.67,
          state: '1',
          maintain: ''
        }
      ];
    }
  }
});
