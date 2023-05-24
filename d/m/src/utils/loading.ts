import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call'
import { CgLoading } from '@/components/cg-template-2';

export const startLoading = () => {
  let loading: CgDialogClass | null = null;
  loading = new CgDialogClass();
  loading.showDialog({
    template: 'tmp3',
    showOverlay: false,
    customComponent: CgLoading,
  });

  return {
    closeLoading: () => {
      loading?.closeDialog();
      loading = null;
    }
  }
}