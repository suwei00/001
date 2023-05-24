// const getPlatformCheck = async (key: string, id: string, code: string, flags: number) => {
//   const res = await APIs.getPlatformCheck({ id });
//   if (res.status && res.data.maintained === 3 && res.data.read_flag === 0) {
//     cgDialog({
//       title: 'LƯU Ý',
//       component: TimingMaintain,
//       showClose: false,
//       data: {
//         start: res.data.maintained_start,
//         end: res.data.maintained_end
//       },
//       onOk: () => {
//         APIs.getPlatformCheck({ id, rflag: 1 });
//         startJumping(key, id, code, flags);
//       }
//     });
//   } else {
//     startJumping(key, id, code, flags);
//   }
// };
// /**
//  * @description
//  * @param {string} key 场馆类型key
//  * @param {string} id 场馆id
//  * @param {string} code 捕鱼，棋牌，电子列表游戏的code
//  * @param {number} [flags=1] 三方场馆启动接口类型
//  * @return {*}
//  */
// const launch = debounce((key: string, id: string, code: string, flags = 1) => {
//   console.log('🚀 ~ file: launch.ts ~ line 25 ~ launch ~ debounce');
//   // 如果是捕鱼 棋牌 点击 ，则直接跳转到对应场馆，展示对应游戏列表，先不需要调用场馆启动接口
//   if (key === 'egame' || key === 'chess' || key === 'fish') {
//     return router.push({ path: `/egame/${key}`, query: { id } });
//   }

//   getPlatformCheck(key, id, code, flags);
// }, 500);
