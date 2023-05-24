import { ref } from 'vue';

export function useImage() {
  // 本地图片
  const localSrc = ref('');
  // 三方游戏列表图片
  const gameSrc = ref('');
  // google cloud 图片
  const googleCloudSrc = ref('');
  const baseUrl = globalConfig.IS_DEV ? '' : globalConfig.APP_CDN_URL
  const staticResource = globalConfig.STATIC_RESOURCE;
  const localDir = `/${globalConfig.TEMPLATE}/${globalConfig.THEME}/${globalConfig.SITE}`

  gameSrc.value = `${globalConfig.APP_CDN_URL}`;
  googleCloudSrc.value = `${globalConfig.APP_GOOGLE_CLOUD_URL}`;
  localSrc.value = `${baseUrl}${staticResource}${localDir}`;

  return {
    localSrc,
    gameSrc,
    googleCloudSrc
  }
}