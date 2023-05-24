// 客服
export const goTocustomerService = () => {
  memberBannerRequest({
    flags: 4,
    page: 1,
    page_size: 50,
  }).then((res: any) => {
    if (res.status) {
      const { token } = storeToRefs(useUserInfoStore())
      const { userInfo } = storeToRefs(useUserInfoStore())
      let url = res.data?.banner[0].url ?? ''
      if (token.value) {
        if (url.includes('?'))
          url += `&t=${token.value}&id=${userInfo.value?.chat_id}`
        else
          url += `?t=${token.value}&id=${userInfo.value?.chat_id}`
      }
      window.location.href = url
    }
  })
}
