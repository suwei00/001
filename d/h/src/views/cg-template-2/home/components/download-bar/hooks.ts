import { reactive, computed } from 'vue';
import { useRequest } from 'vue-request';
import APIs from '@/http/blue-apis';
import { getBrowser } from '@/utils/helpers';
import { useAppStore } from '@/store-pinia';

const appStore = useAppStore();

// 顶部下载框
export function useCloseBar() {
    const barState = reactive({
        show: !sessionStorage.getItem('close-load-bar')
    });

    function closeDownloadBar() {
        barState.show = false;
        sessionStorage.setItem('close-load-bar', '1');
    }

    function downloadApp() {
      appStore.downloadApp();
        // const registerId = localStorage.getItem('registerId');
        // const no_ad = localStorage.getItem('no_ad');

        // let url = ''
        // if (globalConfig.IS_DEV) {
        //     url = globalConfig.APP_URL
        // } else {
        //     const hostname = window.location.hostname
        //     const http = window.location.protocol
        //     const port = window.location.port

        //     url = `${http}//app.${hostname.replace('www.', '').replace('h5.', '')}${port ? `:${port}` : ''}`
        // }

        // window.location.href = registerId ? `${url}?c=${registerId}&r_code=${no_ad}` : url;
    }

    return {
        barState,
        closeDownloadBar,
        downloadApp
    };
}


export const useDirectDownlad = () => {
    // 新的app下载，直接下载，不用跳转下载落地页
    let appDownloadUrl = reactive<any>({});
    const { isIos } = getBrowser();
    const { data } = useRequest(() => APIs.getAppDownloadUrl({ dv: isIos ? 36 : 35 }), {
        onSuccess: (res) => {
            appDownloadUrl = res || {};
        }
    });

    const downloadUrl = computed(() => `${appDownloadUrl.url}?t=${new Date().getTime()}`);

    const newDownloadHandler = () => {
        // location.href = downloadUrl.value || '';
        appStore.downloadApp();
    };

    return {
        downloadUrl,
        newDownloadHandler,
    }
}