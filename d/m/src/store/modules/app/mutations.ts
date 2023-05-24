import { MutationTree } from 'vuex';
import { AppStateType, VenueObject } from './state';
import storage from '../../../utils/storage';

const mutations: MutationTree<AppStateType> = {
  setToken(state: AppStateType, data: string) {
    storage.set('TOKEN', data);
    state.token = data;
  },
  setVenueData(state: AppStateType, data: VenueObject[]) {
    state.venueData = data;
  },
  setCount(state: AppStateType, count: number) {
    state.count = count;
  },
  setShowAppHeader(state: AppStateType, isShow: boolean) {
    state.showAppHeader = isShow;
  },
  setShowAppFooter(state: AppStateType, isShow: boolean) {
    state.showAppFooter = isShow;
  },
  setEgameActiveIndex(state: AppStateType, index: number) {
    state.egameActiveIndex = index;
  },
  setServerTime(state: AppStateType, dateTime: number) {
    state.serverTime = dateTime;
  },
  setNoAppHeaderTransparency(state: AppStateType, data: boolean) {
    state.noAppHeaderTransparency = data;
  },
  setVid(state: AppStateType, data: string) {
    state.vid = data;
  },
  /**
   * @description 设置站内信未读数量
   * @param {AppStateType} state
   * @param {number} num
   */
  setMessageNum(state: AppStateType, num: number) {
    state.messageNum = num;
  },
  setNoticeTabNum(state: AppStateType, data: any) {
    state.post = data.post;
    state.notice = data.notice;
    state.promo = data.promo;
  },
  setPromotionState(state: AppStateType, status: boolean) {
    console.log('触发改变', status);
    state.promotion_state = status;
  },
  setShowAgent(state: AppStateType, status: boolean) {
    state.showAgent = status;
  },
  setBannerList(state: AppStateType, bannerList: any) {
    state.bannerList = bannerList;
  },
  setShowNotice(state: AppStateType, status: boolean) {
    state.showNotice = status;
  },
  setShowBalance(state: AppStateType, status: boolean) {
    state.showBalance = status;
  },
  /**
   * @description 设置聊天室拖动状态
   * @param {AppStateType} state
   * @param {boolean} status
   */
  setChatIsDragging(state: AppStateType, status: boolean) {
    state.chatIsDragging = status;
  },
  setDateTime(state: AppStateType, status: string) {
    state.dateTime = status;
  }
};

export default mutations;
