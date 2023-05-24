import type { Directive } from 'vue'
import venueImg from '@images/personal/venue-list/venue-item.png?preset=full'

// 通用card 背景
const card: Directive< HTMLSpanElement | HTMLDivElement> = {
  mounted(el) {
    const imgUrl = getImageUrl(venueImg)
    el.style.backgroundImage = imgUrl
    el.style.backgroundSize = '100% 100%'
  },
}

export default card
