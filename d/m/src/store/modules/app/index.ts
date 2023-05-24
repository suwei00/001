import { Module } from 'vuex';
import { AppStateType } from './state';
import { StateType } from '@/dto/store';
import state from './state';
import mutations from './mutations';
import actions from './actions';

const app: Module<AppStateType, StateType> = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default app;