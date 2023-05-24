import { GetterTree } from 'vuex';
import { StateType } from '@/dto/store';

const getters: GetterTree<StateType, StateType> = {
  // login: state => state.user.login,
  userInfo: state => state.user.userInfo,
  balance: state => state.user.balance,
  token: state => {
    return state.app.token;
  },
  infoRate: state => {
    const { address = '0', email_hash = '0', phone_hash = '0', zalo_hash = '0', realname_hash = '0', birth_hash = '0' } = state.user.userInfo;
    const arr = [address, email_hash, phone_hash, zalo_hash, realname_hash, birth_hash].filter(item => item !== '0' && item !== '');
    return arr.length === 6 ? 100 : Math.floor(100 / 6) * arr.length;
  },
  showTip: state => state.app.showTip,
  venueData: state => state.app.venueData,
  bankList: state => state.app.bankList,
  systemTime: state => state.app.systemTime,
  currentLanguage: state => state.app.language,
  captchaId: state => state.app.captchaId,
  step: state => state.app.step,
  banner: state => state.app.banner,
  showAgent: state => state.app.showAgent
};

export default getters;
