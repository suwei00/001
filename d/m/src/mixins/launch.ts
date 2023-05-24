import LineSelector from '@template-components/app-ae-line';
import { useLoading } from '@template-components/loading';
import Toast from '@template-components/toast';
import { APIs } from '@/http';
import { launchPlat } from '@/http/APIs';
import UserStoreModules from '@/store/modules/user/UserModule';
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { debounce } from 'lodash';
import { cgDialog } from '@/utils/publicPopup';
import TimingMaintain from './TimingMaintain.vue'
import { launchById } from './launchFunc';




export default function () {
  const { open, close } = useLoading();
  const router = useRouter();
  const route = useRoute();
  const { t } = useI18n();
  const isClick = ref<boolean>(false);


  const getPlatformCheck = async (key: string, id: string, code: string, flags: number) => {
    const res = await APIs.getPlatformCheck({ id })
    if (res.status && res.data.maintained === 3 && res.data.read_flag === 0) {
      cgDialog({
        title: 'LƯU Ý',
        component: TimingMaintain,
        showClose: false,
        data: {
          start: res.data.maintained_start,
          end: res.data.maintained_end,
        },
        onOk: () => {
          APIs.getPlatformCheck({ id, rflag: 1 })
          // startJumping(key, id, code, flags)
        }
      });
    } else {
      startJumping(key, id, code, flags)
    }
  }
  /**
   * @description
   * @param {string} key 场馆类型key
   * @param {string} id 场馆id
   * @param {string} code 捕鱼，棋牌，电子列表游戏的code
   * @param {number} [flags=1] 三方场馆启动接口类型
   * @return {*}
   */
  const launch = debounce((key: string, id: string, code: string, flags = 1) => {
    console.log('🚀 ~ file: launch.ts ~ line 25 ~ launch ~ debounce');
    // 如果是捕鱼 棋牌 点击 ，则直接跳转到对应场馆，展示对应游戏列表，先不需要调用场馆启动接口
    if (key === 'egame' || key === 'chess' || key === 'fish') {
      return router.push({ path: `/egame/${key}`, query: { id } });
    }

    getPlatformCheck(key, id, code, flags)
  }, 500);


  const startJumping = (key: string, id: string, code: string, flags: number) => {
    if (!UserStoreModules.login) {
      return unLogin();
    }
    // p3彩票
    if (id === '8840968486572375835') {
      return router.push({ path: `/lottery-layout/${key}`, query: { id } });
    }
    if (isClick.value) return;
    isClick.value = true;
    // code 棋牌，电子，和捕鱼的游戏代码
    const params: any = { id, code };
    // open();
    const api = launchApi(id, flags);
    api(params).then((res: any) => {
      isClick.value = false;
      if (res.status && res.data) {
        // ae真人
        if (id === '75445461569712187') {
          const list = res.data.split(',');
          if (list.length > 1) LineSelector({ list, title: t('ae') });
          else window.open((res.data += '&platfrom=SEXYBCRT'), '_blank');
        } else if (id === '127409505760007') {
          // ae seven
          const list = res.data.split(',');
          if (list.length > 1) LineSelector({ list, title: t('ae') });
          else window.open((res.data += '&platfrom=AELIVECOMM'), '_blank');
        } else if (id === '343128988882927') {
          // 斗鸡
          const newUrl = `${globalConfig.DOUJI_URL}?target=${encodeURIComponent(res.data)}`;
          window.open(newUrl, '_blank');
        } else {
          window.open(res.data, '_blank');
        }
        close();
      } else {
        Toast(res.data);
        close();
      }
    });
  }

  const unLogin = () => {
    ElMessageBox.confirm(t('unlogin'), t('tip'), {
      confirmButtonText: t('confirm'),
      showCancelButton: false,
      center: true,
      showClose: false,
      customClass: 'default-message'
    }).then(() => {
      router.push('/entry/login');
    });
  };
  /**
   * @description 启动三方场馆的api接口
   * @param {string} id
   * @param {number} flags
   * @return {*}
   */
  const launchApi = (id: string, flags: number) => {
    const list = globalConfig.ENVI === 'prod' ? launch_config.prod : launch_config.test;
    if (flags === 3) {
      return launchPlat;
    }
    if (list.includes(id) || flags === 1) {
      return launch_config.v2;
    } else {
      return launch_config.v1;
    }
  };
  return { launch, launchApi, launchById };
}

const launch_config = {
  test: [
    '36579683428691',
    '1055235995899664907',
    '127409505760007',
    '75445461569712187',
    '39636407564188',
    '7426646715018523638',
    '43495319576432',
    '8318022162827355323',
    '6861705028422769039',
    '8840968486572375835',
    '2306856765348772637',
    '36579683428691', // SA真人
    '39636407564188', // DG真人
    '2658175169982643138', // ag真人
    '437956722483179563', // sbo
    // '2326854765648775667', // AE 彩票
    '45228933360695', // 沙巴电竞
    '42514964534467', // AE电子
    '41465988833800', // Kingmaker
    '44196810703047', // JDB捕鱼
    '5053897100933741162', // avia
    '40785460901826', // UG体育
    '362857114342923387', // 沙巴体育
    '46814147030478',
    '343128988882927' // S128
  ],
  prod: [
    '36579683428691',
    '1055235995899664907',
    '127409505760007',
    '75445461569712187',
    '39636407564188',
    '7426646715018523638',
    '43495319576432',
    '8318022162827355323',
    '6861705028422769039',
    '8840968486572375835',
    '362857114342923387',
    '2306868265751172637',
    '1055235995899664907',
    '2306856765348772637', // evo
    '437956722483179563', // sbo体育
    '2658175169982643138', // ag体育
    '1846182857231915191', // IM电竞
    '5864536520308659696', // IM体育
    '7834312767105315828', // CMD体育
    '8318022162827355323', // CQ9电子
    '2306868265751548753', // 新霸电子
    '1371916075841224188', // PlayStar
    '7426646715018523638', // CQ9捕鱼
    '1470953457445352872', // A5彩票
    '8840968482572372234', // TCG彩票
    '45228933360695', // 沙巴电竞
    // '2326854765648775667', // AE 彩票
    '42514964534467', // AE电子
    '41465988833800', // Kingmaker
    '44196810703047', // JDB捕鱼
    '5053897100933741162', // avia
    '36579683428691', // SA真人
    '40785460901826', // UG体育
    '39636407564188', // DG真人
    '46814147030478',
    '343128988882927' // S128
  ],
  v1: APIs.launch1,
  v2: APIs.launch2
};
