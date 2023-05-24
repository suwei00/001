import { ref } from 'vue';

/**
 * 选项的类型
 */
export interface Option {
  label: string;
  value: string | number;
  [key: string]: any;
}

export type ApiCaller = (params: any) => Promise<any>;
/**
 * 静态类型
 * 1: 选项1
 */
export type StaticType = 'gameType' | 'recordFlag' | 'flagList' | 'stateFlag' | 'onlineFlag' | 'isShowFlag' | 'gameStateOption' | 'depositChannelOption' | 'tradeTypeOption' | 'refundRates' | 'commissionRates' | 'vipLevel' | 'kefuTypes' | 'flowingDetail' | 'dateShorts';

type ArgumentsType = StaticType | ApiCaller;

type shortType = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth';
/**
 * 个人投注记录游戏类型
 */
const gameType: Option[] = [
  { value: '2', label: 'Casino' },
  { value: '6', label: 'Thể Thao' },
  { value: '5', label: 'Lô Đề' },
  { value: '4', label: 'Nổ Hũ' },
  { value: '7', label: 'Game Bài' },
  { value: '3', label: 'Bắn Cá' },
  { value: '9', label: 'Đá Gà' },
  { value: '8', label: 'E-Sports' },
  { value: '10', label: 'Mini Game' },
];
/**
 * 个人投注记录结算状态
 * 1: 结算
 * 0: 未结算
 */
const recordFlag: Option[] = [
  { label: 'Toàn Bộ', value: '' },
  { label: 'Đã Thanh Toán', value: '1' },
  { label: 'Chưa Thanh Toán', value: '0' }
];
/**
 * 个人交易记录类型271 存款 272 取款 273 转账 274 红利 275 返水/佣金 276返点278 调整
 */
const flagList: Option[] = [
  { value: '271', label: 'Nạp Tiền' },
  { value: '272', label: 'Rút Tiền' },
  { value: '273', label: 'Chuyển Khoản' },
  { value: '274', label: 'Tiền Khuyến Mại' },
  { value: '276', label: 'Hoa Hồng' },// 返点
  { value: '275', label: 'Hoàn Trả' },
  { value: '278', label: 'Điều Chỉnh' }
];
/**
 * 个人交易记录状态// 257不知道是啥
 */
const stateFlag: Option[] = [
  { value: '', label: 'Toàn Bộ' },
  { value: '191', label: 'Thất Bại' },// 转账失败
  { value: '192', label: 'Thành Công' },// 转账成功
  { value: '193', label: 'Đang Xử Lý' },// 场馆处理中
  { value: '194', label: 'Đang Xử Lý' },// 脚本确认中
  { value: '195', label: 'Đang Xử Lý' },// 人工确认中
  { value: '361', label: 'Đang Xử Lý' },// 待确认
  { value: '362', label: 'Thành Công' },// 存款成功
  { value: '363', label: 'Thất Bại' },// 已取消
  { value: '364', label: 'Đang Xử Lý' },
  { value: '371', label: 'Đang Xử Lý' },// 审核中
  { value: '372', label: 'Thất Bại' },// 审核拒绝 
  { value: '373', label: 'Đang Xử Lý' },// 出款中
  { value: '374', label: 'Thành Công' },// 提款成功
  { value: '375', label: 'Thất Bại' },// 出款失败 
  { value: '376', label: 'Đang Xử Lý' },// 处理中
  { value: '377', label: 'Đang Xử Lý' },// 处理中
  { value: '378', label: 'Đang Xử Lý' },// 处理中
  { value: '379', label: 'Đang Xử Lý' },// 处理中
  { value: '231', label: 'Đang Xử Lý' },// 红利审核中
  { value: '232', label: 'Thành Công' },// 红利审核通过
  { value: '233', label: 'Thất Bại' },// 红利审核失败
  { value: '256', label: 'Đang Xử Lý' },// 审核中
  { value: '257', label: 'Thành Công' },// 审核通过
  { value: '258', label: 'Thất Bại' }, // 审核不通过
  { value: '1', label: 'Thành Công' } // 成功
];
/**
 * 下级报表是否在线
 * 1: 在线
 * 2: 离线
 */

const onlineFlag: Option[] = [
  { label: 'Toàn Bộ', value: '0' },
  { label: 'Online', value: '1' },
  { label: 'Offline', value: '2' }
];
/**
 * 是否展示下级
 * 1: 展示
 * 0: 不展示
 */

const isShowFlag: Option[] = [
  { value: '1', label: 'Hiển Thị ' },
  { value: '0', label: 'Không Hiển Thị' }
];
/**
 * 下级投注详情状态
 */
const gameStateOption = [
  { label: 'Toàn Bộ', value: '-1' },
  { label: 'Chưa Thanh Toán', value: '0' },
  { label: 'Đã Thanh Toán', value: '1' },
  { label: 'Người Dùng Huỷ Đơn', value: '2' },
  { label: 'Vô Hiệu', value: '3' },
  { label: 'Trúng Thưởng Huỷ Đơn', value: '4' }
];
/**
 * 下级交易记录类型
 */
const tradeTypeOption = [
  {
    label: 'Nạp Tiền',
    value: '271' // 存款
  },
  {
    label: 'Rút Tiền',
    value: '272' // 提款
  }, {
    label: ' Tiền Khuyến Mại',
    value: '274' // 红利
  }
];
/**
 * 下级交易记录充值渠道
 */
