module.exports = {
  // 货币符号
  currency: '￥',
  cancel: '取消',
  confirm: '确定',
  all_amount: '全部金额',
  format_date: 'YYYY-MM-DD HH:mm:ss',
  formta_date2: 'YYYY-MM-DD',
  format_date_title: '{MM}月{DD}日',
  format_date_title1: '{MM}月{DD}日',
  pulling_text: '下拉即可刷新...',
  loosing_text: '释放即可刷新...',
  loading_text: '加载中...',
  finished_text: '没有更多了',
  center_wallet: '中心钱包',
  token: '登录失效',
  copy: '复制',
  day: '天',
  reset: '重置',
  save: '保存',
  edit: '编辑',
  all: '全部',
  query: '查询',
  add: '新增',
  success: '成功',
  nodata: '暂无数据',
  networkSpeed: '当前网速',
  receiveSuccess: '领取成功',
  loginTip: '请先登录!',
  date_error: '开始日期不能大于结束日期',
  // 登录
  login: {
    logout: '登录',
    sponsor_partner: '赞助厂商'
  },
  register: {
    register: '注册'
  },
  entry: {
    login: '登录',
    sponsor_partner: '赞助厂商',
    team1: '西甲皇家马德里',
    team2: '比利时国家队',
    team3: '意甲亚特兰大',
    placeholder_username: '用户名',
    placeholder_pwd: '密码',
    rember_pwd: '记住密码',
    forget_pwd: '忘记密码',
    other: '先去逛逛',
    regist_new_user: '注册新用户',
    register: '注册',
    confirm_pwd: '确认密码',
    pwd: '密码',
    username_rule: '4-9个字符，前2位必须为字母，数字可选，不支持符号',
    pwd_rule: '密码长度为8-20位，字母+数字的组合',
    pwd_same: '两次密码输入不一致',
    volicode: '验证码',
    phone_number: 'phone_number',
    code_btn_text: '验证码',
    back_login: '返回登录',
    code_error: '验证码错误',
    time_out: '超时',
    up_same: '密码和用户名不能一致',
    err_tip_1: '用户名或密码错误，第{error_times}次尝试，20次输入错误账户将被锁定',
    err_tip_2: '用户名或密码错误，第{error_times}次尝试，20次输入错误账户将被锁定+图形验证码',
    err_tip_3: '账号禁止登录（1小时限制）。',
    err_tip_4: '账号或密码不正确',
    err_tip_5: '验证码格式不正确或为空。',
    sameUser: '此用户名已存在'
  },
  getCode: '获取验证码',
  submit: '提交',
  service: '联系客服',
  cs_tip: '如需帮助，请{0}解决',
  finish: '完成',
  next: '下一步',
  addSuccess: '新增成功',
  untieSuccess: '解绑成功',
  sendSuccess: '发送成功',
  bindSuccess: '绑定成功',
  close: '关闭',
  gender: ['未选择', '男', '女'],
  captcha: '图形验证码',
  captchaPlaceholder: '请输入图形验证码',
  codeError: '短信验证码格式错误',
  captchaError: '图形验证码格式错误',
  sms: '短信验证码',
  smsTip: '{time}s后可重新发送',
  reSend: '重新发送',
  ifDelete: '确认删除信息吗？',
  account: {
    title: '账户与安全',
    optimization: '个可优化项',
    perfect: '完善账户信息',
    safety: '更安全',
    keep: '您的账户安全度较高，请继续保持',
    formList: [
      {
        title: '绑定手机号码',
        placeholder: '绑定后账户异常能及时通知'
      },
      {
        title: '绑定邮箱',
        placeholder: '绑定邮箱，用于接收账户相关信息服务'
      },
      {
        title: '绑定取款卡',
        placeholder: '绑定银行卡,便于快速取款'
      },
      {
        title: '完善个人资料',
        placeholder: '资料更完整，我们的服务更加周到'
      },
      {
        title: '登录密码管理',
        placeholder: '定期修改登录密码，有利账户安全'
      }
    ],
    footer: {
      des: '为了您的隐私安全，信息在确认后将无法修改',
      help: '如需帮助，请'
    }
  },
  phone: {
    title: '手机号码',
    label: '手机号码',
    placeholder: '绑定手机号码，保障账号安全',
    codeTitle: '手机验证码',
    codePlaceholder: '请输入您收到的手机验证码',
    error: '请输入正确的手机号码'
  },
  email: {
    title: '电子邮箱',
    label: '邮箱账号',
    placeholder: '保护您账号安全，请输入真实的电子邮箱',
    codeTitle: '邮箱验证码',
    codePlaceholder: '请输入您收到的邮箱验证码',
    error: '请输入正确的邮箱地址'
  },
  bankcard: {
    title: '卡片管理',
    tabList: [
      {
        title: '银行卡',
        buttonName: '添加银行卡',
        tip: '最多可绑定三张银行卡，已绑定-张银行卡'
      },
      {
        title: '虚拟币',
        buttonName: '添加虚拟币地址',
        tip: '最多可绑定五个虚拟地址，已绑定-虚拟币提款地址'
      }
    ],
    cardItem: {
      debit: '储蓄卡',
      dismiss: '解除绑定',
      alias: '别名',
      protocol: '{p}协议'
    }
  },
  addBank: {
    title: '添加银行卡',
    realName: '真实姓名',
    namePlaceholder: '名字需要与银行卡持卡人姓名一致，否则无法提款',
    nameTip: '为了您的资金能够迅速到账，请确保填写的姓名与银行卡的开户姓名一致',
    bankNum: '银行卡号',
    bankPlaceholder: '请输入您的银行卡号',
    bankName: '开户银行',
    bankNamePlaceholder: '请选择您的开户银行',
    bankAddress: '开户行地址',
    bankAddressPlaceholder: '请输入您的开户行地址',
    phone: '手机号码',
    phohePlageholder: '请输入11位手机号码',
    phoneCode: '手机验证码',
    codePlaceholder: '请输入您收到的手机验证码',
    chooseBank: '选择开户银行',
    realNameError: '真实姓名仅支持中文',
    bankError: '银行卡号错误',
    phoneError: '手机号码格式错误',
    codeError: '验证码格式错误'
  },
  addCoin: {
    title: '新增虚拟币地址',
    alias: '别名',
    aliasPlaceholder: '别名能便于区分您名下的虚拟币地址',
    protocol: '虚拟币协议',
    address: '虚拟币地址',
    addressPlaceholder: '请输入虚拟币地址',
    phone: '手机号码',
    phohePlageholder: '请输入11位手机号码',
    phoneCode: '手机验证码',
    codePlaceholder: '请输入您收到的手机验证码',
    tip: '请认真校对虚拟币地址和虚拟币协议的一致性，因地址和协议错误产生的损失由您自行承担！'
  },
  userInfo: {
    title: '个人资料',
    avatar: '个人头像',
    formateError: '文件格式不正确',
    limitError: '图片大小不能超过15MB!',
    username: '用户名',
    realname: '真实姓名',
    realnameTip: '名字需要与银行卡姓名一致，否则无法提款',
    sex: '性别',
    birth: '出生日期',
    birthTip: '添加日期，确保您已满18周岁',
    birthError: '您未满18周岁',
    phone: '手机号码',
    phoneTip: '绑定手机号，保障账号安全',
    email: '电子邮箱',
    emailTip: '绑定电子邮箱，保障账号安全',
    album: '从相册选取'
  },
  password: {
    title: '更改登录密码',
    tip: '保持定期更换密码的习惯，您的账号更安全！',
    formList: [
      {
        label: '原密码',
        placeholder: '请输入原始密码'
      },
      {
        label: '新密码',
        placeholder: '请输入新密码'
      },
      {
        label: '确认新密码',
        placeholder: '请再次输入密码'
      }
    ],
    submit: '立即提交',
    emailTitle: '邮箱验证码',
    emailPlaceholder: '请输入邮箱验证码',
    phoneTitle: '手机验证码',
    phonePlaceholder: '请输入手机验证码',
    successMsg: '恭喜您，您的密码已经修改成功',
    formatError: '密码长度为8-12位，字母+数字的组合',
    sameError: '新密码不能与旧密码一致',
    differentError: '两次密码输入不一致'
  },
  verification: {
    title: '更改登录密码',
    tip: '为了您的账号安全，更改登录密码，需要进行验证。',
    tabTitle: '通过{t}验证',
    formList: {
      phone: '手机号码',
      phoneTitle: '手机号码',
      phoneCode: '手机验证码',
      phonePlaceholder: '请输入手机验证码',
      email: '邮箱号码',
      emailTitle: '邮箱号码',
      emailCode: '邮箱验证码',
      emailPlaceholder: '请输入邮箱验证码'
    }
  },
  help: {
    title: '帮助中心',
    tip: '没有找到解决办法？请联系',
    service: '人工客服',
    solve: '解决',
    navFirst: [
      {
        title: '新手帮助',
        label: '存款极速到账'
      },
      {
        title: '游戏问题',
        label: '主流体育彩票玩法'
      },
      {
        title: '企业事务',
        label: '提供全面技术支持'
      },
      {
        title: '代理客服',
        label: '为您提供全天候服务'
      }
    ],
    navSecond: [
      ['开户', '存款教程', '存款', '取款', '转账', '优惠规则', '浏览器格式', '体育投注教程', '防劫持教程', '忘记密码', '钱包转账'],
      ['体育投注-让球/大小球教程', '体育常见问题', '彩票问题', '电子竞技', '体育问题', '真人问题', '其他问题'],
      ['技术支持', '竞猜责任', '关于我们', '规则条款', '合营计划', '隐私保护规则'],
      ['代理客服']
    ],
    tutorials: ['让球', '大小球'],
    boll: '球',
    bollList: [
      ['0(平手盘)', '0/0.5(平手半球盘)', '0.5(半球盘)', '0.5/1(半球/一球盘)', '1(半球/一球盘)', '1/1.5(一球/半球盘)', '1.5(一球/半球盘)', '1.5/2(球半/两球盘)'],
      ['2(两球)', '2/2.5(两球/两球半)', '2.5(两球半)', '2.5/3(两球半/三球)']
    ]
  },
  pay: ['MOMO', 'Online', 'Zalo', 'Chuyển khoản', 'QR Banking', 'USDT', 'Manual'],
  home: {
    signIn: '每日签到 尊享豪礼',
    des: '签到满7天获得额外的丰厚奖励',
    activity: '长期活动',
    dayTip: '今日不再提醒',
    vip: 'VIP',
    notice:
      '尊敬的会员：KOK体育场馆滚球比分系统，将在2021年3月4日（星期四）13:00至15:10进行升级维护，期间滚球盘口将不显示比分，不影响其他体育赛事盘口，若有疑问请联系24小时在线客服进行咨询。给您带来不便，还请谅解！ KOK平台运营部 2021年3月4日11',
    not_login: '您未登录',
    after_login: '登录后查看',
    supper_activity: '超级优惠',
    app_download: '立即下载',
    app_d_title: 'VP体育APP',
    app_d_content: '真人娱乐，体育投注，电子游艺等尽在一手掌握',
    sport: '体育',
    eports: '电竞',
    fightChicken: '斗鸡',
    real: '真人',
    cp: '彩票',
    qp: '棋牌',
    dz: '电子',
    buyu: '捕鱼',
    hot: '热门'
  },
  egame: {
    title: 'YM电子',
    tab: ['全部游戏', '热门游戏', '最新', '我的收藏']
  },
  deposit: {
    title: '存款',
    payWay: '支付方式',
    list: ['MOMO', 'Zalo', 'Online', 'REMIT', 'VIETTELPAY', 'UnionPay'],
    send: '加送',
    usdt: {
      title: 'USDT存款，最佳的选择！',
      more: '了解更多',
      des: '价格稳定 流通性高 不受机构监管',
      step1: '选择协议 发起存款',
      step2: '交易所购买并划转USDT',
      step3: '完成存款'
    },
    bankTitle: '银行卡',
    protocol: '选择使用的协议',
    protocolDiff: '协议的区别',
    name: '存款人姓名',
    placeholder: '请输入存款人姓名',
    nameTip: '为及时到账，请务必输入正确的存款人姓名',
    valetTip: '若在其他支付中支付失败，建议您使用代客充值功能，会由专人客服引导您进行充值。',
    account: '存款金额',
    other: '其他金额',
    input: '请输入存款金额',
    inputError: '请输入正确的存款金额',
    prepaid: '参考汇率 1USDT≈ {rate} KVND，预计支付{amount}USDT',
    prepaidTip: '请以实际支付时的汇率为准,到账金额为提交订单时的KVND为准',
    additional: '存款成功额外加送：1.2%',
    preferential: '每日最高优惠：588.00元',
    standard: '具体到账金额以实际到账为准',
    immediately: '立即存款',
    question: '存款遇到问题？联系',
    tip: '提示',
    bindPhone: '未保证资金安全，存款前请绑定手机',
    unbind: '暂不绑定',
    gobind: '前往绑定',
    valetTitle: '代客充值暗号',
    warmPrompt: '温馨提示:',
    text1: '1.客服将主动与您核对暗号是否为{num}',
    text2: '若暗号不匹配或客服人员不主动核对，',
    text3: '请关闭聊天窗口终止沟通,切勿进行交易！否则所引发的不到账等问题，概不负责；',
    text4: '2.客服',
    text5: '不会主动索要您的登录密码等敏感信息',
    text6: '请务必保护好您的信息防止泄露;',
    rember: '我已记住暗号，继续充值',
    proofread: '请核对存款姓名：',
    importantTip: '重要提醒：公司银行卡不定期更换，每次充值请根据提交订单生成的银行卡转账，切勿直接转账至之前转入的银行卡，否则无法到账造成的损失，将由个人承担，公司概不负责！',
    erc: '中等额度常规交易推荐',
    omni: '大额低频交易推荐',
    trc: '小额高频交易推荐',
    success: '存款成功',
    instructions: '存款优惠说明',
    thead1: '会员等级',
    thead2: '优惠百分比(%)',
    thead3: '每日最高优惠(元)'
  },
  depositUsdt: {
    topTip1: '订单失效后请勿转账，需重新申请，避免造成损失，充值地址及二维码只能转账一次，',
    topTip2: '切勿保存二维码及收款地址重复转款或者私下转账，如有类似情况，后果自行承担，谢谢！',
    qrcode: '请使用手机APP扫码付款',
    xieyi: '地址协议',
    amount: '存款金额',
    needUsdt: '需转入USDT',
    address: '收款地址',
    tip: '注：转账前请核对USTD充值地址，充值错误资金无法找回！',
    dialogTitle: '温馨提示',
    dialogInfo: '是否取消本次申请？如果您已完成转账，请勿取消，我们将尽快为您处理!',
    confirm: '确定',
    cancel: '取消'
  },
  depositInfo: {
    dialogTitle: '转账请核对以下信息',
    name: '收款人姓名',
    depositAmount: '存款金额',
    depositps: '存款附言',
    tip: '转账时请认真核对以上信息填写是否正确，否则转账将不能到账，影响游戏体验！',
    title: '存款信息',
    currency: '{money}元',
    finishPay: '请在{time}内完成支付,成功付款后，将会自动到账，并弹出到账提示,长时间无反应，请',
    // successTip: '成功付款后，将会自动到账，并弹出到账提示',
    // longTime: '长时间无反应，请',
    bank: '银行',
    copy: '复制',
    copySuccess: '复制成功',
    cardName: '姓名',
    account: '银行账户',
    bankCard: '银行卡号',
    amount: '金额',
    orderTip: '(转账金额务必于订单金额一致)',
    address: '地址',
    ps: '备注',
    tip6: '转账时请将6位文字复制到备注中',
    psTip: '(请务必填写正确的附言/备注)',
    importTip: '重要提醒',
    tips1: '1、转账金额须与订单金额一致，否则存款无法及时到账',
    tips2: '2、转账必须填写正确附言(备注),否则存款无法及时到账',
    tips3: '3、下次存款时，请获取新的账号，存入旧账号将无法到账',
    tips4: '4、请及时前往存款，附言（备注）有效时间只有30分钟',
    tips5: '5、请勿使用支付宝、微信转账至公司账户',
    tips6: '6、若存款存在疑问，请及时联系客服',
    tips7: '7、不知如何存款，请移步至',
    depositTutorial: '存款教程',
    cancelApply: '取消存款申请',
    orderDetail: '查看订单详情',
    isCancelApply: '是否取消本次申请?',
    cancelTip: '如果您已完成转账，请勿取消，我们将尽快为您处理!',
    thinking: '我再想想',
    confirmCancel: '确定取消',
    depositWay: '存款方式',
    order: '订单号'
  },
  valet: {
    title: '代客充值',
    payWay: '请选择支付方式',
    text1: '为了提供更优质的',
    text2: '充值服务',
    text3: '如要充值',
    text4: '请先完善以下信息！',
    text5: '(真实付款人姓名)',
    text6: '充值金额',
    text7: '最低100元',
    payName: '付款姓名',
    payNum: '充值金额',
    topUp: '进行充值'
  },
  virt: {
    title: '虚拟币介绍',
    introduce: '什么是虚拟币?',
    advant: '虚拟币优势',
    usdtAdvantage: 'USDT泰达币优势',
    platform: '知名虚拟交易平台列示',
    introduction: [
      '虚拟币是一种不具备实体形式的、仅以数字形式存在的货币，也称之为“数字货币”。',
      '其性质与实体货币相似，允许在互联网上即时、无地理限制转让，主流的数字货币如USDT（泰达币）、BTC（比特币）、ETH（以太坊）等。',
      '用户可以通过数字货币交易平台购买数字货币，在平台进行支付、兑换成人民币从而进行游戏。'
    ],
    advantage: [
      {
        title: '高度加密',
        icon: 'jiami',
        des: '与银行卡等传统交易方式相比，用户不需要给出自己的姓名或卡号即可完成虚拟币交易，避免敏感信息泄露。'
      },
      {
        title: '交易快速',
        icon: 'jiaoyi',
        des: '虚拟币所采用的区块链技术具有去中心化特点，不需要清算中心机构来处理数据，交易时间大大缩短。'
      },
      {
        title: '去中心化',
        icon: 'zhongxin',
        des: '不由央行或当局发行，不受银行监管，用户可随心所欲的使用存放在自己数字钱包里的资金。'
      }
    ],
    usdt: '泰达币（Tether）也被称为USDT，其价值等同于美元。1USDT=1美元，该特点使USDT成为全球加密数字货币中规模最大、流通性最高的稳定币，具有良好的保值性，也是网站所使用的主要币种。',
    usdtList: [
      {
        title: '大额交易推荐',
        icon: 'omni',
        des: '手续费相对较贵、速度也相对较慢，但是资金为安全。'
      },
      {
        title: '中等额度推荐',
        icon: 'erc20',
        des: '手续费和速度都介于中间值'
      },
      {
        title: '小额交易推荐',
        icon: 'trc20',
        des: '零转账费，秒级到账。'
      }
    ],
    coin: '* 您也可以选择其他数字货币交易平台进行数字货币的买卖',
    coinList: [
      {
        title: '币汇',
        icon: 'bihui',
        desList: ['流畅的法币出入金支付服务平台', '安全的数字货币钱包以及秒级到账的支付速度']
      },
      {
        title: '火币',
        icon: 'huobi',
        desList: ['全球知名老牌交易所之一', '支持法币，币币交易，币种多，成交量大']
      },
      {
        title: '币安',
        icon: 'bian',
        desList: ['超过100种加密货币的交易平台', '交易量为全世界最大的加密货币交易所']
      }
    ]
  },
  personal: {
    day: '加入VP体育第{day}天',
    c_wallet: '中心钱包',
    deposit: '存款',
    download: '下载App',
    transfer: '转账',
    withdraw: '取款',
    liveChat: '客服',
    vip: 'VIP特权',
    vip_sub: 'VIP PRIVILEGE',
    share: '邀请好友',
    share_sub: 'INVITE FRIENDS',
    common_function: '常用功能',
    next_manage: '下级管理',
    my_wallet: '我的钱包',
    bet: '投注记录',
    transaction: '交易记录',
    prize: '奖品记录',
    account: '账户与安全',
    account_sub: '完善账户信息，更安全',
    agent: '合营计划',
    agent_sub: '加入我们',
    help: '帮助中心',
    open: '打开VP体育 APP',
    safe: '安全中心'
  },
  set: {
    feedBack: '意见反馈',
    aboutUs: '关于我们',
    out: '退出',
    sets: '设置',
    deviceInfo: '设备信息'
  },
  feedBack: {
    feed: '意见反馈',
    chooseType: '请选择问题类型',
    questionDesc: '问题描述',
    contentJieyu: '内容介于20~200字',
    pleaseDetailDesc: '(请详细描述您遇到的问题，填写内容不少于20字)',
    fileType: '*文件格式为png、jpg、jpeg，且大小不超过15MB',
    fileNotRight: '文件格式不正确',
    imageSizeNotMore: '图片大小不能超过15MB',
    cancel: '取消',
    tj: '提交',
    ckwt: '存款问题',
    qkwt: '取款问题',
    yxwt: '游戏问题',
    yhwt: '优惠问题',
    wzapp: '网站/APP登录',
    xgzl: '修改资料',
    lswt: '流水问题',
    qt: '其他'
  },
  prizeRecord: {
    vitualP: '虚拟奖',
    realP: '实物奖',
    all: '全部',
    prise: '奖品',
    id: '订单号',
    pResult: '派发结果',
    pAddr: '邮寄地址',
    title: '奖品记录',
    nowNoAnyPrise: '当前还没有任何奖品记录',
    noMore: '没有更多了',
    T401: '待发货',
    T402: '已发货',
    T403: '待发货'
  },
  about: {
    aboutus: '关于我们',
    standFlag: '正规牌照',
    desc: '我们拥有欧洲马耳他（MGA）、英国GC监督委员会（Gambling Commission）和菲律宾政府（PAGCOR）颁发的合法牌照。 注册于英属维尔京群岛，是受国际协会认可的合法公司。 进行注册并娱乐前，请确保您年满18周岁！'
  },
  sponsor: {
    zzzt: '赞助专题',
    ckxq: '查看详情'
  },
  notice: {
    ncenter: '消息中心',
    edit: '编辑',
    openNotice: '开启推送通知，最新优惠不错过！',
    openSoon: '立即开启',
    markIsRead: '标记已读',
    voice: '通知',
    activity: '活动',
    bulletin: '公告',
    marquee: '系统公告',
    del: '删除',
    cancel: '取消',
    checkAll: '全选',
    cancelAll: '取消全选',
    flagRead: '标记已读',
    noNew: '还没有新的'
  },
  ntcDetail: {
    ndetail: '通知详情',
    del: '删除',
    cancel: '取消',
    detail: '详情'
  },
  agent: {
    qr: '确认',
    zgdhzhb: '尊贵的合作伙伴',
    zcnr: '请先验证您的手机号码。返回“个人资料”即可完成手机号码的验证哦！',
    agentPlan: '合营计划',
    bestSevie: '致力于为合营伙伴提供 最全最顶尖的服务',
    intelligentBest: '智能数据领先全行业',
    djapp: '业内最顶尖的手机投注APP',
    memberTj: '会员统计实时更新，数据一目了然',
    nativeApp: '一体化纯原生APP，尽显流畅',
    copySuc: '复制成功',
    dKefu: '代理客服',
    agentBu: '合营部',
    soonAsk: '立即咨询',
    memberSupdate: '会员统计实时更新，数据一目了然',
    joinUs: '加入我们',
    moreSafe: '更安全',
    moreProfession: '更专业',
    mtwntg: '每天为您提供近千场精彩体育赛事，更有真人、彩票、电子游戏等多种娱乐方式选择，让您拥有完美游戏体验。',
    djkf: '独家开发，采用128位加密技术和严格的安全管理体系，客户资金得到最完善的保障，让您全情尽享娱乐、赛事投注，无后顾之忧！',
    hightTrans: '高转化',
    gbj: '更便捷',
    ylsc: '引领市场的卓越技术，自主研发了全套终端应用，让您畅享 Web、H5，更有iOS、Android原生App，让您随时随地，娱 乐投注随心所欲！7x24小时在线客服提供最贴心、最优质的 服务',
    hightStore: '高留存',
    firstOne: '行业第一',
    hytj: '会员统计',
    hyssgx: '会员统计实时更新',
    bbmx: '报表明细',
    sjfxqxjd: '数据分析清晰简单',
    ptbb: '平台报表',
    lsfy: '流水/费用/输赢营收明细',
    yjbb: '佣金报表',
    gyjqbl: '高佣金全比例数据报表',
    gks: '更快速',
    zxjs: '最新技术自主研发的财务处理系统，真正做到极速存、取、转。独家网络优化技术，为您提供一流的游戏体验，最大优化网络延迟。'
  },
  share: {
    yqhy: '邀请好友',
    ljmx: '礼金明细',
    fxlj: '分享链接',
    gnhy: '给您好友',
    hyjs: '好友接受',
    ndyq: '您的邀请',
    hyzz: '好友注册',
    bqsc: '并且首存',
    hyscje: '好友首存金额',
    khlj: '可获礼金',
    yuan: '元',
    ljmz1b: '*礼金满足1倍流水后即可提取',
    cancel: '取消',
    ljyq: '立即邀请',
    fzlj: '复制链接',
    bctp: '保存图片',
    fzcg: '复制成功',
    gxnfzcg: '恭喜你，复制成功，可是接口还未通',
    ewm: '二维码',
    bhdqtyh: '本活动全体用户皆可参与，用户点击推荐链接分享给新用户注册并进行存款后即可获得对应推荐礼金，被推荐用户无需填写推荐码',
    mtjygyh: '每推荐一个新用户注册并存款皆可获得一次对应用户首存金额的推荐礼金',
    bhdyfsyh: '本活动与【返水优惠】共享，不与其他任何优惠共享',
    mwbtjyh: '每位被推荐用户需满足：每一个手机号码、电子邮箱、IP地址、相同银行卡、同一台电脑仅可注册一个会员账号，如发现有违规用户，我们将保留无限期审核扣回红利及所产生利润的权利；',
    wbmwzlj: '为避免文字理解差异，VP娱乐保留本活动最终解释权。',
    png: '邀请好友分享图'
  },
  gift_detail: {
    tjli: '推荐礼金',
    sxhy: '失效好友',
    hy: '会员',
    ypc: '已派彩',
    zcsj: '注册时间',
    noMore: '没有更多',
    cjje: '彩金金额',
    sc: '首存',
    nhmyanyRecode: '还没有任何礼金记录',
    ljtz: '立即投注',
    hongli: '收到的奖金',
    h1: '会员',
    h2: '首充金额',
    h3: '彩金金额',
    h4: '注册时间'
  },
  lose_friend: {
    sxhy: '失效好友',
    hy: '会员',
    cjje: '彩金金额',
    zcsj: '注册时间',
    noMore: '没有更多',
    nhmyanyRecode: '还没有任何礼金记录',
    ljtz: '立即投注'
  },
  bottom_tab: {
    promotion: '优惠',
    cs: '客服',
    home: '首页',
    sponsor: '赞助',
    personal: '我的'
  },
  plat_list: {
    wallet_detail: '钱包金额',
    recover: '一键回收',
    c_wallet: '中心钱包',
    l_wallet: '锁定钱包',
    show_all: '收起',
    open_down: '收起',
    open_up: '更多',
    maintenance: '维护中',
    fail: '失败',
    tip: '场馆余额回收失败，请重试或手动回收！',
    wait: '操作过于频繁，请稍后再试！',
    succes: '场馆余额回收成功！',
    err: '场馆余额回收失败！'
  },
  transfer: {
    title: '转账',
    auto_transfer: '自动免转',
    auto_sub_tip: '开启后余额自动转入游戏场馆',
    input_tip: '场馆内钱包不支持互转',
    button: '立即转账',
    insufficient: '钱包余额不足',
    more_than_zero: '请输入大于0.00的金额',
    c_wallet: '中心钱包',
    select: '选择钱包',
    placeholder: '请输入转账金额',
    succes: '转账成功',
    dyy: '转账金额需要大于等于1'
  },
  withdraw: {
    title: '取款',
    debit: '银行卡',
    usdt: '虚拟币地址',
    debit_withdraw: '银行卡取款',
    usdt_withdraw: 'USDT取款',
    add_card: '添加银行卡',
    add_card_tip: '请先绑定一张银行卡用于收款',
    add_usdt: '添加虚拟币地址',
    add_usdt_tip: '请先绑定一个虚拟币地址用于收款',
    warning: '该银行卡不可用',
    withdraw_tip: '单次最高取款额度:{one}元',
    insufficient: '中心钱包余额不足',
    range_tip: '请根据限额范围输入正确的金额',
    predict: '预计到账',
    fee: '预计扣除手续费',
    rate: '参考汇率：1 USDT≈{amount} CNY，请以实际到账金额为准',
    button: '立即取款',
    tip: '为了方便您快速取款，请先将所有场馆钱包金额回收至中心钱包',
    succes_tip: '您有一笔存款订单正在处理中，请您耐心等待！',
    other_bank: '其他银行',
    copy_succes: '复制成功',
    placeholder: '单笔最小提款金额为{min}'
  },
  transaction: {
    edu: '额度调整',
    title: '交易记录',
    flag: {
      T0: '全部',
      T271: '存款',
      T272: '取款',
      T273: '转账',
      T274: '红利',
      T275: '返水',
      T276: '加币',
      T277: '减币',
      T278: '调整',
      T751: '佣金入款',
      T752: '佣金提取',
      T753: '佣金派发',
      T754: '佣金提取退回',
      T755: '佣金派发退回',
      T161: '返水',
      T170: '下级返水'
    },
    time: '时间',
    empty_msg: '还没有新的交易记录',
    empty_btn: '立即存款',
    state: {
      // 存款 0:待支付1:自动上分2:人工上分3:失败
      T0: '待支付',
      T1: '自动上分',
      T2: '人工上分',
      T3: '失败',
      // 转账 类型
      T181: '转入',
      T182: '转出',
      T183: '后台上分',
      T184: '场馆钱包清零',
      T185: '场馆红利',

      // 转账
      T191: '失败',
      T192: '成功',
      T193: '处理中',
      T194: '处理中',
      T195: '处理中',

      // 红利记录 231 //审核状态     232红利审核通过  233 红利审核不通过
      T231: '审核中',
      T232: '审核通过',
      T233: '不通过',

      // 返水记录 // 291审核状态     292已发放  293已拒绝
      T291: '审核中',
      T292: '已发放',
      T293: '已拒绝',
      T301: '自动发放',
      T302: '手工发放',

      // 调整 ，上币 减币    //  256后台调整审核中 257后台调整审核通过 258后台调整审核不通过
      T256: '审核中',
      T257: '成功',
      T258: '失败',

      // 存款
      T361: '确认中',
      T362: '存款成功',
      T363: '存款失败',
      T364: '处理中',
      // 取款
      T371: '审核中',
      T372: '审核拒绝',
      T373: '处理中',
      T374: '取款成功',
      T375: '取款失败',
      T376: '处理中',
      T377: '处理中',
      T378: '审核中',
      T379: '审核中',

      T173: '投注',
      T174: '投注取消',
      T175: '派彩',
      T176: '重新结算加币',
      T177: '重新结算减币',
      T178: '取消派彩',
      T179: '场馆活动派彩',
      T600: 'EBet宝箱奖金发派',
      T601: 'EBet限量红包',
      T602: 'EBet幸运红包',
      T603: 'EBet大赛派彩',
      T604: 'EBet大赛报名费',
      T605: 'EBet投注奖励',
      T606: 'EBet打赏',
      T607: 'EBet大赛奖金取回',
      T608: 'WM打赏荷官',
      T609: 'SBO红利',
      T610: 'SBO打赏',
      T611: 'SBO购买'
    }
  },
  transaction_detail: {
    type: '交易类型',
    method: '交易方式',
    usdt_type: '虚拟币协议',
    state: '状态',
    time: '交易时间',
    order: '订单号码',
    out: '转出账户',
    in: '转入账户',
    title: '交易记录'
  },
  bet: {
    title: '投注记录',
    all: '全部',
    total: '注单数',
    bet: '有效流水',
    net: '输赢',
    empty_msg: '还没有任何投注记录',
    empty_btn: '立即投注',
    handicap_type: '类型',
    handicap: '盘口',
    bet_amount: '投注额(RMB)',
    lost_win: '输/赢(RMB)',
    bet_time: '投注时间',
    wait_payout: '待开奖'
  },
  selector: {
    settle: '结算',
    unsettle: '未结算',
    today: '今日',
    week: '近7日',
    half_month: '近15日',
    month_n: '本月',
    customize: '自定义',
    format: 'YYYY-MM-DD',
    start: '开始日期',
    end: '结束日期',
    max_tip: '请选择大于等于开始日期的日期',
    min_tip: '请选择小于等于结束时间的日期',
    year: '{y}年',
    month: '{m}月',
    day: '{d}日',
    tip: '当前系统支持查询最近30日的交易记录'
  },
  wallet: {
    title: '钱包',
    nav_right_button: '交易记录',
    all: '总资产',
    bank_card_set: '银行卡管理',
    gift: '存款送豪礼',
    first_w_g: '首存红利',
    lux: '豪华豪礼',
    vip: 'VIP特权',
    share: '邀请好友'
  },
  vip: {
    title: 'VIP特权',
    nav_r: 'VIP详情',
    unset_birth: '注册超过90天，可领取生日礼金',
    set_birth: '设置出生日期，尊享生日礼金',
    set_birth_btn: '立刻设置',
    n_deposit: '当前存款(元)',
    n_bet: '当前流水(元)',
    n_level: '当前等级',
    balked: '未达到',
    t_deposit: '累计存款',
    t_bet: '流水要求',
    min_bet: '保级流水(90天)',
    enjoy: '尊享',
    e_deposit: '每日提款次数',
    e_withdraw: '每日提款额度',
    u_bonus: '升级礼金',
    u_birth: '生日礼金',
    e_red: '每月红包',
    e_fan: '最高返水'
  },
  vip_detail: {
    title: 'VIP特权详情',
    fan_title: 'VIP返水比例',
    fan_sub: 'VIP等级越高，场馆返水越高',
    level: 'VIP等级',
    w_title: 'VIP提款额度',
    w_sub: 'VIP等级越高，每日提款次数和金额越多',
    w_th1: '每日提款次数',
    w_th2: '日提款金额',
    r_title: '活动的一般条款与规则',
    scroll_top: '回到顶部',
    content: [
      '晋升标准：会员的累计存款以及累计流水达到相应级别的要求，即可在次日24点前晋级相应VIP等级。',
      '晋升顺序：VIP等级达到相应的要求可每天晋升一级，但VIP等级不可越级晋升。',
      '保级要求：会员在达到某VIP等级后，90天内投注需要完成保级要求。如果在此期间完成晋升，保级要求从新按照当前等级计算。',
      '降级标准：如果会员在一个季度（90天计算）内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其它优惠也会随之调整至降级后的等级。',
      '升级礼金：升级礼金在会员达到该会员级别后系统自动派发，每个级别的升级礼金每位会员仅能获得1次。（升级礼金1倍流水即可提款）',
      '生日礼金：会员在注册90天内过生日，今年将不能领取生日礼金。另注册时间大于90天的会员需在生日当天的VIP页面进行自助领取，每年可领取一次。（生日礼金1倍流水即可提款）',
      '每月红包：会员在上个月有过至少1次的成功存款，即可在每月1号获得相应等级的每月红包彩金。（每月红包礼金1倍流水即可提款）',
      'VP体育保留对活动的修改，停止及最终解释权。'
    ]
  },
  cs: {
    title: '客服',
    sub: '意见反馈',
    wel: '欢迎来到客服中心',
    s24: '24小时随时为您服务',
    add: '添加桌面客服，随时享受一对一在线解答',
    main: '主线客服',
    cs2: '次线客服',
    help_title: '猜你想问',
    all: '全部问题',
    all_sub: '≥100个常见问题解密'
  },
  promotion: {
    title: '优惠活动',
    tab0: '全部',
    tab72: '最新',
    tab73: '日常',
    tab74: '新人',
    tab75: 'VIP',
    tab76: '限时',
    tab77: '豪礼',
    yesc: '余额刷新成功！',
    yeer: '余额刷新失败！',
    checkInfo: '参加活动前需要验证您的真实姓名和手机号码，请尽快完善基本信息。',
    sqcg: '恭喜您，申请成功！',
    addr: '请尽快联系客服提供您的地址，以便尽快发货',
    bdb1: '首存金额没达到此礼物要求',
    bdb2: '有效投注金额没有达到此礼物要求',
    d42tip: '转账额度不能超过中心钱包的金额'
  },
  protocol: {
    title: '协议的区别',
    sub1: '协议介绍',
    sub2: '协议的区别?',
    sub3: '到底选哪种协议更好?',
    protList: [
      {
        title: 'ERC20：基于以太坊网络协议',
        des: '以太坊发行自己的原生代币及其他代币。但成千上万种代币的规则都不一样，这对后期市场发展非常不利。所以代币发行者做了一个智能合约标准，也就是ERC20。'
      },
      {
        title: 'TRC20：基于波场网络协议',
        des: 'TRC20的提币手续费为0，这意味着用户可以享受免手续费的交易所提币服务。同时，波场网络的TPS能够达到上千级别，可以实现交易秒级确认。'
      }
      // {
      //   title: 'Omni：基于比特币网络协议',
      //   des: '最老牌的协议，Omni-USDT于比特币网络的链上，黑客攻击的成本很高，所以资产相对安全性较高。很多大宗交易都会倾向于采用Omni-USDT。'
      // }
    ],
    // tableHead: ['区别点', 'Omni协议', 'ERC20协议', 'TRC20协议'],
    tableHead: ['区别点', 'ERC20协议', 'TRC20协议'],
    // tableList: [
    //   ['地址样式', 'Omni-USDT地址以1或3开头', 'ERC20-USDT地址以0x开头', 'TRC20-USDT地址以T开头'],
    //   ['使用网络', '比特币网络', '以太坊网络', '波场网络'],
    //   ['网络状态', '偶尔拥堵', '经常拥堵', '基本不堵'],
    //   ['转账速度', '较慢&0.6到2小时不等', '普通&几分钟到数十分钟', '极快&几秒到几分钟'],
    //   ['手续费用', '较高', '普通', '无'],
    //   ['安全系数', '最高', '高', '普通'],
    //   ['使用建议', '大额低频&交易推荐', '中等额度&常规交易推荐', '小额高频&交易推荐']
    // ],
    tableList: [
      ['地址样式', 'ERC20-USDT地址以0x开头', 'TRC20-USDT地址以T开头'],
      ['使用网络', '以太坊网络', '波场网络'],
      ['网络状态', '经常拥堵', '基本不堵'],
      ['转账速度', '普通&几分钟到数十分钟', '极快&几秒到几分钟'],
      ['手续费用', '普通', '无'],
      ['安全系数', '高', '普通'],
      ['使用建议', '中等额度&常规交易推荐', '小额高频&交易推荐']
    ],
    recomList: [
      // {
      //   title: '大额交易推荐',
      //   icon: 'omni',
      //   des: '手续费相对较贵、速度也相对较慢，但是资金为安全。'
      // },
      {
        title: '中等额度推荐',
        icon: 'erc20',
        des: '手续费和速度都介于中间值'
      },
      {
        title: '小额交易推荐',
        icon: 'trc20',
        des: '零转账费，秒级到账。'
      }
    ],
    recomdes: '*三种协议对应的USDT地址不互通，进行转账、充值等操作时，应仔细核对正确地址！'
  },
  pwd: {
    title: '密码找回',
    s1: '身份验证',
    s2: '修改密码',
    s3: '完成',
    u: '用户名',
    up: '请输入用户名',
    t: '手机号码',
    tp: '请输入绑定的手机号码',
    e: '邮箱账号',
    ep: '请输入绑定的邮箱账号',
    tr: '手机验证',
    er: '邮箱验证',
    next: '下一步',
    tc: '手机验证码',
    tcp: '请输入手机验证码',
    ec: '邮箱验证码',
    ecp: '请输入邮箱验证码',
    pc: '图形验证码',
    pcp: '请输入图形验证码',
    p: '登录密码',
    pp: '请输入8-15位字母+数字的组合',
    cp: '确认密码',
    cpp: '请再次输入密码',
    s2t: '*请避免使用与其他网站相同或易于被他人猜测到的密码',
    con: '完成',
    send: '发送验证码',
    tip: '如果用户名没有绑定邮箱，请{0}找回密码。',
    login: '立即登录',
    home: '返回首页',
    suc: '恭喜您，您的密码已经修改!'
  },
  error: {
    user: '请输入正确的用户名',
    tel: '请输入正确的11位手机号码',
    email: '请输入正确的电子邮箱地址'
  },
  PLATFORM_PLATS_ID: {
    // sd8
    n111249468969712187: 'BTI体育',
    n362857114342923387: '沙巴IBC',
    n437956722483179563: '利纪SBO',
    n934076801660754329: 'DS棋牌',
    n1034683924522288982: '188体育',
    n1055235995899664907: '完美真人',
    n75445461569712187: 'AE真人',
    n1371916058167324188: 'OB电竞',
    n1371916075841224188: 'PlayStar',
    n1386624620395927266: 'OB电游',
    n1470953457445352872: 'A5彩票',
    n1794601907316741515: '双赢棋牌',
    n1846182857231915191: 'IM电竞',
    n1958997188942770517: 'OB真人',
    n2299282204811996672: 'OB彩票',
    n2306868265751172637: 'ebet真人',
    n2306868265751548753: '新霸电子',
    n2658175169982643138: 'AG真人',
    n2854120181948444476: '雷火电竞',
    n2854123669982643138: 'DS捕鱼',
    n5053897100933741162: '泛亚电竞',
    n5864536520308659696: 'IM体育',
    n5864536520458745696: 'DS电游',
    n6238858173568905466: 'BG真人',
    n6798510151614082003: 'OB捕鱼',
    n6861705028422769039: 'PG电子',
    n6861705159854215439: 'AG捕鱼',
    n6982718883667836955: 'OB棋牌',
    n7219886347116135962: 'OB体育',
    n7426646715018523638: 'CQ9捕鱼',
    n7591876028427516934: '双赢彩票',
    n7834312758412315724: 'YB彩票',
    n7834312767105315724: '三升体育',
    n7834312767105315828: 'CMD',
    n7927534376372523583: '开元棋牌',
    n8318022162827355323: 'CQ9电子',
    n8626035981356178123: 'PT电子',
    n8840968482572372234: 'TCG彩票',
    n9147095305612535287: '博乐棋牌',
    // n8840968486572375835: `${title} 彩票`,
    n8840968478572375866: 'DG棋牌',
    n2326854765648775667: 'AE彩票',
    n127409505760007: 'AE Seven 真人',
    n40785460901826: 'UG 体育',
    n44196810703047: 'JDB 捕鱼', //捕鱼
    n36579683428691: 'SA 真人', //真人
    n45228933360695: '沙电竞', //电竞
    // n2326854765648775667: 'AE彩票', //彩票
    n43495319576432: 'MG电子', // 电子，电游
    n8840968486572375835: 'CG彩票',
    n41465988833800: 'Kingmaker棋牌', //棋牌
    n42514964534467: 'AE电子',
    n39636407564188: 'DG真人',
    n343128988882927: 'S128', // 斗鸡
    n46814147030478: 'Điện tử JDB',

    // vp9
    n362857235343923387: '沙巴体育',
    n7219886347226235962: 'VP体育',
    n5053897122933741162: '泛亚电竞',
    n1371916058167334288: 'VP电竞',
    n1055535994899665907: '完美真人',
    n1958997188942771527: 'VP真人',
    n2299282314811996672: 'VP彩票',
    n7927534376373563583: '开元棋牌',
    n8318022462867355324: '博雅棋牌',
    n6982738882667856955: 'VP棋牌',
    n5864536543458745696: 'DS电子',
    n8318022462867355323: 'CQ9电子',
    n6861705548422769139: 'PG电子',
    n1386625643395927266: 'VP电子',
    n7426646735048523638: 'CQ9捕鱼',
    n2854343669982643138: 'DS捕鱼',
    n6798530453614082003: 'VP捕鱼',
    n754454614131612187: 'AE真人',
    n2658175136622643138: 'AG真人',
    n2316836765788772637: 'TG真人',
    n362857435643973387: '189体育',
    n5864536523348659696: 'IM体育',
    n1386638646695927266: 'PP电子',
    n1846282857532915191: 'IM电竞',
    n8842968482575372634: 'TCG彩票',
    n3316856765658772637: 'SANDS88彩票'
  },
  offline: '无网络',
  device: {
    username: '用户名',
    ip: 'IP地址',
    model: '手机型号',
    port: '登录端',
    browser: '浏览器版本',
    systeam: '手机系统版本',
    hostname: '域名',
    time: '时间',
    version: '网页版本',
    network: '网络类型'
  },
  sign: {
    title: '天天签到',
    signed: '本周已累计签到',
    week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    week2: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    doSign: '点击签到',
    T1: '未达标',
    T2: '已签到',
    T3: '补签',
    T4: '未签',
    lwTime: '上周签到次数',
    lwTurnover: '上周有效流水',
    lwprise: '上周签到奖励',
    count: '次',
    unit: '元',
    T701: '未达标',
    T702402: '领取',
    T702403: '待派奖',
    T702401: '待派奖',
    T703: '已领取',
    T704: '待派奖',
    T705: '已失效',
    T706: '已领取',
    records: '查看记录',
    h1: '活动对象：',
    h2: '活动场馆：',
    h3: '活动规则：',
    th1: '签到周期：',
    th2: '签到天数：',
    th3: '补签时间：',
    th4: '有效流水：',
    th5: '礼金金额：',
    th6: '累计有效流水',
    th7: '周累计签到天数',
    noRecord: '暂无签到礼金明细',
    reSignTip: '漏签日{day}，已经为您补签成功！',
    sucSign: '签到成功！',
    record: '签到礼金明细',
    time: '统计时间：',
    dateError: '开始日期不能大于结束日期',
    signed_today: '请勿重复签到！',
    noError: '您的存款金额和有效流水暂时不满足要求，请继续加油！'
  },
  lostFriend: {
    error: '暂无失效好友记录',
    member: '会员',
    firstAmount: '首存金额',
    caiAmount: '彩金金额',
    register: '注册时间'
  },
  firstDeposit: {
    t1: '首存活动',
    time1: '活动时间',
    time2: '长期活动',
    obj: '活动对象',
    user: '体育所有用户',
    content: '活动内容',
    amount: '金额',
    reg: '注册',
    per: '百分比',
    limit: '限额',
    cai: '彩金',
    total: '总金额',
    bet: '下注（次）',
    regWay: '注册方式',
    tip: '请在活动最后页面选择相应的场馆，然后点击立即加入确认金额（请不要在注册前将彩金金额转到相应的场馆',
    des: '活动说明',
    center: '中心钱包',
    reback: '一键回收',
    choose: '选择场馆',
    regAmount: '申请金额',
    placeholder: '请输入转入场馆的优惠金额',
    getAmount: '可领取礼金',
    require: '要求最大流水金额',
    go: '立即参加',
    tips: '提醒： 本活动只可以参加一次，不能重复。'
  },
  pushTip: {
    title: '新消息提示',
    deposit: '充值成功到账{amount}元',
    withdraw: '提现成功打款{amount}元'
  },
  manage: {
    member_list: '会员列表',
    game_record: '游戏记录',
    commission_report: '佣金管理',
    link: '推广链接'
  },
  member: {
    add: '新增会员',
    zhi: '至',
    withdrawal: '提款',
    total_win: '总输赢',
    rabet: '返水',
    fangan: '返水方案',
    gameType: '游戏类型',
    rate: '返水比例',
    overview: '下级概述',
    set_password: '设置密码',
    psdPld: '请创建会员账号登录密码',
    member_list: '下级成员列表',
    total: '下级成员总计：{p}人',
    new_month: '本月新增：{p}人',
    active_total: '本月活跃成员：{p}人',
    active: '本月有效活跃：{p}人',
    active_percent: '活跃成员占比',
    active_month: '本月活跃会员占比',
    active_day: '今日活跃会员占比',
    active_member: '活跃成员',
    unactive_member: '非活跃成员',
    month_same_error: '开始时间和结束时间仅能在同一月份',
    accountError: '账号格式错误',
    edit_member: '编辑会员',
    list: {
      account: '会员账号',
      account_placeholder: '请输入会员账号',
      time: '统计时间',
      real_name: '真实姓名',
      reg_time: '注册时间',
      reset: '重置',
      query: '查询',
      last: '最后登录',
      total_bet: '流水',
      first_time: '首存时间',
      adjust: '账户调整',
      deposit_count: '存款成功次数',
      yue: '信用余额',
      edurefresh: '额度刷新',
      eduPld: '请设定额度',
      betLimit: '投注限额',
      betPld: '请设定投注单笔限额',
      nobetTime: '未投注时长(天)',
      lastLogin: '最后登录时间',
      operate: '操作',
      edit: '编辑'
    }
  },
  game_record: {
    title: '游戏记录',
    filter: '筛选',
    bet_time: '投注时间',
    choose_time: '选择时间',
    sub_user: '下级账号',
    order: '订单号',
    placeholder_sub_user: '请输入下级账号',
    plat: '场馆',
    platName: '场馆名称',
    gameName: '游戏名称',
    betAmount: '投注金额',
    validAmount: '有效投注',
    win: '输赢',
    stateLabel: '状态',
    tip: '没有更多了',
    bet_time: '投注时间',
    choose_plat: '选择场馆',
    choose_state: '状态',
    placeholder_state: '选择状态',
    reset: '重置',
    search: '搜索',
    cancel: '取消',
    confirm: '确定',
    state: {
      s_1: '维护中',
      s_2: '已关闭',
      s_3: '正常'
    }
  },
  fanshui: {
    ty: '体育返水',
    zr: '真人返水',
    dj: '电竞返水',
    qp: '棋牌返水',
    dz: '电子返水',
    cp: '彩票返水'
  },
  link: {
    add: '添加链接',
    zhuansu: '专属链接',
    copy: '点击复制',
    save: '点击保存',
    qr: '专属二维码',
    save_set: ' 保存设置'
  },
  rate: {
    title: '返水比例',
    revise: '如需修改请联系上级代理'
  },
  commission: {
    title: '佣金管理',
    record: '佣金记录',
    detail: '佣金记录详情',
    empty_msg: '暂无佣金记录',
    valid_amount: '可用佣金',
    error: '低于可提取的金额',
    max_amount: '最大金额',
    withdraw: '提取佣金',
    balance: '佣金余额',
    pld: '请输入提取金额',
    tiqu_btn: '立即提取',
    paifa: '派发佣金',
    choose: '选择下级代理',
    pld_amount: '请输入派发金额',
    paifa_btn: '立即派发',
    psdTitle: '设置密码',
    go_set: '前往设置',
    cancel_set: '取消设置',
    password_tip: '提取佣金需要先设置佣金密码',
    label0: '佣金密码',
    label1: '确认密码',
    pld0: '请创建佣金密码',
    pld1: '请再次确认佣金密码',
    pld2: '请输入佣金密码',
    txt1: '说明：',
    txt2: '1、第一次提取佣金，需要设置佣金密码；',
    txt3: '2、密码一旦设置，无法修改，请牢记密码；',
    txt4: '3、如有任何疑问，可联系线客服。'
  },
  state: {
    T0: '未结算',
    T1: '已结算',
    T2: '会员取消',
    T3: '无效'
  },
  agency: {
    a1: '代理1',
    a2: '即是玩家也是代理·合为一体',
    a3: '注册成功后，您可自娱投注亦可赚取下级会员流水返佣，娱乐赚钱两不误',
    a4: '功能·1',
    a5: '功能·2',
    a6: '功能·3',
    a7: '代理帐号自行娱乐',
    a8: '发展下线代理',
    a9: '发展下线会员',
    a10: '代理佣金计算方式',
    a11: '流水洗码是根据下级会员所产生的有效投注计算，不计输赢，代理即可赚取',
    a12: '(下级会员+下级代理发展的会员) 产生的所有有效投注额',
    a13: '分润点',
    a14: '代理受益 （佣金）',
    a15: '代理共赢亮点',
    a16: '佣金结算',
    a17: '佣金日结，于次日 自动派送至 游戏帐号， 自行提款即可',
    a18: '有效注单',
    a19: '代理发展的线下会员必须是真实有效，如虚假注册或无风险下注产生有效投注， 将取消佣金派送或 代理资格',
    a20: '资源合作',
    a21: '如果你有好的推广资源，请立即向公司申请定制邀请注册验证码专属推广网站'
  }
};