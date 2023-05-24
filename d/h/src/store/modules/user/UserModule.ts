import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { UserInfo, Balance } from '../../types';
import { APIs } from '@/http';
import storage from '@/utils/storage';
import Session from '@/utils/session';
const user: UserInfo = {
  uid: 0,
  username: '',
  password: '',
  real_name: '',
  realname_hash: 0,
  birth: 0,
  email_hash: 0,
  email: '',
  phone_hash: 0,
  phone: '',
  verify_type: 0,
  qq: '',
  gender: 0,
  is_agent: 0,
  withdraw_pwd: '',
  regip: 0,
  created_at: 0,
  last_login_ip: 0,
  last_login_at: 0,
  link_black_list: 0,
  source_id: 0,
  address: '',
  remarks: '',
  first_deposit_at: 0,
  first_deposit_amount: '0.00',
  be_agent_at: 0,
  invite_uid: 0,
  state: 1,
  lft: 0,
  rgt: 0,
  level: 0,
  agency_uid: 0,
  agency_name: '',
  agency_type: 0,
  bankcard_total: 0,
  avatar: ''
};
@Module({ dynamic: true, store, name: 'user' })
class UserModule extends VuexModule {
  userName: string = '';
  login: boolean = Session.get('login');
  userInfo: UserInfo = Session.get('user') || user;
  balance: Balance = {
    uid: '',
    balance: '',
    lock_amount: '',
    commission: ''
  };
  @Mutation
  setLogin(login: boolean) {
    this.login = login;
    Session.set('login', login);
  }

  @Mutation
  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
    storage.set('user', this.userInfo);
  }
  @Mutation
  setBalance(balance: Balance) {
    this.balance = balance;
    storage.set('balance', balance);
  }

  @Mutation
  private setUserName(name: string) {
    this.userName = name;
  }

  @Action
  async getUserInfo() {
    await APIs.getUserInfo().then((res: any) => {
      if (res.status) {
        this.context.commit('setLogin', true);
        this.context.commit('setUserInfo', res.data);

        this.getUserBalance();
      }

      APIs.memeberInfo().then((info: any) => {
        if (info.status) {
          this.context.commit('setUserInfo', { ...res.data, ...info.data });
        }
      });
    });
  }
  @Action
  async getUserBalance() {
    const res = await APIs.getUserBalance();
    if (res.status) {
      this.context.commit('setBalance', res.data);
    }
    // APIs.getUserBalance().then((res: any) => {
    //   if (res.status) {
    //     this.context.commit('setBalance', res.data);
    //   }
    // });
  }

  @Action
  public async aycSetUserName(name: string) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.userName = Math.random() + name;
        resolve(true);
      }, 1000);
    });
  }
}

export default getModule(UserModule);
