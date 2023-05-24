import dayjs from 'dayjs';

export type DateRangeProps = [dayjs.Dayjs, dayjs.Dayjs];
export const dateMap: {
    today: DateRangeProps;
    yesterday: DateRangeProps;
    thisWeek: DateRangeProps;
    lastWeek: DateRangeProps;
    thisMonth: DateRangeProps;
    lastMonth: DateRangeProps;
} = {
    today: [dayjs().startOf('day'), dayjs()],
    yesterday: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').endOf('day')],
    thisWeek: [dayjs().startOf('week').startOf('day'), dayjs()],
    lastWeek: [dayjs().subtract(1, 'week').startOf('week'), dayjs().subtract(1, 'week').endOf('week')],
    thisMonth: [dayjs().startOf('month'), dayjs()],
    lastMonth: [dayjs().subtract(1, 'month').startOf('month'), dayjs().subtract(1, 'month').endOf('month')]
};
export const list = [
    {
        title: 'today',
        name: 'Hôm Nay',
        data: dateMap.today
    },
    {
        title: 'yesterday',
        name: 'Hôm Qua',
        data: dateMap.yesterday
    },
    {
        title: 'thisWeek',
        name: 'Tuần Này',
        data: dateMap.thisWeek
    },
    {
        title: 'lastWeek',
        name: 'Tuần Trước',
        data: dateMap.lastWeek
    },
    {
        title: 'thisMonth',
        name: 'Tháng Này',
        data: dateMap.thisMonth
    },
    {
        title: 'lastMonth',
        name: 'Tháng Trước',
        data: dateMap.lastMonth
    }
];
export default dateMap;
