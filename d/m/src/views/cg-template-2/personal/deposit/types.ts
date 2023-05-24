export interface VirtualCurrencyProto {
  id: string;
  name: string;
  title: string;
  desc: string;
}

export interface AmountItem {
  disabled: boolean,
  value: number
}

export interface PayRes {
  account: string;
  bank_code: string;
  bank_logo: string;
  card_holder: string;
  id: string;
  pay_code: string;
  qr_code: string;
  url: string;
  useLink: string;
}

export interface OfflinePayRes {
  cardNo: string;
  id: string;
  manualRemark: string;
  name: string;
  realname: string;
  ts: string;
}