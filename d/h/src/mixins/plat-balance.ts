import { computed, ref, onMounted } from 'vue';
import { Wallet } from '@/dto/common';
import { APIs } from '@/http';
import { forEach } from 'lodash';
import UserModule from '@/store/modules/user/UserModule';
import { useLoading } from '@cg-template-1-components/loading';

export default function async(obj = { isAskWallets: false, isAskWalletsAmount: false }) {
  const { isAskWallets, isAskWalletsAmount } = obj; // 是否初始化请求钱包列表 / 是否允许请求钱包金额

  const wallets = ref<Wallet[]>([]); // 当前钱包列表
  const balance = computed(() => UserModule.balance); // 当前钱包余额
  const getUserBalance = UserModule.getUserBalance; // 获取用户余额
  const { open, close } = useLoading();

  const getPlatWalletList = () => {
    // 获取平台钱包列表
    return new Promise(resolve => {
      open()
      APIs.getPlatList().then((res: any) => {
        close()
        if (res.status && res.data.length) {
          const oldWallets = res.data.filter((item: any) => item.flags === 3);
          const oldWalletsId: any = [];
          oldWallets.forEach((item: any) => {
            oldWalletsId.push(item.wallet_id);
          });
          const newWalletsId = oldWalletsId.filter(
            (item: any, index: any) => oldWalletsId.indexOf(item) === index
          );
          const newWallets: any = [];
          newWalletsId.forEach((item: any, idx: any) => {
            oldWallets.forEach((item2: any) => {
              if (item === item2.wallet_id) {
                if (!newWallets[idx]) {
                  newWallets.push({ ...item2, name: item2.wallet_name });
                }
              }
            });
          });

          wallets.value = newWallets;

          // 检查本地是否有自定义排序
          const walletSorter = localStorage.getItem('walletSorter');
          if (walletSorter) {
            const walletSorterArr = JSON.parse(walletSorter);

            // 检查是否有新增场馆钱包
            const newWalletArr: any = [];
            wallets.value.forEach(w => {
              if (walletSorterArr.indexOf(w.id) === -1) {
                newWalletArr.push(w);
              }
            });
            // 使用本地排序
            const SoredArr: any = [];
            walletSorterArr.forEach((id: string) => {
              wallets.value.forEach((w: any) => {
                if (w.id === id) {
                  SoredArr.push(w);
                }
              });
            });
            wallets.value = [...SoredArr, ...newWalletArr];

            // 更新本地排序
            if (newWalletArr.length > 0) {
              const walletSorter = wallets.value.map((w: any) => w.id);
              localStorage.setItem('walletSorter', JSON.stringify(walletSorter));
            }
          }

          if (isAskWalletsAmount && UserModule.login) {
            forEach(wallets.value, (i: any) => {
              getBalanceByPlatId(i);
            });
          }

          resolve(wallets);
        }
      });
    });
  };

  const getBalanceByPlatId = (i: any): void => {
    if (i.wallet_id) {
      if (i.isLoading) return;
      i.amount = '0';
      i.isLoading = true;

      APIs.getBalanceByVenueId({ id: i.wallet_id })
        .then((res: any) => {
          if (res.status && res.data) {
            i.amount = res.data;
          }
          i.isLoading = false;

          UserModule.getUserBalance;
        })
        .catch(() => (i.isLoading = false));
    }
  };

  onMounted(() => {
    if (isAskWallets && UserModule.login) {
      getPlatWalletList();
    }
  });

  return {
    getBalanceByPlatId,
    getPlatWalletList,
    wallets,
    balance,
    getUserBalance
  };
}
