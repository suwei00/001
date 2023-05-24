import { getPromotionDetail } from '@/http/blue-apis'
import { computed } from 'vue'
import { useRequest } from 'vue-request'
import { useImage } from '@/hooks/useImage';

export function useDetail(id: string, flag: string) {
  const { googleCloudSrc } = useImage();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const { data } = useRequest(() => getPromotionDetail({ id, flag }))

  // H5需要标题
  const title = computed(() => isMobile && data.value?.config.title)

  // 详情大图
  const banner = computed(() => {
    if (isMobile) {
      return data.value?.static.title_h5 || ''
    } else {
      return `${googleCloudSrc.value}${data.value?.static.title_web}` || ''
    }
  })

  // 活动规则
  const details = computed(() => {
    if (isMobile) {
      return data.value?.config.h5_content || []
    } else {
      return data.value?.config.web_content || []
    }
  })

  return {
    title,
    banner,
    details,
    data,
  }
}