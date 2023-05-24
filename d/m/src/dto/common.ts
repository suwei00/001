export interface Wallet {
  [key: string]: any;
  id: string;
  name: string;
  seq: number;
  amount: string;
  flags: number;
  maintained: number;
  wallet_id: string;
  wallet_name: string;
}

export interface PromoTransferParams {
  pid: string;
  flags: string;
  amount?: string;
}
