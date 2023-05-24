import { getPlatJson } from '@/http/modules/user';
import Local from '@/utils/storage';
import { copy as copyClipboard } from 'clipboard'
import Toast from '@/components/cg-template-2/toast';

/**
 * 对列表按指定字段排序
 * @param {*} list
 * @param {*} filedName 排序字段
 * @param {*} order 默认升序，降序(desc)
 */
export function listOrderByField(list: any[], fieldName: string, order: string = ''): any[] {
  let temp;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list.length - i; j++) {
      if (list[j][fieldName] > (list[j + 1] && list[j + 1][fieldName])) {
        temp = list[j + 1];
        list[j + 1] = list[j];
        list[j] = temp;
      }
    }
  }
  if (order === 'desc') {
    list = list.reverse();
  }
  return list;
}

export function getGameNameByIdConactStr(list: any): any {
  getPlatJson().then((res: any) => {
    if (res.length) {
      list.map((cord: any) => {
        let gameItem = res.find((game: any) => game.id === cord.platform_id);
        if (cord.transfer_type === 1) {
          cord.accountInfo = `${gameItem.name}到中心钱包`;
        } else if (cord.transfer_type === 0) {
          cord.accountInfo = `中心钱包到${gameItem.name}`;
          return cord;
        }
      });
    }
  });
  return list;
}

export function getRouterPathByGameId(id: number) {
  const pathMap = [
    { path: '/realbet', id: 2, name: '真人' },
    { path: '/egame', id: 3, name: '捕鱼' },
    { path: '/egame', id: 4, name: '电子' },
    { path: '/lottery', id: 5, name: '彩票' },
    { path: '/sport', id: 6, name: '体育' },
    { path: '/chess-game', id: 7, name: '棋牌' },
    { path: '/gaming', id: 8, name: '电竞' },
    { path: '/preferential', id: 9, name: '优惠' },
    { path: '/kefu', id: 10, name: '客服' },
    { path: '/sponsor', id: 11, name: '赞助' },
    { path: '/agent-page', id: 12, name: '合营' },
    { path: '/app-page', id: 13, name: 'APP' },
    { path: '/personal/myVip', id: 14, name: '个人中心' },
    { path: '/personal/deposit', id: 15, name: '存款' },
    { path: '/personal/transfer', id: 16, name: '转账' },
    { path: '/personal/withdrawals', id: 17, name: '取款' }
  ];
  return pathMap.find((item: any) => item.id === id);
}

export function escape2Html(str: string): string {
  const arrEntities: { [prop: string]: string } = { lt: '<', gt: '>', nbsp: ' ', amp: ' ', quot: '"' };
  return str.replace(/&(lt|gt|amp|quot|nbsp);/gi, (all, t: string): string => {
    return arrEntities[t];
  });
}

/**
 * @description: 复制功能
 * @param {*} val
 * @return {*}
 */
export function copy(val: string): void {
  const input = document.createElement('input');
  input.value = val;
  document.body.appendChild(input);
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}
export function newCopy(val: string) {
  copyClipboard(val)
  Toast('Sao Chép Thành Công');
}


// 检测表单是否全部有值
export function isFormReady<T>(form: T, except?: string[]): boolean {
  for (const i in form) {
    if (except && except.indexOf(i) !== -1) continue;
    if (!form[i]) return true;
  }
  return false;
}

// 计算字节长度

export function getCodeLength(str: string) {
  let realLength = 0,
    len = str.length,
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    charCode >= 0 && charCode <= 128 ? (realLength += 1) : (realLength += 2);
  }
  return realLength;
}

// 保留小数，不四舍五入
export const toFixedNum = (n: number | string, fiexd: number): string => {
  const str = n.toString();
  const index = str.indexOf('.');
  if (index > 0) return str.substring(0, index + fiexd + 1);
  else return str;
};
export function changeRate(amount: number, rate: number = 23.533) {
  return Number((amount / rate).toFixed(4));
}

/**
 * URL参数 转对象
 */
export const getUrlParameters = (url: string) => {
  const arr: any[] = url.match(/([^?=&]+)(=([^&]*))/g) || [];
  return arr.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});
};

export function urlToOrigin(str: string) {
  return new URL(str).origin;
}

export function getServiceUrl(path: string) {
  // @ts-ignore
  if (process.env.NODE_ENV === 'development') {
    return globalConfig.APP_CDN_URL + '/' + path;
  } else {
    return window.location.origin + '/' + path;
  }
}

export function getLangPath() {
  const l = ['zh', 'zh-CN'].indexOf(globalConfig.LANG) > -1 ? 'zh' : globalConfig.LANG;
  return `${globalConfig.STATIC_CDN_URL}/lang/error/` + l + '.json';
}

/**
 * @description 获取客服链接
 * @export
 * @return {*}
 */
export function getCustomerServeUrl() {
  return Local.get('serviceUrl');
}
