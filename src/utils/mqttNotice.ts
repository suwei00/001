import router from '@/router'

export function noticeMqtt(result: any) {
  const chatState = chatStateStore()
  const { historyList } = storeToRefs(chatState)
  const { uid } = storeToRefs(useUserStore())
  const { gid, is_group } = JSON.parse(sessionStorage.getItem('CHAT_DATA') || '{}')
  const { i, f, t, chat_id, u } = result
  const params: any = { pagesize: 50, ud: 'u' }
  if (typeof is_group === 'boolean' && (gid === i || gid === chat_id)) {
    switch (f) {
      case '2':
        chatState.delChatSmg(t)
        break
      case '4':
        if (u.includes(uid.value)) {
          cgDialog({
            title: '踢出聊天室',
            content: '您已被踢出群聊，如有疑议请联系您的上级',
            isCancel: false,
            onOk() {
              router.push('/')
            },
          })
        }
        chatState.GetGroupMemberList({ gid: i })
        break
      case '7':
        chatState.GetGroupMemberList({ gid: i })
        break
      case '8':
        chatState.CacheChatHistoryList()
        break
      case '9':
        cgDialog({
          title: '该群已解散',
          content: '该群已被群主解散，如有疑议请联系您的上级',
          isCancel: false,
          onOk() {
            router.push('/')
          },
        })
        break
      default:
    }

    if (historyList.value.length) {
      params.ts = historyList.value[historyList.value.length - 1].ts
      params.ud = 'd'
    }
    if (is_group)
      params.gid = gid
    else
      params.chat_id = gid

    if (f !== '2')
      chatState.SetIsScrollBottom()

    chatState.GetChatHistoryList(params)
  }
  else {
    chatState.GetChatList()
  }
}
