import { APIs } from '@/http';
import { ref } from 'vue';
// 关于验证码相关内容
export default function captchaImageEffect() {
  const captchaImage = ref('');
  const captchLoading = ref<boolean>(false);
  let timer: any = null;
  const getCaptchaImage = (time: number = 0): void => {
    if (captchLoading.value) return;
    captchLoading.value = true;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      APIs.getImgCode({ t: Date.now() })
        .then((res: Blob) => {
          if (res) {
            blobToBase64(res, base64 => {
              captchaImage.value = base64;
            });
          }
          captchLoading.value = false;
        })
        .catch(() => {
          captchLoading.value = false;
        });
    }, time);
  };
  const blobToBase64 = (blob: Blob, callback: (base64: string) => void) => {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      if (e.target) callback(e.target.result as string);
    };
    fileReader.readAsDataURL(blob);
  };
  return { captchaImage, getCaptchaImage, captchLoading };
}
