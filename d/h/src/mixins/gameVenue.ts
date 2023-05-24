import { CgTimeMaintain } from '@/components/cg-template-2';
import { CgDialogClass } from '@/components/cg-template-2/cg-dialog/function-call';
import APIs from '@/http/blue-apis';
import router from '@/router/cg-template-2';
import { useAppStore } from '@/store-pinia';
import { userInfoStateStore } from '@/store-pinia/userInfo';
import { debounce } from 'lodash';
import { useLoading } from '@/hooks/useLoading';

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

const types = ['electronic', 'chess', 'fishing', 'game'];
const keys: any = {
  electronic: '4',
  chess: '7',
  fishing: '3',
  game: '5'
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
    if (types.includes(key)) {
      return router.push({ path: `/subclass/${keys[key]}`, query: { gameId: id } });
    }

    // banner跳转场馆的特殊情况
    if (vanueList[id] && !key) {
      const url = `/subclass/${vanueList[id]}`;
      return router.push({ path: url, query: { gameId: id } });
    }
    const { isLogin } = useAppStore();
    if (!isLogin) {
      return router.push('/entry/login');
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
    goGameVenue(healeLotteryURl(play), id);
    return;
  }
  startLoading();
  APIs.getPlatLaunch({ id, code })
    .then(res => {
      const list = res.split(',');
      if (id === '75445461569712187') {
        if (list.length > 1) {
          goGameVenue((list[0] += '&platfrom=SEXYBCRT'), id);
        } else {
          goGameVenue((res += '&platfrom=SEXYBCRT'), id);
        }
      } else if (id === '127409505760007') {
        // ae seven
        if (list.length > 1) {
          goGameVenue((list[0] += '&platfrom=AELIVECOMM'), id);
        } else {
          goGameVenue((res += '&platfrom=AELIVECOMM'), id);
        }
      } else if (id === '343128988882927') {
        // 斗鸡
        const newUrl = `${globalConfig.DOUJI_URL}?target=${encodeURIComponent(res)}`;
        goGameVenue(newUrl, id);
      } else {
        goGameVenue(res, id);
      }
      console.error(res);
    })
    .finally(() => {
      closeLoading();
    });
};

const goGameVenue = (url: string, id: string) => {
  router.push({ path: '/launch-game', query: { url, id } });
};

const healeLotteryURl = (play: string) => {
  const userInfoStore = userInfoStateStore();
  const { token } = useAppStore();
  const { prefix, uid } = userInfoStore.userInfo;
  const http = window.location.protocol;
  const cpUrl = globalConfig.IS_DEV
    ? globalConfig.CP_URL
    : `${http}//cp.${window.location.hostname.replace('www', '').replace('h5.', '')}`;
  let _url = '';
  if (play) {
    _url = `${cpUrl}/playList?platId=48&id=309&areaId=48&tab=1&platIndex=0&name=Đề&t=${token}&prefix=${prefix}&host=${location.origin}&uid=${uid}`;
  } else {
    _url = `${cpUrl}?t=${token}&prefix=${prefix}&host=${location.origin}&uid=${uid}`;
  }
  return _url;
};

export { launchVanue };
