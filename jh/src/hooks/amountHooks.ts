import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '~/store/userInfo'

const amountHooks = () => {
  const userInfoStor = useUserInfoStore()
  const { refreshAmount, venueTransfer, oneKeyRecycle } = userInfoStor
  const { totalAmount, centerAmount, freezeAmount, refreshAmountLoading, venueWallet, venueGameList } = storeToRefs(userInfoStor)

  return {
    totalAmount,
    centerAmount,
    freezeAmount,
    venueWallet,
    venueGameList,
    refreshAmount,
    venueTransfer,
    oneKeyRecycle,
    loading: refreshAmountLoading,
  }
}

export default amountHooks
