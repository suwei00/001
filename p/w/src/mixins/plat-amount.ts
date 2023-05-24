import { APIs } from '@/http';
import UserStoreModules from '@/store/modules/user/UserModule';
import { Wallet } from '@/dto/common';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import { useLoading } from '@template-components/loading';
import Toast from '@template-components/toast';
import ToastError from '@template-components/app-error-list';
import { cloneDeep, uniqBy } from 'lodash';
import { cgDialog } from '@/utils/publicPopup';
import TransferWait from './TransferWait.vue'



const platAmountRelativeEffect = () => {
  //  中心钱包余额，锁定钱包余额
  const balance = computed(() => UserStoreModules.balance);
  const lockBalance = computed(() => UserStoreModules.lockBalance);
  /**
   * @description 刷新中心钱包余额和场馆钱包余额
   */
  const refreshBalance = () => {
    APIs.getUserBalance().then((res: any) => {
      if (res.status) {
        UserStoreModules.setBalance(res.data.balance);
        UserStoreModules.setLockBalance(res.data.lock_amount);
        Toast(t('personal.money_refresh'));
      } else {
        Toast(res.data);
      }
    });
    // 获取场馆钱包余额
    getPlatList();
  };
  const getWalletName = (item: Wallet) => {
    const name = item.name;
    const AE = ['AE_ZR', 'AE_Seven', 'AE_DY', 'Kingmaker_QP'];
    const CQ9 = ['CQ9_DY', 'CQ9_Fish'];
    const JDB = ['JDB_DY', 'JDB_Fish'];
    const IM = ['IM_Sports', 'IM_Esports'];
    const SABA = ['SABA_Sports', 'SABA_Esports'];
    if (AE.includes(name)) {
      return 'AE';
    }
    if (CQ9.includes(name)) {
      return 'CQ9';
    }
    if (JDB.includes(name)) {
      return 'JDB';
    }
    if (IM.includes(name)) {
      return 'IM';
    }
    if (SABA.includes(name)) {
      return 'SABA';
    }
    return t(`PLATFORM_PLATS_ID.n${item.id}`);
  };
  const { t } = useI18n();
  const wallets = ref<Wallet[]>([]);
  // 获取场馆列表
  const getPlatList = async () => {
    // const res = await APIs.getPlatList();
    // if (res.status) wallets.value = [];

    APIs.getVenueWalletList().then(async (res: any) => {
      console.log('resresres123123', res)
      if (res.status && res.data.length) {
        const arr = res.data.map((i: any) => {
          const amount = '0';
          const name = getWalletName(i);
          return { ...i, amount, name };
        })
        wallets.value = uniqBy(arr, 'wallet_id').filter((i: any) => i.flags === 3) as any;
        wallets.value.forEach((i: Wallet) => {
          getBalanceByPlatId(i);
        });
      }
    });
  };
  // 根据场馆ID获取余额
  const getBalanceByPlatId = (i: Wallet) => {
    if (i.wallet_id) {
      APIs.getBalanceByVenueId({ id: i.wallet_id }).then((res: any) => {
        if (res.status && res.data) {
          wallets.value.forEach(item => {
            if (item.wallet_id === i.wallet_id) {
              item.amount = res.data
            }
          })
        }
      });
    }
  };
  // 格式化金额
  const formatAmount = (str: string) => {
    const st = str.toString();
    return st.split('.')[0];
  };

  const cyclicCall = async (list: Array<any>, closure: any) => {
    const _list = cloneDeep(list)
    const current = _list.shift()
    const res = await APIs.transfer({ pid: current.id, ty: 2 })
    if (res.status) {
      getBalanceByPlatId(current);
    } else {
      errList.value.push(current)
    }

    if (_list.length === 0) {
      UserStoreModules.getUserBalance();
      closure();
      if (!errList.value.length) {
        Toast(t('plat_list.succes'));
      } else {
        ToastError(errList.value);
      }
    } else {
      cyclicCall(_list, closure)
    }
  }
  // const { open, close } = useLoading();
  const recoverTime = ref(0);
  const errList = ref<Wallet[]>([]);
  // 一键回收
  const recover = () => {
    if (Date.now() - recoverTime.value < 15000) {
      Toast('Thao Tác Quá Nhiều Lần , Vui Lòng Thử Lại Sau');
      return;
    }
    recoverTime.value = Date.now();
    errList.value = [];
    const list = wallets.value.filter(i => i.id && Number(i.amount) >= 1 && !(i.maintained === 2 && i.share_wallet === 0));

    if (!list.length) {
      Toast('Số Dư Trong Ví Sảnh Game Của Quý Khách Không Đủ, Và Tạm Thời Không Có Số Dư Có Thể Thu Hồi.')
      return;
    }

    const closure = cgDialog({
      title: 'LỜI NHẮC NHỞ',
      showClose: false,
      component: TransferWait
    });

    cyclicCall(list, closure)
  };


  getPlatList();
  return {
    balance,
    refreshBalance,
    lockBalance,
    wallets,
    getPlatList,
    getBalanceByPlatId,
    recover,
    formatAmount
  };
};

export default platAmountRelativeEffect;
