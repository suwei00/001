import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { store } from '@/store';

@Module({ dynamic: true, store, name: 'egame' })
class EgameModule extends VuexModule {
  isActive: number = 0;

  @Mutation
  SET_ACTIVE_INDEX(index: number) {
    this.isActive = index;
  }

  @Action
  setActiveIndex(index: number) {
    this.context.commit('SET_ACTIVE_INDEX', index);
  }
}

export default getModule(EgameModule);
