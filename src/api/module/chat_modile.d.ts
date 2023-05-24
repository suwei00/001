// 群详情
declare namespace ChatT {
  interface GroupDetailParamResult {
    d: {
      uid: string;
      username: string;
      level: number;
      parent_name: string;
      mute: string;
      avatar: string;
      nick_name: string;
      state: string;
    }[]
    /** 群详情 群详情 群介绍 群公告 群角色 */
    uid: 0
    username: string// 用户的账号 注意这个是用来@的
    level: number// 会员等级
    parent_name?: string// 上级
    mute?: number // 0开启1禁言
    avatar?: string // 久赢头像
    nick_name?: string// 名称 默认是用户账号。可以手动添加备注名
    state?: string // 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主
    id?: string // 群号 后面调其他接口用的群id
    name?: string // 群名称
    announcement?: string // 群公告
    introduction?: string // 群介绍
    word_limit: number;
    frequency: number;
  }
  // 是否是管理员
  interface MemberAdminParam {
    /** 群ID */
    gid: string
  }
  // 修改发言频率
  interface UpdateFreqencyParam {
    /** 群ID */
    gid: string
    /** 多少秒一次 */
    frequency: string
  }
  //修改发言字数
  interface UpdateWordLimitParam {
    /** 群ID */
    gid: string
    /** 发言的字数 */
    word_limit: string
  }
  interface AnnouncementResult {
    /** 公告内容 */
    d: string
  }

  interface AendSmgParam {
    /** 群ID */
    gid?: string
    /** 好友id */
    chat_id?: string
    /** 发送消息文本 */
    content?: string
    /** 发送图片 */
    img?: string
    /** @ 的用户的id */
    aite_user?: string
  }

  interface ChatHistoryParam {
    /** 好友列表的私聊聊天频道chat_id或者消息列表的id */
    chat_id?: string
    /** 群ID */
    gid?: string
    /** 翻页类型 上翻u  下翻d */
    ud: string
    /** 分页条数 */
    pagesize: number
    /** 搜索的关键词 */
    keyword?: string
    /** 定位消息的id第一次进入不传 */
    ts?: string
  }

  interface ChatType {
    /**自建唯一标识 */
    id: number | string
    /** 头像 */
    avatar?: string
    /** 消息文本 */
    c?: string
    /** 1、普通消息 2 管理才能看的消息 3、个人才能看的消息 */
    f?: string
    /** 消息的时间 */
    ts: string
    /** 发送人名称 */
    name?: string
    /** 接收人名称 */
    receiver_name?: string
    /** 接收人id 当f = 3 的时候 只有该用户能看到 */
    receiver_uid?: string
    /** 1:成员2:管理员3:退群4:群主 */
    state?: string
    /** 消息的时间 */
    t: string
    /** 发送人id */
    uid?: string
    /** VIP等级 */
    v?: string
    /** 是否自己发送消息 1自己 2他人 */
    is_own: number
    /** 1被删除的消息 0没有被删除 */
    is_del: number
    /** 1为好友 */
    is_friend: number
    /** 用户名 */
    username: string
  }

  interface ChatHistoryParamResult {
    /** 消息列表 */
    d: Array<ChatType> | null
    a: Array<any> | null
    s: number
    t: number
  }

  interface UpdateAnnouncemenParam {
    // 修改群公告
    /** 群ID */
    gid: string
    /** 公告内容 */
    content: string
  }

  interface GroupMemberListParam {
    /** 群ID */
    gid: string
    /** 搜索的名称 */
    name?: string
    /** 页码 */
    page?: number
    /** 单页条数 */
    pagesize?: number
  }

  interface readMemberSmgParam {
    /**消息的id */
    ts?: string
    /**群id或者私聊的chat_id */
    gid: string | undefined
    /**0 群聊 1 私聊 */
    type: number
  }

  interface MemberListType {
    /** 头像 */
    avatar?: string
    /** VIP等级 */
    level?: number,
    /** 0开启1禁言 */
    mute?: string,
    /** 名称 默认是用户账号。可以手动添加备注名 */
    nick_name?: string,
    /** 上级名称 */
    parent_name?: string,
    /** 该用户在该群的角色 1 普通成员 2 管理员 3 退群 4 群主 */
    state?: string,
    /** 用户的id */
    uid: string,
    /** 用户的账号 注意这个是用来 @ 的  */
    username: string,
  }

  interface GroupMemberListResult {
    /** 消息列表 */
    d: Array<MemberListType> | null
    a: Array<any> | null
    s: number
    t: number
  }


  interface delSmgParam {
    /** 好友列表的私聊聊天频道chat_id或者消息列表的id */
    chat_id?: string
    /**群id或者私聊的chat_id */
    gid?: string
    /**消息的id */
    ts: string
  }
}





