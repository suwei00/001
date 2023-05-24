import { GetterTree } from 'vuex';
import { StateType } from '@/dto/store';

const getters: GetterTree<StateType, StateType> = {
  userInfo: state => state.user.userInfo,
  token: state => state.app.token,
  venueData: state => state.app.venueData,
  server_time: state => state.app.serverTime,
  messageNum: state => state.app.messageNum,
  notice: state => state.app.notice,
  promo: state => state.app.promo,
  vid: state => state.app.vid,
  post: state => state.app.post,
  promotion_state: state => state.app.promotion_state,
  showAgent: state => state.app.showAgent,
  bannerList: state => state.app.bannerList,
  showNotice: state => state.app.showNotice,
  showBalance: state => state.app.showBalance,
  chatIsDragging: state => state.app.chatIsDragging,
  // 资料完整度
  dataIntegrity: state => {
    const { username, phone, real_name, zalo, email, birth } = state.user.userInfo;
    // 统计长度不为0的变量数量
    return Object.keys({ username, phone, real_name, zalo, email, birth }).filter(key => state.user.userInfo[key] !== '').length / 6;
  }
};

export default getters;
