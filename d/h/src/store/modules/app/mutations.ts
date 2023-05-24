import { MutationTree } from 'vuex';
import { AppStateType, VenueObject } from './state';
import storage from '@/utils/storage';

const mutations: MutationTree<AppStateType> = {
  setToken(state: AppStateType, data: string) {
    storage.set('TOKEN', data);
    state.token = data;
  },
  setCaptchaId(state: AppStateType, data: string) {
    state.captchaId = data;
  },
  setVenueData(state: AppStateType, data: []) {
    storage.set('venueData', data);
    state.venueData = data;
  },
  setCount(state: AppStateType, count: number) {
    state.count = count;
  },
  setBankList(state: AppStateType, data: []) {
    sessionStorage.setItem('bank', JSON.stringify(data));
    state.bankList = data;
  },
  setShowTip(state: AppStateType, data: boolean) {
    storage.set('showTip', data);
    state.showTip = data;
  },
  setSystemTime(state: AppStateType, time: number) {
    state.systemTime = time;
  },
  setLanguage(state: AppStateType, lang: string) {
    console.log('设置语言', lang);
    state.language = lang;
  },
  setStep(state: AppStateType, step: number) {
    storage.set('step', step);
    state.step = step;
  },
  setBanner(state: AppStateType, data: any[]) {
    state.banner = data;
  },
  setShowAgent(state: AppStateType, status: boolean) {
    state.showAgent = status;
  }
};

export default mutations;
