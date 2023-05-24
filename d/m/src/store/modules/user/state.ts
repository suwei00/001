import { UserInfo } from '../../types';

interface State {
  login: boolean;
  userInfo: UserInfo;
  balance: string;
  isVisible: boolean;
}

const userState: State = {
  login: false,
  userInfo: {
    link_black_list: 0,
    address: '',
    agency_name: '',
    agency_type: 0,
    agency_uid: 0,
    bankcard_total: 0,
    be_agent_at: 0,
    birth: 0,
    created_at: 0,
    email: '',
    email_hash: 0,
    first_deposit_amount: '',
    first_deposit_at: 0,
    gender: 0,
    invite_uid: 0,
    is_agent: 0,
    last_login_at: 0,
    last_login_ip: 0,
    level: 0,
    lft: 0,
    password: '',
    phone: '',
    phone_hash: 0,
    qq: '',
    real_name: '',
    realname_hash: 0,
    regip: 0,
    remarks: '',
    rgt: 0,
    source_id: 0,
    state: 0,
    uid: '',
    username: '',
    verify_type: 0,
    withdraw_pwd: '',
    avatar: '',
    zalo: '',
    prefix: ''
  },
  balance: '',
  isVisible: false
};

export type UserStateType = typeof userState;

export default userState;
