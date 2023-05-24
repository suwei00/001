import { ref } from 'vue';
import { uniqBy } from 'lodash';
import APIs from '@/http/blue-apis';
import { userInfoStateStore } from '@/store-pinia/userInfo';

interface Wallet {
  [key: string]: any;
  id: string;
  name: string;
  seq: number;
  amount: string;
  flags: number;
  maintained: number;
  wallet_id: string;
  wallet_name: string;
}

export const useWallets = () => {
  const userStore = userInfoStateStore();

  // 场馆钱包
  const wallets = ref<Wallet[]>([]);

  // 只更新某个钱包余额
  const updateSingleWallet = (i: Wallet) => {
    getBalanceByPlatId(i);
  }

  // 根据场馆ID获取余额
  const getBalanceByPlatId = async (i: Wallet) => {
    if (!i.wallet_id) return;
    const res = await APIs.getBalanceByVenueId(i.wallet_id);
    return res;
  };

  // 获取场馆列表
  const getPlatList = async () => {
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
    wallets.value = uniqBy(
      arr.map(w => ({ ...w, amount: '0' })),
      'wallet_id'
    ).filter((i: any) => i.flags === 3);

    userStore.setWallets(wallets.value);
    const requestList = wallets.value.map(w => getBalanceByPlatId(w));
    await Promise.allSettled(requestList);
    userStore.setWallets(wallets.value);
  };

  return {
    wallets,
    updateSingleWallet,
    getBalanceByPlatId,
    getPlatList,
  }
};
