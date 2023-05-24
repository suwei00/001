import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { store } from '@/store';
import { UserInfo, BaseFormMap, ObjMap, SafeMap } from '@/store/types';
import { APIs } from '@/http';
import userState from './state';
import Session from '@/utils/session';
import bus from '@/mixins/bus';
import dayjs from 'dayjs';
@Module({ dynamic: true, store, name: 'user' })
class UserModule extends VuexModule {
  userName: string = '';
  login: boolean = Session.get('login');
  userInfo: UserInfo = Session.get('token') || userState.userInfo;
  userImg: string = localStorage.getItem('userImg') ?? 'header';
  baseUInfo: any = {
    birth: '',
    realname: '',
    phone: '',
    gender: 0,
    email: '',
    zalo: '',
    address: ''
  };
  balance: string = '';
  lockBalance: string = '';
  commission: string = '';
  isVisible: boolean = false; // 是否显示弹窗
  baseForm: BaseFormMap = {
    realName: '', // 真实姓名
    sex: 1, // 1 男2女
    bothDate: dayjs().subtract(18, 'year').format('YYYY-MM-DD')
  };
  isCompleted: boolean = true; // 表单是否完善
  safeTitle: string = ''; // 安全表单标题
  showCurForm: string = ''; // 电子邮箱
  safeFormType: number = 0; // 0 验证状态 1修改状态
  phoneCheckForm: SafeMap = {
    phoneNumber: '',
    sendCode: '',
    imgCode: ''
  };
  emailCheckForm: SafeMap = {
    email: '',
    sendCode: '',
    imgCode: ''
  };
  passCheckForm: SafeMap = {
    pass: '',
    newPass: '',
    rePass: '',
    sendPhoneCode: '',
    sendCode: '',
    ty: '',
    phoneNumber: ''
  };
  phoneIsSave: boolean = false;
  emailIsSave: boolean = false;
  passIsSave: boolean = false;
  noticeTabIndex?: number = 2;
  @Mutation
  setLogin(login: boolean) {
    this.login = login;
    Session.set('login', login);
  }
  @Mutation
  setNoticeTabIndex(tabIndex?: number) {
    this.noticeTabIndex = tabIndex;
  }
  @Mutation
  setUserInfo(userInfo: UserInfo) {
    Session.set('token', userInfo);
    this.userInfo = { ...this.userInfo, ...userInfo };
  }
  @Mutation
  defaultUserInfo() {
    this.userInfo = userState.userInfo;
  }
  @Mutation
  setBalance(balance: string) {
    this.balance = balance;
  }

  @Mutation
  setLockBalance(lockBlance: string) {
    this.lockBalance = lockBlance;
  }
  @Mutation
  setCommission(commission: string) {
    this.commission = commission;
  }

  @Mutation
  private setUserName(name: string) {
    this.userName = name;
  }

  @Mutation
  SET_VISIBLE_DIALOG(bool: boolean) {
    this.isVisible = bool;
  }

  @Mutation
  SET_RADIO_ACTIVE(index: number) {
    this.baseForm.sex = index;
  }

  @Mutation
  SET_REALE_NAME_VALUE(value: string) {
    this.baseForm.realName = value;
  }

  @Mutation
  SET_PICKER_VALUE(value: string) {
    console.log('🚀 ~ file: UserModule.ts ~ line 114 ~ UserModule ~ SET_PICKER_VALUE ~ value', value);
    this.baseForm.bothDate = value;
  }

  @Mutation
  SET_VALIDATE_COMPONENTED(bool: boolean) {
    this.isCompleted = bool;
  }

  @Mutation
  SET_SAFE_FORM_INFO(params: ObjMap) {
    console.log(params);
    // const prefix = params.type == 0 ? useIn8.userInfo.check : useIn8.userInfo.vtfry_info;
    this.safeFormType = params.type;
    this.safeTitle = params.title;
    this.showCurForm = params.title;
    this.phoneCheckForm = {};
    this.emailCheckForm = {};
    this.passCheckForm = {};
  }
  @Mutation
  setLocalUserImg(url: string) {
    this.userImg = url;
    localStorage.setItem('userImg', url);
  }
  @Mutation
  getLocalUserImg(prefix: string) {
    return localStorage.getItem(prefix) || '';
  }
  @Mutation
  SET_UINFO(info: any = {}) {
    this.baseUInfo = info;
  }

  /**
   * @description
   * @param {boolean} [isLogin] 是否是登录
   * @memberof UserModule
   */
  @Action
  getUserInfo(isLogin?: boolean) {
    APIs.getUserInfo().then((res: any) => {
      if (res.status) {
        APIs.getPersonalInfo().then((pRes: any) => {
          if (pRes.status) {
            this.context.commit('setLogin', true);
            this.context.commit('setUserInfo', { ...res.data, ...pRes.data });
            // 如果是登录，触发user事件，保证接收到user事件的时候，可以拿到userInfo值
            if (isLogin) {
              const data = { ...res.data, ...pRes.data };
              bus.emit('user', data);
            }
          }
        });
      }
    });
  }

  @Action
  getUserBalance() {
    APIs.getUserBalance().then((res: any) => {
      if (res.status) {
        this.context.commit('setBalance', res.data.balance);
        this.context.commit('setLockBalance', res.data.lock_amount);
        this.context.commit('setCommission', res.data.commission);
      }
    });
  }
  @Action
  setVisibleDialog(params: ObjMap) {
    this.context.commit('SET_VISIBLE_DIALOG', params.bool);
    this.context.commit('SET_SAFE_FORM_INFO', params);
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

const UserStoreModules = getModule(UserModule);

export default UserStoreModules;
