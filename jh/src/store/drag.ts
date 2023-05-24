import { defineStore } from 'pinia'

export const dragStateStore = defineStore({
  id: 'dragState ', // id必填，且需要唯一
  state: () => {
    return {
      isShowDrag: false,
      showChat: false,
      isShowChat: false,
      guideVisible: false,
    }
  },
  actions: {
    setGuideVisible(val: boolean) {
      this.guideVisible = val
    },
    setIsShowChat(val: boolean) {
      this.isShowChat = val
    },
    setIsShowDrag(val: boolean) {
      if (localStorage.getItem('source') === 'app')
        return
      this.isShowDrag = val
    },
    setShowChat(val: boolean) {
      this.showChat = val
      this.isShowChat = val
    },
  },
})
