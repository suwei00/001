import APIs from '@/http/blue-apis';
import { useRequest } from 'vue-request';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import { CgEmergency } from '@/components/cg-template-2';
import bus from './bus';
import { goToServeUrl } from '@/utils/helpers';

export default function (state: boolean) {
  const Dialog = new CgDialogClass();

  const { run: getEmergency } = useRequest(APIs.getEmergency, {
    manual: true,
    onSuccess: (data: any) => {
      if (data?.length) {
        bus.emit('show_preferential', false);
        const { content, send_name, title, ts, id } = data[0];
        Dialog.showDialog({
          template: 'tmp2',
          redTitle: title,
          cancelText: 'Tôi Đã Hiểu',
          confirmText: 'CSKH',
          customComponent: CgEmergency,
          props: {
            title: send_name,
            ts,
            content
          },
          onCancel: () => {
            getMemberMessageRea(id, false);
          },
          onOk: () => {
            getMemberMessageRea(id, true);
          }
        });
      } else {
        if (state) {
          bus.emit('show_preferential', true);
        }
      }
    }
  });

  const getMemberMessageRea = async (id: string, kefu: boolean) => {
    const result: any = await APIs.readUserMsg({ id });
    if (result === '1000') {
      getEmergency();
    }
    if (kefu) {
      goToServeUrl();
    }
  };

  return { getEmergency };
}
