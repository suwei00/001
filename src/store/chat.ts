import { defineStore } from 'pinia'
import Event from '@/utils/event.js'

interface stateType {
  historyList: Array<ChatT.ChatType>
  announcement: string | undefined
  memberList: Array<ChatT.MemberListType>
  publishList: Array<any>
  groupList: Array<any>
  atList: Array<string>
  isManage: boolean
  isScrollBottom: boolean
  aite_user: Array<string>
}

export const chatStateStore = defineStore({
  id: 'chatState',
  state: (): stateType => {
    return {
      historyList: [],
      announcement: '',
      memberList: [],
      groupList: [],
      publishList: [],
      atList: [],
      isManage: false,
      isScrollBottom: false,
      aite_user: [],
    }
  },
  actions: {
    SetAiteUser(list: Array<string>) {
      this.aite_user = list
    },
    SetIsScrollBottom() {
      this.isScrollBottom = true
    },
    CacheChatHistoryList() {
      this.historyList = []
      this.atList = []
    },
    delChatSmg(t: string) {
      this.historyList = this.historyList.map((item: ChatT.ChatType) => {
        if (t === item.ts)
          item.is_del = 1
        return item
      })
    },
    async GetChatHistoryList(params: ChatT.ChatHistoryParam) {
      let data = null

      if (params.gid) {
        if (!this.historyList.length)
          this.isManage = await getMemberAdminRequest({ gid: params.gid }) as boolean

        data = await getChatHistory(params)
      }
      else {
        this.isManage = true
        data = await getChatMemberHistory(params)
      }

      if (data?.d?.length) {
        const _list = data.d.reverse()
        if (params.ud === 'd') {
          readMemberSmg({ ts: data.d[0].ts, gid: params.gid || params.chat_id, type: params.gid ? 0 : 1 })
          this.historyList = this.historyList.concat(_list)
        }
        else {
          if (!params.ts)
            readMemberSmg({ ts: data.d[0].ts, gid: params.gid || params.chat_id, type: params.gid ? 0 : 1 })

          this.historyList = _list.concat(this.historyList)
        }

        if (this.historyList.length)
          this.historyList = addDateItem(this.historyList)
      }

      if (data?.a)
        this.atList = data?.a

      if (this.isScrollBottom) {
        Event.emit('EventSetScrollTop')
        this.isScrollBottom = false
      }
    },
    async PositionChatHistoryList(params: ChatT.ChatHistoryParam) {
      let data = null
      if (params.gid)
        data = await getChatHistory(params)
      else
        data = await getChatMemberHistory(params)
      if (data?.d) {
        const _list = addDateItem(data.d)
        this.historyList = _list
      }
      if (data?.a)
        this.atList = data?.a
    },
    async GetGroupAnnouncement(params: ChatT.MemberAdminParam) {
      const data = await getGroupAnnouncement(params)
      this.announcement = data?.d
    },
    async GetGroupMemberList(params: ChatT.GroupMemberListParam) {
      const data = await getGroupMemberList(params)
      this.memberList = data?.d || []
    },
    async GetChatList() {
      const data: any = await getGroupListRequest()
      const chatList = data?.d || []
      this.publishList = chatList.filter((item: any) => item.is_publish,
      )
      this.groupList = chatList.filter((item: any) => !item.is_publish).sort((a: any, b: any) => b.created_at - a.created_at)
    },
  },
})
