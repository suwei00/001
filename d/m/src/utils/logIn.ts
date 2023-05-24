import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import { CgLogin } from '@/components/cg-template-2';
import router from '@/router';

const Dialog = new CgDialogClass()
export const LogInAndRegister = (type: 'LogIn' | 'Register') => {
  Dialog.showDialog({
    template: 'tmp3',
    customComponent: CgLogin,
    props: { type }
  });
};

export const CloseDialog = () => {
  Dialog.closeDialog();
};

export const goPath = (path: string) => {
  router.push(path);
  CloseDialog();
};
