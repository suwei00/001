declare namespace GameData {
  interface item {
    id: number | string;
    level?: string;
    name?: string;
    prefix?: string;
    sort?: number;
    l?: Array<lItem>;
    path: string;
    type: string;
  }

  interface navItem {
    name?: string;
    id: string | number;
    path: string;
    type: string;
  }

  interface State {
    ganeList?: Array<item>;
    expandItemList?: Array<lItem>;
    activeGameId?: string | number;
    isSmallGame?: boolean;
  }

  interface lItem {
    id?: string;
    flags: number;
    game_type: number;
    maintained: number;
    maintained_end: number;
    maintained_start: number;
    name: string;
    seq: number;
    share_wallet: number;
    state: number;
    wallet_id: string;
    wallet_name: string;
  }
}
export default GameData;
