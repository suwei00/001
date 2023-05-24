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

dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

const VITE_APP_FULL_TIME = import.meta.env.VITE_APP_FULL_TIME;
const VITE_APP_TIME = import.meta.env.VITE_APP_TIME;

export const time = (timestamp: number) => {
  return dayjs(timestamp * 1000).tz('Asia/Ho_Chi_Minh').format(VITE_APP_FULL_TIME);
};

export const dateTime = (timestamp: number) => {
  return dayjs(timestamp * 1000).tz('Asia/Ho_Chi_Minh').format(VITE_APP_TIME);
};

// 时间戳转换越南时间
const timeConvert = (date: number, format = 'DD/MM/YYYY HH:mm:ss') => {
  let timeLength = date;
  if (timeLength?.toString().length < 11) {
    timeLength = timeLength * 1000;
  }
  return dayjs(timeLength).tz('Asia/Ho_Chi_Minh').format(format);
};
export { timeConvert }
