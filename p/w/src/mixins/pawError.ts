import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import ErrorLogin from '../views/cg-template-2/entry/index.vue';
import router from '@/router';
import { goToServeUrl } from '@/utils/helpers';

let Dialog: any;
export const PawErrorDialog = (data: any) => {
  Dialog = new CgDialogClass();
  const datas = data.split('|');
  if (datas[0] === 'password') {
    Dialog.showDialog({
      template: 'tmp2',
      title: 'LƯU Ý',
      confirmText: 'TÔI ĐÃ HIỂU',
      btns: 1,
      customComponent: ErrorLogin,
      props: {
        type: 'error',
        num: datas[1]
      },
      footerText: 'Quên Mật Khẩu?'
    });
  } else if (data === '1006') {
    Dialog.showDialog({
      template: 'tmp2',
      title: 'LƯU Ý',
      confirmText: 'Tôi Đã Hiểu',
      btns: 1,
      customComponent: ErrorLogin,
      props: {
        num: datas[1],
        type: 'kefu'
      }
    });
  } else if (datas[0] === '1330') {
    Dialog.showDialog({
      template: 'tmp1',
      title: 'LƯU Ý',
      confirmText: 'CSKH',
      cancelText: 'TÔI ĐÃ HIỂU',
      tmp1Content: datas[1],
      btns: 2,
      onOk: () => {
        goToServeUrl();
      }
    });
  }
};

export const ClosePawDialog = () => {
  Dialog.closeDialog();
};

export const goPath = (path: string) => {
  router.push(path);
  ClosePawDialog();
};
