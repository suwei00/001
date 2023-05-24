// @ts-ignore
import dayjs from 'dayjs';
// @ts-ignore
import timezone from 'dayjs/plugin/timezone';
// @ts-ignore
import utc from 'dayjs/plugin/utc';
// @ts-ignore
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isoWeek);

dayjs.tz.setDefault('Asia/Bangkok');

// 将本地时间转换成北京时间
const time = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  return dayjs(date).tz('Asia/Shanghai');
};

// 越南时间
const vn_time = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  return dayjs(date).tz('Asia/Ho_Chi_Minh');
};

// 将时间转换成越南时间
const timeToVietnam = (date?: dayjs.ConfigType, format = 'DD/MM/YYYY HH:mm:ss') => {
  // YYYY-MM-DD HH:mm:ss
  return dayjs(date).tz('Asia/Ho_Chi_Minh').format(format);
};

// 蓝白版本时间转换
const timeToVietnamBlue = (date: number, format = 'DD/MM/YYYY HH:mm:ss') => {
  let timeLength = date;
  if (timeLength?.toString().length < 11) {
    timeLength = timeLength * 1000;
  }
  return dayjs(timeLength).tz('Asia/Ho_Chi_Minh').format(format);
};
const vi_wList = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const getTimeStampToDay = (timestamp: number): string => {
  let timeLeng = timestamp,
    vi_w = 0;
  if (timestamp.toString().length < 11) {
    timeLeng = timestamp * 1000;
  }
  const _date = vn_time(timeLeng);
  if (_date.get('d')) vi_w = _date.get('d');
  return vi_wList[vi_w]; // 越南没有周一，周2.周3.周4.周5.周6.周7.周日
};
export { dayjs, time, vn_time, timeToVietnam, timeToVietnamBlue, getTimeStampToDay };
