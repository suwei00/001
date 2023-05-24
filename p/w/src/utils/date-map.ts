import dayjs from 'dayjs';

// 设置越南时区,只改变了当前实例的时区
require('dayjs/locale/vi');

// 更改全局的语言配置并不会影响之前存在的实例。
// 全局使用越南语
// dayjs.locale('zh-cn');
export type DateRangeProps = [dayjs.Dayjs, dayjs.Dayjs];


/**
 * @description 获取对应的时间段开始和结束时间
 * @param {('today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth')} type
 * @return {*}  {DateRangeProps}
 */
type shortType = 'today' | 'yesterday' | 'thisWeek' | 'lastWeek' | 'thisMonth' | 'lastMonth';
export const getDate = (type: shortType): DateRangeProps => {
	switch (type) {
		case 'today':
			return [dayjs().locale('vi').startOf('day'), dayjs().locale('vi')];
		case 'yesterday':
			return [dayjs().locale('vi').subtract(1, 'day').startOf('day'), dayjs().locale('vi').subtract(1, 'day').endOf('day')];
		case 'thisWeek':
			return [dayjs().locale('vi').startOf('week').startOf('day'), dayjs().locale('vi')];
		case 'lastWeek':
			return [dayjs().locale('vi').subtract(1, 'week').startOf('week'), dayjs().locale('vi').subtract(1, 'week').endOf('week')];
		case 'thisMonth':
			return [dayjs().locale('vi').startOf('month'), dayjs().locale('vi')];
		case 'lastMonth':
			return [dayjs().locale('vi').subtract(1, 'month').startOf('month'), dayjs().locale('vi').subtract(1, 'month').endOf('month')];
		default:
			return [dayjs().locale('vi').startOf('day'), dayjs().locale('vi')];
	}
};

export const list: {value: shortType; name: string, ty: string}[] = [
	{
		value: 'today',
		name: 'Hôm Nay',
    ty: '1'
	},
	{
		value: 'yesterday',
		name: 'Hôm Qua',
    ty: '2'
	},
	{
		value: 'thisWeek',
		name: 'Tuần Này',
    ty: '5'
	},
	{
		value: 'lastWeek',
		name: 'Tuần Trước',
    ty: '6'
	},
	{
		value: 'thisMonth',
		name: 'Tháng Này',
    ty: '3'
	},
	{
		value: 'lastMonth',
		name: 'Tháng Trước',
    ty: '4'
	}
];

export const datePickerInitValue = (yyds: string = 'YYYY-MM-DD HH:mm:ss') => {
  return getDate(list[0].value).map(d => d.format(yyds));
};
