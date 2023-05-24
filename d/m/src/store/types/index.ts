export interface UserInfo {
  uid: string;
  username: string;
  password: string;
  real_name: string;
  realname_hash: number;
  birth: string | number;
  email_hash: number;
  email: string;
  phone_hash: number;
  phone: string;
  verify_type: number;
  qq: string;
  gender: number;
  prefix: string;
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
  link_black_list: number;
  [prop: string]: any;
}

export interface BaseFormMap {
  realName: string;
  sex: number;
  bothDate: number | string;
}

export interface ObjMap {
  bool: boolean;
  title: string;
  type: number;
}

export interface SafeMap {
  phoneNumber?: string;
  sendCode?: string;
  email?: string;
  pass?: string;
  newPass?: string;
  rePass?: string;
  imgCode?: string;
  code?: string;
  ty?: string;
  sendPhoneCode?: string;
  sendEmailCode?: string;
}
