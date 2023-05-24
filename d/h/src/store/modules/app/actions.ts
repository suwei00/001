import { ActionTree, ActionContext } from 'vuex';
import { AppStateType } from './state';
import { StateType } from '@/dto/store';
import { APIs } from '@/http';
import { forEach, merge, orderBy } from 'lodash';
import { platFormat, hotPlat, redPlat, vphotPlat } from '@/utils/nav';

type AugmentedActionContext = ActionContext<AppStateType, StateType>;

const actions: ActionTree<AppStateType, StateType> = {
  getVenueData({ commit }) {
    APIs.getVenueData().then((res: any) => {
      if (res.status) {
        const newList = orderBy(merge(res.data, platFormat), 'sort', 'desc');
        forEach(newList, (o: any) => orderBy(o, 'seq', 'asc'));
        commit('setVenueData', [globalConfig.THEME === 'black-gold' ? redPlat : hotPlat, ...newList]);
      }
    });
  },
  async aycSetCount({ commit }) {
    await Promise.resolve();
    commit('setCount', 10);
  },
  getBankList({ commit }) {
    APIs.getBankList().then((res: any) => {
      const bank = res.filter((item: any) => item.id !== 101);
      commit('setBankList', bank);
    });
  },
  setShowTip({ commit }) {
    commit('setShowTip', true);
  }
};

export default actions;
