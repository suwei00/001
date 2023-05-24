export interface PromotionList {
  static: {
    list_web: string;
    list_h5: string;
    title_web: string;
    title_h5: string;
    share_h5: string;
  };
  id: string;
  title: string;
  state: number;
  flag: string;
}

export interface Banner {
  content: string
  flag: string
  flags: string
  id: string
  img: string
  sort: string
  state: number
  static: Pick<PromotionList, 'static'>
  title: string
  url: string
}

export interface BankTree {
  id: number;
  level: string;
  name: string;
  sort: number;
  prefix: string;
}