import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import { PrefixInteger } from '@/utils/helpers';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(isoWeek);

// 将本地时间转换成北京时间
const time = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  return dayjs(date);
};

// 将时间转换成越南时间
const timeToVietnam = (date?: dayjs.ConfigType): dayjs.Dayjs => {
  return time(date).tz('Asia/Ho_Chi_Minh');
};
// 把时间戳转换成越南时间
const timeStampToVietnam = (timestamp: number, formatStr = 'DD/MM/YYYY HH:mm:ss'): string => {
  let timeLeng = timestamp;
  if (timestamp.toString().length < 11) {
    timeLeng = timestamp * 1000;
  }
  return timeToVietnam(timeLeng).format(formatStr);
};

// 把时间戳转换成特定格式越南时间
const timeStampToVietnamformatStr = (timestamp: number): string => {
  let timeLeng = timestamp;
  if (timestamp.toString().length < 11) {
    timeLeng = timestamp * 1000;
  }
  const _date = timeToVietnam(timeLeng);
  return `Ngày ${PrefixInteger(_date.get('D'), 2)} Tháng ${PrefixInteger(_date.get('M') + 1, 2)} Năm ${_date.get('y')}`;
};

const vi_wList = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const getTimeStampToDay = (timestamp: number): string => {
  let timeLeng = timestamp,
    vi_w = 0;
  if (timestamp.toString().length < 11) {
    timeLeng = timestamp * 1000;
  }
  const _date = timeToVietnam(timeLeng);
  if (_date.get('d')) vi_w = _date.get('d');
  return vi_wList[vi_w]; // 越南没有周一，周2.周3.周4.周5.周6.周7.周日
};

export { dayjs, time, timeToVietnam, timeStampToVietnam, timeStampToVietnamformatStr, getTimeStampToDay };
