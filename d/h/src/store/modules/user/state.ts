import { UserInfo, Balance } from '../../types';

interface State {
  login: boolean;
  userInfo: UserInfo;
  balance: Balance;
}

const userState: State = {
  login: false,
  userInfo: {
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
  },
  balance: {
    uid: '',
    balance: '',
    lock_amount: '',
    commission: ''
  }
};

export type UserStateType = typeof userState;

export default userState;
