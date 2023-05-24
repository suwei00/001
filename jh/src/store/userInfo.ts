import { Toast } from 'vant'
import { Session } from '~/utils/help'
import { mqttConnect } from '~/utils/mqtt'

const recordUserInfo = {
  address: '',
  agency_type: 0,
  avatar: '0',
  balance: '0.00',
  bankcard_total: 0,
  birth: '0',
  birth_hash: '0',
  created_at: 0,
  email_hash: '0',
  first_deposit_amount: '0.00',
  first_deposit_at: 0,
  group_name: '',
  invitation_code: '',
  last_login_at: 0,
  last_login_device: '',
  last_login_ip: '',
  last_login_source: 0,
  last_withdraw_at: '0',
  level: 0,
  lock_amount: '0.00',
  parent_name: '',
  parent_uid: '',
  password: '',
  phone_hash: '',
  prefix: '',
  qq_hash: '0',
  realname_hash: '0',
  reg_device: '',
  reg_url: '',
  regip: '',
  remarks: '',
  second_deposit_amount: '0.00',
  second_deposit_at: 0,
  source_id: 0,
  state: 0,
  tester: '',
  top_name: '',
  top_uid: '',
  uid: '',
  username: '',
  wechat_hash: '0',
  withdraw_pwd: 0,
  phone: '',
  real_name: '',
  email: '',
  wechat: '',
  qq: '',
  chat_id: '',
}

