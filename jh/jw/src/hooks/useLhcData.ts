import dayjs from 'dayjs'
/**
 * 六合彩数据
 * @returns {LhcData}
 */
export function useLhcData() {
  // 六合彩波色号码球
  const lhcBallList = [
    { name: '01', id: 1, color: 'red' },
    { name: '02', id: 2, color: 'red' },
    { name: '03', id: 3, color: 'blue' },
    { name: '04', id: 4, color: 'blue' },
    { name: '05', id: 5, color: 'green' },
    { name: '06', id: 6, color: 'green' },
    { name: '07', id: 7, color: 'red' },
    { name: '08', id: 8, color: 'red' },
    { name: '09', id: 9, color: 'blue' },
    { name: '10', id: 10, color: 'blue' },
    { name: '11', id: 11, color: 'green' },
    { name: '12', id: 12, color: 'red' },
    { name: '13', id: 13, color: 'red' },
    { name: '14', id: 14, color: 'blue' },
    { name: '15', id: 15, color: 'blue' },
    { name: '16', id: 16, color: 'green' },
    { name: '17', id: 17, color: 'green' },
    { name: '18', id: 18, color: 'red' },
    { name: '19', id: 19, color: 'red' },
    { name: '20', id: 20, color: 'blue' },
    { name: '21', id: 21, color: 'green' },
    { name: '22', id: 22, color: 'green' },
    { name: '23', id: 23, color: 'red' },
    { name: '24', id: 24, color: 'red' },
    { name: '25', id: 25, color: 'blue' },
    { name: '26', id: 26, color: 'blue' },
    { name: '27', id: 27, color: 'green' },
    { name: '28', id: 28, color: 'green' },
    { name: '29', id: 29, color: 'red' },
    { name: '30', id: 30, color: 'red' },
    { name: '31', id: 31, color: 'blue' },
    { name: '32', id: 32, color: 'green' },
    { name: '33', id: 33, color: 'green' },
    { name: '34', id: 34, color: 'red' },
    { name: '35', id: 35, color: 'red' },
    { name: '36', id: 36, color: 'blue' },
    { name: '37', id: 37, color: 'blue' },
    { name: '38', id: 38, color: 'green' },
    { name: '39', id: 39, color: 'green' },
    { name: '40', id: 40, color: 'red' },
    { name: '41', id: 41, color: 'blue' },
    { name: '42', id: 42, color: 'blue' },
    { name: '43', id: 43, color: 'green' },
    { name: '44', id: 44, color: 'green' },
    { name: '45', id: 45, color: 'red' },
    { name: '46', id: 46, color: 'red' },
    { name: '47', id: 47, color: 'blue' },
    { name: '48', id: 48, color: 'blue' },
    { name: '49', id: 49, color: 'green' },
  ]

  // 六合彩 多赔率详情字段
  const oddsText = {
    win32: ['中二', '中三'],
    winte2: ['二中', '中特'],
    ewl: ['含0尾', '不含0尾'],
    swl: ['含0尾', '不含0尾'],
    fwl: ['含0尾', '不含0尾'],
    exl: ['含本命', '不含本命'],
    sxl: ['含本命', '不含本命'],
    fxl: ['含本命', '不含本命'],
    hxz: [
      '中2生肖组合',
      '中3生肖组合',
      '中4生肖组合',
      '中5生肖组合',
      '中6生肖组合',
      '中7生肖组合',
      '中8生肖组合',
      '中9生肖组合',
      '中10生肖组合',
    ],
    hxbz: [
      '不中2生肖组合',
      '不中3生肖组合',
      '不中4生肖组合',
      '不中5生肖组合',
      '不中6生肖组合',
      '不中7生肖组合',
      '不中8生肖组合',
      '不中9生肖组合',
      '不中10生肖组合',
    ],
  }

  // 尾数数据生成
  const weishuDataGenerated = (min: number, max: number, fn?: string, odds = '') => {
    if (!fn)
      return []
    const wei: any[] = []
    const tou = []
    const oddsList = odds.split(',')
    let _i = 0
    if (max === 14) {
      for (let i = 0; i <= 4; i++) {
        tou.push({
          renderName: `${i}头`,
          renderValue: i.toString(),
          clist: [],
          odds: oddsList[i],
          showOdds: fn === 'tmtw',
        })
      }
      _i = 5
    }
    for (let i = _i; i <= (9 + _i); i++) {
      wei.push({
        renderName: `${(i - _i)}尾`,
        renderValue: (i).toString(),
        clist: [],
        odds: oddsList[i],
        showOdds: fn === 'tmtw',
      })
    }
    return [...tou, ...wei]
  }

  // 生肖数据生成【合肖中，合肖不中，二肖连，三肖连，四肖连】
  const shengxiaoDataGenerated = (isHxzOrHxbz = false) => {
    const shengxiao: any[] = [
      {
        renderName: '鼠',
        renderValue: '1',
        clist: [],
      }, {
        renderName: '牛',
        renderValue: '2',
        clist: [],
      }, {
        renderName: '虎',
        renderValue: '3',
        clist: [],
      }, {
        renderName: '兔',
        renderValue: '4',
        clist: [],
      }, {
        renderName: '龙',
        renderValue: '5',
        clist: [],
      }, {
        renderName: '蛇',
        renderValue: '6',
        clist: [],
      }, {
        renderName: '马',
        renderValue: '7',
        clist: [],
      }, {
        renderName: '羊',
        renderValue: '8',
        clist: [],
      }, {
        renderName: '猴',
        renderValue: '9',
        clist: [],
      }, {
        renderName: '鸡',
        renderValue: '10',
        clist: [],
      }, {
        renderName: '狗',
        renderValue: '11',
        clist: [],
      }, {
        renderName: '猪',
        renderValue: '12',
        clist: [],
      },
    ]

    // 投注号码
    const shengxiaoClist = [
      {
        ball: ['01', '13', '25', '37', '49'], // 本命年
      },
      {
        ball: ['12', '24', '36', '48'],
      },
      {
        ball: ['11', '23', '35', '47'],
      },
      {
        ball: ['10', '22', '34', '46'],
      },
      {
        ball: ['09', '21', '33', '45'],
      },
      {
        ball: ['08', '20', '32', '44'],
      },
      {
        ball: ['07', '19', '31', '43'],
      },
      {
        ball: ['06', '18', '30', '42'],
      },
      {
        ball: ['05', '17', '29', '41'],
      },
      {
        ball: ['04', '16', '28', '40'],
      },
      {
        ball: ['03', '15', '27', '39'],
      },
      {
        ball: ['02', '14', '26', '38'],
      },
    ]

    if (isHxzOrHxbz)
      shengxiaoClist[0].ball = ['01', '13', '25', '37']

    // 获取今年生肖
    const year = new Date().getFullYear()
    const newYear = dayjs('2023-01-22')
    const shengxiaoIndex = (year - (dayjs().isBefore(newYear) ? 5 : 4)) % 12

    shengxiao.forEach((item: any, index: number) => {
      if (index >= shengxiaoIndex)
        item.index = ((index - shengxiaoIndex) + 1).toString()

      else
        item.index = ((index + 12 - shengxiaoIndex) + 1).toString()

      item.clist = shengxiaoClist[Number(item.index) - 1].ball
    })
    // console.error(shengxiao)
    return shengxiao
  }

  const getShenxiaoName = (list: any[], ball: string, isKaijiang = false) => {
    if (isKaijiang) {
      const shengxiao = list.find((item: any) => item.clist.includes(ball))
      return shengxiao ? shengxiao.renderName : '-'
    }
    const shengxiao = list.find((item: any) => item.renderValue === ball)
    return shengxiao ? shengxiao.renderName : '-'
  }

  const getShenxiaoNameList = (list: any[], ballList: string) => {
    const shengxiaoList = ballList.split(',').map((ball: string) => getShenxiaoName(list, ball))
    return shengxiaoList.join(' ')
  }

  const weishuName = (fn: string, ball: string) => {
    let list: any[] = []
    if (fn === 'tmtw')
      list = weishuDataGenerated(0, 14, fn, '')

    else
      list = weishuDataGenerated(0, 9, fn, '')

    // console.error('list', list)
    const name = list.find((item: any) => item.renderValue === ball)
    return name ? name.renderName : '-'
  }

  const weishuNameList = (fn: string, ballList: string) => {
    const nameList = ballList.split(',').map((ball: string) => weishuName(fn, ball))
    return nameList.join(' ')
  }

  return {
    oddsText,
    lhcBallList,
    getShenxiaoName,
    weishuName,
    weishuNameList,
    getShenxiaoNameList,
    shengxiaoDataGenerated,
    weishuDataGenerated,
  }
}
