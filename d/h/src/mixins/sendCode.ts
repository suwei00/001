import { ref, Ref } from 'vue';
import { Toast } from 'vant';
import { APIs } from '@/http';
import { useI18n } from 'vue-i18n';

export default function useSendCode() {
  const { locale, t } = useI18n();
  const sendCode = (params: any, method: string, sid: Ref, valid: Ref, showDialog?: Ref) => {
    return new Promise<void>((resolve, reject) => {
      APIs[method](params).then((res: any) => {
        if (res.status) {
          sid.value = res.data;
          Toast(t('sendSuccess'));
          valid.value = false;
          if (showDialog) {
            showDialog.value = true;
          }
          resolve();
        } else {
          Toast(res.data);
          reject(true);
        }
      });
    });
  };
  return {
    sendCode
  };
}
