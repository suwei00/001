import { defineStore } from 'pinia';

export const useDragStore = defineStore({
  id: 'dragState ', // id必填，且需要唯一
  state: () => {
    return {
      isShowDrag: true, // 浮标开关
      isShowGame: true, // 浮标开关
      showChat: false // 聊天室开关
    };
  },
  actions: {
    setIsShowDrag(val: boolean) {
      this.isShowDrag = val;
    },
    setIsShowGame(val: boolean) {
      this.isShowGame = val;
    },
    setShowChat(val: boolean) {
      this.showChat = val;
    }
  }
});
