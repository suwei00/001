import { getServiceUrl } from '@/utils/common';

export function testDownloadSpeed(url: string, size: number = 1000) {
  const src = getServiceUrl(url);
  const img = new Image();
  return new Promise((resolve, reject) => {
    img.src = src; // 加个时间戳以避免浏览器只发起一次请求
    const startTime = new Date().getTime();

    img.onload = () => {
      const fileSize = size // 单位是 kb
      const endTime = new Date().getTime();
      const costTime: number = endTime - startTime;
      const speed = fileSize / costTime * 1000 // 单位是 kb/s

      resolve({ speed, costTime })
    }

    img.onerror = reject
  })
}