import { useStore } from '@/store';
import { L, VenueObject } from '@/store/modules/app/state';
import { forEach, merge, orderBy } from 'lodash';
import { computed, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

export default function () {
  const { t } = useI18n();
  // 此处的数组排序和后端返回一致
  const platFormat: any = [
    {
      // 真人
      name: 'CASINO',
      sort: 8,
      key: 'live',
      level: '001001',
      img: 1,
      float: 1
    },
    {
      // 体育
      level: '001005',
      name: 'THỂ THAO',
      sort: 7,
      key: 'sports',
      img: 5,
      float: 0
    },
    {
      // 彩票
      level: '001004',
      name: 'LÔ ĐỀ',
      sort: 6,
      key: 'lottery',
      img: 2,
      float: 4
    },
    {
      // 电子
      level: '001003',
      name: 'NỔ HŨ',
      sort: 5,
      key: 'egame',
      img: 3,
      float: 0
    },
    {
      // 棋牌
      level: '001006',
      name: 'GAME BÀI',
      sort: 4,
      key: 'chess',
      img: 2,
      float: 3
    },
    {
      // 捕鱼
      level: '001002',
      name: 'BẮN CÁ',
      sort: 3,
      key: 'fish',
      img: 3,
      float: 0
    },
    {
      // 斗鸡
      level: '001008',
      name: 'ĐÁ GÀ',
      sort: 2,
      key: 'fightChicken',
      img: 1,
      float: 2
    },
    {
      // 电竞
      level: '001007',
      name: 'E-SPORTS',
      sort: 1,
      key: 'esports',
      img: 1,
      float: 2
    },

  ];
  const store = useStore();
  // 数据初始化的时候为空，需要注意
  const storePlat = computed(() => (store.getters.venueData as VenueObject[]) ?? []);
  // 获取所有游戏
  const games = computed(() => {
    if (storePlat.value.length === 0) return [];
    return storePlat.value.reduce((acc: L[], cur) => [...acc, ...cur.l], []);
  });
  const plat = ref<any[]>(orderBy(platFormat.value, 'sort', 'desc'));
  const getGameById = (id: number) => games.value.find((item: any) => item.id === id);
  const getGameByWalletId = (wallet_id: number) => games.value.find((item: any) => item.wallet_id === wallet_id);
  watchEffect(() => {
    // 因为vuex初始化的时候数组为空，所以需要判断一下
    if (storePlat.value.length) {
      const _merge = storePlat.value.map(item => {
        const _item = platFormat.find((row: any) => row.level === item.level)
        return merge(item, _item)
      })
      const r = orderBy(_merge, 'sort', 'desc');
      forEach(r, o => orderBy(o, 'seq', 'asc'));
      plat.value = r;
    }
  });
  return { plat, storePlat, games, getGameByWalletId, getGameById };
}
