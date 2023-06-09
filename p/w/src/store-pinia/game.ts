import { defineStore } from 'pinia';
import APIs from '@/http/blue-apis';
import type GameData from './gameType';
import { merge } from 'lodash';

export const navList: Array<GameData.navItem> = [
  { name: 'CASINO', id: 2, path: '/venue', type: 'video' }, // 真人
  { name: 'THỂ THAO', id: 6, path: '/venue', type: 'sports' }, // 体育
  { name: 'LÔ ĐỀ', id: 5, path: '/venue', type: 'lottery' }, // 彩票
  { name: 'NỔ HŨ', id: 4, path: '/subclass', type: 'electronic' }, // 电子
  { name: 'GAME BÀI', id: 7, path: '/subclass', type: 'chess' }, // 棋牌
  { name: 'BẮN CÁ', id: 3, path: '/subclass', type: 'fishing' }, // 捕鱼
  { name: 'ĐÁ GÀ', id: 9, path: '/cockfighting', type: 'cockfighting' }, // 斗鸡
  { name: 'E-SPORTS', id: 8, path: '/venue', type: 'esports' }, // 电竞
  { name: '小游戏', id: 10, path: '/venue', type: 'lottery' } // 小游戏
];

export const gameStateStore = defineStore('gameState', {
  state: (): GameData.State => {
    return {
      ganeList: [],
      expandItemList: [],
      isSmallGame: false
    };
  },
  actions: {
    getGaneList() {
      APIs.getVenueData().then((res: any) => {
        let electronic: any = null;
        this.ganeList = [];
        navList.forEach((item: GameData.navItem) => {
          const current = res.find((row: GameData.item) => row.id === item.id);
          if (current.id === 10) {
            electronic = current.l;
          } else {
            this.ganeList?.push(merge(current, item));
          }
        });
        if (electronic) {
          this.isSmallGame = true;
          this.ganeList.forEach((item: GameData.item) => {
            if (item.level === '001004') {
              item.l = item.l?.concat(electronic);
            }
          });
        }
        let list: Array<GameData.lItem> = [];
        res?.forEach((item: any) => {
          list = list.concat(item.l);
        });
        this.expandItemList = list;
      });
    }
  }
});
