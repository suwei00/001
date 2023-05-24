import { defineStore } from 'pinia';
import APIs from '@/http/blue-apis';
import { merge } from 'lodash';
import { PawErrorDialog } from '@/mixins/pawError';
import { useLoading } from '@/hooks/useLoading';

const { startLoading, closeLoading } = useLoading();
interface State {
  userInfo: any;
  refreshLoading: boolean;
  wallets: any[];
  usdtCardList: any[];
}

export const userInfoStateStore = defineStore('userInfo', {
  state: (): State => {
    return {
      userInfo: {},
      refreshLoading: false,
      wallets: [],
      usdtCardList: [],
    };
  },
  getters: {
    infoRate: state => {
      // 解构默认值只对 undefined 有效
      const {
        username = '0',
        phone = '0',
        real_name = '0',
        zalo = '0',
        email = '0',
        birth = '0'
      } = state.userInfo;
      // 统计长度不为0的变量数量
      const obj: any = { username, phone, real_name, zalo, email, birth };
      return (6 - Object.keys(obj).filter((k: any) => obj[k] === '0' || !obj[k]).length) / 6;
    }
  },
  actions: {
    getUserInfo() {
      APIs.getToken().then((data: any) => {
        APIs.getMemberInfo().then((res: any) => {
          this.userInfo = { ...data, ...res };
        });
      });
    },
    handleLogInApi(params: any, storage: boolean) {
      startLoading();
      APIs.login(params)
        .then(res => {
          if (res === '1000') {
            if (storage) {
              localStorage.setItem('USER_PAW', params.password);
            } else {
              localStorage.removeItem('USER_PAW');
            }
            localStorage.setItem('USER_NAME', params.username);

            location.href = '/home';
          }
        })
        .catch(data => {
          PawErrorDialog(data);
        })
        .finally(() => {
          closeLoading();
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
    clearUserInfo() {
      this.userInfo = {};
    },
    setWallets(val: any[]) {
      this.wallets = val;
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
