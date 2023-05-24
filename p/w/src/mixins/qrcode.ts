import qrcode from 'qrcode';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

export function getQrcode(dark = '#84643BFF', width = 130) {
  const app_url = globalConfig.IS_PROD ? `${window.location.protocol}//app.${location.host.replace('www.', '')}` : globalConfig.APP_URL;
  const qrcodeImg = ref('');
  const router = useRouter();

  const updateQrcode = () => {
    setTimeout(() => {
      const id = sessionStorage.getItem('LINK_ID');
      console.log('邀请码 id +++++++ ', id);
      if (id !== null) {
        stop();
      }
      const url = id ? `${app_url}?c=${id}` : app_url;
      qrcode.toDataURL(url, { color: { dark: dark, light: '#ffffff00' }, margin: 0, width }).then(base64 => {
        qrcodeImg.value = base64;
      });
    }, 10);
  }

  onMounted(() => {
    updateQrcode()
  })

  const stop = watch(router.currentRoute, (val) => {
    console.log(val);
    if (val.path === '/' && val.params.linkId) {
      updateQrcode();
    }
  })

  return {
    qrcodeImg
  };
}
