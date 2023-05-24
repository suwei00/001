// 好友列表
export const getFriendList = (data: { gid?: string; page?: number; pagesize?: number }) => request<Friends.FriendListRes>({ url: '/chat/friend/list', method: 'post', data })

// 查看好友详情
export const getFriendDetail = (params: { friend_uid: string }) => request<Friends.FriendItem>({ url: '/chat/friend/detail', params })

// 修改好友备注名
export const chatFriendUpdate = (data: Friends.FriendUpdateData) => request({ url: '/chat/friend/update', method: 'post', data })

// 搜索会员来加好友
export const searchNewFriend = (data: { chat_id: string }) => request<Friends.SearchNewFriendRes>({ url: '/chat/member/user/list', method: 'post', data })

// 添加好友
export const addNewFriend = (data: { chat_id: string }) => request({ url: '/chat/friend/insert', method: 'post', data })

// 公告
export const getNoticeListRequest = (params = {}) => request<string>({ url: '/chat/banner', method: 'get', params })

// 消息列表
export const getGroupListRequest = () => request({ url: '/chat/group/mine/list', method: 'get' })

// 弹窗 可以选择的vip等级list
export const getLevelListRequest = () => request<MyT.levelListParamResult>({ url: '/chat/member/level/list', method: 'get' })

// 修改vip等级
export const getLevelUpdateRequest = (data: MyT.levelUpdateParam) => request<string>({ url: '/chat/member/level/update', method: 'post', data })

// 是否有权限修改vip等级
export const getMemberCanuvRequest = () => request<string>({ url: '/chat/group/member/canuv', method: 'get' })

// 修改群公告"gid 群的idcontent 公告内容"
export const getUpdateAnnouncemenRequest = (data: ChatT.UpdateAnnouncemenParam) => request({ url: '/chat/group/update/announcement', method: 'post', data })

/// 群介绍
export const getUpdateIntroductionRequest = (data: ChatT.UpdateAnnouncemenParam) => request({ url: '/chat/group/update/introduction', method: 'post', data })

// 群详情/chat/group/detail
export const getGroupDetailRequest = (params: ChatT.MemberAdminParam) => request<ChatT.GroupDetailParamResult>({ url: '/chat/group/detail', method: 'get', params })

// 是否是管理员
export const getMemberAdminRequest = (params: ChatT.MemberAdminParam) => request({ url: '/chat/group/member/admin', method: 'get', params })

// 群主解散群
export const GroupDeleteRequest = (params: ChatT.MemberAdminParam) => request({ url: '/chat/group/delete', method: 'get', params })

// 申请退出群聊
export const MemberDeleteGroupRequest = (data: ChatT.MemberAdminParam) => request({ url: '/chat/member/delete/group', method: 'POST', data })

// 发言频率
export const GroupUpdateFrequencyRequest = (data: ChatT.UpdateFreqencyParam) => request({ url: '/chat/group/update/frequency', method: 'POST', data })

// 发言字数限制
export const GroupUpdatewordlimitRequest = (data: ChatT.UpdateWordLimitParam) => request({ url: '/chat/group/update/wordlimit', method: 'POST', data })

// 清除全部成员聊天记录
export const GroupHistoryCleanRequest = (data: ChatT.MemberAdminParam) => request({ url: '/chat/history/clean', method: 'POST', data })

// 群组发送消息
export const sendGroupPublish = (data: ChatT.AendSmgParam) => request<string>({ url: '/chat/group/publish', method: 'POST', data })

// 好友发送消息
export const sendPersonalPublish = (data: ChatT.AendSmgParam) => request({ url: '/chat/personal/publish', method: 'POST', data })

// 获取聊天记录
export const getChatHistory = (data: ChatT.ChatHistoryParam, signal?: any) => request<ChatT.ChatHistoryParamResult>({ url: '/chat/history', method: 'POST', data, signal })

// 获取私人聊天消息
export const getChatMemberHistory = (data: ChatT.ChatHistoryParam, signal?: any) => request<ChatT.ChatHistoryParamResult>({ url: '/chat/member/history', method: 'POST', data, signal })

// 获取群公告的跑马灯
export const getGroupAnnouncement = (params: ChatT.MemberAdminParam) => request<ChatT.AnnouncementResult>({ url: '/chat/group/announcement', method: 'GET', params })

// 群成员列表
export const getGroupMemberLis = (data: Group.GroupMemberListData) => request<Group.GroupMemberListRes>({ url: '/chat/group/member/list', method: 'post', data })

// 设置群管理员
export const setGroupAdmin = (data: Group.SetGroupAdminData) => request({ url: '/chat/group/admin/set', method: 'post', data })

// 群成员禁言/解禁
export const setGroupMemberMute = (data: Group.SetGroupMemberMuteData) => request({ url: '/chat/group/member/mute', method: 'post', data })

// 踢出群成员
export const kickGroupMemberOut = (data: Group.UpdataGroupMemberData) => request({ url: '/chat/group/member/delete', method: 'post', data })

// 获取群成员
export const getGroupMemberList = (data: ChatT.GroupMemberListParam) => request<ChatT.GroupMemberListResult>({ url: '/chat/group/member/list', method: 'POST', data })

// 邀请进群
export const addNewGroupMember = (data: { gid: string; friend_uids: string }) => request({ url: '/chat/group/member/batch/insert', method: 'post', data })

// 群读到哪条消息
export const readMemberSmg = (data: ChatT.readMemberSmgParam) => request({ url: '/chat/group/member/read', method: 'post', data })

// 是否有添加好友的权限
export const getAddMemberPermission = () => request<boolean>({ url: '/chat/group/member/canaf' })

// 删除群消息
export const delGroupSmg = (data: ChatT.delSmgParam) => request({ url: '/chat/history/delete', method: 'post', data })

// 删除好友消息
export const delMemberSmg = (data: ChatT.delSmgParam) => request({ url: '/chat/member/history/delete', method: 'post', data })
