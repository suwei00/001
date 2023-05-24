import Toast from '@template-components/toast';
import { useRouter } from 'vue-router';
import { useLoading } from '@template-components/loading';
import { getPlatLaunch } from '@/http/blue-apis';
import { APIs } from '@/http';
import router from '@/router';
import { goToLotteryGame } from '@/utils/gameVenue';

// 彩票
const lottery = ['8840968486572375835'];
// 真人场馆
const casino = [
  '2658175169982643138', // ag真人
  '127409505760007',
  '39636407564188',
  '1055235995899664907',
  '2306856765348772637',
  '36579683428691',
  '75445461569712187'
];
// 体育
const sport = ['362857114342923387', '437956722483179563', '16564048178345'];
// 斗鸡
const douji = ['343128988882927'];
// 棋牌
const chess = ['41465988833800', '7927534376372523583'];
// 电子
const egame = ['6861705028422769039', '42514964534467', '43495319576432', '8318022162827355323', '46814147030478'];
// 捕鱼
const fish = ['44196810703047', '7426646715018523638'];
// 电竞
const esports = ['16564048344271', '45228933360695'];
/**
 * @description 首页banner，活动弹窗，通过场馆id启动相关场馆 //TODO:浆糊代码
 * @param {string} id
 */
export const launchById = async (id: string) => {
  console.log('🚀 ~ file: launch.ts ~ line 88 ~ launchById ~ id', id);

  // p3彩票
  if (id === '8840968486572375835') {
    return router.push('/lottery-layout/lottery?id=8840968486572375835');
  }
  // 电子
  if (egame.includes(id)) {
    return router.push('/egame/egame?id=' + id);
  }
  // 捕鱼
  if (fish.includes(id)) {
    return router.push('/egame/fish?id=' + id);
  }
  // 棋牌
  if (chess.includes(id)) {
    return router.push('/egame/chess?id=' + id);
  }
  open();
  const { status, data } = await APIs.launch2({ id });
  if (status) {
    window.open(data, '_blank');
  } else {
    Toast(data);
  }
  close();
};
/**
 * @description 首页banner，活动弹窗，通过场馆id启动相关场馆 //TODO:浆糊代码
 * @param {string} id
 */
export const launchByIdBlue = async (id: string) => {
  const { open, close } = useLoading();

  console.log('🚀 ~ file: launch.ts ~ line 88 ~ launchById ~ id', id);

  // p3彩票
  if (id === '8840968486572375835') {
    return goToLotteryGame();
  }
  // 电子
  if (egame.includes(id)) {
    return router.push('/subclass/4?id=' + id);
  }
  // 捕鱼
  if (fish.includes(id)) {
    return router.push('/subclass/3?id=' + id);
  }
  // 棋牌
  if (chess.includes(id)) {
    return router.push('/subclass/7?id=' + id);
  }
  open();
  getPlatLaunch({ id })
    .then(res => {
      window.open(res, '_blank');
      close();
    })
    .catch(err => {
      Toast(err);
      close();
    });
};
