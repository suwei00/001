declare namespace CgMaintain {
  interface Props {
    type: 'venue' | 'drop' | 'hot' | 'logo' | 'bank' | 'wallet' | 'bankstop' // 场馆、下拉、热门、场馆游戏、银行、钱包
    time?: number // 限时维护
  }
}

declare const CgMaintain: import('vue').DefineComponent<CgMaintain.Props>;

export default CgMaintain;