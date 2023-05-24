import storage from '@/utils/storage';

export interface VenueObject {
  d: string;
  i: string;
  ico: string;
  name: string;
  code?: string;
}
interface State {
  token: string;
  venueData: [];
  count: number;
  bankList: [];
  showTip: boolean;
  systemTime: any;
  language: string;
  captchaId: string;
  step: number;
  depositCountDownTime: number;
  banner: any[];
  showAgent: boolean;
}

const appState: State = {
  token: storage.get('TOKEN') || '',
  venueData: storage.get('venueData') || [],
  count: 0,
  bankList: storage.get('bank') || [],
  showTip: false,
  systemTime: new Date().toUTCString(),
  language: 'zh',
  captchaId: '',
  step: storage.get('step') || 0,
  depositCountDownTime: 0,
  banner: [],
  showAgent: true
};

export type AppStateType = typeof appState;

export default appState;
