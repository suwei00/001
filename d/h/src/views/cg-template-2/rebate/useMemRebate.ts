import {reactive} from 'vue';
import { floor } from 'lodash';
import { useRequest } from 'vue-request';
import { getRabetScale } from '@/http/blue-apis';
import { useOption } from '@/hooks/useOption';
// 获取会员最高返水
export const useMemRebate = () => {
    const refundRatesData = reactive(useOption('refundRates', 'key').option.value);
    const commissionRatesData = reactive(useOption('commissionRates', 'key').option.value);
    const { run } = useRequest(getRabetScale, {
      onSuccess: (res: any) => {
        if (res) {
          refundRatesData.forEach(item => {
            item.value = res[item.key] + '%'; // floor(Number(res[item.key]), 2).toFixed(2) + '%';
          });
          commissionRatesData.forEach(item => {
            item.value = floor(Number(res[item.key]), 2).toFixed(2);
          });
        }
      }
    });
    return { refundRatesData, commissionRatesData };
  };