const depositChannelOption = [
  {
    label: 'Toàn Bộ', // 'Chọn Phương Thức Nạp Tiền',
    value: '0'
  },
  {
    label: 'QR Banking',
    value: '8'
  },
  {
    label: 'MoMo',
    value: '1'
  },
  {
    label: 'Offline',
    value: '9'
  },
  {
    label: 'Chuyển Khoản Nhanh',
    value: '14'
  },
  {
    label: 'ZaloPay',
    value: '2'
  },
  {
    label: 'Online',
    value: '3'
  },
  {
    label: 'ViettelPay',
    value: '6'
  },
  {
    label: 'Chuyển Khoản',
    value: '4'
  }, {
    label: 'CoinPay',
    value: '5'
  },
  {
    label: 'Thẻ Cào',
    value: '15'
  },
  {
    label: 'Withdraw',
    value: '7'
  },
  {
    label: 'USDT',
    value: '10'
  },
  {
    label: 'manual',
    value: '11'
  },
];

const dateShorts: {value: shortType; label: string, ty: string}[] = [
	{
		value: 'today',
		label: 'Hôm Nay',
    ty: '1'
	},
	{
		value: 'yesterday',
		label: 'Hôm Qua',
    ty: '2'
	},
	{
		value: 'thisMonth',
		label: 'Tháng Này',
    ty: '3'
	},
	{
		value: 'lastMonth',
		label: 'Tháng Trước',
    ty: '4'
	}
];

/**
 * 个人中心会员最高返水
 */
const refundRates = [
  { label: 'Casino', value: '0.0%', key: 'zr' },
  { label: 'Thể Thao', value: '0.0%', key: 'ty' },
  { label: 'Lô Đề', value: '0.0%', key: 'cp' },
  { label: 'Nổ Hũ', value: '0.0%', key: 'dz' },
  { label: 'Game Bài', value: '0.0%', key: 'qp' },
  { label: 'Bắn Cá', value: '0.0%', key: 'by' },
  { label: 'Đá Gà', value: '0.0%', key: 'fc' },
  { label: 'E-Sports', value: '0.0%', key: 'dj' },
  { label: 'Mini Game', value: '0.0%', key: 'mn' }
];
/**
 * vip等级
 */
const vipLevel = [
  { label: 'VIP1', value: '1' },
  { label: 'VIP2', value: '2' },
  { label: 'VIP3', value: '3' },
  { label: 'VIP4', value: '4' },
  { label: 'VIP5', value: '5' },
  { label: 'VIP6', value: '6' },
  { label: 'VIP7', value: '7' },
  { label: 'VIP8', value: '8' },
  { label: 'VIP9', value: '9' },
  { label: 'VIP10', value: '10' },
]

const commissionRates = [
  { label: 'Lô Đề Truyền Thống', value: '0', key: 'cg_official_rebate' },
  { label: 'Lô Đề Nhanh', value: '0', key: 'cg_high_rebate' }
];

// 客服类型 0无 1tg 2cskh_call 3cskh_chat 4fb 5zalo
const kefuTypes = [
  { label: 'normal', value: 0 },
  { label: 'telegram', value: 1 },
  { label: 'cskh_call', value: 2 },
  { label: 'cskh_chat', value: 3 },
  { label: 'facebook', value: 4 },
  { label: 'zalo', value: 5 },
];

// 流水详情
const flowingDetail = [
  { label: 'Nạp Tiền', value: 1 },
  { label: 'Tiền Khuyến Mại', value: 2 },
  { label: 'Điều Chỉnh', value: 4 },
  { label: 'Tiền Cược Yêu Cầu Đặc Biệt', value: 5 },
];
// 获取开户行列表
/**
 * 所有选项的hook
 * @param type 选项类型
 * @param label 选项的label
 * @param value 选项的value
 * @param args 比如想把接口的其它字段也传给option，可以在这里传入
 * @returns 选项
 */
export function useOption(type: ArgumentsType, label?: string, value?: string, args?: string[]) {
  const option = ref<Option[]>([]);
  if (typeof type === 'function') {
    // 动态选项
    type({}).then((res: any) => {
      const arr = (Array.isArray(res) ? res : res.data) || [];
      option.value = arr.map((item: any) => {
        return {
          label: item[label || 'label'],
          value: item[value || 'value'],
          ...(args || []).reduce((acc: any, cur: any) => {
            acc[cur] = item[cur];
            return acc;
          }, {}),
        };
      });
    });
  } else {
    // 静态选项
    switch (type) {
      case 'gameType':
        option.value = gameType;
        break;
      case 'recordFlag':
        option.value = recordFlag;
        break;
      case 'flagList':
        option.value = flagList;
        break;
      case 'stateFlag':
        option.value = stateFlag;
        break;
      case 'onlineFlag':
        option.value = onlineFlag;
        break;
      case 'isShowFlag':
        option.value = isShowFlag;
        break;
      case 'gameStateOption':
        option.value = gameStateOption;
        break;
      case 'depositChannelOption':
        option.value = depositChannelOption;
        break;
      case 'tradeTypeOption':
        option.value = tradeTypeOption;
        break;
      case 'refundRates':
        option.value = refundRates;
        break;
      case 'commissionRates':
        option.value = commissionRates;
        break;
      case 'vipLevel':
        option.value = vipLevel;
        break;
      case 'kefuTypes':
        option.value = kefuTypes;
        break;
      case 'flowingDetail':
        option.value = flowingDetail;
        break;
      case 'dateShorts':
        option.value = dateShorts;
        break;
      default:
        break;
    }
  }
  return {
    option,
    transform: (value: string) => {
      const item = option.value.find((item) => String(item.value) === String(value));
      return item ? item.label : '';
    }
  };
}