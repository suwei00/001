import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const getData = (name: string) => {
    const obj = JSON.parse(sessionStorage.getItem('UserInfo') ?? '{}')
    return obj[name]
  }
  let username = $ref<string>(getData('username'))
  let avatar = $ref<string>(getData('avatar'))
  let uid = $ref<string>(getData('uid'))
  let wordLimit = $ref<string>(sessionStorage.getItem('wordLimit') ?? '100') // 设置发言字数
  let frequency = $ref<string>(sessionStorage.getItem('frequency') ?? '10') // 设置发言频率
  let setVipId = $ref<number>(sessionStorage.getItem('setVipId') ?? getData('level')) // 设置vip等级
  let groupAnnouncement = $ref<string>('') // 群公告
  let groupIntroduction = $ref<string>('') // 群介绍
  let chatId = $ref<string>(getData('chat_id'))

  // 设置个人信息
  const setInfo = (obj: any) => {
    if (!obj)
      return
    sessionStorage.setItem('UserInfo', obj)
    const { username: a, uid: b, level: c, avatar: d, chat_id: e } = JSON.parse(obj)
    username = a
    uid = b
    setVipId = c
    avatar = d
    chatId = e
  }

  // 是否有添加好友的权限
  const { data: canAddNewFriend } = useRequest(getAddMemberPermission)

  // 发言频率 /1次
  const setFrequency = (val: string) => {
    frequency = val
  }
  // 发言字数限制
  const setWordLimit = (val: string) => {
    wordLimit = val
  }
  // 白名单设置vip等级
  const setMyVip = (val: number) => {
    setVipId = val
  }
  // 保存群公告
  const setGroupAnnouncement = (val: string) => {
    groupAnnouncement = val
  }
  // 保存群介绍
  const setGroupIntroduction = (val: string) => {
    groupIntroduction = val
  }
  return $$({
    username,
    uid,
    avatar,
    frequency,
    wordLimit,
    setVipId,
    groupAnnouncement,
    groupIntroduction,
    setFrequency,
    setWordLimit,
    setMyVip,
    setGroupAnnouncement,
    setGroupIntroduction,
    setInfo,
    canAddNewFriend,
    chatId,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))

