import { getBanner, getPromotionList } from '@/http/APIs';
import { store } from '@/store';
import Session from '@/utils/session';
import { isArray } from 'lodash';
import { NavigationGuardNext } from 'vue-router';
export function checkAgent(d: any, next?: NavigationGuardNext) {

  store.commit('app/setBanner', d || [])
  if (next) next();
  // const { banner, filter = {} } = d;
  // // debugger;
  // const { domains = [], banners = [], flag = [] } = filter;
  // const hostname = location.hostname.replace('h5.', '');
  // // 如果 flag 中包含2，需要去hide中拿需要隐藏轮播的id数组
  // let r = [];
  // if (isArray(banner)) {
  //   if (flag.includes('2') && domains.includes(hostname)) r = banner.filter(i => !banners.includes(i.id));
  //   else r = banner;
  //   store.commit('app/setBanner', r);
  // }
  // // 如果domain中有当前域名，并且flag中包含1 就隐藏合营计划
  // if (domains.includes(hostname) && flag.includes('1')) {
  //   store.commit('app/setShowAgent', false);
  //   if (next) next('/home');
  // } else {
  //   if (next) next();
  // }
}

const getBannerFn = async (next: any) => {
  let promotionList: any = [];
  let bannerList = [];
  let resultList = []
  const promotionRes = await getPromotionList({ page: 1, page_size: 100 })
  if (promotionRes.status && promotionRes.data) {
    promotionList = promotionRes.data;
  }

  const bannerRes = await getBanner({ flags: 2, device: 25 });
  if (bannerRes.status && bannerRes.data) {
    bannerList = bannerRes.data.banner;

    resultList = bannerList.map((item: any) => {
      const obj = promotionList.find((o: any) => {
        return item.url === `/${o.flag}`;
      })
      return { ...item, ...obj };
    })
    Session.set('banner', resultList);
    checkAgent(resultList, next);
  }
}


export function getCheckAgent(next?: NavigationGuardNext) {
  const ban = Session.get('banner');
  if (ban) {
    checkAgent(ban, next);
  } else {
    getBannerFn(next);
  }
}
