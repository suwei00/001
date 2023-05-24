export const useUserStore = defineStore('user', () => {
  // vue-request结合pinia使用
  // https://www.attojs.com/guide/introduction.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%80%89%E6%8B%A9-vuerequest
  const appStore = useAppStore()
  const { isLogged } = storeToRefs(appStore)
  // 用户信息
  const { data: userInfo, run: runGetUserInfo } = $(useRequest(getUsrInfo, {
    ready: isLogged,
    onSuccess(usr) {
      mqttConnect(usr.uid, usr.prefix)
    },

  }))
  // 用户余额信息
  const { data: userBalance, run: runGetUserBalance, loading: balanceLoading } = $(useRequest(getUserBalance, {
    ready: isLogged,
    loadingKeep: 1000,
    throttleInterval: 5000,
    throttleOptions: {
      leading: true,
      trailing: false,
    },
  }))
  // 用户名
  const username = computed(() => userInfo?.username)
  // 是否绑定安全密码
  const haveWithdrawPwd = computed(() => userInfo?.withdraw_pwd !== 0)
  // 中心钱包余额
  const balance = computed(() => +(userBalance?.balance ?? 0))
  // vip等级
  const level = computed(() => +(userInfo?.level ?? 1))
  // 未读站内信数量
  const { data: msgNum, run: runGetMemberNum } = useRequest(getMemberNum, { ready: isLogged })
  // 用户信息
  const { data: memberInfo, run: runGetMemberInfo, runAsync: runGetMemberInfoAsync } = $(useRequest(getMemberInfo, { ready: isLogged }))
  // 用户头像
  const avatar = $computed(() => userInfo?.avatar)
  // 用户是否设置了头像
  const hasAvatar = $computed(() => gt(toNumber(avatar), 0))
  // 真实姓名
  const realName = $computed(() => memberInfo?.real_name)
  // qq号码
  const qq = $computed(() => memberInfo?.qq)
  // 微信号码
  const wechat = $computed(() => memberInfo?.wechat)
  // 邮箱
  const email = $computed(() => memberInfo?.email)
  // 出生日期
  const birth = $computed(() => memberInfo?.birth)
  // 是否设置了出生日期
  const hasBirth = $computed(() => !!birth && birth !== '0')
  // 收货地址
  const address = $computed(() => memberInfo?.address)
  // 注水图填充比例
  const fillRate = computed(() => {
    const arr = [hasAvatar, !!realName, !!qq, !!wechat, !!email, hasBirth, !!address]
    return Math.floor(arr.filter(Boolean).length / arr.length * 100)
  })
  // 用户返水
  const { data: userRebate } = useRequest(getMemberRebateScale, { ready: isLogged })

  return $$({
    userInfo,
    userBalance,
    balance,
    level,
    username,
    avatar,
    balanceLoading,
    runGetUserBalance,
    msgNum,
    runGetMemberNum,
    runGetUserInfo,
    runGetMemberInfo,
    runGetMemberInfoAsync,
    memberInfo,
    realName,
    fillRate,
    userRebate,
    haveWithdrawPwd,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
