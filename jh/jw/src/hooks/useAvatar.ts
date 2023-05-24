import type { Ref } from 'vue'
import avatarImg from '~/assets/images/header/avatar.png?preset=full'
import avatarImg1 from '~/assets/images/header/avatar-1.png?preset=full'
import avatarImg2 from '~/assets/images/header/avatar-2.png?preset=full'
import avatarImg3 from '~/assets/images/header/avatar-3.png?preset=full'
import avatarImg4 from '~/assets/images/header/avatar-4.png?preset=full'
import avatarImg5 from '~/assets/images/header/avatar-5.png?preset=full'
import avatarImg6 from '~/assets/images/header/avatar-6.png?preset=full'
import avatarImg7 from '~/assets/images/header/avatar-7.png?preset=full'
import avatarImg8 from '~/assets/images/header/avatar-8.png?preset=full'
import avatarImg9 from '~/assets/images/header/avatar-9.png?preset=full'
import avatarImg10 from '~/assets/images/header/avatar-10.png?preset=full'
import avatarImg11 from '~/assets/images/header/avatar-11.png?preset=full'
import avatarImg12 from '~/assets/images/header/avatar-12.png?preset=full'
import avatarImg13 from '~/assets/images/header/avatar-13.png?preset=full'
import avatarImg14 from '~/assets/images/header/avatar-14.png?preset=full'
import avatarImg15 from '~/assets/images/header/avatar-15.png?preset=full'
import avatarImg16 from '~/assets/images/header/avatar-16.png?preset=full'
import avatarImgThumb from '~/assets/images/header/avatar.png?preset=thumbnail&src'
import avatarImgThumb1 from '~/assets/images/header/avatar-1.png?preset=thumbnail&src'
import avatarImgThumb2 from '~/assets/images/header/avatar-2.png?preset=thumbnail&src'
import avatarImgThumb3 from '~/assets/images/header/avatar-3.png?preset=thumbnail&src'
import avatarImgThumb4 from '~/assets/images/header/avatar-4.png?preset=thumbnail&src'
import avatarImgThumb5 from '~/assets/images/header/avatar-5.png?preset=thumbnail&src'
import avatarImgThumb6 from '~/assets/images/header/avatar-6.png?preset=thumbnail&src'
import avatarImgThumb7 from '~/assets/images/header/avatar-7.png?preset=thumbnail&src'
import avatarImgThumb8 from '~/assets/images/header/avatar-8.png?preset=thumbnail&src'
import avatarImgThumb9 from '~/assets/images/header/avatar-9.png?preset=thumbnail&src'
import avatarImgThumb10 from '~/assets/images/header/avatar-10.png?preset=thumbnail&src'
import avatarImgThumb11 from '~/assets/images/header/avatar-11.png?preset=thumbnail&src'
import avatarImgThumb12 from '~/assets/images/header/avatar-12.png?preset=thumbnail&src'
import avatarImgThumb13 from '~/assets/images/header/avatar-13.png?preset=thumbnail&src'
import avatarImgThumb14 from '~/assets/images/header/avatar-14.png?preset=thumbnail&src'
import avatarImgThumb15 from '~/assets/images/header/avatar-15.png?preset=thumbnail&src'
import avatarImgThumb16 from '~/assets/images/header/avatar-16.png?preset=thumbnail&src'

function useAvatar(avatar?: Ref<string | undefined>) {
  // 头像列表
  const avatarList = [
    { src: avatarImg, thumb: avatarImgThumb },
    { src: avatarImg1, thumb: avatarImgThumb1 },
    { src: avatarImg2, thumb: avatarImgThumb2 },
    { src: avatarImg3, thumb: avatarImgThumb3 },
    { src: avatarImg4, thumb: avatarImgThumb4 },
    { src: avatarImg5, thumb: avatarImgThumb5 },
    { src: avatarImg6, thumb: avatarImgThumb6 },
    { src: avatarImg7, thumb: avatarImgThumb7 },
    { src: avatarImg8, thumb: avatarImgThumb8 },
    { src: avatarImg9, thumb: avatarImgThumb9 },
    { src: avatarImg10, thumb: avatarImgThumb10 },
    { src: avatarImg11, thumb: avatarImgThumb11 },
    { src: avatarImg12, thumb: avatarImgThumb12 },
    { src: avatarImg13, thumb: avatarImgThumb13 },
    { src: avatarImg14, thumb: avatarImgThumb14 },
    { src: avatarImg15, thumb: avatarImgThumb15 },
    { src: avatarImg16, thumb: avatarImgThumb16 },

  ]
  // 头像
  const avatarImgSrc = computed(() => {
    if (!avatar?.value)
      return avatarList[0]
    return avatarList[Number(avatar.value)]
  })
  // 根据id获取头像
  const getAvatarById = (id: string | number) => {
    return getSupportImage(avatarList[Number(id)].src)
  }
  return { avatarList, avatarImgSrc, getAvatarById }
}
export default useAvatar
