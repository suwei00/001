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
export type StaticType = 'gameType' | 'recordFlag' | 'flagList' | 'stateFlag' | 'onlineFlag' | 'isShowFlag' | 'gameStateOption' | 'depositChannelOption' | 'tradeTypeOption' | 'refundRates' | 'commissionRates' | 'vipLevel' | 'timeFlag' | 'subordinateReportSort' | 'tradeRecordTypeOption' | 'gameRecordOption' | 'agentBetAmountSort' | 'agentWinAmountSort' | 'agentDepositAmountSort' | 'agentWithdrawAmountSort' | 'agentBetMemberSort' | 'agentFirstDepositCountSort' | 'agentMemberCountSort' | 'agentTeamRebateSort' | 'agentCgRebateSort' | 'agentNetAmountSort' | 'agentDividendAmountSort' | 'agentBalanceTotalSort' | 'agentProfitSort' | 'kefuTypes' | 'flowingDetail' ;

type ArgumentsType = StaticType | ApiCaller;
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
    { value: '10', label: 'Mini Game' }
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
 * 个人交易记录状态
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
    { value: '1', label: 'Thành Công' } // 通过
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
        label: 'Toàn Bộ',
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

/**
 * 时间筛选
 */
const timeFlag = [
    { label: 'Hôm Nay', value: '1' },// 今天
    { label: 'Hôm Qua', value: '2' },// 昨天
    { label: 'Tháng Này', value: '3' },// 本月
    { label: 'Tháng Trước', value: '4' },// 上月
];

const commissionRates = [
    { label: 'Lô Đề Truyền Thống', value: '0', key: 'cg_official_rebate' },
    { label: 'Lô Đề Nhanh', value: '0', key: 'cg_high_rebate' }
];
/**下级报表排序字段 */
const subordinateReportSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Nạp Tiền Giảm Dần', value: 'sort|deposit_amount|0' }, // 存款降序
    { label: 'Nạp Tiền Tăng Dần', value: 'sort|deposit_amount|1' }, // 存款升序
    { label: 'Tiền Đặt Cược Giảm Dần', value: 'sort|bet_amount|0' }, // 有效投注降序
    { label: 'Tiền Đặt Cược Tăng Dần', value: 'sort|bet_amount|1' }, // 有效投注升序
    { label: 'Tiền Lợi Nhuận Giảm Dần', value: 'sort|company_revenue|0' }, // 盈利金额降序
    { label: 'Tiền Lợi Nhuận Tăng Dần', value: 'sort|company_revenue|1' } // 盈利金额升序
];
/**
 * 下级交易记录排序字段
 */
const tradeRecordTypeOption = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Tiền Giao Dịch Giảm Dần', value: 'sort|amount|0' }, // 交易金额降序
    { label: 'Số Tiền Giao Dịch Tăng Dần', value: 'sort|amount|1' }, // 交易金额升序
];
/**
 * 下级游戏记录排序字段
 */
const gameRecordOption = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Thắng Thua Giảm Dần', value: 'sort|net_amount|0' }, // 输赢金额降序
    { label: 'Thắng Thua Tăng Dần', value: 'sort|net_amount|1' }, // 输赢金额升序
    { label: 'Tiền Đặt Cược Hợp Lệ Giảm Dần', value: 'sort|valid_bet_amount|0' }, // 有效下注降序
    { label: 'Tiền Đặt Cược Hợp Lệ Tăng Dần', value: 'sort|valid_bet_amount|1' } // 有效下注升序
];