export const useUserInfoStore = defineStore('userInfo', () => {
  const delayTime = 800
  let timer: any = null
  const refreshAmountLoading = ref(false)
  const refreshOver = () => {
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      refreshAmountLoading.value = false
    }, delayTime)
  }

  const token = ref(Session.getItem('token') ?? '')
  const userInfo = ref(Session.getItem('userInfo') ?? recordUserInfo)
  const centerAmount = ref(userInfo.value.balance) // 中心钱包
  const freezeAmount = ref(userInfo.value.lock_amount) // 锁定钱包
  const venueWallet = ref(Session.getItem('venueWallet') ?? []) // 场馆钱包
  const venueGameList = ref(Session.getItem('venueGameList') ?? []) // 游戏场馆列表 其实就是不过滤的 场馆钱包
  const oneKeyRecycleLoading = ref(false) // 一键回收loading
  const zdfsgdgrsdrgsfLoading = ref(false)
  const sadfasfNum = ref(false)
  const { openLoading, closeLoading } = useLoading()
  const totalAmount = computed(() => {
    // 保留两位小数
    return String(Number(centerAmount.value) + Number(freezeAmount.value))
  })

  const setToken = (t: string) => {
    token.value = t
    Session.setItem('token', t)
  }

  const clearToken = () => {
    token.value = ''
    Session.removeItem('token')
    userInfo.value = recordUserInfo
    Session.removeItem('userInfo')
    // 活动弹窗 removeItem
    Local.removeItem('popStatus')
  }

  const getMemberInfo = () => { // 获取用户信息
    if (!token.value)
      return
    memberInfoRequest().then((res: any) => {
      if (res.status) {
        mqttConnect(res.data.uid, res.data.prefix)

        userInfo.value = res.data ?? {}
        centerAmount.value = res.data.balance ?? '0.00'
        freezeAmount.value = res.data.lock_amount ?? '0.00'
        Session.setItem('userInfo', res.data ?? {})
        memberSensitiveInfoRequest().then((res: any) => {
          if (res.status) {
            userInfo.value.address = res.data.address
            userInfo.value.email = res.data.email
            userInfo.value.phone = res.data.phone
            userInfo.value.qq = res.data.qq
            userInfo.value.real_name = res.data.real_name
            userInfo.value.wechat = res.data.wechat
            Session.setItem('userInfo', userInfo.value)
          }
        })
      }
    })
  }

  const getVenueWalletList = () => { // 获钱包取场馆列表
    if (!token.value)
      return
    const arr: any = []
    memberPlatformRequest().then((res: any) => {
      if (res.status) {
        let oldArr = res.data ?? []
        const localArr = res.data ?? []
        // 单独处理 8840968486572375835 久赢彩票
        oldArr = oldArr.filter((i: any) => i.wallet_id !== '8840968486572375835')
        oldArr.forEach((item: any) => {
          const arrs = arr.filter((i: any) => i.wallet_id === item.wallet_id)
          if (!arrs.length) {
            const obj = item
            obj.label = item.wallet_name
            obj.loading = false
            obj.maintain = item.maintained !== 1
            obj.amount = '0'
            arr.push(obj)
          }
        })
        venueWallet.value = arr
        Session.setItem('venueWallet', arr)
        venueGameList.value = localArr
        Session.setItem('venueGameList', localArr)
      }
    })
  }

  const refreshAmount = (type = '1', pid = '') => {
    // type '1' = 中心钱包 + 锁定钱包; '2' = 中心钱包 + 锁定钱包 + 所有场馆钱包; '3' = 中心钱包 + 锁定钱包 + 单个场馆钱包
    if (refreshAmountLoading.value && !token.value)
      return

    const getCountAmount = () => {
      return new Promise((resolve) => {
        memberBalanceRequest().then((res: any) => {
          if (res.status) {
            centerAmount.value = res.data.balance ?? '0'
            freezeAmount.value = res.data.lock_amount ?? '0'

            userInfo.value.balance = res.data.balance ?? '0'
            userInfo.value.lock_amount = res.data.lock_amount ?? '0'
          }
        }).catch(() => {
          centerAmount.value = '0'
          freezeAmount.value = '0'

          userInfo.value.balance = '0'
          userInfo.value.lock_amount = '0'
        }).finally(() => {
          refreshOver()
          Session.setItem('userInfo', userInfo.value)
          resolve('999')
        })
      })
    }

    refreshAmountLoading.value = true
    let idx = -1

    switch (type) {
      case '1':
        getCountAmount()
        break
      case '2':
        openLoading()
        memberPlatformRequest().then((res: any) => {
          const arr: any = []
          if (res.status) {
            let oldArr = res.data ?? []
            const localArr = res.data ?? []
            // 单独处理 8840968486572375835 久赢彩票
            oldArr = oldArr.filter((i: any) => i.wallet_id !== '8840968486572375835')
            oldArr.forEach((item: any) => {
              const arrs = arr.filter((i: any) => i.wallet_id === item.wallet_id)
              if (!arrs.length) {
                const obj = item
                obj.label = item.wallet_name
                obj.loading = true
                obj.maintain = item.maintained !== 1
                arr.push(obj)
              }
            })
            venueWallet.value = arr
            Session.setItem('venueWallet', arr)
            venueGameList.value = localArr
            Session.setItem('venueGameList', localArr)

            const cycleFnArr: any = []
            arr.forEach((item: any, index: number) => {
              const fns = function () {
                return new Promise((resolve) => {
                  if (!item.maintain) {
                    venueWallet.value[index].loading = true
                    platBalanceRequest({ pid: item.wallet_id }).then((res: any) => {
                      if (res.status)
                        venueWallet.value[index].amount = res.data ?? 0

                      else
                        venueWallet.value[index].amount = 0
                    }).catch(() => {
                      venueWallet.value[index].amount = 0
                    }).finally(() => {
                      venueWallet.value[index].loading = false
                      Session.setItem('venueWallet', venueWallet.value)
                      resolve(index)
                    })
                  }
                  else {
                    venueWallet.value[index].loading = false
                    resolve(index)
                  }
                })
              }
              cycleFnArr.push(fns)
            })
            cycleFnArr.push(getCountAmount)

            // 并发请求
            const finishArr: any = []
            cycleFnArr.forEach((fns: any) => {
              fns().finally((res: any) => {
                finishArr.push(res)
                if (finishArr.length === cycleFnArr.length)
                  closeLoading()
              })
            })

            // const run = function (arr: any, start = 0) {
            //   if (start > arr.length || start < 0)
            //     return // 参数start不能超过    arr.length，不能为负数
            //   const next = function (i: any) {
            //     if (i < arr.length) {
            //       const fn = arr[i]
            //       fn().then((res: any) => {
            //         console.log('执行第', res, '个场馆余额请求')
            //         i++
            //         next(i)
            //       })
            //     }
            //   }
            //   next(start)
            // }

            // run(cycleFnArr) // 执行方法
          }
        })
        break
      case '3':
        venueWallet.value.forEach((item: any, index: number) => {
          if (item.wallet_id === pid)
            idx = index
        })
        if (idx > -1) {
          platBalanceRequest({ pid }).then((res: any) => {
            if (res.status)
              venueWallet.value[idx].amount = res.data ?? 0
            else
              venueWallet.value[idx].amount = 0
          }).catch(() => {
            venueWallet.value[idx].amount = 0
          }).finally(() => {
            venueWallet.value[idx].loading = false
            Session.setItem('venueWallet', venueWallet.value)
            getCountAmount()
          })
        }
        else {
          console.log(`没有找到对应的场馆钱包pid:${pid}`)
        }
        break
    }
  }

  // 转账
  const venueTransfer = (pid: string, ty = 1, amount?: string, resolve = () => {}) => {
    console.log(pid, '<<<<<+======', amount, ty)
    if (Number(amount) < 0.01 && ty === 2) {
      Toast('中心钱包余额不足，暂无可转入金额')
      return
    }

    const params: any = amount ? { pid, ty, amount: Number(amount) } : { pid, ty }

    let idx = -1
    venueWallet.value.forEach((item: any, index: number) => {
      if (item.wallet_id === pid)
        idx = index
    })

    if (idx > -1) {
      venueWallet.value[idx].loading = true

      transferRequest({ ...params }).then((res: any) => {
        if (res.status) {
          refreshAmount('3', pid)
          resolve && resolve()
        }
        else {
          venueWallet.value[idx].loading = false
        }
      }).catch(() => {
        venueWallet.value[idx].loading = false
      })
    }
    else {
      console.log(`没有找到对应的场馆钱包pid:${pid}`)
    }
  }

  const oneKeyRecycleLoadingClose = () => {
    oneKeyRecycleLoading.value = false
  }
  // 一键回收
  const oneKeyRecycle = () => {
    const isShowList = venueWallet.value.filter((item: any) => Number(item.amount ?? '0') > 0)
    if (!isShowList.length)
      return Toast('场馆钱包不足，暂无可回收余额')

    oneKeyRecycleLoading.value = true

    const getCountAmount = () => {
      return new Promise((resolve) => {
        memberBalanceRequest().then((res: any) => {
          if (res.status) {
            centerAmount.value = res.data.balance ?? '0'
            freezeAmount.value = res.data.lock_amount ?? '0'

            userInfo.value.balance = res.data.balance ?? '0'
            userInfo.value.lock_amount = res.data.lock_amount ?? '0'
          }
        }).catch(() => {
          centerAmount.value = '0'
          freezeAmount.value = '0'

          userInfo.value.balance = '0'
          userInfo.value.lock_amount = '0'
        }).finally(() => {
          refreshOver()
          Session.setItem('userInfo', userInfo.value)
          resolve('999')
          oneKeyRecycleLoading.value = false
        })
      })
    }

    refreshAmountLoading.value = true

    const oldArr = venueWallet.value ?? []
    const cycleFnArr: any = []
    oldArr.forEach((item: any, index: number) => {
      const fns = function () {
        return new Promise((resolve) => {
          if (!item.maintain && +item.amount > 0) {
            venueWallet.value[index].loading = true
            transferRequest({ pid: item.wallet_id, ty: 2 }).then((res: any) => {
              if (res.status) {
                platBalanceRequest({ pid: item.wallet_id }).then((res: any) => {
                  if (res.status)
                    venueWallet.value[index].amount = res.data ?? 0

                  else
                    venueWallet.value[index].amount = 0
                }).catch(() => {
                  venueWallet.value[index].amount = 0
                }).finally(() => {
                  venueWallet.value[index].loading = false
                  Session.setItem('venueWallet', venueWallet.value)
                  resolve(index)
                })
              }
              else {
                venueWallet.value[index].loading = false
                resolve(index)
              }
            }).catch(() => {
              venueWallet.value[index].loading = false
              resolve(index)
            }).finally(() => {
              Session.setItem('venueWallet', venueWallet.value)
            })
          }
          else {
            venueWallet.value[index].loading = false
            resolve(index)
          }
        })
      }
      cycleFnArr.push(fns)
    })
    cycleFnArr.push(getCountAmount)

    const run = function (arr: any, start = 0) {
      if (start > arr.length || start < 0)
        return // 参数start不能超过    arr.length，不能为负数
      const next = function (i: any) {
        if (i < arr.length) {
          const fn = arr[i]
          fn().then((res: any) => {
            console.log('执行第', res, '个场馆余额请求======', zdfsgdgrsdrgsfLoading.value)
            if (res !== '999')
              sadfasfNum.value = true

            if (!zdfsgdgrsdrgsfLoading.value) {
              i++
              next(i)
            }
          })
        }
      }
      next(start)
    }

    run(cycleFnArr) // 执行方法
  }

  const oneClickTrunLoadingClose = () => {
    refreshAmountLoading.value = false
    oneKeyRecycleLoading.value = false
    sadfasfNum.value = false
    console.log(refreshAmountLoading.value, 'refreshAmountLoading.valuerefreshAmountLoading.valuerefreshAmountLoading.value')
  }

  const oneClickTrunLoadingOpen = () => {
    refreshAmountLoading.value = false
    zdfsgdgrsdrgsfLoading.value = true
  }

  return {
    token,
    userInfo,
    setToken,
    clearToken,
    getMemberInfo,

    getVenueWalletList,
    venueTransfer,
    oneKeyRecycle,

    oneKeyRecycleLoading,
    oneKeyRecycleLoadingClose,

    oneClickTrunLoadingClose,
    oneClickTrunLoadingOpen,
    sadfasfNum,

    totalAmount,
    centerAmount,
    freezeAmount,
    refreshAmountLoading,

    venueGameList,
    venueWallet,
    refreshAmount,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserInfoStore, import.meta.hot))
