import img43495319576432 from '~/assets/images/venue/item/43495319576432.png?preset=full'
import img1055235995899664907 from '~/assets/images/venue/item/1055235995899664907.png?preset=full'
import img362857114342923387 from '~/assets/images/venue/item/362857114342923387.png?preset=full'
import img6861705028422769039 from '~/assets/images/venue/item/6861705028422769039.png?preset=full'
import img16619506806735 from '~/assets/images/venue/item/16619506806735.png?preset=full'
import img16622699564720 from '~/assets/images/venue/item/16622699564720.png?preset=full'
import img16621850947387 from '~/assets/images/venue/item/16621850947387.png?preset=full'
import img44196810703047 from '~/assets/images/venue/item/44196810703047.png?preset=full'
import img16564048178345 from '~/assets/images/venue/item/16564048178345.png?preset=full'
import img16564045359195 from '~/assets/images/venue/item/16564045359195.png?preset=full'
import img2306856765348772637 from '~/assets/images/venue/item/2306856765348772637.png?preset=full'
import img16619202255312 from '~/assets/images/venue/item/16619202255312.png?preset=full'
import img39636407564188 from '~/assets/images/venue/item/39636407564188.png?preset=full'
import img16620065466911 from '~/assets/images/venue/item/16620065466911.png?preset=full'
import img16620064156225 from '~/assets/images/venue/item/16620064156225.png?preset=full'
import img2658175169982643138 from '~/assets/images/venue/item/2658175169982643138.png?preset=full'
import img7426646715018523638 from '~/assets/images/venue/item/7426646715018523638.png?preset=full'
import img16620065993782 from '~/assets/images/venue/item/16620065993782.png?preset=full'
import img16620989317215 from '~/assets/images/venue/item/16620989317215.png?preset=full'
import img8318022162827355323 from '~/assets/images/venue/item/8318022162827355323.png?preset=full'
import img16564048344271 from '~/assets/images/venue/item/16564048344271.png?preset=full'
import img45228933360695 from '~/assets/images/venue/item/45228933360695.png?preset=full'
import img46814147030478 from '~/assets/images/venue/item/46814147030478.png?preset=full'
import img16622151295118 from '~/assets/images/venue/item/16622151295118.png?preset=full'

import cg_k3 from '~/assets/images/venue/item/cg_k3.png?preset=full'
import cg_pk10 from '~/assets/images/venue/item/cg_pk10.png?preset=full'
import cg_ssc from '~/assets/images/venue/item/cg_ssc.png?preset=full'
import cg_11x5 from '~/assets/images/venue/item/cg_11x5.png?preset=full'
import cg_xy28 from '~/assets/images/venue/item/cg_xy28.png?preset=full'
import cg_default from '~/assets/images/venue/item/pppp.png?preset=full'
import cg_lhc from '~/assets/images/venue/item/cg_lhc.png?preset=full'

export const getVenueLogo = (item: any) => {
  const { id, types } = item
  if (!id)
    return ''
  switch (id.toString()) {
    case '43495319576432':
      return img43495319576432
    case '1055235995899664907':
      return img1055235995899664907
    case '362857114342923387':
      return img362857114342923387
    case '6861705028422769039':
      return img6861705028422769039
    case '16619506806735':
      return img16619506806735
    case '16622699564720':
      return img16622699564720
    case '16621850947387':
      return img16621850947387
    case '44196810703047':
      return img44196810703047
    case '16564048178345':
      return img16564048178345
    case '16564045359195':
      return img16564045359195
    case '2306856765348772637':
      return img2306856765348772637
    case '16619202255312':
      return img16619202255312
    case '39636407564188':
      return img39636407564188
    case '16620065466911':
      return img16620065466911
    case '16620064156225':
      return img16620064156225
    case '2658175169982643138':
      return img2658175169982643138
    case '7426646715018523638':
      return img7426646715018523638
    case '16620065993782':
      return img16620065993782
    case '16620989317215':
      return img16620989317215
    case '8318022162827355323':
      return img8318022162827355323
    case '16564048344271':
      return img16564048344271
    case '45228933360695':
      return img45228933360695
    case '46814147030478':
      return img46814147030478
    case '16622151295118':
      return img16622151295118
    case '8840968486572375835': // 久赢彩票
      if (types === 'k3')
        return cg_k3

      else if (types === 'pk10')
        return cg_pk10

      else if (types === 'ssc')
        return cg_ssc

      else if (types === '11x5')
        return cg_11x5

      else if (types === 'xy28')
        return cg_xy28
      else if (types === 'lhc')
        return cg_lhc
      else
        return cg_default

    default:
      return ''
  }
}