/** 代理报表投注金额排序*/
const agentBetAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Đơn Đặt Cược Giảm Dần', value: 'sort|bet_count|0' }, // 下注笔数降序
    { label: 'Số Đơn Đặt Cược Tăng Dần', value: 'sort|bet_count|1' }, // 下注笔数升序
    { label: 'Tiền Đặt Cược Giảm Dần', value: 'sort|valid_bet_amount|0' }, // 下注金额降序
    { label: 'Tiền Đặt Cược Tăng Dần', value: 'sort|valid_bet_amount|1' } // 下注金额升序
];
/** 代理报表中奖金额排序*/
const agentWinAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Đơn Đặt Cược Giảm Dần', value: 'sort|bet_count|0' }, // 下注笔数降序
    { label: 'Số Đơn Đặt Cược Tăng Dần', value: 'sort|bet_count|1' }, // 下注笔数升序
    { label: 'Tiền Trúng Thưởng Giảm Dần', value: 'sort|win_amount|0' }, // 下注金额降序
    { label: 'Tiền Trúng Thưởng Tăng Dần', value: 'sort|win_amount|1' } // 下注金额升序
];
/**代理报表存款金额排序 */
const agentDepositAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Đơn Nạp Tiền Giảm Dần', value: 'sort|deposit_count|0' }, // 存款笔数降序
    { label: 'Số Đơn Nạp Tiền Tăng Dần', value: 'sort|deposit_count|1' }, // 存款笔数升序
    { label: 'Tiền Nạp Giảm Dần', value: 'sort|deposit_amount|0' }, // 存款金额降序
    { label: 'Tiền Nạp Tăng Dần', value: 'sort|deposit_amount|1' } // 存款金额升序
];
/**代理报表提款金额排序 */
const agentWithdrawAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Đơn Rút Tiền Giảm Dần', value: 'sort|withdrawal_count|0' }, // 提款笔数降序
    { label: 'Số Đơn Rút Tiền Tăng Dần', value: 'sort|withdrawal_count|1' }, // 提款笔数升序
    { label: 'Tiền Rút Giảm Dần', value: 'sort|withdrawal_amount|0' }, // 提款金额降序
    { label: 'Tiền Rút Tăng Dần', value: 'sort|withdrawal_amount|1' } // 提款金额升序
];
/**代理报表投注人数排序 */
const agentBetMemberSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Đơn Đặt Cược Giảm Dần', value: 'sort|bet_count|0' }, // 下注笔数降序
    { label: 'Số Đơn Đặt Cược Tăng Dần', value: 'sort|bet_count|1' }, // 下注笔数升序
    { label: 'Tiền Đặt Cược Giảm Dần', value: 'sort|valid_bet_amount|0' }, // 下注金额降序
    { label: 'Tiền Đặt Cược Tăng Dần', value: 'sort|valid_bet_amount|1' } // 下注金额升序
];
/**代理报表首存人数排序 */
const agentFirstDepositCountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Tiền Nạp Giảm Dần', value: 'sort|first_deposit_amount|0' }, // 首存金额降序
    { label: 'Tiền Nạp Tăng Dần', value: 'sort|first_deposit_amount|1' } // 首存金额升序
];
/** 代理报表下级人数排序 */
const agentMemberCountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Người Đặt Cược Giảm Dần', value: 'sort|mem_count|0' }, // 下注笔数降序
    { label: 'Số Người Đặt Cược Tăng Dần', value: 'sort|mem_count|1' } // 下注笔数升序
];
/**代理报表团队返水 */
const agentTeamRebateSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Tiền Hoàn Trả Giảm Dần', value: 'sort|rebate_amount|0' }, // 返水金额降序
    { label: 'Tiền Hoàn Trả Tăng Dần', value: 'sort|rebate_amount|1' } // 返水金额升序
];
/**代理报表团队返点 */
const agentCgRebateSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Tiền Hoa Hồng Giảm Dần', value: 'sort|cg_rebate|0' }, // 返点金额降序
    { label: 'Tiền Hoa Hồng Tăng Dần', value: 'sort|cg_rebate|1' } // 返点金额升序
];
/**代理报表输赢排序 */
const agentNetAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Thắng Thua Giảm Dần', value: 'sort|company_net_amount|0' }, // 盈亏金额降序
    { label: 'Thắng Thua Tăng Dần', value: 'sort|company_net_amount|1' } // 盈亏金额升序
];
/**代理报表彩金排序 */
const agentDividendAmountSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Tiền Khuyến Mại Giảm Dần', value: 'sort|amount|0' }, // 彩金金额降序
    { label: 'Tiền Khuyến Mại Tăng Dần', value: 'sort|amount|1' } // 彩金金额升序
];
/**代理团队余额排序 */
const agentBalanceTotalSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Số Dư Giảm Dần', value: 'sort|balance_total|0' }, // 余额降序
    { label: 'Số Dư Tăng Dần', value: 'sort|balance_total|1' } // 余额升序
];
/**代理报表盈利排序 */
const agentProfitSort = [
    { label: 'Sắp Xếp Mặc Định', value: '' }, // 请选择排序
    { label: 'Tiền Lợi Nhuận Giảm Dần', value: 'sort|company_revenue|0' }, // 盈利金额降序
    { label: 'Tiền Lợi Nhuận Tăng Dần', value: 'sort|company_revenue|1' } // 盈利金额升序
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
            case 'timeFlag':
                option.value = timeFlag;
                break;
            case 'subordinateReportSort':
                option.value = subordinateReportSort;
                break;
            case 'tradeRecordTypeOption':
                option.value = tradeRecordTypeOption;
                break;
            case 'gameRecordOption':
                option.value = gameRecordOption;
                break;
            case 'agentBetAmountSort':
                option.value = agentBetAmountSort;
                break;
            case 'agentWinAmountSort':
                option.value = agentWinAmountSort;
                break;
            case 'agentDepositAmountSort':
                option.value = agentDepositAmountSort;
                break;
            case 'agentWithdrawAmountSort':
                option.value = agentWithdrawAmountSort;
                break;
            case 'agentBetMemberSort':
                option.value = agentBetMemberSort;
                break;
            case 'agentFirstDepositCountSort':
                option.value = agentFirstDepositCountSort;
                break;
            case 'agentMemberCountSort':
                option.value = agentMemberCountSort;
                break;
            case 'agentTeamRebateSort':
                option.value = agentTeamRebateSort;
                break;
            case 'agentCgRebateSort':
                option.value = agentCgRebateSort;
                break;
            case 'agentNetAmountSort':
                option.value = agentNetAmountSort;
                break;
            case 'agentDividendAmountSort':
                option.value = agentDividendAmountSort;
                break;
            case 'agentBalanceTotalSort':
                option.value = agentBalanceTotalSort;
                break;
            case 'agentProfitSort':
                option.value = agentProfitSort;
                break;
            case 'kefuTypes':
                option.value = kefuTypes;
                break;
                case 'flowingDetail':
                    option.value = flowingDetail;
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
