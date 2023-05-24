export type ActivityProp = {
  flag?: 'static' | 'rescue' | 'deposit';
  id?: string;
  path?: string;
  imgUrl: string;
};
// 写死的静态页
const initList: Array<ActivityProp> = [
  {
    path: '/introduction',
    imgUrl: '/preferential/introduction-bg.png'
  }
];
export const activityPathMap: any = {
  rescue: '/rescueMoney',
  deposit: '/first-deposit',
  cgcpbet: '/cgcpbet',
  completion: '/completion',
  exam: '/exam'
};

export default initList;
