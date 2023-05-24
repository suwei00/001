import dayjs from 'dayjs';
var isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);
var quarterOfYear = require('dayjs/plugin/quarterOfYear');
dayjs.extend(quarterOfYear);
// @ts-ignore
import timezone from 'dayjs/plugin/timezone';
// @ts-ignore
import utc from 'dayjs/plugin/utc';
// @ts-ignore
dayjs.extend(timezone);
dayjs.extend(utc);

dayjs.tz.setDefault('Asia/Bangkok');
export default dayjs;
