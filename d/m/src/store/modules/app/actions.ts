import { ActionTree, ActionContext } from 'vuex';
import { AppStateType } from './state';
import { StateType } from '@/dto/store';
import { APIs } from '@/http';

type AugmentedActionContext = ActionContext<AppStateType, StateType>;

const actions: ActionTree<AppStateType, StateType> = {
  /**
   * @description 获取场馆信息
   * @param {*} { commit }
   */
  getVenueData({ commit }) {
    APIs.getVenueData().then((res: any) => {
      if (res.status) {
        // const r = forEach(res.data, o => {
        //   if (o.l) {
        //     o.l.forEach((i: any) => {
        //       // i.name = useIn18.PLATFORM_PLATS_ID['n' + i.id];
        //     });
        //   }
        // });
        commit('setVenueData', res.data);
      }
    });
  },
  async aycSetCount({ commit }) {
    await Promise.resolve();
    commit('setCount', 10);
  },
  /**
   * @description 获取站内信未读数量
   * @param {*} { commit }
   */
  getMessageNum({ commit }) {
    APIs.getMessageNum().then(res => {
      if (res.status) {
        const { notice, promo } = res.data;
        commit('setMessageNum', res.data);
        commit('setNoticeTabNum', res.data);
      }
    });
  }
};

export default actions;
