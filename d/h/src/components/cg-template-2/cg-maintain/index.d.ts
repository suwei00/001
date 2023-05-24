declare namespace CgMaintain {
  interface Props {
    type: 'venue1' | 'venue2' | 'venue3' | 'bank' | 'wallet' | string; // 场馆、下拉、热门、场馆游戏、银行、钱包
    time?: number; // 限时维护
  }
}

declare const CgMaintain: import('vue').DefineComponent<CgMaintain.Props>;

export default CgMaintain;
