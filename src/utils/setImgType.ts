import { canUseWebp, isAvif } from '@/utils/helpers'

// 给支持webp的浏览器设置标识，供css背景图片使用
if (isAvif)
  document.documentElement.className = 'global_avif'
else if (canUseWebp())
  document.documentElement.className = 'global_webp'
