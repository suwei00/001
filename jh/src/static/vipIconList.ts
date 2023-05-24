import bgSrc1 from '~/assets/images/my/vip/VIP1.png?preset=full'
import bgSrc2 from '~/assets/images/my/vip/VIP2.png?preset=full'
import bgSrc3 from '~/assets/images/my/vip/VIP3.png?preset=full'
import bgSrc4 from '~/assets/images/my/vip/VIP4.png?preset=full'
import bgSrc5 from '~/assets/images/my/vip/VIP5.png?preset=full'
import bgSrc6 from '~/assets/images/my/vip/VIP6.png?preset=full'
import bgSrc7 from '~/assets/images/my/vip/VIP7.png?preset=full'
import bgSrc8 from '~/assets/images/my/vip/VIP8.png?preset=full'
import bgSrc9 from '~/assets/images/my/vip/VIP9.png?preset=full'
import bgSrc10 from '~/assets/images/my/vip/VIP10.png?preset=full'

export const getVipLogo = (id: string | number | undefined) => {
  if (!id)
    return ''
  switch (id.toString()) {
    case '1':
      return bgSrc1
    case '2':
      return bgSrc2
    case '3':
      return bgSrc3
    case '4':
      return bgSrc4
    case '5':
      return bgSrc5
    case '6':
      return bgSrc6
    case '7':
      return bgSrc7
    case '8':
      return bgSrc8
    case '9':
      return bgSrc9
    case '10':
      return bgSrc10
    default:
      return ''
  }
}
