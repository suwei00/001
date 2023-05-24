import { ref } from 'vue';
import { Toast } from 'vant';

export const useDownloadApp = () => {
  const isOpen = ref(false);
  let _timeout:any;
  const init = (linkid?: string | null) => {
    if ((window as any).ShareTrace) {
      (window as any).ShareTrace.init({
        appkey: 'c22fde9b3945c4fa',
        param: 'c='.concat(linkid || '')
      });
    }
  };

  setTimeout(() => {
    const LINK_ID = sessionStorage.getItem('LINK_ID');
    init(LINK_ID);
  }, 1000);

  const downloadUrlClick = (downloadUrl: string) => {
    isOpen.value = false;
    window.location.href = 'app://www.p3.com';
    _timeout = setTimeout(() => {
      if (isOpen.value) return;
      const linkid = sessionStorage.getItem('LINK_ID');
      if (!downloadUrl) {
        Toast({
          duration: 2000,
          message: 'Không Thể Tải Xuống\nVui lòng Liên Hệ CSKH',
          position: 'top'
        });
        return;
      } else {
        if (globalConfig.ENVI === 'prod') {
          init(linkid);
          (window as any).ShareTrace.download();
        } else {
          location.href = downloadUrl;
        }
      }
    }, 2000);
  };

  document.addEventListener('visibilitychange', () => {
    if(document.hidden){
      isOpen.value = true;
    }
    clearTimeout(_timeout)
  });

  return {
    downloadUrlClick
  };
};
