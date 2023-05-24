import { CgTimeMaintain } from '@/components/cg-template-2';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import APIs from '@/http/blue-apis';
import router from '@/router/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { debounce } from 'lodash';
import { LogInAndRegister } from './logIn';
import { useLoading } from '@/hooks/useLoading';
import { userInfoStateStore } from '@/store-pinia/userInfo';

const { startLoading, closeLoading } = useLoading();
const getPlatformCheck = async (id: string, code: string, play: string) => {
  const res: any = await APIs.getPlatformCheck({ id });
  if (res.maintained === 3 && res.read_flag === 0) {
    const Dialog = new CgDialogClass();
    Dialog.showDialog({
      template: 'tmp2',
      title: 'LƯU Ý',
      confirmText: 'TÔI ĐÃ HIỂU',
      props: {
        start: res.maintained_start,
        end: res.maintained_end
      },
      btns: 1,
      customComponent: CgTimeMaintain,
      onOk: () => {
        APIs.getPlatformCheck({ id, rflag: 1 });
        startJumping(id, code, play);
      }
    });
  } else {
    startJumping(id, code, play);
  }
};

const keys: any = {
  electronic: '4', // 电子
  chess: '7', // 棋牌
  fishing: '3', // 扑鱼
  game: '5' // 小游戏
};

const vanueList: any = {
  '41465988833800': '7',
  '7927534376372523583': '7',
  '46814147030678': '5',
  '6861705028422769039': '4',
  '42514964534467': '4',
  '16595015200257': '4',
  '43495319576432': '4',
  '8318022162827355323': '4',
  '46814147030478': '4',
  '44196810703047': '3',
  '16595015877855': '3',
  '7426646715018523638': '3'
};

const launchVanue = debounce(
  ({ key, id, code, play }: any) => {
    // 如果是捕鱼 棋牌 电子 点击 展示对应游戏列表，先不需要调用场馆启动接口
    if (key === 'electronic' || key === 'chess' || key === 'fishing' || key === 'game') {
      const url = `/subclass/${keys[key]}`;
      return router.push({ path: url, query: { gameId: id } });
    }

    // banner跳转场馆的特殊情况
    if (vanueList[id] && !key) {
      const url = `/subclass/${vanueList[id]}`;
      return router.push({ path: url, query: { gameId: id } });
    }

    const { isLogin } = useAppStore();
    if (!isLogin) {
      return LogInAndRegister('LogIn');
    }
    getPlatformCheck(id, code, play);
  },
  500,
  {
    leading: true,
    trailing: false
  }
);

const startJumping = (id: string, code: string, play: string) => {
  if (id === '8840968486572375835') {
    return goToLotteryGame(play);
  }

  startLoading();
  APIs.getPlatLaunch({ id, code })
    .then(res => {
      const list = res.split(',');
      if (id === '75445461569712187') {
        if (list.length > 1) {
          window.open((list[0] += '&platfrom=SEXYBCRT'), '_blank');
        } else {
          window.open((res += '&platfrom=SEXYBCRT'), '_blank');
        }
      } else if (id === '127409505760007') {
        // ae seven
        if (list.length > 1) {
          window.open((list[0] += '&platfrom=AELIVECOMM'), '_blank');
        } else {
          window.open((res += '&platfrom=AELIVECOMM'), '_blank');
        }
      } else if (id === '343128988882927') {
        // 斗鸡
        const newUrl = `${globalConfig.DOUJI_URL}?target=${encodeURIComponent(res)}`;
        window.open(newUrl, '_blank');
      } else {
        window.open(res, '_blank');
      }
      console.error(res);
    })
    .finally(() => {
      closeLoading();
    });
};

const goToLotteryGame = (play?: string) => {
  const { isLogin } = useAppStore();
  if (isLogin) {
    const { userInfo } = userInfoStateStore();
    const { token } = useAppStore();
    const iframeUrl = globalConfig.IS_PROD ? `${window.location.protocol}//cp.${window.location.host.replace('www.', '')}` : globalConfig.CP_URL;
    const { prefix, uid } = userInfo;
    let cpUrl = '';
    if (play) {
      const areaIndex = sessionStorage.getItem('AREA_INDEX');
      cpUrl = `${iframeUrl}/play/${play}?t=${token}&prefix=${prefix}&host=${location.origin}&uid=${uid}&areaIndex=${areaIndex}`;
    } else {
      cpUrl = `${iframeUrl}?t=${token}&prefix=${prefix}&uid=${uid}&host=${location.origin}`;
    }
    window.open(cpUrl);
  } else {
    LogInAndRegister('LogIn');
  }
};

export { launchVanue, goToLotteryGame };
