import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { useAppStore } from '@/store-pinia';
import CgDowApp from '../components/cg-template-2/cg-dow-app/index.vue';

let Dialog: any;
let appStore: any;
export const DownloadAppDialog = (fn: () => void) => {
  appStore = useAppStore();
  const _time = new Date().getTime();
  const xz_time = localStorage.getItem('DOWNLOAD_VIEW_TIME');
  const _c = _time - Number(xz_time);
  if (_c > 3600000) {
    Dialog = new CgDialogClass();
    Dialog.showDialog({
      template: 'tmp3',
      customComponent: CgDowApp,
      props: {
        onCancel: () => {
          fn();
          CloseDownloadDialog();
          setViewTime();
        },
        onSure
      }
    });
  } else {
    fn();
  }
};

export const CloseDownloadDialog = () => {
  Dialog.closeDialog();
};

const onSure = () => {
  CloseDownloadDialog();
  appStore.downloadApp();
};

const setViewTime = () => {
  localStorage.setItem('DOWNLOAD_VIEW_TIME', new Date().getTime().toString());
};
