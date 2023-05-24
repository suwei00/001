export interface UserInfo {
  uid: number;
  username: string;
  password: string;
  real_name: string;
  realname_hash: number;
  birth: number;
  email_hash: number;
  email: string;
  phone_hash: number;
  phone: string;
  verify_type: number;
  qq: string;
  gender: number;
  is_agent: number;
  withdraw_pwd: string;
  regip: number;
  created_at: number;
  last_login_ip: number;
  last_login_at: number;
  source_id: number;
  address: string;
  remarks: string;
  first_deposit_at: number;
  first_deposit_amount: string;
  be_agent_at: number;
  invite_uid: number;
  state: number;
  lft: number;
  rgt: number;
  level: number;
  agency_uid: number;
  agency_name: string;
  agency_type: number;
  bankcard_total: number;
  avatar: string;
  [prop: string]: any;
}
export interface MemberInfo {
  birth: string;
  email: string;
  gender: string;
  phone: string;
  realname: string;
  uid: number;
  verify_type: number;
}

export interface Balance {
  uid: string;
  balance: string;
  lock_amount: string;
  commission: string;
}
