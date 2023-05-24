import { Ref } from 'vue';
import { APIs } from '@/http';
import userStore from '@/store/modules/user/UserModule';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useBackRouter from '@/mixins/router';
import { CGToast } from '@/utils/cgToast'
// 绑定手机、邮箱
export default function useBind() {
  const router = useRouter();
  const { locale, t } = useI18n();
  const { goBack } = useBackRouter();
  const bind = (params: any, method: string, show: Ref) => {
    APIs[method](params).then((res: any) => {
      if (res.status) {
        show.value = false;
        userStore.getUserInfo();
        setTimeout(() => {
          goBack(method);
        }, 300);
      } else {
        CGToast(res.data);
      }
    });
  };
  return {
    bind
  };
}
