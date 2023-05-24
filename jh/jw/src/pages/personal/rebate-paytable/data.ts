// 多赔率不展示的玩法
export const filterOptions = [
  'gyh', 'gyhz',
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'ninth', 'tenth',
  'lmzh', 'lmwan', 'lmqian', 'lmbai', 'lmshi', 'lmge',
  'lhdwq', 'lhdwb', 'lhdws', 'lhdwg', 'lhdqb', 'lhdqs', 'lhdqg', 'lhdbs', 'lhdbg', 'lhdsg',
  'dds', 'czw', 'baozi',
  'win32', 'winte2', 'hxz', 'hxbz', 'exl', 'sxl', 'fxl', 'tmtw', 'ewl', 'swl', 'fwl',
]

const newNameObj: { [text: string]: any } = {
  guanyahe: [
    '冠亚和-和大',
    '冠亚和-和小',
    '冠亚和-和单',
    '冠亚和-和双',
  ],
  guanyahezhi: [
    '冠亚和值-03',
    '冠亚和值-04',
    '冠亚和值-05',
    '冠亚和值-06',
    '冠亚和值-07',
    '冠亚和值-08',
    '冠亚和值-09',
    '冠亚和值-10',
    '冠亚和值-11',
    '冠亚和值-12',
    '冠亚和值-13',
    '冠亚和值-14',
    '冠亚和值-15',
    '冠亚和值-16',
    '冠亚和值-17',
    '冠亚和值-18',
    '冠亚和值-19',
  ],
  dingdanshuang: [
    '趣味-定单双-5单0双',
    '趣味-定单双-4单1双',
    '趣味-定单双-3单2双',
    '趣味-定单双-2单3双',
    '趣味-定单双-1单4双',
    '趣味-定单双-0单5双',
  ],
  caizhongwei: [
    '趣味-猜中位-03',
    '趣味-猜中位-04',
    '趣味-猜中位-05',
    '趣味-猜中位-06',
    '趣味-猜中位-07',
    '趣味-猜中位-08',
    '趣味-猜中位-09',
  ],
  longhudou: ['龙虎斗-龙', '龙虎斗-虎', '龙虎斗-和'],
  lmWin32: ['连码-三中二之中二', '连码-三中二之中三'],
  lmWinte2: ['连码-二中特之二中', '连码-二中特之中特'],
  hexiaozhong: [
    '生肖-合肖中-2',
    '生肖-合肖中-3',
    '生肖-合肖中-4',
    '生肖-合肖中-5',
    '生肖-合肖中-6',
    '生肖-合肖中-7',
    '生肖-合肖中-8',
    '生肖-合肖中-9',
    '生肖-合肖中-10',
  ],
  hexiaobuzhong: [
    '生肖-合肖不中-2',
    '生肖-合肖不中-3',
    '生肖-合肖不中-4',
    '生肖-合肖不中-5',
    '生肖-合肖不中-6',
    '生肖-合肖不中-7',
    '生肖-合肖不中-8',
    '生肖-合肖不中-9',
    '生肖-合肖不中-10',
  ],
  erlianxiao: ['生肖-二肖连-含本命', '生肖-二肖连-不含本命'],
  sanlianxiao: ['生肖-三肖连-含本命', '生肖-三肖连-不含本命'],
  silianxiao: ['生肖-四肖连-含本命', '生肖-四肖连-不含本命'],
  erweilian: ['尾数-二尾连-含0', '尾数-二尾连-不含0'],
  sanweilian: ['尾数-三尾连-含0', '尾数-三尾连-不含0'],
  siweilian: ['尾数-四尾连-含0', '尾数-四尾连-不含0'],
}

// 拆分玩法
export const CGCPOddsFormatter = (
  data: { [text: string]: any }[],
  fn: string,
  formatType: 1 | 2,
  newName: string,
) => {
// formatType 1 = 拆分多个； 2 = 同赔率展示一个
  if (formatType === 1) {
    let fnIndex = data.findIndex(d => d.fn === fn)
    if (fnIndex > -1) {
      const arr = data[fnIndex].odds.split(',').map((o: string, i: number) => ({ name: newNameObj[newName][i], level: '000', odds: o, fn: 'wtf' }))
      arr.forEach((a: any) => {
        data.splice(fnIndex + 1, 0, a)
        fnIndex += 1
      })
    }
  }
  else if (formatType === 2) {
    const fnIndex = data.findIndex(d => d.fn === fn)
    if (fnIndex > -1)
      data.splice(fnIndex, 0, { name: newName, level: '000', odds: data[fnIndex].odds.split(',')[0], fn: 'wtf' })
  }
}
