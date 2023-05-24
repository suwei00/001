declare namespace Friends {
  interface FriendItem {
    id: number
    chat_id: string
    username: string
    uid: number
    level: string
    friend_name: string
    friend_uid: string
    nick_name: string
    remark: string
    pinyin: string
    avatar: string
    parent_name:string
  }
  interface FriendListRes {
    d: FriendItem[]
    t: number
    s: number
  }
  interface FriendUpdateData {
    friend_uid: string
    nick_name: string
    remark: string
  }
  interface NewFriendItem {
    chat_id:string // 久聊id
    uid: string // 用户的id
    username: string // 用户名
    level: number // 会员等级
    parent_name: string // 上级
    mute: '0' | '1' // 0解禁，1禁言
    avatar: string // 头像
    nick_name: string // 备注名
    state: '1' | '2' | '3' | '4' // 角色 1普通成员 2管理员 3退群 4群主
  }
  
  type SearchNewFriendRes = NewFriendItem[]
}

declare namespace Group {
  interface GroupMemberListData {
    gid: string // 群id
    name?: string // 搜索时传username
    page?: number
    pagesize?: number
  }
  interface GroupMemberListRes {
    d: Friends.SearchNewFriendRes
    t: number
    s: number
  }
  interface SetGroupAdminData {
    gid: string // 群id
    usernames: string // 选中的账号英文逗号隔开
  }
  interface UpdataGroupMemberData {
    gid: string
    uid: string
  }
  interface SetGroupMemberMuteData extends UpdataGroupMemberData {
    mute: '0' | '1' // 0解禁，1禁言
  }
}

