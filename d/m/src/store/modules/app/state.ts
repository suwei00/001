import storage from '../../../utils/storage';
export interface L {
  id: string;
  name: string;
  wallet_id: string;
  wallet_name: string;
  game_type: number;
  maintained: number;
  flags: number;
  state: number;
  seq: number;
}
export interface VenueObject {
  id: number;
  level: string;
  name: string;
  sort: number;
  prefix: string;
  l: L[];
  key: string;
  img: number;
  float: number;
}

interface State {
  token: string;
  venueData: VenueObject[];
  count: number;
  showAppHeader: boolean;
  noAppHeaderTransparency: boolean;
  showAppFooter: boolean;
  egameActiveIndex: number;
  toolBarData?: any;
  cacheView?: any;
  serverTime: number;
  vid: string;
  messageNum: number;
  post: number;
  notice: number;
  promo: number;
  promotion_state: boolean;
  showAgent: boolean | null;
  bannerList: any[];
  showNotice: boolean;
  showBalance: boolean;
  chatIsDragging: boolean;
  dateTime: string
}

const appState: State = {
  token: storage.get('TOKEN') || '',
  venueData: [],
  count: 0,
  showAppHeader: true,
  showAppFooter: true,
  noAppHeaderTransparency: false,
  egameActiveIndex: -1,
  serverTime: new Date().getTime(),
  vid: '',
  messageNum: 0,
  post: 0,
  notice: 0,
  promo: 0,
  promotion_state: false,
  showAgent: null, // 初始化为null false 为隐藏 true 为显示
  bannerList: [],
  showNotice: false,
  showBalance: false,
  chatIsDragging: false,
  dateTime: ''
};

export type AppStateType = typeof appState;

export default appState;
